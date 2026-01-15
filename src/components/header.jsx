import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="w-full bg-accent h-[100px] text-white px-[40px]">
            <div className="w-full h-full flex relative">
                <img src="/logo.png" className="h-full w-[160px] left-0 absolute  object-cover" alt="" />
                <div className="h-full flex justify-center items-center w-full text-lg gap-[20px] ">
                    <Link to="/">HOME</Link>
                    <Link to="/about">ABOUT</Link>
                    <Link to="/products">PRODUCTS</Link>
                    <Link to="/contact">CONTACT</Link>

                </div>

            </div>



        </header>
    )
}  