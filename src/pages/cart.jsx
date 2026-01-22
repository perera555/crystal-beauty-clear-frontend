import { BiTrash } from "react-icons/bi";
import { addTOCart, getTotal, loadCart } from "../../utils/card";
import Header from "../components/header";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(loadCart());

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-primary">
      <Header />

      {/* Cart wrapper */}
      <div className="w-full max-w-[600px] flex flex-col gap-5 px-4 mt-8">
        {cart.map((item, index) => (
          <div
            key={index}
            className="w-full flex flex-col lg:flex-row relative
                       bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]
                       overflow-visible"
          >
            {/* DELETE */}
            <button
              className="absolute top-3 right-3 lg:top-1/2 lg:-right-6
                         lg:-translate-y-1/2 z-20
                         bg-white border border-red-100 text-lg rounded-full
                         aspect-square p-[8px] text-red-400
                         shadow-md hover:bg-red-500 hover:text-white
                         transition-all duration-200"
              onClick={() => {
                addTOCart(item, -item.quantity);
                setCart(loadCart());
              }}
            >
              <BiTrash />
            </button>

            {/* IMAGE */}
            <img
              className="w-full h-[160px] lg:h-[120px] lg:w-[120px]
                         object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none"
              src={item.image}
              alt=""
            />

            {/* DETAILS + CONTROLS */}
            <div className="flex flex-col lg:flex-row w-full">
              
              {/* DETAILS */}
              <div className="flex-1 flex flex-col justify-center px-4 py-3">
                <h1 className="font-semibold text-[16px] text-secondary leading-snug">
                  {item.name}
                </h1>
                <span className="text-xs tracking-wide text-secondary/60 mt-1">
                  {item.productID}
                </span>
              </div>

              {/* QUANTITY */}
              <div className="flex lg:flex-col items-center justify-center
                              gap-3 px-4 py-2 text-secondary">
                <CiCircleChevUp
                  className="text-[28px] cursor-pointer hover:text-accent transition-colors"
                  onClick={() => {
                    addTOCart(item, 1);
                    setCart(loadCart());
                  }}
                />
                <span className="font-medium text-[20px]">
                  {item.quantity}
                </span>
                <CiCircleChevDown
                  className="text-[28px] cursor-pointer hover:text-accent transition-colors"
                  onClick={() => {
                    addTOCart(item, -1);
                    setCart(loadCart());
                  }}
                />
              </div>

              {/* PRICE */}
              <div className="flex flex-col justify-center items-end
                              px-4 py-3 min-w-[140px]">
                {item.labelledPrice > item.price && (
                  <span className="text-secondary text-xs line-through opacity-50 mb-1">
                    LKR {Number(item.labelledPrice).toFixed(2)}
                  </span>
                )}
                <span className="text-accent font-semibold text-[18px] tracking-wide">
                  LKR {Number(item.price).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* TOTAL */}
        <div className="w-full bg-white flex flex-col sm:flex-row
                        items-center justify-between gap-4
                        px-6 py-6 rounded-xl
                        shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <Link
            to="/checkout"
            state={cart}
            className="bg-accent text-white px-6 py-3 rounded-lg
                       font-medium hover:bg-accent/80
                       transition-all duration-200 shadow-sm"
          >
            Proceed To Checkout
          </Link>

          <span className="font-medium text-secondary text-lg tracking-wide">
            Total :
            <span className="text-accent ml-3 font-semibold text-xl">
              LKR {Number(getTotal()).toFixed(2)}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
