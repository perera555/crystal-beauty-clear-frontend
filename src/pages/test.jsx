import { useState } from "react"

export default function TestPage() {

    const [count, setCount] = useState(0 )

    const [status, setStatus] = useState("online")


    return (
        <div className="w-full h-full flex justify-center items-center ">

            <div className="w-[500px] h-[500px] bg-amber-100 text-white flex justify-center items-center gap-[25px]">
                <div className="flex justify-center items-center flex-col gap-[25px]">
                    <button onClick={
                    () => {
                        console.log("Adding ...")
                        setCount(count +1)
                    }} className="w-[100px] bg-accent h-[40px] rounded-lg">
                    +
                </button>
                <span className="text-accent text-5xl">
                    {count}

                </span>
                <button onClick={
                    () => {
                        console.log("Decreasing ....")
                        setCount(count-1)

                    }} className="w-[100px] bg-accent h-[40px] rounded-lg">
                    -
                </button>


                </div>
                <div className=" flex flex-col justify-center items-center ">
                    <span className="text-accent text-5xl">{status}</span>

                </div>
                
            </div>
        </div>
    )
}    