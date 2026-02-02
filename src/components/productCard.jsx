import { Link } from "react-router-dom";

export default function ProductCard(props) {
  const product = props.product;

  return (
    <div
      className="
        group
        bg-primary
        border border-secondary/10
        rounded-3xl
        p-5
        flex flex-col
        shadow-[0_18px_45px_rgba(57,62,70,0.10)]
        hover:shadow-[0_30px_70px_rgba(57,62,70,0.20)]
        transition-all duration-700
      "
    >
      {/* Image */}
      <div className="overflow-hidden rounded-2xl bg-primary">
        <img
          src={product.images[0]}
          alt={product.name}
          className="
            w-full h-[220px]
            object-cover
            transition-transform duration-[900ms]
            group-hover:scale-105
          "
        />
      </div>

      {/* Name */}
      <h2 className="mt-5 text-[15px] font-medium tracking-wide text-secondary line-clamp-2">
        {product.name}
      </h2>

      {/* Price */}
      {product.labelledPrice > product.price ? (
        <div className="flex items-center gap-3 mt-3">
          <span className="text-xs text-secondary/50 line-through">
            LKR {Number(product.labelledPrice).toFixed(2)}
          </span>
          <span className="text-base font-semibold text-accent">
            LKR {Number(product.price).toFixed(2)}
          </span>
        </div>
      ) : (
        <p className="mt-3 text-base font-semibold text-accent">
          LKR {Number(product.price).toFixed(2)}
        </p>
      )}

      {/* Meta */}
      <div className="mt-3 space-y-1">
        <p className="text-[10px] uppercase tracking-[0.25em] text-secondary/50">
          {product.productID}
        </p>
        <p className="text-[10px] uppercase tracking-[0.25em] text-secondary/50">
          {product.category}
        </p>
      </div>

      {/* Button */}
      <Link
        to={"/overview/" + product.productID}
        className="
          mt-6 h-[44px]
          flex items-center justify-center
          rounded-full
          border border-secondary/30
          text-sm tracking-widest
          text-secondary
          transition-all duration-300
          hover:bg-accent hover:text-primary hover:border-accent
        "
      >
        VIEW PRODUCT
      </Link>
    </div>
  );
}
