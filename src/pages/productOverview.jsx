import { Link, useParams } from "react-router-dom";
import Header from "../components/header";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Loader } from "../components/Loader";
import ImageSlider from "../components/imageSlider";
import { addTOCart } from "../../utils/card";

export default function ProductOverView() {
  const { id } = useParams(); // productID

  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);

  // ---------------- REVIEW STATE ----------------
  const [reviews, setReviews] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // ---------------- ADMIN CHECK ----------------
  const isAdmin = (() => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.role === "admin";
    } catch {
      return false;
    }
  })();

  // ---------------- FETCH PRODUCT ----------------
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_API_URL + "/api/products/" + id)
      .then((res) => {
        setProduct(res.data);
        setStatus("success");
      })
      .catch(() => {
        toast.error("Failed to fetch product details");
        setStatus("error");
      });
  }, [id]);

  // ---------------- FETCH REVIEWS ----------------
  const fetchReviews = async () => {
    const res = await axios.get(
      import.meta.env.VITE_API_URL + "/api/reviews/" + id
    );
    setReviews(res.data);
  };

  useEffect(() => {
    fetchReviews();
  }, [id]);

  // ---------------- SUBMIT REVIEW ----------------
  const submitReview = async (e) => {
    e.preventDefault();

    await axios.post(import.meta.env.VITE_API_URL + "/api/reviews", {
      productId: id,
      customerName,
      rating: Number(rating),
      comment,
    });

    setCustomerName("");
    setRating(5);
    setComment("");
    fetchReviews();
    toast.success("Review submitted");
  };

  // ---------------- DELETE REVIEW ----------------
  const deleteReview = async (reviewId) => {
    await axios.delete(
      import.meta.env.VITE_API_URL + `/api/reviews/${reviewId}`
    );
    fetchReviews();
    toast.success("Review deleted");
  };

  if (status === "loading") return <Loader />;

  if (status === "error")
    return (
      <h1 className="text-center text-red-500 mt-10">
        Failed to load product
      </h1>
    );

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="w-full min-h-screen bg-primary text-secondary">
      <Header />

      {/* ================= PRODUCT DETAILS ================= */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-14">
        <div className="lg:w-1/2">
          <ImageSlider images={product.images} />
        </div>

        <div className="lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-3xl font-light">{product.name}</h1>

          <p className="opacity-80 text-justify">
            {product.description}
          </p>

          <p className="text-accent text-2xl font-medium">
            LKR {product.price.toFixed(2)}
          </p>

          {avgRating && (
            <p className="text-sm opacity-70">
              ⭐ {avgRating} ({reviews.length} reviews)
            </p>
          )}

          <div className="flex gap-4 mt-8">
            <button
              className="w-1/2 h-[50px] bg-accent text-white rounded-full"
              onClick={() => {
                addTOCart(product, 1);
                toast.success("Added to cart");
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
              className="w-1/2 h-[50px] border border-secondary rounded-full flex items-center justify-center hover:bg-secondary hover:text-primary transition"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>

      {/* ================= REVIEWS (PREMIUM) ================= */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <h2 className="text-4xl font-light text-center mb-20 tracking-wide">
          Customer <span className="text-accent font-medium">Reviews</span>
        </h2>

        {/* ---------- RATING SUMMARY ---------- */}
        {reviews.length > 0 && (
          <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center">
              <p className="text-6xl font-light text-accent">
                {avgRating}
              </p>
              <div className="flex justify-center mt-3">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span
                    key={s}
                    className={`text-2xl ${
                      s <= Math.round(avgRating)
                        ? "text-accent"
                        : "text-secondary/20"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm opacity-60 mt-2">
                Based on {reviews.length} reviews
              </p>
            </div>

            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = reviews.filter(
                  (r) => r.rating === star
                ).length;
                const percent = (count / reviews.length) * 100;

                return (
                  <div key={star} className="flex items-center gap-3">
                    <span className="w-10 text-sm">{star}★</span>
                    <div className="flex-1 h-3 bg-secondary/10 rounded-full overflow-hidden">
                      <div
                        style={{ width: `${percent}%` }}
                        className="h-full bg-accent rounded-full"
                      />
                    </div>
                    <span className="w-10 text-sm opacity-60">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ---------- REVIEW FORM ---------- */}
        <form
          onSubmit={submitReview}
          className="
            bg-white/70 backdrop-blur-xl
            rounded-[2.5rem] p-10 mb-24
            shadow-[0_30px_80px_rgba(0,0,0,0.15)]
            border border-white
          "
        >
          <h3 className="text-2xl font-light text-center mb-10">
            Share your experience
          </h3>

          <input
            type="text"
            placeholder="Your Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="
              w-full mb-6 px-5 py-4 rounded-2xl
              border border-secondary/20
              focus:ring-2 focus:ring-accent/40
            "
            required
          />

          {/* Glowing Stars */}
          <div className="flex justify-center mb-8">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="relative text-4xl mx-1 group"
              >
                <span
                  className={
                    star <= rating
                      ? "text-accent animate-pulse drop-shadow-[0_0_14px_rgba(250,129,47,0.8)]"
                      : "text-secondary/30"
                  }
                >
                  ★
                </span>
              </button>
            ))}
          </div>

          <textarea
            placeholder="Write your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="
              w-full mb-8 px-5 py-4 rounded-2xl h-32
              border border-secondary/20
              focus:ring-2 focus:ring-accent/40
            "
            required
          />

          <button
            className="
              w-full py-4 rounded-full
              bg-gradient-to-r from-accent to-orange-500
              text-white font-medium tracking-wide
              shadow-[0_15px_40px_rgba(250,129,47,0.45)]
              hover:scale-[1.03] transition
            "
          >
            Submit Review
          </button>
        </form>

        {/* ---------- REVIEW CARDS ---------- */}
        {reviews.length === 0 ? (
          <p className="text-center text-secondary/60">
            No reviews yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-14">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="
                  bg-white/80 backdrop-blur
                  rounded-[2rem] p-8
                  shadow-[0_25px_70px_rgba(0,0,0,0.18)]
                  hover:shadow-[0_40px_100px_rgba(0,0,0,0.25)]
                  transition transform hover:-translate-y-3
                "
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-medium">
                    {review.customerName}
                  </h4>

                  <span className="text-xs px-3 py-1 rounded-full bg-accent/10 text-accent">
                    ✔ Verified Purchase
                  </span>
                </div>

                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= review.rating
                          ? "text-accent text-xl drop-shadow-[0_0_10px_rgba(250,129,47,0.7)]"
                          : "text-secondary/20 text-xl"
                      }
                    >
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-sm leading-relaxed opacity-80">
                  {review.comment}
                </p>

                {review.images && review.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    {review.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="review"
                        className="rounded-xl object-cover h-20"
                      />
                    ))}
                  </div>
                )}

                {isAdmin && (
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="mt-6 text-xs text-red-500 hover:underline"
                  >
                    Delete review
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
