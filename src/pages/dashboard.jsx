import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loadernew";
import {
    FaBoxOpen,
    FaShoppingCart,
    FaMoneyBillWave,
    FaExclamationTriangle,
} from "react-icons/fa";

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        Promise.all([
            axios.get(`${import.meta.env.VITE_API_URL}/api/products`),
            axios.get(`${import.meta.env.VITE_API_URL}/api/orders`, {
                headers: { Authorization: `Bearer ${token}` },
            }),
        ])
            .then(([productsRes, ordersRes]) => {
                setProducts(productsRes.data);
                setOrders(ordersRes.data);
            })
            .finally(() => setIsLoading(false));
    }, [navigate]);

    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
    const lowStockProducts = products.filter(p => p.stock < 5);

    if (isLoading) return <Loader />;

    return (
        <div className="w-full h-full p-6 bg-primary space-y-12">

            {/* ================= STATS ================= */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
                <StatCard icon={<FaBoxOpen />} title="Total Products" value={products.length} />
                <StatCard icon={<FaShoppingCart />} title="Total Orders" value={orders.length} />
                <StatCard icon={<FaMoneyBillWave />} title="Revenue" value={`LKR ${totalRevenue.toFixed(2)}`} />
                <StatCard icon={<FaExclamationTriangle />} title="Low Stock" value={lowStockProducts.length} />
            </div>

            {/* ================= MAIN CONTENT ================= */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                {/* RECENT ORDERS */}
                <div className="bg-white rounded-3xl shadow-xl p-6">
                    <h3 className="text-xl font-semibold text-secondary mb-6">
                        Recent Orders
                    </h3>

                    <table className="w-full text-sm text-secondary">
                        <thead className="border-b border-secondary/20">
                            <tr>
                                <th className="py-3 text-left">Order ID</th>
                                <th className="py-3 text-left">Customer</th>
                                <th className="py-3 text-right">Total</th>
                            </tr>
                        </thead>

                        <tbody>
                            {orders.slice(0, 5).map(order => (
                                <tr
                                    key={order.orderID}
                                    className="hover:bg-primary cursor-pointer transition"
                                    onClick={() => navigate("/admin/orders")}
                                >
                                    <td className="py-3">{order.orderID}</td>
                                    <td className="py-3">{order.customerName}</td>
                                    <td className="py-3 text-right font-semibold">
                                        LKR {order.total.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* LOW STOCK */}
                <div className="bg-white rounded-3xl shadow-xl p-6">
                    <h3 className="text-xl font-semibold text-secondary mb-6">
                        Low Stock Products
                    </h3>

                    {lowStockProducts.length === 0 ? (
                        <p className="text-secondary/60">
                            All products are sufficiently stocked 🎉
                        </p>
                    ) : (
                        <div className="space-y-4">
                            {lowStockProducts.map(product => (
                                <div
                                    key={product.productID}
                                    className="flex justify-between items-center bg-primary p-4 rounded-2xl shadow-inner"
                                >
                                    <span className="font-medium text-secondary">
                                        {product.name}
                                    </span>
                                    <span className="font-bold text-accent">
                                        {product.stock}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* ================= FEATURED PRODUCTS ================= */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-semibold text-secondary mb-6">
                    Featured Products
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {products.slice(0, 6).map(product => (
                        <div
                            key={product.productID}
                            className="rounded-2xl overflow-hidden bg-primary shadow-md hover:-translate-y-2 transition"
                        >
                            <img
                                src={product.images?.[0]}
                                alt={product.name}
                                className="w-full h-32 object-cover"
                            />
                            <div className="p-3 text-center text-sm font-medium text-secondary truncate">
                                {product.name}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ================= CIRCULAR REVENUE GRAPH ================= */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-semibold text-secondary mb-6">
                    Revenue Distribution
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 justify-items-center">
                    {orders.slice(0, 6).map((order, index) => {
                        const percentage = totalRevenue
                            ? (order.total / totalRevenue) * 100
                            : 0;

                        return (
                            <CircleGraph
                                key={order.orderID}
                                value={percentage}
                                label={`${index + 1}`}
                            />
                        );
                    })}
                </div>
            </div>

            {/* ================= ORDER STATUS ================= */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
                <h3 className="text-xl font-semibold text-secondary mb-6">
                    Order Status
                </h3>

                {["Pending", "Delivered", "Cancelled"].map(status => {
                    const count = orders.filter(o => o.status === status).length;
                    const percentage = orders.length ? (count / orders.length) * 100 : 0;

                    return (
                        <div key={status} className="mb-5">
                            <div className="flex justify-between text-sm text-secondary mb-1">
                                <span>{status}</span>
                                <span>{count}</span>
                            </div>

                            <div className="w-full h-3 bg-primary rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-accent rounded-full transition-all"
                                    style={{ width: `${percentage}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

/* ================= STAT CARD ================= */
function StatCard({ icon, title, value }) {
    return (
        <div className="relative bg-white rounded-3xl p-6 shadow-xl hover:-translate-y-2 transition">
            <div className="absolute inset-0 rounded-3xl bg-accent/10" />
            <div className="relative flex items-center gap-5">
                <div className="w-14 h-14 rounded-2xl bg-accent text-white flex items-center justify-center text-2xl shadow-lg">
                    {icon}
                </div>
                <div>
                    <p className="text-sm text-secondary/60">{title}</p>
                    <h2 className="text-2xl font-bold text-secondary">{value}</h2>
                </div>
            </div>
        </div>
    );
}

/* ================= CIRCLE GRAPH ================= */
function CircleGraph({ value, label }) {
    const radius = 36;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <svg width="100" height="100" className="rotate-[-90deg]">
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#FEF3E2"
                    strokeWidth="10"
                    fill="none"
                />
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    stroke="#FA812F"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                />
            </svg>

            <span className="text-sm font-semibold text-secondary mt-2">
                {label}
            </span>
            <span className="text-xs text-secondary/60">
                {value.toFixed(1)}%
            </span>
        </div>
    );
}
