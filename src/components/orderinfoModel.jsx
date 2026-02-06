import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function OrderDetailsModal({
  isModelOpen,
  selectedOrder,
  closeModel,
  refresh,
}) {
  const [status, setStatus] = useState(selectedOrder?.status);

  if (!isModelOpen || !selectedOrder) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center">
      <div className="perspective-[1200px]">
        <div
          className="
            w-[650px] max-h-[80vh] overflow-y-auto
            bg-primary rounded-3xl p-6 text-secondary relative
            transform-gpu
            shadow-[0_30px_70px_rgba(0,0,0,0.35)]
            border border-white/40
          "
        >
          <div className="absolute inset-0 rounded-3xl pointer-events-none shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]" />

          <button
            className="
              absolute top-4 right-4
              w-10 h-10 rounded-full
              bg-white/90
              shadow-[0_8px_20px_rgba(0,0,0,0.25)]
              flex items-center justify-center
              text-accent font-bold text-lg
              hover:scale-110 transition transform-gpu
            "
            onClick={closeModel}
          >
            ✕
          </button>

          <h2 className="text-xl font-bold mb-5 tracking-wide">
            Order #{selectedOrder.orderID}
          </h2>

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/80 rounded-2xl p-4 shadow-inner">
              <p className="text-xs text-secondary/60 mb-1">Customer</p>
              <p className="font-semibold">{selectedOrder.customerName}</p>
            </div>

            <div className="bg-white/80 rounded-2xl p-4 shadow-inner">
              <p className="text-xs text-secondary/60 mb-1">Email</p>
              <p className="font-semibold">{selectedOrder.email}</p>
            </div>

            <div className="bg-white/80 rounded-2xl p-4 shadow-inner">
              <p className="text-xs text-secondary/60 mb-1">Phone</p>
              <p className="font-semibold">{selectedOrder.phone}</p>
            </div>

            <div className="bg-white/80 rounded-2xl p-4 shadow-inner">
              <p className="text-xs text-secondary/60 mb-1">Order Date</p>
              <p className="font-semibold">
                {new Date(selectedOrder.date).toLocaleDateString()}
              </p>
            </div>

            <div className="col-span-2 bg-white/80 rounded-2xl p-4 shadow-inner">
              <p className="text-xs text-secondary/60 mb-1">Address</p>
              <p className="font-semibold">{selectedOrder.address}</p>
            </div>

            <div className="col-span-2 bg-white/80 rounded-2xl p-4 shadow-inner">
              <p className="text-xs text-secondary/60 mb-1">Order Status</p>
              <p className="font-semibold capitalize text-accent">
                {selectedOrder.status}
              </p>
            </div>
          </div>

          <hr className="my-7 border-secondary/20" />

          <h3 className="font-semibold mb-3">Items</h3>

          <div className="space-y-3">
            {selectedOrder.Item.map((item, index) => (
              <div
                key={index}
                className="
                  flex items-center justify-between gap-4
                  bg-white rounded-2xl p-4
                  shadow-[0_10px_25px_rgba(0,0,0,0.18)]
                  hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.3)]
                  transition transform-gpu
                "
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-md bg-primary flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-secondary/70 text-xs">
                    Qty: {item.quantity}
                  </p>
                </div>

                <p className="font-semibold whitespace-nowrap">
                  LKR {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center gap-4">
            <p className="font-bold text-lg">
              Total:{" "}
              <span className="text-accent">
                LKR {selectedOrder.total.toFixed(2)}
              </span>
            </p>

            <select
              className="
                px-4 py-2 rounded-xl
                bg-white text-sm font-medium
                shadow-inner border border-secondary/20
                focus:outline-none focus:ring-2 focus:ring-accent
                cursor-pointer
              "
              defaultValue={selectedOrder.status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
              <option value="pending">Pending</option>
            </select>

            <button
              disabled={status === selectedOrder.status}
              onClick={() => {
                const token = localStorage.getItem("token");

                axios
                  .put(
                    `${import.meta.env.VITE_API_URL}/api/orders/status/${selectedOrder.orderID}`,
                    { status: status },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  )
                  .then(() => {
                    toast.success("Order status updated");
                    closeModel();
                    refresh();
                  })
                  .catch((err) => {
                    console.error(err);
                    toast.error("Failed to update order status");
                  });
              }}
              className="
                px-5 py-2 rounded-xl
                bg-accent text-white text-sm font-semibold
                shadow-[0_10px_25px_rgba(250,129,47,0.55)]
                hover:shadow-[0_15px_35px_rgba(250,129,47,0.75)]
                hover:-translate-y-0.5
                transition transform-gpu
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
