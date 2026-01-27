import axios from "axios";
import { useEffect, useState } from "react";
import mediaUpload from "../../utils/mediaUpload";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UserSettingPage() {
    const API_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [photoFile, setPhotoFile] = useState(null);
    const [photoUrl, setPhotoUrl] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ================= FETCH USER =================
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        axios
            .get(`${API_URL}/api/users/me`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                const userData = res.data.user;

                setUser(userData);
                setFirstName(userData.firstName || "");
                setLastName(userData.lastName || "");

                if (userData.image) {
                    setPhotoUrl(
                        userData.image.startsWith("http")
                            ? userData.image
                            : `${API_URL}/${userData.image}`
                    );
                }
            })
            .catch(() => {
                localStorage.removeItem("token");
                navigate("/login");
            })
            .finally(() => setLoading(false));
    }, [API_URL, navigate]);

    // ================= PHOTO PREVIEW =================
    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setPhotoFile(file);
        setPhotoUrl(URL.createObjectURL(file));
    };

    // ================= UPDATE PROFILE =================
    async function updateUserData() {
        try {
            const token = localStorage.getItem("token");

            const data = {
                firstName,
                lastName,
                image: user?.image || "",
            };

            if (photoFile) {
                const link = await mediaUpload(photoFile);
                data.image = link;
            }

            await axios.put(`${API_URL}/api/users/me`, data, {
                headers: { Authorization: `Bearer ${token}` },
            });

            toast.success("Profile updated");
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.error("Error updating profile");
        }
    }

    // ================= UPDATE PASSWORD =================
    async function updatePassword() {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const token = localStorage.getItem("token");

            await axios.put(
                `${API_URL}/api/users/me/password`,
                { password },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setPassword("");
            setConfirmPassword("");
            toast.success("Password updated");
            navigate("/");
        } catch (err) {
            console.error(err);
            toast.error("Error updating password");
        }
    }

    // ================= LOADING =================
    if (loading) {
        return (
            <div
                className="h-screen flex items-center justify-center text-secondary
                bg-[url('/login.jpg')] bg-cover bg-center bg-no-repeat"
            >
                Loading...
            </div>
        );
    }

    // ================= UI =================
    return (
        <div
            className="relative min-h-screen flex items-center justify-center px-6
            bg-[url('/login.jpg')] bg-cover bg-center bg-no-repeat"
        >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-secondary/60 backdrop-blur-sm"></div>

            {/* Glass container */}
            <div className="relative w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12
                bg-primary/80 backdrop-blur-2xl rounded-[36px] p-10
                shadow-[0_50px_120px_rgba(0,0,0,0.45)]">

                {/* PROFILE */}
                <div className="rounded-[28px] p-8 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                    <h2 className="text-2xl font-semibold text-secondary mb-8">
                        Profile
                    </h2>

                    <div className="flex justify-center mb-10">
                        <div className="relative">
                            <div className="w-28 h-28 rounded-full p-[3px]
                                bg-[color:var(--color-accent)]
                                shadow-[0_0_35px_rgba(250,129,47,0.6)]">
                                <div className="w-full h-full rounded-full overflow-hidden bg-primary">
                                    {photoUrl ? (
                                        <img
                                            src={photoUrl}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-secondary/40 text-3xl font-semibold">
                                            {firstName.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <label className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full
                                bg-primary border border-secondary/20
                                shadow-lg flex items-center justify-center cursor-pointer
                                hover:scale-110 transition">
                                📷
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First name"
                            className="w-full px-5 py-4 rounded-xl bg-primary
                                border border-secondary/20 text-secondary
                                focus:ring-2 focus:ring-[color:var(--color-accent)] outline-none"
                        />

                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last name"
                            className="w-full px-5 py-4 rounded-xl bg-primary
                                border border-secondary/20 text-secondary
                                focus:ring-2 focus:ring-[color:var(--color-accent)] outline-none"
                        />

                        <button
                            onClick={updateUserData}
                            className="w-full py-4 rounded-xl font-semibold text-white
                                bg-[color:var(--color-accent)]
                                shadow-[0_10px_30px_rgba(250,129,47,0.5)]
                                hover:scale-[1.02] transition">
                            Save Profile
                        </button>
                    </div>
                </div>

                {/* SECURITY */}
                <div className="rounded-[28px] p-8 bg-white shadow-[0_20px_40px_rgba(0,0,0,0.15)]">
                    <h2 className="text-2xl font-semibold text-secondary mb-8">
                        Security
                    </h2>

                    <div className="space-y-6">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New password"
                            className="w-full px-5 py-4 rounded-xl bg-primary
                                border border-secondary/20 text-secondary
                                focus:ring-2 focus:ring-secondary outline-none"
                        />

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            className="w-full px-5 py-4 rounded-xl bg-primary
                                border border-secondary/20 text-secondary
                                focus:ring-2 focus:ring-secondary outline-none"
                        />

                        <button
                            onClick={updatePassword}
                            className="w-full py-4 rounded-xl font-semibold text-white
                                bg-secondary
                                shadow-[0_10px_30px_rgba(57,62,70,0.5)]
                                hover:scale-[1.02] transition">
                            Update Password
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
