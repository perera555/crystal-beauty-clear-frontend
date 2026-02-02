import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "../../components/Loader";
import { MdVerified } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";


function UesrBlockConfimed(props) {
    const email = props.user.email;
    const close = props.close;
    const refresh = props.refresh;

    function blockUser() {
        const token = localStorage.getItem("token");

        axios.put(
            import.meta.env.VITE_API_URL + "/api/users/block/" + email,
            { isblocked: !props.user.isblocked },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        ).then(() => {
            close();
            refresh();
            toast.success("User Blocked Successfully");
        }).catch(() => {
            toast.error("Failed to Block User");
        });
    }

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex justify-center items-center">
            <div className="
                w-[520px] h-[220px]
                bg-primary
                rounded-3xl
                shadow-[0_30px_80px_rgba(0,0,0,0.25)]
                relative
                flex flex-col
                justify-center
                items-center
                gap-8
                border border-accent/30
            ">
                <button
                    onClick={close}
                    className="
                        absolute -top-4 -right-4
                        w-10 h-10
                        bg-red-600
                        rounded-full
                        font-bold text-white
                        flex justify-center items-center
                        shadow-lg
                        hover:bg-white hover:text-red-600
                        transition
                    "
                >
                    ✕
                </button>

                <p className="text-lg font-semibold text-center px-6">
                    Are you sure you want to{" "}
                    <span className="text-accent">
                        {props.user.isblocked ? "Unblock" : "Block"}
                    </span>{" "}
                    the user with email:
                    <br />
                    <span className="font-bold">{email}</span>
                </p>

                <div className="flex gap-10">
                    <button
                        onClick={close}
                        className="
                            w-[110px] py-2
                            rounded-full
                            bg-secondary
                            text-white
                            shadow-md
                            hover:shadow-xl
                            transition
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={blockUser}
                        className="
                            w-[110px] py-2
                            rounded-full
                            bg-red-600
                            text-white
                            shadow-md
                            hover:shadow-xl
                            transition
                        "
                    >
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AdminUsersPage() {
    const [users, setUsers] = useState([])
    const [isblockconfirmvisible, setsIsBlockConfirmVisible] = useState(false)
    const [userToBlock, setUserToBlock] = useState(null)
    const [isloding, setIsLoding] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios.get(import.meta.env.VITE_API_URL + "/api/users/all-users", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                setUsers(response.data.users);
                setIsLoding(false);
            })
            .catch(() => {
                toast.error("Failed to fetch users");
                setIsLoding(false);
            });
    }, [isloding]);

    return (
        <div className="w-full h-full p-8 bg-primary">

            {isblockconfirmvisible && (
                <UesrBlockConfimed
                    refresh={() => setIsLoding(true)}
                    user={userToBlock}
                    close={() => setsIsBlockConfirmVisible(false)}
                />
            )}

            <div className="
                overflow-x-auto
                bg-primary
                rounded-3xl
                shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                border border-accent/30
            ">
                {isloding ? (
                    <Loader />
                ) : (
                    <table className="w-full text-sm text-secondary">
                        <thead className="bg-primary sticky top-0 z-10">
                            <tr className="text-left text-xs uppercase tracking-wider text-secondary/70">
                                <th className="px-8 py-5">User</th>
                                <th className="px-8 py-5">Email</th>
                                <th className="px-8 py-5">First Name</th>
                                <th className="px-8 py-5">Last Name</th>
                                <th className="px-8 py-5">Role</th>
                                <th className="px-8 py-5 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-accent/20">
                            {users.map((user) => (
                                <tr
                                    key={user.email}
                                    className="
                                        hover:bg-primary/60
                                        transition
                                    "
                                >
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={user.image}
                                                alt="user"
                                                className={`
                                                    w-14 h-14
                                                    rounded-full
                                                    object-cover
                                                    ring-2
                                                    shadow-lg
                                                    ${user.isblocked
                                                        ? "ring-red-500"
                                                        : "ring-green-500"}
                                                `}
                                            />
                                        </div>
                                    </td>

                                    <td className="px-8 py-5 font-medium flex items-center gap-2">
                                        {user.email}
                                        {user.isEmailVerified && (
                                            <MdVerified className="text-blue-600" />
                                        )}
                                    </td>

                                    <td className="px-8 py-5">
                                        {user.firstName}
                                    </td>

                                    <td className="px-8 py-5 font-semibold">
                                        {user.lastName}
                                    </td>

                                    <td className="px-8 py-5 flex items-center gap-2">
                                        {user.role === "admin" && (
                                            <MdOutlineAdminPanelSettings className="text-accent text-lg" />
                                        )}
                                        {user.role}
                                    </td>

                                    <td className="px-8 py-5">
                                        <div className="flex justify-center">
                                            <button
                                                onClick={() => {
                                                    setUserToBlock(user);
                                                    setsIsBlockConfirmVisible(true);
                                                }}
                                                className="
                                                    w-[110px] h-[34px]
                                                    rounded-full
                                                    bg-accent
                                                    text-white
                                                    shadow-md
                                                    hover:shadow-xl
                                                    transition
                                                "
                                            >
                                                {user.isblocked ? "Unblock" : "Block"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    )
}
