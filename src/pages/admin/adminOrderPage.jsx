import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import OrderDetailsModal from "../../components/orderinfoModel";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isloding, setIsLoding] = useState(true);
  const [isModelopen, setIsModelOpen] = useState(false);
  const [selectedorder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!isloding) return;

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_API_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setOrders(response.data);
      })
      .finally(() => {
        setIsLoding(false);
      });
  }, [isloding, navigate]);

  return (
    <div className="w-full h-full p-6 bg-primary">

      {/* MODAL */}
      <OrderDetailsModal
        isModelOpen={isModelopen}
        selectedOrder={selectedorder}
        closeModel={() => setIsModelOpen(false)}
        refresh={() => setIsLoding(true)}
      />

      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        {isloding ? (
          <Loader />
        ) : (
          <table className="w-full text-sm text-secondary">
            <thead className="bg-primary sticky top-0">
              <tr className="text-left text-xs uppercase tracking-wide text-secondary/70">
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Number of Items</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Phone</th>
                <th className="px-6 py-4">Address</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {orders.map((item) => (
                <tr
                  key={item.orderID}
                  className="hover:bg-primary/50 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedOrder(item);   
                    setIsModelOpen(true);
                  }}
                >
                  <td className="px-6 py-4 font-medium">
                    {item.orderID}
                  </td>

                  <td className="px-6 py-4">
                    {item.Item.length} 
                  </td>

                  <td className="px-6 py-4">
                    {item.customerName}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {item.email}
                  </td>

                  <td className="px-6 py-4">
                    {item.phone}
                  </td>

                  <td className="px-6 py-4">
                    {item.address}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    LKR {item.total.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 font-semibold text-center">
                    {item.status}
                  </td>

                  <td className="px-6 py-4 font-semibold text-center">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
