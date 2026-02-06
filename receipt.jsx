import { useLocation, useNavigate } from "react-router-dom";

export default function Receipt() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary text-secondary">
        No receipt data found
      </div>
    );
  }

  const { order, paidAt, card } = state;
  const items = order.items || order.Item || [];

  /* ===== DERIVED DATA (NO LOGIC CHANGE) ===== */
  const invoiceId =
    order._id || `INV-${new Date(paidAt).getTime()}`;

  const customerName =
    order.user?.name || order.customerName || "Valued Customer";

  /* ===== QR CODE (NO LIBRARY) ===== */
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${invoiceId}`;

  return (
    <div className="min-h-screen bg-primary px-4 py-16 print:bg-white">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-10 print:shadow-none print:rounded-none">

        {/* ===== COMPANY HEADER ===== */}
        <div className="flex flex-col items-center text-center mb-10">
          <img
            src="https://via.placeholder.com/180x60?text=Crystal+Beauty"
            alt="Company Logo"
            className="mb-6"
          />

          <p className="text-sm text-secondary/70">
            Crystal Beauty Pvt Ltd<br />
            123 Main Street, Colombo, Sri Lanka<br />
            Tax ID: <b>TX-98456321</b>
          </p>

          <span
            className="mt-4 px-4 py-1 rounded-full text-xs font-semibold tracking-widest text-white"
            style={{ backgroundColor: "#FA812F" }}
          >
            PAID
          </span>
        </div>

        {/* ===== INVOICE META ===== */}
        <div className="grid grid-cols-2 gap-6 mb-10 text-sm text-secondary">
          <div>
            <p><b>Invoice ID</b></p>
            <p className="text-secondary/70">{invoiceId}</p>
          </div>

          <div className="text-right">
            <p><b>Paid At</b></p>
            <p className="text-secondary/70">
              {new Date(paidAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* ===== CUSTOMER ===== */}
        <div className="mb-10 border border-secondary/10 rounded-xl p-6">
          <p className="text-sm text-secondary/60 mb-1">Billed To</p>
          <p className="font-semibold text-secondary">
            {customerName}
          </p>
        </div>

        {/* ===== ITEMS ===== */}
        <div className="space-y-6">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex justify-between border-b border-secondary/10 pb-4"
            >
              <div>
                <p className="font-semibold text-secondary">
                  {item.name}
                </p>
                <p className="text-sm text-secondary/60">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="font-semibold text-secondary">
                Rs. {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* ===== TOTAL ===== */}
        <div className="flex justify-between text-xl font-semibold mt-10 pt-6 border-t border-secondary/10">
          <span>Total</span>
          <span className="text-accent">
            Rs. {Number(order.total).toFixed(2)}
          </span>
        </div>

        {/* ===== PAYMENT INFO ===== */}
        <div className="mt-8 grid grid-cols-2 gap-6 items-center">
          <div className="rounded-xl border border-accent/30 bg-accent/10 p-6">
            <p className="text-secondary">
              <b>Payment Method</b>
            </p>
            <p className="tracking-widest text-secondary/80 mt-1">
              {card}
            </p>
          </div>

          <div className="text-center">
            <img src={qrUrl} alt="Invoice QR Code" className="mx-auto" />
            <p className="text-xs text-secondary/60 mt-2">
              Scan for Invoice
            </p>
          </div>
        </div>

        {/* ===== ACTIONS ===== */}
        <div className="mt-12 flex gap-4 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex-1 bg-accent text-white py-4 rounded-full
                       text-sm font-semibold tracking-widest shadow-lg"
          >
            DOWNLOAD PDF
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex-1 border border-secondary/20 py-4 rounded-full
                       text-sm font-semibold tracking-widest"
          >
            HOME
          </button>
        </div>
      </div>
    </div>
  );
}
