import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-secondary">
        Loading your order...
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
      <div className="min-h-screen flex items-center justify-center bg-primary text-secondary/70">
        You haven’t placed any orders yet.
      </div>
    );
  }

  const items = order.Item || order.items || [];

  return (
    <div className="min-h-screen bg-primary px-6 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden border border-secondary/10">

        {/* ===== Header ===== */}
        <div className="bg-secondary text-primary px-8 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">
              Order #{order.orderID}
            </h1>
            <p className="text-sm opacity-80">
              {new Date(order.date).toLocaleDateString()}
            </p>
          </div>

          <span className="bg-accent text-white px-5 py-1 rounded-full text-sm font-semibold">
            {order.status.toUpperCase()}
          </span>
        </div>

        {/* ===== Customer Details ===== */}
        <div className="px-8 py-6 border-b border-secondary/10">
          <h2 className="text-secondary font-semibold mb-4">
            Customer Details
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 text-sm text-secondary">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {order.customerName}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {order.email}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {order.phone}
            </p>
            <p>
              <span className="font-medium">Address:</span>{" "}
              {order.address}
            </p>
          </div>
        </div>

        {/* ===== Ordered Products ===== */}
        <div className="px-8 py-6">
          <h2 className="text-secondary font-semibold mb-5">
            Ordered Products
          </h2>

          <div className="space-y-5">
            {items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-5 border-b last:border-b-0 pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover border"
                />

                <div className="flex-1">
                  <p className="font-medium text-secondary">
                    {item.name}
                  </p>
                  <p className="text-sm text-secondary/70">
                    Price: Rs. {Number(item.price).toFixed(2)}
                  </p>
                  <p className="text-sm text-secondary/70">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-accent">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Total ===== */}
        <div className="bg-primary px-8 py-5 flex justify-end">
          <p className="text-xl font-semibold text-secondary">
            Total:{" "}
            <span className="text-accent">
              Rs. {Number(order.total).toFixed(2)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
