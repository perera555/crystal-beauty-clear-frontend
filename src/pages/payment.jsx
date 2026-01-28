import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Header from "../components/header";

export default function Payment() {
  const { state: cart } = useLocation(); // 🔥 cart from CartPage
  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  const total = cart?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePay = async () => {
    if (!cart || cart.length === 0) return;

    const orderPayload = {
      orderID: "ORD-" + Date.now(),
      Item: cart.map((item) => ({
        productID: item.productID,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      customerName: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
      total,
    };

    try {
      await axios.post("http://localhost:5000/api/payment/pay", orderPayload);
      alert("Payment Successful ✅");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Payment Failed ❌");
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary flex flex-col items-center">
      <Header />

      <div className="w-full max-w-[700px] bg-white mt-8 p-6 rounded-xl shadow-md">
        <h1 className="text-xl font-semibold text-secondary mb-4">
          Payment Details
        </h1>

        {/* CUSTOMER DETAILS */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <input
            placeholder="Full Name"
            className="border rounded-lg px-4 py-2"
            onChange={(e) =>
              setCustomer({ ...customer, name: e.target.value })
            }
          />
          <input
            placeholder="Email"
            className="border rounded-lg px-4 py-2"
            onChange={(e) =>
              setCustomer({ ...customer, email: e.target.value })
            }
          />
          <input
            placeholder="Phone"
            className="border rounded-lg px-4 py-2"
            onChange={(e) =>
              setCustomer({ ...customer, phone: e.target.value })
            }
          />
          <textarea
            placeholder="Delivery Address"
            className="border rounded-lg px-4 py-2"
            onChange={(e) =>
              setCustomer({ ...customer, address: e.target.value })
            }
          />
        </div>

        {/* ORDER SUMMARY */}
        <div className="border rounded-lg p-4 mb-6">
          {cart.map((item, i) => (
            <div key={i} className="flex justify-between mb-2 text-sm">
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>LKR {(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="text-right font-semibold text-lg text-accent">
            Total: LKR {total.toFixed(2)}
          </div>
        </div>

        {/* CARD DETAILS */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <input
            placeholder="Card Number"
            className="border rounded-lg px-4 py-2"
            onChange={(e) =>
              setCard({ ...card, number: e.target.value })
            }
          />
          <input
            placeholder="Card Holder Name"
            className="border rounded-lg px-4 py-2"
            onChange={(e) =>
              setCard({ ...card, name: e.target.value })
            }
          />
          <div className="flex gap-3">
            <input
              placeholder="MM/YY"
              className="border rounded-lg px-4 py-2 w-1/2"
              onChange={(e) =>
                setCard({ ...card, expiry: e.target.value })
              }
            />
            <input
              placeholder="CVV"
              className="border rounded-lg px-4 py-2 w-1/2"
              onChange={(e) =>
                setCard({ ...card, cvv: e.target.value })
              }
            />
          </div>
        </div>

        <button
          onClick={handlePay}
          className="w-full bg-accent text-white py-3 rounded-lg
                     font-medium hover:bg-accent/80 transition-all"
        >
          Pay LKR {total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
