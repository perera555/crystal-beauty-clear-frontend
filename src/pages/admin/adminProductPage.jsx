import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Loader } from "../../components/Loader";

/* DELETE CONFIRM */
function ProductDeleteConfirm({ productID, close, refresh }) {
    function deleteProduct() {
        const token = localStorage.getItem("token");
        axios.delete(
            import.meta.env.VITE_API_URL + "/api/products/" + productID,
            { headers: { Authorization: `Bearer ${token}` } }
        ).then(() => {
            toast.success("Product deleted");
            close();
            refresh();
        }).catch(() => toast.error("Delete failed"));
    }

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center">
            <div className="bg-white rounded-3xl p-8 shadow-xl w-[520px] space-y-6 relative">
                <button onClick={close} className="absolute top-3 right-3 text-xl">×</button>
                <p className="text-lg font-semibold text-center">
                    Delete product <span className="text-accent">{productID}</span>?
                </p>
                <div className="flex justify-center gap-4">
                    <button onClick={close} className="px-6 py-2 rounded-xl border">
                        Cancel
                    </button>
                    <button onClick={deleteProduct} className="px-6 py-2 rounded-xl bg-red-600 text-white">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function AdminProductPage() {
    const [products, setProducts] = useState([]);
    const [isloding, setIsLoding] = useState(true);

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [selected, setSelected] = useState([]);
    const [editingPrice, setEditingPrice] = useState(null);

    const [deleteID, setDeleteID] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isloding) return;
        axios.get(import.meta.env.VITE_API_URL + "/api/products")
            .then(res => setProducts(res.data))
            .finally(() => setIsLoding(false));
    }, [isloding]);

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const matchSearch =
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.productID.toLowerCase().includes(search.toLowerCase()) ||
                p.category.toLowerCase().includes(search.toLowerCase());

            const matchCategory =
                categoryFilter === "all" || p.category === categoryFilter;

            return matchSearch && matchCategory;
        });
    }, [products, search, categoryFilter]);

    const stockBadge = (stock) => {
        if (stock === 0) return "bg-red-500/20 text-red-700";
        if (stock < 5) return "bg-yellow-400/20 text-yellow-700";
        return "bg-green-400/20 text-green-700";
    };

    return (
        <div className="w-full h-full p-8 bg-primary">

            {deleteID && (
                <ProductDeleteConfirm
                    productID={deleteID}
                    close={() => setDeleteID(null)}
                    refresh={() => setIsLoding(true)}
                />
            )}

            {/* TOOLBAR */}
            <div className="mb-6 flex gap-4">
                <input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="rounded-xl border px-4 py-2 text-sm w-64"
                />
                <select
                    value={categoryFilter}
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="rounded-xl border px-4 py-2 text-sm"
                >
                    <option value="all">All Categories</option>
                    {[...new Set(products.map(p => p.category))].map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </div>

            {/* ADD PRODUCT */}
            <Link
                to="/admin/addproduct"
                className="fixed bottom-10 right-10 h-16 w-16 bg-accent text-white rounded-full flex items-center justify-center text-3xl shadow-xl"
            >
                <CiCirclePlus />
            </Link>

            {/* TABLE */}
            <div className="bg-white rounded-3xl shadow border overflow-x-auto">
                {isloding ? <Loader /> : (
                    <table className="w-full text-sm table-fixed">
                        <thead className="bg-primary sticky top-0 z-10">
                            <tr className="text-xs uppercase text-secondary/60">
                                <th className="w-[50px] px-6 py-4 text-center"></th>
                                <th className="px-6 py-4 text-center">Image</th>
                                <th className="px-6 py-4 text-center">ID</th>
                                <th className="px-6 py-4 text-left">Name</th>
                                <th className="px-6 py-4 text-center">Price</th>
                                <th className="px-6 py-4 text-center">Stock</th>
                                <th className="px-6 py-4 text-center">Category</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y">
                            {filteredProducts.map(p => (
                                <tr key={p.productID} className="hover:bg-primary/60 transition">
                                    <td className="px-6 py-4 text-center">
                                        <input
                                            type="checkbox"
                                            checked={selected.includes(p.productID)}
                                            onChange={() =>
                                                setSelected(s =>
                                                    s.includes(p.productID)
                                                        ? s.filter(id => id !== p.productID)
                                                        : [...s, p.productID]
                                                )
                                            }
                                        />
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <img
                                            src={p.images[0]}
                                            className="w-14 h-14 rounded-xl object-cover mx-auto"
                                            alt={p.name}
                                        />
                                    </td>

                                    <td className="px-6 py-4 text-center">{p.productID}</td>

                                    <td className="px-6 py-4 text-left">{p.name}</td>

                                    <td className="px-6 py-4 text-center font-semibold">
                                        {editingPrice === p.productID ? (
                                            <input
                                                type="number"
                                                defaultValue={p.price}
                                                onBlur={() => setEditingPrice(null)}
                                                className="w-24 border rounded-lg px-2 py-1 mx-auto text-center"
                                            />
                                        ) : (
                                            <span
                                                onClick={() => setEditingPrice(p.productID)}
                                                className="cursor-pointer underline decoration-dotted"
                                            >
                                                LKR {p.price}
                                            </span>
                                        )}
                                    </td>

                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${stockBadge(p.stock)}`}>
                                            {p.stock}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-center">{p.category}</td>

                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-3">
                                            <button onClick={() => setDeleteID(p.productID)}>
                                                <FaRegTrashCan className="text-red-600" />
                                            </button>
                                            <button onClick={() => navigate("/admin/updateproduct", { state: p })}>
                                                <FaRegEdit className="text-accent" />
                                            </button>
                                        </div>
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
