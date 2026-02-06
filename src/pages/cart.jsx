import { BiTrash } from "react-icons/bi";
import { addTOCart, getTotal, loadCart } from "../../utils/card";
import Header from "../components/header";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";

export default function CartPage() {
  const [cart, setCart] = useState(loadCart());

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-br from-primary via-primary/95 to-primary">
      <Header />

      {/* Cart wrapper */}
      <div className="w-full max-w-[600px] flex flex-col gap-6 px-4 mt-10">

        {/* EMPTY CART */}
        {cart.length === 0 && (
          <div
            className="w-full flex flex-col items-center justify-center
                       bg-white/70 backdrop-blur-xl
                       border border-white/40
                       rounded-2xl px-8 py-14
                       shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                       text-center"
          >
            <div className="w-20 h-20 rounded-full flex items-center justify-center
                            bg-accent/10 text-accent text-4xl mb-6">
              <HiOutlineShoppingBag />
            </div>

            <h1 className="text-secondary text-xl font-semibold tracking-wide">
              Your Cart Is Empty
            </h1>

            <p className="text-secondary/60 text-sm mt-2 max-w-[300px]">
              Looks like you haven’t added anything yet.
              Discover something premium and make it yours.
            </p>

            <Link
              to="/"
              className="mt-8 bg-accent text-white px-8 py-3 rounded-xl
                         font-medium tracking-wide
                         shadow-lg shadow-accent/30
                         hover:bg-accent/90 transition-all duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        )}

        {/* CART ITEMS */}
        {cart.map((item, index) => (
          <div
            key={index}
            className="w-full flex flex-col lg:flex-row relative
                       bg-white/80 backdrop-blur-xl
                       border border-white/40
                       rounded-2xl
                       shadow-[0_20px_60px_rgba(0,0,0,0.06)]
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
                         object-cover rounded-t-2xl lg:rounded-l-2xl lg:rounded-tr-none"
              src={item.image}
              alt=""
            />

            {/* DETAILS + CONTROLS */}
            <div className="flex flex-col lg:flex-row w-full">

              {/* DETAILS */}
              <div className="flex-1 flex flex-col justify-center px-4 py-4">
                <h1 className="font-semibold text-[16px] text-secondary leading-snug tracking-wide">
                  {item.name}
                </h1>
                <span className="text-xs tracking-widest text-secondary/50 mt-1">
                  {item.productID}
                </span>
              </div>

              {/* QUANTITY */}
              <div className="flex lg:flex-col items-center justify-center
                              gap-3 px-4 py-3 text-secondary">
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
                              px-4 py-4 min-w-[140px]">
                {item.labelledPrice > item.price && (
                  <span className="text-secondary text-xs line-through opacity-40 mb-1">
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
        {cart.length > 0 && (
          <div
            className="w-full bg-white/80 backdrop-blur-xl
                       border border-white/40
                       flex flex-col sm:flex-row
                       items-center justify-between gap-4
                       px-6 py-6 rounded-2xl
                       shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
          >
            <Link
              to="/checkout"
              state={cart}
              className="bg-accent text-white px-8 py-3 rounded-xl
                         font-medium tracking-wide
                         shadow-lg shadow-accent/30
                         hover:bg-accent/90
                         transition-all duration-200"
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
        )}
      </div>
    </div>
  );
}
