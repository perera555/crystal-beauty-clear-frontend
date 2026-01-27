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
        { key: "pending", label: "Pending" },
        { key: "delivered", label: "Delivered" },
        { key: "cancelled", label: "Cancelled" },
    ];

    if (isLoading) return <Loader />;

    return (
        <div className="h-screen w-full overflow-y-auto bg-primary">
            {/* SCROLL CONTAINER */}

            <div className="max-w-7xl mx-auto p-8 space-y-16">

                {/* HEADER */}
                <div>
                    <h1 className="text-3xl font-extrabold text-secondary">
                        Admin Dashboard
                    </h1>
                    <p className="mt-1 text-secondary/60">
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
                        <table className="w-full text-sm text-secondary">
                            <thead>
                                <tr className="border-b border-secondary/20">
                                    <th className="py-3 text-left">Order ID</th>
                                    <th className="py-3 text-left">Customer</th>
                                    <th className="py-3 text-right">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.slice(0, 5).map(order => (
                                    <tr
                                        key={order.orderID}
                                        onClick={() => navigate("/admin/orders")}
                                        className="cursor-pointer border-b last:border-0 hover:bg-primary/60 transition"
                                    >
                                        <td className="py-4 font-medium">
                                            {order.orderID}
                                        </td>
                                        <td className="py-4">
                                            {order.customerName}
                                        </td>
                                        <td className="py-4 text-right font-semibold">
                                            LKR {(order.total || 0).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                                        className="flex justify-between items-center rounded-xl bg-primary px-4 py-3"
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                        {products.slice(0, 6).map(product => (
                            <div
                                key={product.productID}
                                className="rounded-xl bg-primary shadow hover:-translate-y-1 transition"
                            >
                                <img
                                    src={product.images?.[0]}
                                    alt={product.name}
                                    className="h-32 w-full object-cover rounded-t-xl"
                                />
                                <div className="p-3 text-center text-sm font-medium text-secondary truncate">
                                    {product.name}
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* ORDER STATUS */}
                <Card title="Order Status Overview">
                    <div className="space-y-6">
                        {ORDER_STATUSES.map(({ key, label }) => {
                            const count = orders.filter(
                                o => o.status?.toLowerCase() === key
                            ).length;

                            const percentage = orders.length
                                ? (count / orders.length) * 100
                                : 0;

                            return (
                                <div key={key}>
                                    <div className="flex justify-between mb-2 text-sm font-medium text-secondary">
                                        <span>{label}</span>
                                        <span>{count}</span>
                                    </div>

                                    <div className="h-2 w-full rounded-full bg-secondary/20">
                                        <div
                                            className="h-2 rounded-full bg-accent transition-all duration-700"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>

                                    <div className="mt-1 text-right text-xs text-secondary/60">
                                        {percentage.toFixed(1)}%
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>

            </div>
        </div>
    );
}

/* CARD */
function Card({ title, children }) {
    return (
        <div className="rounded-2xl bg-white p-6 shadow">
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
        <div className="rounded-2xl bg-white p-6 shadow hover:-translate-y-1 transition">
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-accent text-white text-2xl shadow">
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
