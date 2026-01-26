import axios from "axios"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "../../components/Loader";
import { MdVerified } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";


function UesrBlockConfimed(props) { // Block confirmation box
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




    return <div className="fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center ">
        <div className="w-[500px] h-[200px] bg-primary relative flex flex-col justify-center items-center gap-[40px]">
            <button onClick={close} className="absolute right-[-42px] top-[-42px] w-[40px] h-[40px] bg-red-600 rounded-full font-bold text-white flex justify-center items-center border border-red-600 hover:bg-white hover:text-red-600" >
                x
            </button>
            <p className="text-xl font-semibold text-center">Are you sure want to {props.user.isblocked ? "Unblock" : "Block"} the User with email :{email}?  </p>
            <div className="flex gap-[40px] ">
                <button onClick={close} className="w-[100px]  p-[5px] text-white hover-bg-accent bg-blue-600">
                    cancel
                </button>
                <button
                    onClick={blockUser}
                    className="w-[100px] p-[5px] text-white hover-bg-accent bg-red-600"
                >
                    Yes
                </button>


            </div>

        </div>

    </div>
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
        <div className="w-full h-full p-6 bg-primary">
            {

                isblockconfirmvisible && <UesrBlockConfimed refresh={() => { setIsLoding(true) }} user={userToBlock} close={() => { setsIsBlockConfirmVisible(false) }} />
            }
            <div className="overflow-x-auto bg-white rounded-2xl shadow-md">

                {isloding ? <Loader /> :
                    <table className="w-full text-sm text-secondary">
                        <thead className="bg-primary sticky top-0">
                            <tr className="text-left text-xs uppercase tracking-wide text-secondary/70">
                                <th className="px-6 py-4">Image</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">First Name</th>
                                <th className="px-6 py-4">Last Name</th>
                                <th className="px-6 py-4">Role</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {users.map((user) => (
                                <tr
                                    key={user.email}
                                    className="hover:bg-primary/50 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <img
                                            src={user.image}
                                            className={
                                                "max-w-14 max-h-14 rounded-full border-2 " +
                                                (user.isblocked ? "border-red-600" : "border-green-600")
                                            }
                                        />


                                    </td>

                                    <td className="px-6 py-4 font-medium">
                                        {user.email}{user.isEmailVerified && <MdVerified color="blue" />}
                                    </td>

                                    <td className="px-6 py-4">
                                        {user.firstName}
                                    </td>

                                    <td className="px-6 py-4 font-semibold">
                                        {user.lastName}
                                    </td>

                                    <td className="px-6 py-4">
                                        {user.role == "admin" && <MdOutlineAdminPanelSettings />}
                                        {user.role}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex justify-center gap-4">
                                            {
                                                <button
                                                    onClick={() => {
                                                        setUserToBlock(user);
                                                        setsIsBlockConfirmVisible(true);
                                                    }}
                                                    className="w-[100px] h-[30px] rounded-full text-white bg-accent"
                                                >
                                                    {user.isblocked ? "Unblock" : "Block"}
                                                </button>


                                            }

                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}
            </div>
        </div>
    )
}
