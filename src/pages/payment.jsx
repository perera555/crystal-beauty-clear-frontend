import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState(location.state || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLatestOrder() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Unauthorized");
          return;
        }

        if (order) {
          setLoading(false);
          return;
        }

        const res = await axios.get(
          import.meta.env.VITE_API_URL + "/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (Array.isArray(res.data) && res.data.length > 0) {
          setOrder(res.data[0]);
        } else {
          setError("No order found");
        }
      } catch (err) {
        setError("Failed to load payment data");
      } finally {
        setLoading(false);
      }
    }

    fetchLatestOrder();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-secondary">
        Loading payment details…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-red-600">
        {error}
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-secondary">
        No payment data available
      </div>
    );
  }

  const items = order.items || order.Item || [];

  return (
    <div className="min-h-screen bg-primary px-4 py-14 flex justify-center">
      <div className="w-full max-w-5xl space-y-12">

        {/* ================= PAYMENT ================= */}
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <h1 className="text-3xl font-semibold text-secondary mb-2">
            Secure Payment
          </h1>
          <p className="text-secondary/60 mb-8">
            Complete payment to receive your receipt
          </p>

          <div className="grid sm:grid-cols-2 gap-6 text-sm mb-8">
            <p><b>Order ID:</b> {order.orderID}</p>
            <p><b>Customer:</b> {order.customerName}</p>
            <p className="sm:col-span-2">
              <b>Address:</b> {order.address}
            </p>
          </div>

          <div className="bg-primary rounded-2xl p-6 mb-8">
            <h2 className="font-semibold text-secondary mb-4">
              Order Summary
            </h2>

            {items.map((item, index) => (
              <div key={index} className="flex justify-between text-sm mb-2">
                <span>{item.name} × {item.quantity}</span>
                <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}

            <div className="border-t border-secondary/20 mt-4 pt-4 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-accent">
                Rs. {Number(order.total).toFixed(2)}
              </span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-8">
            <input className="h-12 border rounded-lg px-4 focus:ring-2 focus:ring-accent" placeholder="Cardholder Name" />
            <input className="h-12 border rounded-lg px-4 focus:ring-2 focus:ring-accent" placeholder="Card Number" />
            <input className="h-12 border rounded-lg px-4 focus:ring-2 focus:ring-accent" placeholder="MM / YY" />
            <input className="h-12 border rounded-lg px-4 focus:ring-2 focus:ring-accent" placeholder="CVV" />
          </div>

          <button
            onClick={() => navigate("/orders")}
            className="w-full bg-accent text-white py-4 rounded-full font-semibold tracking-widest hover:opacity-90 transition shadow-lg"
          >
            PAY RS. {Number(order.total).toFixed(2)}
          </button>
        </div>

        {/* ================= RECEIPT ================= */}
        <div className="bg-white rounded-3xl shadow-xl p-10 border border-secondary/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-secondary">
              Official Receipt
            </h2>
            <span className="px-5 py-2 rounded-full text-xs font-semibold tracking-widest bg-accent text-white">
              PAID
            </span>
          </div>

          <div className="border rounded-2xl p-8 text-sm">
            <div className="flex justify-between mb-6">
              <span><b>Receipt #</b> {order.orderID}</span>
              <span><b>Date</b> {new Date().toLocaleDateString()}</span>
            </div>

            <div className="mb-6">
              <p><b>Customer:</b> {order.customerName}</p>
              <p><b>Address:</b> {order.address}</p>
            </div>

            <div className="border-t border-b py-6 mb-6">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between mb-2">
                  <span>{item.name} × {item.quantity}</span>
                  <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-lg font-semibold">
              <span>Total Paid</span>
              <span className="text-accent">
                Rs. {Number(order.total).toFixed(2)}
              </span>
            </div>

            <p className="mt-8 text-center text-secondary/60">
              Thank you for your purchase 🙏
            </p>
          </div>

          {/* ===== BACK TO HOME ===== */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate("/")}
              className="px-10 py-3 rounded-full border border-secondary text-secondary
                         font-semibold tracking-widest hover:bg-secondary hover:text-white
                         transition"
            >
              BACK TO HOME
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
