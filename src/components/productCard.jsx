import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;

  return (
    <div
      className="w-full sm:w-[260px] lg:w-[300px]
                 bg-primary
                 border border-secondary/10
                 m-3
                 flex flex-col p-4 rounded-2xl
                 shadow-[0_12px_32px_rgba(57,62,70,0.08)]
                 hover:shadow-[0_28px_60px_rgba(57,62,70,0.18)]
                 transition-all duration-500"
    >
      {/* Image */}
      <div className="overflow-hidden rounded-xl">
        <img
          className="w-full h-[180px] sm:h-[220px] lg:h-[250px]
                     object-cover
                     transition-transform duration-700
                     hover:scale-105"
          src={product.images[0]}
          alt=""
        />
      </div>

      {/* Name */}
      <h1 className="text-base lg:text-lg font-medium tracking-wide
                     text-secondary mt-4 line-clamp-2">
        {product.name}
      </h1>

      {/* Price */}
      {product.labelledPrice > product.price ? (
        <div className="flex gap-3 items-center mt-2">
          <p className="text-sm text-secondary/50 font-light line-through">
            LKR {Number(product.labelledPrice).toFixed(2)}
          </p>
          <p className="text-base text-accent font-semibold">
            LKR {Number(product.price).toFixed(2)}
          </p>
        </div>
      ) : (
        <p className="text-base text-accent font-semibold mt-2">
          LKR {Number(product.price).toFixed(2)}
        </p>
      )}

      {/* Meta */}
      <div className="mt-2 space-y-0.5">
        <p className="text-[11px] uppercase tracking-widest text-secondary/40">
          {product.productID}
        </p>
        <p className="text-[11px] uppercase tracking-widest text-secondary/40">
          {product.category}
        </p>
      </div>

      {/* Button */}
      <Link
        to={"/overview/" + product.productID}
        className="w-full h-[42px] mt-4
                   flex items-center justify-center
                   border border-secondary/30
                   text-secondary
                   rounded-full
                   text-sm tracking-wide
                   hover:bg-accent hover:text-primary
                   transition-all duration-300"
      >
        View Product
      </Link>
    </div>
  );
}
