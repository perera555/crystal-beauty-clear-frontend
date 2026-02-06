import { BiTrash } from "react-icons/bi";
import Header from "../components/header";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { loadCart } from "../../utils/card";

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(""); // ✅ added

  const [cart, setCart] = useState(
    Array.isArray(location.state) ? location.state : loadCart()
  );

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  async function purchaseCart() {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to place an order");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!address.trim()) {
      toast.error("Please enter shipping address");
      return;
    }

    try {
      const items = cart.map((item) => ({
        productId: item.productID,
        quantity: Number(item.quantity),
      }));

      await axios.post(
        import.meta.env.VITE_API_URL + "/api/orders/",
        {
          address: address,
          customerName: name || "",
          phone: phone || "", // ✅ added safely
          items: items,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order Placed Successfully");

      localStorage.removeItem("cart");
      setCart([]);
      navigate("/orders");

    } catch (error) {
      console.error("ORDER ERROR:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to place order");
    }
  }

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center">
      <Header />

      <div className="w-full max-w-3xl px-4 py-8 flex flex-col gap-6">
        {cart.map((item, index) => (
          <div
            key={index}
            className="relative bg-white rounded-2xl shadow-md overflow-hidden
                       flex flex-col sm:flex-row"
          >
            <button
              className="absolute top-3 right-3 z-20
                         bg-white border border-red-200 text-red-500
                         rounded-full p-2 shadow
                         hover:bg-red-500 hover:text-white
                         transition"
              onClick={() => {
                const newCart = cart.filter((_, i) => i !== index);
                setCart(newCart);
                localStorage.setItem("cart", JSON.stringify(newCart));
              }}
            >
              <BiTrash size={18} />
            </button>

            <img
              src={item.image}
              alt=""
              className="w-full h-48 sm:w-32 sm:h-32 object-cover"
            />

            <div className="flex flex-1 flex-col sm:flex-row">
              <div className="flex-1 px-4 py-3 flex flex-col justify-center">
                <h1 className="font-semibold text-secondary text-base">
                  {item.name}
                </h1>
                <span className="text-xs text-secondary/60 mt-1">
                  {item.productID}
                </span>
              </div>

              <div className="flex sm:flex-col items-center justify-center gap-2 px-4 py-3">
                <CiCircleChevUp
                  className="text-2xl cursor-pointer hover:text-accent transition"
                  onClick={() => {
                    const newCart = [...cart];
                    newCart[index].quantity += 1;
                    setCart(newCart);
                    localStorage.setItem("cart", JSON.stringify(newCart));
                  }}
                />
                <span className="text-lg font-medium">
                  {item.quantity}
                </span>
                <CiCircleChevDown
                  className="text-2xl cursor-pointer hover:text-accent transition"
                  onClick={() => {
                    const newCart = [...cart];
                    if (newCart[index].quantity > 1) {
                      newCart[index].quantity -= 1;
                      setCart(newCart);
                      localStorage.setItem("cart", JSON.stringify(newCart));
                    }
                  }}
                />
              </div>

              <div className="px-4 py-3 flex flex-col justify-center items-end min-w-[120px]">
                {item.labelledPrice > item.price && (
                  <span className="text-xs line-through text-secondary/50">
                    LKR {Number(item.labelledPrice).toFixed(2)}
                  </span>
                )}
                <span className="text-accent font-semibold text-lg">
                  LKR {Number(item.price).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-secondary">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full h-12 rounded-lg border border-secondary/30 px-4 text-sm
                         focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
          </div>

          {/* ✅ PHONE NUMBER */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-secondary">
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full h-12 rounded-lg border border-secondary/30 px-4 text-sm
                         focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-secondary">
              Shipping Address
            </label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="House No, Street, City"
              className="w-full min-h-[120px] rounded-lg border border-secondary/30
                         px-4 py-3 text-sm resize-none
                         focus:outline-none focus:ring-2 focus:ring-accent transition"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6
                        flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <button
            type="button"
            onClick={purchaseCart}
            className="w-full sm:w-auto bg-accent text-white
                       px-8 py-3 rounded-xl font-medium
                       hover:bg-accent/80 transition shadow"
          >
            Order
          </button>

          <div className="text-secondary text-lg">
            Total
            <span className="ml-3 text-accent font-semibold text-xl">
              LKR {Number(getTotal()).toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
