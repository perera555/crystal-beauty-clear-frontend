import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Receipt() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchReceipt() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login to view receipt");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders/${orderId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = res.data?.order || res.data;

        if (!data) {
          setError("Order not found");
          return;
        }

        if (data.paymentStatus !== "PAID") {
          setError("Access denied");
          return;
        }

        setOrder(data);
      } catch (err) {
        setError("Failed to load receipt");
      } finally {
        setLoading(false);
      }
    }

    fetchReceipt();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-secondary">
        Loading receipt…
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-primary text-red-600 font-medium gap-6">
        <p>{error}</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded bg-accent text-white"
        >
          Go Home
        </button>
      </div>
    );
  }

  if (!order) return null;

  const items = order.items || order.Item || [];

  return (
    <div className="min-h-screen bg-primary px-4 py-16 flex justify-center">
      <div className="w-full max-w-5xl">
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-secondary/10">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold text-secondary tracking-wide">
              Official Receipt
            </h2>
            <span className="px-6 py-2 rounded-full text-xs font-semibold tracking-widest bg-green-600 text-white shadow">
              PAID
            </span>
          </div>

          {/* BODY */}
          <div className="border rounded-2xl p-8 text-sm text-secondary">
            <div className="flex justify-between mb-8">
              <span className="font-medium">
                Receipt #{order.orderID || order._id}
              </span>
              <span className="text-secondary/60">
                {new Date(order.createdAt || Date.now()).toLocaleDateString()}
              </span>
            </div>

            <div className="mb-8 space-y-1">
              <p>
                <span className="font-medium">Customer:</span>{" "}
                {order.customerName || "N/A"}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {order.address || "N/A"}
              </p>
            </div>

            <div className="border-y py-6 mb-8 space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">
                    Rs. {(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-lg font-semibold">
              <span>Total Paid</span>
              <span className="text-accent">
                Rs. {Number(order.total || 0).toFixed(2)}
              </span>
            </div>

            <p className="mt-10 text-center text-secondary/60">
              Thank you for your purchase 🙏
            </p>
          </div>

          {/* ACTIONS */}
          <div className="mt-12 flex justify-center gap-6">
            <button
              onClick={() => navigate("/orders")}
              className="px-10 py-3 rounded-full bg-accent text-white font-semibold tracking-widest hover:opacity-90 transition shadow"
            >
              VIEW ORDERS
            </button>

            <button
              onClick={() => navigate("/")}
              className="px-10 py-3 rounded-full border border-secondary text-secondary font-semibold tracking-widest hover:bg-secondary hover:text-white transition"
            >
              HOME
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
