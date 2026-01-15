import { useState } from "react"
import axios from "axios";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login() {
        const response = await axios.post("http://localhost:3000/users/login", {
            email: email,
            password: password
        })
        console.log(response.data)


    }
    return (
        <div className="w-full h-full bg-[url('/login1.jpg')] bg-cover bg-center flex">
            <div className="w-[50%] h-full">

            </div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[500px] h-[500px] backdrop-blur-lg shadow-2xl rounded-[20px] flex flex-col justify-center items-center gap-[20px] ">

                    <input onChange={
                        (e) => {
                            setEmail(e.target.value)


                        }} className="w-[400px] h-[40px] bg-white" type="text" />
                    <input onChange={
                        (e) => {
                            setPassword(e.target.value)
                        }} className="w-[400px] h-[40px] bg-white" type="text" />

                    <button onClick={login} className="bg-red-600 w-[400px] h-[40px]">
                        Login
                    </button>

                </div>

            </div>

        </div>

    )
}