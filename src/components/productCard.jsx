import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;

  return (
    <div
      className="w-full sm:w-[260px] lg:w-[300px]
                 bg-white shadow-2xl m-3
                 flex flex-col p-3 rounded-xl
                 hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]
                 transition-shadow duration-300"
    >
      {/* Image */}
      <img
        className="w-full h-[180px] sm:h-[220px] lg:h-[250px]
                   object-cover rounded-lg"
        src={product.images[0]}
        alt=""
      />

      {/* Name */}
      <h1 className="text-lg lg:text-xl font-bold text-secondary mt-3 line-clamp-2">
        {product.name}
      </h1>

      {/* Price */}
      {product.labelledPrice > product.price ? (
        <div className="flex gap-3 items-center mt-1">
          <p className="text-sm lg:text-lg text-secondary font-semibold line-through">
            LKR {Number(product.labelledPrice).toFixed(2)}
          </p>
          <p className="text-base lg:text-lg text-accent font-semibold">
            LKR {Number(product.price).toFixed(2)}
          </p>
        </div>
      ) : (
        <p className="text-base lg:text-lg text-accent font-semibold mt-1">
          LKR {Number(product.price).toFixed(2)}
        </p>
      )}

      {/* Meta */}
      <p className="text-xs text-secondary/70 mt-1">
        {product.productID}
      </p>
      <p className="text-xs text-secondary/70">
        {product.category}
      </p>

      {/* Button */}
      <Link
        to={"/overview/" + product.productID}
        className="w-full h-[40px] mt-3
                   flex items-center justify-center
                   border border-accent text-accent
                   rounded-md font-medium
                   hover:bg-accent hover:text-white
                   transition-colors duration-200"
      >
        View Product
      </Link>
    </div>
  );
}
