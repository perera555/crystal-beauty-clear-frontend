import { BiTrash } from "react-icons/bi";
import Header from "../components/header";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function CheckoutPage() {
  const location = useLocation();

  // ✅ FIX: read from router state OR stored cart
  const [cart, setCart] = useState(
    Array.isArray(location.state) ? location.state : loadCart()
  );

  function getTotal() {
    let total = 0
    cart.forEach((item) => {
      total += item.price * item.quantity

    })
    return total
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-primary">
      <Header />

      <div className="w-[600px] flex flex-col gap-5 mt-8">

        {cart.length > 0 && cart.map((item, index) => (
          <div
            key={index}
            className="w-full h-[120px] flex relative items-center bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-visible"
          >
            {/* DELETE */}
            <button
              className="absolute top-1/2 -right-6 -translate-y-1/2 z-20
                         bg-white border border-red-100 text-lg rounded-full
                         aspect-square p-[8px] text-red-400
                         shadow-md hover:bg-red-500 hover:text-white
                         transition-all duration-200"
              onClick={() => {
                const newCart = cart.filter((_, i) => i !== index);
                  setCart(newCart);
                  localStorage.setItem("cart", JSON.stringify(newCart));
               
              }}
            >
              <BiTrash />
            </button>

            {/* IMAGE */}
            <img
              className="h-full aspect-square object-cover rounded-l-xl"
              src={item.image}
              alt=""
            />

            {/* DETAILS */}
            <div className="w-[200px] h-full flex flex-col justify-center px-4">
              <h1 className="font-semibold text-[17px] text-secondary leading-snug">
                {item.name}
              </h1>
              <span className="text-xs tracking-wide text-secondary/60 mt-1">
                {item.productID}
              </span>
            </div>

            {/* QUANTITY */}
            <div className="w-[100px] h-full flex flex-col justify-center items-center text-secondary">
              <CiCircleChevUp
                className="text-[28px] cursor-pointer hover:text-accent transition-colors"
                onClick={() => {
                  const newCart = [...cart]
                  newCart[index].quantity += 1
                  setCart(newCart)

                }}
              />
              <span className="font-medium text-[22px] my-[2px]">
                {item.quantity}
              </span>
              <CiCircleChevDown
                className="text-[28px] cursor-pointer hover:text-accent transition-colors"
                onClick={() => {
                  const newCart = [...cart]

                  if (newCart[index].quantity > 1) {
                    newCart[index].quantity -= 1;


                  }
                  setCart(newCart)

                }}
              />
            </div>

            {/* PRICE */}
            <div className="w-[180px] h-full flex flex-col justify-center items-end pr-6">
              {item.labelledPrice > item.price && (
                <span className="text-secondary text-xs line-through opacity-50 mb-1">
                  LKR {Number(item.labelledPrice).toFixed(2)}
                </span>
              )}
              <span className="text-accent font-semibold text-[20px] tracking-wide">
                LKR {Number(item.price).toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        {/* TOTAL */}
        <div className="w-full h-[90px] bg-white flex items-center justify-between px-8 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
          <button
            className="bg-accent text-white px-6 py-3 rounded-lg font-medium hover:bg-accent/80 transition-all duration-200 shadow-sm"
          >
            Order
          </button>

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
