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
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products/" + params.id)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch(() => {
        toast.error("failed to fetch product details");
        setStatus("error");
      });
  }, []);

  return (
    /* FULL PAGE BACKGROUND OWNER */
    <div className="w-full min-h-screen bg-primary text-secondary flex flex-col">
      <Header />

      {/* CONTENT MUST ALSO OWN BACKGROUND + HEIGHT */}
      <div className="flex-1 bg-primary">
        {status === "loading" && <Loader />}

        {status === "success" && (
          <div
            className="w-full min-h-full
                       max-w-7xl mx-auto
                       flex flex-col lg:flex-row
                       gap-8
                       px-4 py-6 lg:px-10 lg:py-10"
          >
            {/* Mobile title */}
            <h1 className="text-2xl font-bold text-center lg:hidden">
              {product.name}
            </h1>

            {/* Image */}
            <div className="w-full lg:w-1/2 flex justify-center items-start">
              <div className="w-full max-w-md">
                <ImageSlider images={product.images} />
              </div>
            </div>

            {/* Details */}
            <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start gap-4 lg:gap-5">
              <span className="text-sm opacity-70">
                {product.productID}
              </span>

              <h1 className="text-2xl font-bold text-center lg:text-left">
                {product.name}
                {product.altNames.map((name, index) => (
                  <span key={index} className="font-normal text-secondary">
                    {" | " + name}
                  </span>
                ))}
              </h1>

              <p className="text-justify leading-relaxed">
                {product.description}
              </p>

              <p className="text-sm">
                Category:{" "}
                <span className="font-medium">{product.category}</span>
              </p>

              {product.labelledPrice > product.price ? (
                <div className="flex gap-3 items-center">
                  <p className="line-through opacity-60">
                    LKR {Number(product.labelledPrice).toFixed(2)}
                  </p>
                  <p className="text-accent font-semibold text-lg">
                    LKR {Number(product.price).toFixed(2)}
                  </p>
                </div>
              ) : (
                <p className="text-accent font-semibold text-lg">
                  LKR {Number(product.price).toFixed(2)}
                </p>
              )}

              {/* Buttons */}
              <div className="w-full flex gap-4 mt-6">
                <button
                  className="w-1/2 h-[44px] bg-accent text-white font-semibold rounded-md
                             hover:bg-accent/80 transition-colors"
                  onClick={() => {
                    addTOCart(product, 1);
                    toast.success("Added to cart Successfully");
                  }}
                >
                  Add to Cart
                </button>

                <Link
                  to="/checkout"
                  state={[
                    {
                      image: product.images[0],
                      productID: product.productID,
                      name: product.name,
                      price: product.price,
                      labelledPrice: product.labelledPrice,
                      quantity: 1,
                    },
                  ]}
                  className="w-1/2 h-[44px]
                             border border-accent text-accent font-semibold
                             rounded-md flex justify-center items-center
                             hover:bg-accent hover:text-white transition-colors"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
          <h1 className="text-red-500 text-center mt-10">
            Failed to load product details
          </h1>
        )}
      </div>
    </div>
  );
}
