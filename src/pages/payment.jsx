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
          setLoading(false);
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
  }, [order]);

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

    const [mm, yy] = expiry.split("/").map(Number);
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear() % 100;

    if (mm < 1 || mm > 12) {
      toast.error("Invalid expiry month");
      return false;
    }

    if (yy < currentYear || (yy === currentYear && mm < currentMonth)) {
      toast.error("Card has expired");
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

    const paidAt = new Date();

    toast.success("Payment successful 🎉");

    navigate("/receipt", {
      state: {
        order,
        paidAt,
        card: `**** **** **** ${cardNumber.slice(-4)}`
      }
    });
  };

  /* ===== STATES ===== */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-secondary">
        Loading payment details…
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-red-600 font-semibold">
        {error || "No order data"}
      </div>
    );
  }

  const items = order.items || order.Item || [];

  /* ===== UI ===== */
  return (
    <div className="min-h-screen bg-primary px-4 py-16">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14">

        {/* ================= ORDER SUMMARY ================= */}
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-2xl font-semibold text-secondary mb-8">
            Order Summary
          </h2>

          <div className="space-y-6">
            {items.map((item, i) => (
              <div key={i} className="flex gap-5 items-center border-b pb-6">
                <img
                  src={item.image || "https://via.placeholder.com/120"}
                  alt={item.name}
                  className="w-24 h-24 rounded-2xl object-cover border bg-primary"
                />

                <div className="flex-1">
                  <p className="font-semibold text-secondary text-lg">
                    {item.name}
                  </p>
                  <p className="text-sm text-secondary/60">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold text-secondary text-lg">
                  Rs. {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-xl font-semibold mt-10 text-secondary">
            <span>Total</span>
            <span className="text-accent">
              Rs. {Number(order.total).toFixed(2)}
            </span>
          </div>
        </div>

        {/* ================= CARD SECTION ================= */}
        <div className="bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-2xl font-semibold text-secondary mb-6">
            Card Details
          </h2>

          <div
            className="mb-8 rounded-2xl p-6 text-white shadow-lg"
            style={{
              background: "linear-gradient(135deg, #FA812F, #393E46)"
            }}
          >
            <p className="tracking-widest text-lg">
              {cardNumber || "•••• •••• •••• ••••"}
            </p>
            <div className="flex justify-between mt-6 text-sm">
              <span>{cardName || "CARD HOLDER"}</span>
              <span>{expiry || "MM/YY"}</span>
            </div>
          </div>

          <div className="space-y-6">
            <input
              className="w-full h-14 rounded-xl border border-secondary/20 px-5
                         focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              placeholder="Cardholder Name"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
            />

            <input
              className="w-full h-14 rounded-xl border border-secondary/20 px-5 tracking-widest
                         focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
              placeholder="Card Number"
              value={cardNumber}
              onChange={(e) =>
                setCardNumber(e.target.value.replace(/\D/g, "").slice(0, 16))
              }
            />

            <div className="grid grid-cols-2 gap-5">
              <input
                className="h-14 rounded-xl border border-secondary/20 px-5
                           focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
              <input
                className="h-14 rounded-xl border border-secondary/20 px-5
                           focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
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
            className="mt-12 w-full bg-accent text-white py-4 rounded-full
                       text-sm font-semibold tracking-widest
                       hover:opacity-90 active:scale-[0.99] transition shadow-lg cursor-pointer"
          >
            PAY RS. {Number(order.total).toFixed(2)}
          </button>

          <p className="text-xs text-secondary/60 text-center mt-4">
            Attempts left: {MAX_ATTEMPTS - attempts}
          </p>
        </div>
      </div>
    </div>
  );
}
