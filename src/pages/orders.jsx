import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrders() {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Unauthorized");
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
          setOrder(null);
        }
      } catch (err) {
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-secondary">
        Loading your order…
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
      <div className="min-h-screen flex items-center justify-center bg-primary text-secondary/60">
        You haven’t placed any orders yet.
      </div>
    );
  }

  const items = order.Item || order.items || [];

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-primary px-4 py-14">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* ===== HEADER ===== */}
        <div className="px-10 py-8 border-b border-secondary/10 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-secondary tracking-wide">
              Order #{order.orderID}
            </h1>
            <p className="text-sm text-secondary/60 mt-1">
              {order.date ? new Date(order.date).toLocaleDateString() : ""}
            </p>
          </div>

          <span className="inline-flex px-6 py-2 rounded-full text-xs font-semibold tracking-widest
                           bg-accent text-white shadow">
            {(order.status || "pending").toUpperCase()}
          </span>
        </div>

        {/* ===== CUSTOMER DETAILS ===== */}
        <div className="px-10 py-8 border-b border-secondary/10">
          <h2 className="text-lg font-semibold text-secondary mb-6 tracking-wide">
            Customer Details
          </h2>

          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-6 text-secondary">
            <div>
              <p className="text-xs uppercase tracking-widest text-secondary/50">
                Name
              </p>
              <p className="text-base font-medium">
                {order.customerName || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-secondary/50">
                Email
              </p>
              <p className="text-base font-medium">
                {order.email || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-secondary/50">
                Phone
              </p>
              <p className="text-base font-medium">
                {order.phone || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-secondary/50">
                Address
              </p>
              <p className="text-base font-medium leading-relaxed">
                {order.address || "-"}
              </p>
            </div>
          </div>
        </div>

        {/* ===== ORDER ITEMS ===== */}
        <div className="px-10 py-10">
          <h2 className="text-lg font-semibold text-secondary mb-10 tracking-wide">
            Items Purchased
          </h2>

          <div className="space-y-12">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-10 items-center md:items-start"
              >
                {/* IMAGE */}
                <div className="w-44 h-44 rounded-2xl overflow-hidden border border-secondary/10 bg-primary shadow-sm">
                  <img
                    src={
                      item.image ||
                      "https://via.placeholder.com/300?text=No+Image"
                    }
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-secondary mb-3">
                    {item.name}
                  </h3>

                  <p className="text-sm text-secondary/60 mb-1">
                    Product ID: {item.productId || item.productID}
                  </p>

                  <p className="text-sm text-secondary/60 mb-1">
                    Quantity: {item.quantity}
                  </p>

                  <p className="text-sm text-secondary/60">
                    Price: Rs. {Number(item.price).toFixed(2)}
                  </p>
                </div>

                {/* LINE TOTAL */}
                <div className="text-2xl font-semibold text-secondary tracking-wide">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="px-10 py-8 bg-primary flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-semibold text-secondary tracking-wide">
            Total
            <span className="ml-3 text-accent">
              Rs. {Number(order.total).toFixed(2)}
            </span>
          </div>

          <button
            onClick={() => navigate("/payment", { state: order })}
            className="bg-accent text-white px-14 py-4 rounded-full text-sm font-semibold
                       tracking-widest hover:opacity-90 transition shadow-lg"
          >
            CONFIRM & PAY
          </button>
        </div>

      </div>
    </div>
  );
}
