import { useEffect, useState } from "react";
import Header from "../components/header";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../components/Loader";
import ProductCard from "../components/productCard";

export function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isloding, setIsLoding] = useState(true);

  useEffect(() => {
    if (isloding) {
      axios
        .get(import.meta.env.VITE_API_URL + "/api/products")
        .then((response) => {
          setProducts(response.data);
          setIsLoding(false);
        })
        .catch((error) => {
          console.error("Error fetching products", error);
          setIsLoding(false);
          toast.error("Failed to load products");
        });
    }
  }, [isloding]);

  return (
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary text-secondary">
      <Header />

      {/* Search */}
      <div className="w-full py-14 flex justify-center">
        <div className="w-full max-w-xl px-6">
          <input
            type="text"
            placeholder="Search products"
            className="
              w-full
              px-6 py-3
              rounded-full
              bg-primary
              border border-secondary/20
              text-sm tracking-wide
              placeholder:text-secondary/50
              shadow-[0_8px_30px_rgba(57,62,70,0.08)]
              focus:outline-none
              focus:border-accent
              focus:ring-2 focus:ring-accent/30
              transition-all duration-300
            "
            onChange={async (e) => {
              const value = e.target.value.trim();

              try {
                if (value === "") {
                  setIsLoding(true);
                  return;
                }

                const searchResult = await axios.get(
                  import.meta.env.VITE_API_URL +
                    "/api/products/search/" +
                    encodeURIComponent(value)
                );

                setProducts(searchResult.data);
              } catch (err) {
                toast.error("Error searching products");
              }
            }}
          />
        </div>
      </div>

      {/* Content */}
      {isloding ? (
        <div className="flex justify-center items-center py-24">
          <Loader />
        </div>
      ) : (
        <div className="w-full px-6 pb-24">
          <div className="max-w-7xl mx-auto grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((item) => (
              <ProductCard key={item.productID} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
