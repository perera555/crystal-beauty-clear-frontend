import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const [order, setOrder] = useState(location.state || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paidAt, setPaidAt] = useState(null);

  /* ===== CARD STATE ===== */
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [attempts, setAttempts] = useState(0);
  const MAX_ATTEMPTS = 3;

  useEffect(() => {
    async function loadOrder() {
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
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (Array.isArray(res.data) && res.data.length > 0) {
          setOrder(res.data[0]);
        } else {
          setError("No order found");
        }
      } catch {
        setError("Failed to load order");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, []);

  /* ===== VALIDATION ===== */
  const validateCard = () => {
    if (!cardName || !cardNumber || !expiry || !cvv) {
      toast.error("Please fill all card details");
      return false;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      toast.error("Card number must be exactly 16 digits");
      return false;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      toast.error("Expiry must be MM/YY");
      return false;
    }

    if (!/^\d{3,4}$/.test(cvv)) {
      toast.error("Invalid CVV");
      return false;
    }

    return true;
  };

  /* ===== PAYMENT ===== */
  const handlePay = () => {
    if (!validateCard()) {
      const next = attempts + 1;
      setAttempts(next);

      if (next >= MAX_ATTEMPTS) {
        toast.error("Too many failed attempts. Redirecting to home.");
        setTimeout(() => navigate("/"), 2000);
      } else {
        toast.error(`Payment failed. Attempts left: ${MAX_ATTEMPTS - next}`);
      }
      return;
    }

    toast.success("Payment successful 🎉");
    setPaidAt(new Date());
    setPaymentSuccess(true);
  };

  /* ===== STATES ===== */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Loading payment details…
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 bg-gray-100">
        {error || "No order data"}
      </div>
    );
  }

  const items = order.items || order.Item || [];
  const maskedCard = `**** **** **** ${cardNumber.slice(-4)}`;

  /* ===== UI ===== */
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

        {/* ================= RECEIPT / ORDER ================= */}
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-semibold">
              {paymentSuccess ? "Payment Receipt" : "Order Overview"}
            </h2>

            {paymentSuccess && (
              <span className="px-4 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
                PAID
              </span>
            )}
          </div>

          <div className="space-y-6">
            {items.map((item, i) => (
              <div key={i} className="flex items-center gap-6 border-b pb-6">
                <img
                  src={item.image || "https://via.placeholder.com/120"}
                  alt={item.name}
                  className="w-24 h-24 rounded-xl object-cover border"
                />
                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-semibold">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="border-t mt-8 pt-6 flex justify-between text-xl font-semibold">
            <span>Total</span>
            <span className="text-emerald-600">
              Rs. {Number(order.total).toFixed(2)}
            </span>
          </div>

          {paymentSuccess && (
            <div className="mt-8 bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-2">
              <p className="font-semibold text-emerald-700">
                Payment Successful
              </p>
              <p className="text-sm">
                Order ID: <b>{order.orderID}</b>
              </p>
              <p className="text-sm">
                Paid At: <b>{paidAt?.toLocaleString()}</b>
              </p>
              <p className="text-sm">
                Card: <b>{maskedCard}</b>
              </p>
            </div>
          )}
        </div>

        {/* ================= CARD FORM ================= */}
        {!paymentSuccess && (
          <div className="bg-white rounded-3xl shadow-xl p-10">
            <h2 className="text-2xl font-semibold mb-8">
              Card Details
            </h2>

            <div className="space-y-6">
              <input
                className="w-full h-14 rounded-xl border px-5 focus:ring-2 focus:ring-black"
                placeholder="Cardholder Name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
              />

              <input
                className="w-full h-14 rounded-xl border px-5 tracking-widest
                           focus:ring-2 focus:ring-black"
                placeholder="Card Number (16 digits)"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(
                    e.target.value.replace(/\D/g, "").slice(0, 16)
                  )
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  className="h-14 rounded-xl border px-5 focus:ring-2 focus:ring-black"
                  placeholder="MM / YY"
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
                <input
                  className="h-14 rounded-xl border px-5 focus:ring-2 focus:ring-black"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) =>
                    setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
                  }
                />
              </div>
            </div>

            <button
              onClick={handlePay}
              className="mt-10 w-full bg-black text-white py-4 rounded-full
                         tracking-widest font-semibold hover:opacity-90 transition"
            >
              PAY RS. {Number(order.total).toFixed(2)}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              Attempts left: {MAX_ATTEMPTS - attempts}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
