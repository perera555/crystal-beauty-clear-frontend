import { Link, useParams } from "react-router-dom";
import Header from "../components/header";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../components/Loader";
import ImageSlider from "../components/imageSlider";
import { addTOCart } from "../../utils/card";

export default function ProductOverView() {

    const params = useParams();

    const [status, setStatus] = useState("loading");
    const [product, setProduct] = useState(null)

    useEffect(() => {
        axios
            .get(import.meta.env.VITE_API_URL + "/api/products/" + params.id)
            .then((res) => {
                setProduct(res.data)
                setStatus("success"); 
            })
            .catch(() => {
                toast.error("failed to fetch product details");
                setStatus("error");
            });
    }, []);

    return (
        <div className="w-full h-[calc(100vh-100px)] text-secondary">
            <Header />

            <div className="w-full h-full">
                {status === "loading" && <Loader />}

                {status === "success" && (
                    <div className="w-full h-full flex">
                        <div className="w-1/2 h-full flex justify-center items-center">
                            <ImageSlider images={product.images} />
                        </div>

                        <div className="w-1/2 h-full  flex flex-col items-center gap-4 p-10">
                            {/* product details here */}
                            <span className="">{product.productID}</span>
                            <h1 className="text-2xl font-bold text-center">{product.name}
                                {
                                    product.altNames.map(
                                        (name, index) => {
                                            return (
                                                <span key={index} className=" font-normal text-secondary">{"|" + name}</span>

                                            )
                                        }
                                    )
                                }
                            </h1>
                            {/* Description */}
                            <p className=" mt-[30px] text-justify ">{product.description}

                            </p>
                            {/* category */}
                            <p>Category: {product.category}</p>
                            {/* Price */}

                            {
                                product.labelledPrice > product.price ? (
                                    <div className="flex gap-3 items-center">
                                        <p className="text-lg text-secondary font-semibold line-through">
                                            LKR{Number(product.labelledPrice).toFixed(2)}
                                        </p>
                                        <p className="text-lg text-accent font-semibold">
                                            LKR{Number(product.price).toFixed(2)}
                                        </p>
                                    </div>
                                ) : (
                                    <p className="text-lg text-accent font-semibold">
                                        LKR{Number(product.price).toFixed(2)}
                                    </p>
                                )
                            }
                            <div className="w-full h-[40px] flex gap-4 mt-[60px]">
                                <button className="w-1/2 h-full bg-accent text-white font-semibold hover:bg-accent/80 "
                                    onClick={() => {
                                        addTOCart(product, 1)
                                        toast.success("Added to cart Successfully")

                                    }}>Add to Cart</button>
                                <Link to="/checkout" state={[{
                                    image :product.images[0],
                                    productID:product.productID,
                                    name :product.name,
                                    price :product.price,
                                    labelledPrice:product.labelledPrice,
                                    quantity:1
                                }]} className="w-1/2 h-full border text-center border-accent text-accent font-semibold hover:bg-accent hover:text-white "
                                   >Buy Now</Link>

                            </div>

                        </div>
                    </div>
                )}

                {status === "error" && (
                    <h1 className="text-red-500">
                        Failed to load product details
                    </h1>
                )}
            </div>
        </div>
    );

} 
