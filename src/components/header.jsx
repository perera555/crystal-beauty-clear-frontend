import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";

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
                <Link to="/cart" className="h-full absolute text-3xl right-0 flex justify-center items-center">
                <BsCart3 />
                </Link>

            </div>



        </header>
    )
}  