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
                setProducts(productsRes.data || []);
                setOrders(ordersRes.data || []);
            })
            .finally(() => setIsLoading(false));
    }, [navigate]);

    const totalRevenue = orders.reduce(
        (sum, order) => sum + (order.total || 0),
        0
    );

    const lowStockProducts = products.filter(p => p.stock < 5);

    const ORDER_STATUSES = [
        { key: "pending", label: "Pending", color: "bg-yellow-400/20 text-yellow-700" },
        { key: "delivered", label: "Delivered", color: "bg-green-400/20 text-green-700" },
        { key: "cancelled", label: "Cancelled", color: "bg-red-400/20 text-red-700" },
    ];

    if (isLoading) return <Loader />;

    return (
        <div className="min-h-screen w-full bg-primary overflow-y-auto">
            <div className="max-w-7xl mx-auto px-8 py-10 space-y-16">

                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-bold text-secondary tracking-tight">
                        Admin Dashboard
                    </h1>
                    <p className="mt-1 text-sm text-secondary/60">
                        Overview of store performance & activity
                    </p>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
                    <StatCard icon={<FaBoxOpen />} title="Products" value={products.length} />
                    <StatCard icon={<FaShoppingCart />} title="Orders" value={orders.length} />
                    <StatCard
                        icon={<FaMoneyBillWave />}
                        title="Revenue"
                        value={`LKR ${totalRevenue.toFixed(2)}`}
                    />
                    <StatCard
                        icon={<FaExclamationTriangle />}
                        title="Low Stock"
                        value={lowStockProducts.length}
                    />
                </div>

                {/* MAIN GRID */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">

                    {/* RECENT ORDERS */}
                    <Card title="Recent Orders">
                        {orders.length === 0 ? (
                            <EmptyState
                                message="No orders yet"
                                action="View Orders"
                                onClick={() => navigate("/admin/orders")}
                            />
                        ) : (
                            <table className="w-full text-sm text-secondary">
                                <thead>
                                    <tr className="border-b border-secondary/20 text-secondary/70">
                                        <th className="py-3 text-left">Order ID</th>
                                        <th className="py-3 text-left">Customer</th>
                                        <th className="py-3 text-right">Total</th>
                                        <th className="py-3 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.slice(0, 5).map(order => {
                                        const status = ORDER_STATUSES.find(
                                            s => s.key === order.status?.toLowerCase()
                                        );
                                        return (
                                            <tr
                                                key={order.orderID}
                                                onClick={() => navigate("/admin/orders")}
                                                className="cursor-pointer border-b last:border-0 hover:bg-primary/60 transition"
                                            >
                                                <td className="py-4 font-medium">{order.orderID}</td>
                                                <td className="py-4">{order.customerName}</td>
                                                <td className="py-4 text-right font-semibold">
                                                    LKR {(order.total || 0).toFixed(2)}
                                                </td>
                                                <td className="py-4 text-right">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                            status?.color || "bg-secondary/20"
                                                        }`}
                                                    >
                                                        {status?.label || order.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        )}
                    </Card>

                    {/* LOW STOCK */}
                    <Card title="Low Stock Products">
                        {lowStockProducts.length === 0 ? (
                            <p className="text-sm text-secondary/60">
                                All products are sufficiently stocked 🎉
                            </p>
                        ) : (
                            <div className="space-y-3">
                                {lowStockProducts.map(product => (
                                    <div
                                        key={product.productID}
                                        className="flex justify-between items-center rounded-xl bg-primary px-4 py-3 shadow-sm"
                                    >
                                        <span className="font-medium text-secondary">
                                            {product.name}
                                        </span>
                                        <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
                                            {product.stock}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Card>
                </div>

                {/* FEATURED PRODUCTS */}
                <Card title="Featured Products">
                    {products.length === 0 ? (
                        <EmptyState
                            message="No products added yet"
                            action="Add Product"
                            onClick={() => navigate("/admin/addproduct")}
                        />
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {products.slice(0, 6).map(product => (
                                <div
                                    key={product.productID}
                                    className="rounded-2xl bg-primary shadow-md hover:-translate-y-1 hover:shadow-lg transition"
                                >
                                    <img
                                        src={product.images?.[0]}
                                        alt={product.name}
                                        className="h-32 w-full object-cover rounded-t-2xl"
                                    />
                                    <div className="p-3 text-center text-sm font-medium text-secondary truncate">
                                        {product.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </Card>

            </div>
        </div>
    );
}

/* CARD */
function Card({ title, children }) {
    return (
        <div className="rounded-3xl bg-white p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] border border-secondary/10">
            <h3 className="mb-6 text-lg font-semibold text-secondary">
                {title}
            </h3>
            {children}
        </div>
    );
}

/* STAT CARD */
function StatCard({ icon, title, value }) {
    return (
        <div className="rounded-3xl bg-white p-6 shadow-[0_18px_45px_rgba(0,0,0,0.12)] hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(0,0,0,0.18)] transition">
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white text-2xl shadow-md">
                    {icon}
                </div>
                <div>
                    <p className="text-xs uppercase tracking-wide text-secondary/60">
                        {title}
                    </p>
                    <h2 className="text-3xl font-extrabold text-secondary">
                        {value}
                    </h2>
                </div>
            </div>
        </div>
    );
}

/* EMPTY STATE */
function EmptyState({ message, action, onClick }) {
    return (
        <div className="flex flex-col items-center justify-center py-10 text-center">
            <p className="text-sm text-secondary/60 mb-4">{message}</p>
            <button
                onClick={onClick}
                className="rounded-xl bg-accent px-5 py-2 text-sm font-semibold text-white shadow hover:opacity-90 transition"
            >
                {action}
            </button>
        </div>
    );
}
