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
    <div className="w-full min-h-[calc(100vh-100px)] bg-primary">
      <Header />

      <div className="w-full h-[100px] flex justify-center items-center">
        <input
          type="text"
          placeholder="Search Products"
          className="px-4 py-2 border rounded-lg"
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
              console.error("Error searching products", err);
              toast.error("Error searching products");
            }
          }}
        />
      </div>

      {isloding ? (
        <Loader />
      ) : (
        <div className="w-full h-full flex flex-row flex-wrap justify-center bg-primary">
          {products.map((item) => (
            <ProductCard key={item.productID} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}
