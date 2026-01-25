import { Link } from "react-router-dom";
import { BsCart3 } from "react-icons/bs";
import { useState } from "react";
import { MdMenu } from "react-icons/md";
import UserData from "./userData";
import UserDataMobile from "./userDataMobile";



export default function Header() {
  const [issideBaropen, setSidebaropen] = useState(false);

  return (
    <header className="w-full bg-accent h-[100px] text-white px-[40px]">
      <div className="w-full h-full flex relative items-center">
        <img
          src="/logo.png"
          className="hidden lg:block h-full w-[160px] left-0 absolute object-cover"
          alt=""
        />

        <div className="w-full flex justify-center items-center relative lg:hidden">
          <MdMenu
            className="absolute left-0 text-3xl"
            onClick={() => setSidebaropen(true)}
          />
          <img
            src="/logo.png"
            className="h-full w-[160px] object-cover"
            alt=""
          />
        </div>

        {issideBaropen && (
          <div className="fixed top-0 left-0 w-full h-screen bg-[#00000080] text-secondary z-100">
            <div className="w-[300px] flex flex-col bg-primary h-full">
              <div className="w-full h-[100px] left-2 flex justify-center items-center relative lg:hidden bg-accent">
                <MdMenu
                  className="absolute text-white left-0 text-3xl"
                  onClick={() => setSidebaropen(false)}
                />
                <img
                  src="/logo.png"
                  className="h-full w-[160px] object-cover"
                  alt=""
                />
              </div>

              {/* Navigation links (UNCHANGED) */}
              <a href="/" className="p-4 border-b border-secondary/10">HOME</a>
              <a href="/about" className="p-4 border-b border-secondary/10">ABOUT</a>
              <a href="/products" className="p-4 border-b border-secondary/10">PRODUCT</a>
              <a href="/contact" className="p-4 border-b border-secondary/10">CONTACT</a>
              <a href="/cart" className="p-4 border-b border-secondary/10">CART</a>

              {/* ✅ Mobile UserData pushed to bottom */}
              <div className="mt-auto p-4 border-t border-secondary/10 lg:hidden">
                <UserDataMobile />
              </div>
            </div>
          </div>
        )}

        <div className="hidden h-full lg:flex justify-center items-center w-full text-lg gap-[20px]">
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/products">PRODUCTS</Link>
          <Link to="/contact">CONTACT</Link>
        </div>

        {/* Desktop UserData (UNCHANGED) */}
        <div className="hidden lg:flex h-full w-[200px] justify-end items-center px-4 pr-[60px] ml-auto">
          <UserData />
        </div>

        <Link
          to="/cart"
          className="h-full absolute text-3xl hidden right-0 lg:flex justify-center items-center"
        >
          <BsCart3 />
        </Link>
      </div>
    </header>
  );
}
