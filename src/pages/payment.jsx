import { useEffect, useState } from "react";
import axios from "axios";

export default function Payment() {
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);

  const [card, setCard] = useState({
    number: "",
    name: "",
    expiry: "",
    cvv: "",
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/payment/orders")
      .then(res => setOrders(res.data));
  }, []);

  const handleOrderSelect = (orderID) => {
    const selected = orders.find(o => o.orderID === orderID);
    setOrder(selected);
  };

  const handlePay = async () => {
    await axios.post("http://localhost:5000/api/payment/pay", {
      orderID: order.orderID,
    });
    alert("Payment Successful ✅");
  };

  return (
    <div className="min-h-screen bg-[var(--color-primary)] flex justify-center items-center">
      <div className="bg-white w-full max-w-2xl p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-[var(--color-secondary)] mb-4">
          Payment Page
        </h2>

        {/* Order selector */}
        <select
          className="w-full border p-2 rounded mb-4"
          onChange={(e) => handleOrderSelect(e.target.value)}
        >
          <option>Select Order</option>
          {orders.map(o => (
            <option key={o.orderID} value={o.orderID}>
              {o.orderID} - {o.customerName}
            </option>
          ))}
        </select>

        {order && (
          <>
            {/* Customer Info */}
            <div className="mb-4 text-sm">
              <p><b>Name:</b> {order.customerName}</p>
              <p><b>Email:</b> {order.email}</p>
              <p><b>Phone:</b> {order.phone}</p>
              <p><b>Address:</b> {order.address}</p>
            </div>

            {/* Items */}
            <div className="border rounded p-3 mb-4">
              <h3 className="font-semibold mb-2">Order Items</h3>
              {order.Item.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
              <div className="font-bold text-right mt-2">
                Total: ₹{order.total}
              </div>
            </div>

            {/* Card Form */}
            <input
              placeholder="Card Number"
              className="w-full border p-2 rounded mb-3"
              onChange={(e) => setCard({ ...card, number: e.target.value })}
            />
            <input
              placeholder="Card Holder Name"
              className="w-full border p-2 rounded mb-3"
              onChange={(e) => setCard({ ...card, name: e.target.value })}
            />
            <div className="flex gap-3">
              <input
                placeholder="MM/YY"
                className="w-1/2 border p-2 rounded"
                onChange={(e) => setCard({ ...card, expiry: e.target.value })}
              />
              <input
                placeholder="CVV"
                className="w-1/2 border p-2 rounded"
                onChange={(e) => setCard({ ...card, cvv: e.target.value })}
              />
            </div>

            <button
              onClick={handlePay}
              className="w-full mt-4 bg-[var(--color-accent)] text-white py-2 rounded font-semibold"
            >
              Pay ₹{order.total}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
