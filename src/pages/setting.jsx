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
                const u = res.data.user;
                setUser(u);
                setFirstName(u.firstName || "");
                setLastName(u.lastName || "");
                if (u.image) setPhotoUrl(u.image);
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

            const res = await axios.put(
                `${API_URL}/api/users/me`,
                data,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const updatedUser = res.data.user;
            setUser(updatedUser);
            setFirstName(updatedUser.firstName || "");
            setLastName(updatedUser.lastName || "");
            if (updatedUser.image) setPhotoUrl(updatedUser.image);

            toast.success("Profile updated successfully");
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
        } catch (err) {
            console.error(err);
            toast.error("Error updating password");
        }
    }

    // ================= LOADING =================
    if (loading) {
        return (
            <div className="w-full h-screen bg-[url('/login.jpg')] bg-cover bg-center
                            flex items-center justify-center text-white text-xl">
                Loading...
            </div>
        );
    }

    // ================= UI =================
    return (
        <div className="relative w-full h-screen bg-[url('/login.jpg')] bg-cover bg-center
                        flex items-center justify-center px-6">

            <div className="absolute inset-0 bg-black/60 backdrop-blur-md"></div>

            <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16">

                {/* ================= PROFILE ================= */}
                <div className="bg-white/95 backdrop-blur-xl rounded-[40px] p-14
                                shadow-[0_40px_100px_rgba(0,0,0,0.35)]">

                    <h2 className="text-3xl font-semibold text-secondary mb-12">
                        Profile
                    </h2>

                    <div className="flex items-center gap-10 mb-14">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full p-[3px]
                                            bg-gradient-to-br from-accent to-orange-400
                                            shadow-[0_20px_45px_rgba(250,129,47,0.6)]">
                                <div className="w-full h-full rounded-full overflow-hidden
                                                bg-primary border border-secondary/10">
                                    {photoUrl ? (
                                        <img src={photoUrl} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center
                                                        text-secondary/40 text-4xl font-semibold">
                                            {firstName.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <label className="absolute -bottom-2 -right-2 w-11 h-11
                                              rounded-full bg-white shadow-xl
                                              flex items-center justify-center cursor-pointer
                                              text-lg">
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

                    <div className="space-y-8">
                        <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First name"
                            className="w-full px-7 py-4 rounded-2xl bg-primary
                                       border border-secondary/10 shadow-inner
                                       focus:outline-none focus:ring-2 focus:ring-accent/40"
                        />

                        <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last name"
                            className="w-full px-7 py-4 rounded-2xl bg-primary
                                       border border-secondary/10 shadow-inner
                                       focus:outline-none focus:ring-2 focus:ring-accent/40"
                        />

                        <button
                            onClick={updateUserData}
                            className="w-full py-4 rounded-2xl bg-accent text-white
                                       font-semibold tracking-wide
                                       shadow-[0_8px_0_#d8661f]
                                       hover:opacity-95 transition"
                        >
                            Save profile
                        </button>
                    </div>
                </div>

                {/* ================= SECURITY ================= */}
                <div className="bg-white/95 backdrop-blur-xl rounded-[40px] p-14
                                shadow-[0_40px_100px_rgba(0,0,0,0.35)]">

                    <h2 className="text-3xl font-semibold text-secondary mb-12">
                        Security
                    </h2>

                    <div className="space-y-8">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="New password"
                            className="w-full px-7 py-4 rounded-2xl bg-primary
                                       border border-secondary/10 shadow-inner
                                       focus:outline-none focus:ring-2 focus:ring-secondary/40"
                        />

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                            className="w-full px-7 py-4 rounded-2xl bg-primary
                                       border border-secondary/10 shadow-inner
                                       focus:outline-none focus:ring-2 focus:ring-secondary/40"
                        />

                        <button
                            onClick={updatePassword}
                            className="w-full py-4 rounded-2xl bg-secondary text-white
                                       font-semibold tracking-wide
                                       shadow-[0_8px_0_#2b2f35]
                                       hover:opacity-95 transition"
                        >
                            Update password
                        </button>

                        {/* ===== BACK TO HOME ===== */}
                        <button
                            onClick={() => navigate("/")}
                            className="w-full py-3 rounded-2xl border border-secondary
                                       text-secondary font-semibold tracking-wide
                                       hover:bg-secondary hover:text-white transition"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
