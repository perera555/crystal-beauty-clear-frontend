import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/Loader";
import OrderDetailsModal from "../../components/orderinfoModel";

const ITEMS_PER_PAGE = 8;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isloding, setIsLoding] = useState(true);
  const [isModelopen, setIsModelOpen] = useState(false);
  const [selectedorder, setSelectedOrder] = useState(null);

  /* UI STATES (safe frontend only) */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

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

  /* FILTER + SEARCH */
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.orderID.toLowerCase().includes(search.toLowerCase()) ||
        o.customerName.toLowerCase().includes(search.toLowerCase()) ||
        o.email.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        o.status?.toLowerCase() === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  /* PAGINATION */
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  /* CSV EXPORT */
  function exportCSV() {
    const headers = [
      "Order ID",
      "Customer",
      "Email",
      "Phone",
      "Total",
      "Status",
      "Date",
    ];

    const rows = filteredOrders.map((o) => [
      o.orderID,
      o.customerName,
      o.email,
      o.phone,
      o.total,
      o.status,
      new Date(o.date).toLocaleDateString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map(e => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "orders.csv";
    link.click();
  }

  const statusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-400/20 text-yellow-700";
      case "delivered":
        return "bg-green-400/20 text-green-700";
      case "cancelled":
        return "bg-red-400/20 text-red-700";
      default:
        return "bg-secondary/10 text-secondary";
    }
  };

  return (
    <div className="w-full h-full p-8 bg-primary">

      {/* MODAL */}
      <OrderDetailsModal
        isModelOpen={isModelopen}
        selectedOrder={selectedorder}
        closeModel={() => setIsModelOpen(false)}
        refresh={() => setIsLoding(true)}
      />

      {/* TOOLBAR */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex gap-3">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search orders..."
            className="w-64 rounded-xl border border-secondary/20 px-4 py-2.5 text-sm bg-white"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setPage(1);
            }}
            className="rounded-xl border border-secondary/20 px-4 py-2.5 text-sm bg-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <button
          onClick={exportCSV}
          className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow hover:opacity-90"
        >
          Export CSV
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-3xl shadow border border-secondary/10">
        {isloding ? (
          <Loader />
        ) : (
          <table className="w-full text-sm text-secondary">
            <thead className="bg-primary sticky top-0">
              <tr className="text-xs uppercase tracking-wider text-secondary/60">
                <th className="px-8 py-5">Order ID</th>
                <th className="px-8 py-5">Items</th>
                <th className="px-8 py-5">Customer</th>
                <th className="px-8 py-5">Email</th>
                <th className="px-8 py-5">Phone</th>
                <th className="px-8 py-5">Address</th>
                <th className="px-8 py-5">Total</th>
                <th className="px-8 py-5 text-center">Status</th>
                <th className="px-8 py-5 text-center">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {paginatedOrders.map((item) => (
                <tr
                  key={item.orderID}
                  className="hover:bg-primary/60 cursor-pointer"
                  onClick={() => {
                    setSelectedOrder(item);
                    setIsModelOpen(true);
                  }}
                >
                  <td className="px-8 py-5 font-medium">{item.orderID}</td>
                  <td className="px-8 py-5">{item.Item.length}</td>
                  <td className="px-8 py-5">{item.customerName}</td>
                  <td className="px-8 py-5">{item.email}</td>
                  <td className="px-8 py-5">{item.phone}</td>
                  <td className="px-8 py-5 truncate max-w-[200px]">{item.address}</td>
                  <td className="px-8 py-5 font-semibold">
                    LKR {item.total.toFixed(2)}
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      <div className="mt-6 flex justify-end gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(p => p - 1)}
          className="px-4 py-2 rounded-lg bg-secondary/10 text-sm disabled:opacity-50"
        >
          Prev
        </button>

        <span className="px-4 py-2 text-sm">
          {page} / {totalPages || 1}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-4 py-2 rounded-lg bg-secondary/10 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
