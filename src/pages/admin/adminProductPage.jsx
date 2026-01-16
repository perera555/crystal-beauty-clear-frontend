import axios from "axios"
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminProductPage() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + "/api/products")
            .then((response) => {
                setProducts(response.data);
            });
    }, []);

    return (

        <div className="w-full h-full p-6 bg-primary">
             <Link to="/admin/addproduct" className="fixed right-[50px] bottom-[50px] text-5xl">
             <CiCirclePlus className="hover:text-accent" />
             </Link>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
                <table className="w-full text-sm text-secondary">
                    <thead className="bg-primary sticky top-0">
                        <tr className="text-left text-xs uppercase tracking-wide text-secondary/70">
                            <th className="px-6 py-4">Image</th>
                            <th className="px-6 py-4">Product ID</th>
                            <th className="px-6 py-4">Name</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Labelled</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {products.map((item) => (
                            <tr
                                key={item.productID}
                                className="hover:bg-primary/50 transition-colors"
                            >
                                <td className="px-6 py-4">
                                    <img
                                        src={item.images[0]}
                                        className="w-14 h-14 rounded-xl object-cover shadow-sm"
                                        alt={item.name}
                                    />
                                </td>

                                <td className="px-6 py-4 font-medium">
                                    {item.productID}
                                </td>

                                <td className="px-6 py-4">
                                    {item.name}
                                </td>

                                <td className="px-6 py-4 font-semibold">
                                    ${item.price}
                                </td>

                                <td className="px-6 py-4 text-secondary/70">
                                    ${item.labelledPrice}
                                </td>

                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 rounded-full text-xs bg-primary text-secondary">
                                        {item.category}
                                    </span>
                                </td>

                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-4">
                                        <button className="p-2 rounded-lg hover:bg-red-50 transition">
                                            <FaRegTrashCan className="text-secondary hover:text-red-600 text-lg" />
                                        </button>

                                        <button className="p-2 rounded-lg hover:bg-accent/10 transition">
                                            <FaRegEdit className="text-secondary hover:text-accent text-lg" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
