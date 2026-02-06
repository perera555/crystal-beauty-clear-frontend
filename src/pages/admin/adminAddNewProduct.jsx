import { useState } from "react"
import { useNavigate } from "react-router-dom"
import mediaUpload from "../../../utils/mediaUpload"
import toast from "react-hot-toast"
import axios from "axios"

export default function AddProductPage() {
    const [productID, setProductID] = useState("")
    const [name, setName] = useState("")
    const [altNames, setAltNames] = useState("")
    const [description, setDescription] = useState("")
    const [images, setImages] = useState([])
    const [price, setPrice] = useState("")
    const [labelledPrice, setLabelledPrice] = useState("")
    const [category, setCategory] = useState("cream")
    const [stock, setStock] = useState("")

    const navigate = useNavigate()

    async function AddProduct() {
        const token = localStorage.getItem("token")

        if (!token) {
            navigate("/login")
            return
        }

        try {
            const uploadPromises = images.map(image => mediaUpload(image))
            const urls = await Promise.all(uploadPromises)

            const alternativeNames = altNames
                .split(",")
                .map(name => name.trim())
                .filter(Boolean)

            const product = {
                productID,
                name,
                altNames: alternativeNames,
                description,
                images: urls,
                price: Number(price),
                labelledPrice: Number(labelledPrice),
                category,
                stock: Number(stock)
            }

            await axios.post(
                `${import.meta.env.VITE_API_URL}/api/products`,
                product,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            toast.success("Product added successfully")
            navigate("/admin/products")

        } catch (error) {
            console.error(error)
            toast.error("An error occurred while adding product")
        }
    }

    return (
        <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-primary to-white px-6 py-10">
            <div className="w-full max-w-3xl rounded-3xl border border-accent/40 bg-white/80 backdrop-blur-xl shadow-2xl p-10 space-y-8">

                {/* Header */}
                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold text-secondary">
                        Add New Product
                    </h2>
                    <p className="text-sm text-secondary/60">
                        Fill in the product details carefully
                    </p>
                </div>

                {/* Product ID & Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        placeholder="Product ID"
                        className="w-full rounded-xl border border-secondary/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
                        value={productID}
                        onChange={e => setProductID(e.target.value)}
                    />

                    <input
                        placeholder="Product Name"
                        className="w-full rounded-xl border border-secondary/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                {/* Alternative Names */}
                <input
                    placeholder="Alternative names (comma separated)"
                    className="w-full rounded-xl border border-secondary/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
                    value={altNames}
                    onChange={e => setAltNames(e.target.value)}
                />

                {/* Description */}
                <textarea
                    className="w-full rounded-xl border border-secondary/20 px-4 py-3 h-28 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
                    placeholder="Description"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />

                {/* Images */}
                <div className="rounded-xl border-2 border-dashed border-accent/40 p-6 text-center hover:bg-accent/5 transition">
                    <input
                        type="file"
                        multiple
                        className="w-full text-sm file:mr-4 file:rounded-lg file:border-0 file:bg-accent file:px-5 file:py-2 file:text-white file:font-medium hover:file:opacity-90"
                        onChange={e => setImages(Array.from(e.target.files))}
                    />
                    <p className="mt-2 text-xs text-secondary/60">
                        Upload multiple product images
                    </p>
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <input
                        type="number"
                        placeholder="Price"
                        className="w-full rounded-xl border border-secondary/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Labelled Price"
                        className="w-full rounded-xl border border-secondary/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
                        value={labelledPrice}
                        onChange={e => setLabelledPrice(e.target.value)}
                    />

                    <select
                        className="w-full rounded-xl border border-secondary/20 px-4 py-3 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                    >
                        {/* Existing */}
                        <option value="cream">Cream</option>
                        <option value="lotion">Lotion</option>
                        <option value="serum">Serum</option>

                        {/* Added options */}
                        <option value="lipstick">Lipstick</option>
                        <option value="lipbalm">Lip Balm</option>
                        <option value="bodywash">Body Wash</option>
                        <option value="facewash">Face Wash</option>
                        <option value="shampoo">Shampoo</option>
                        <option value="conditioner">Conditioner</option>
                        <option value="perfume">Perfume</option>
                        <option value="sunscreen">Sunscreen</option>
                        <option value="mask">Face Mask</option>
                        <option value="scrub">Scrub</option>
                        <option value="toner">Toner</option>
                        <option value="cleanser">Cleanser</option>
                    </select>
                </div>

                {/* Stock */}
                <input
                    type="number"
                    placeholder="Stock Quantity"
                    className="w-full rounded-xl border border-secondary/20 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent transition"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                />

                {/* Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-secondary/10">
                    <button
                        onClick={() => navigate("/admin/products")}
                        className="px-6 py-2.5 rounded-xl border border-secondary/30 text-sm font-medium text-secondary hover:bg-secondary/5 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={AddProduct}
                        className="px-8 py-2.5 rounded-xl bg-accent text-sm font-semibold text-white shadow-lg shadow-accent/30 hover:opacity-90 transition"
                    >
                        Submit Product
                    </button>
                </div>

            </div>
        </div>
    )
}
