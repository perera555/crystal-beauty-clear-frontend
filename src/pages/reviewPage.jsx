import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/header";


export const ReviewPage = () => {
  //product id should be passed with the url.
  //that passing id, technically what is after review/? section is url
  //what is being read by the following hook
  //can you follow up so far?
  const { id } = useParams();

  // -------------------- STATE --------------------
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);

  const [customerName, setCustomerName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const isAdmin = true; // replace later with auth
// -------------------- FETCH PRODUCT --------------------
const fetchProduct = async () => {
  const response = await axios.get(
    `http://localhost:3000/products/${id}`
  );
  setProduct(response.data);
}


// -------------------- FETCH REVIEWS --------------------
const fetchReviews = async () => {
  const response = await axios.get(
    `http://localhost:3000/reviews/${id}`
  );
  setReviews(response.data);
}

// -------------------- SUBMIT REVIEW --------------------
const submitReview = async (e) => {
  e.preventDefault();

  await axios.post("http://localhost:3000/reviews", {
    productId: id,
    customerName,
    rating: Number(rating),
    comment,
  })

  setCustomerName("");
  setRating(5);
  setComment("");
  fetchReviews();
}

// -------------------- DELETE REVIEW (ADMIN) --------------------
const deleteReview = async (reviewId) => {
  await axios.delete(
    'http://localhost:3000/reviews/${reviewId}'
  );
  fetchReviews();
}

  // -------------------- EFFECTS --------------------
  useEffect(() => {
    fetchProduct();
    fetchReviews();
  }, [id]);

  if (!product) {
    return <p className="text-center py-20">Loading...</p>;
  }

  // -------------------- UI --------------------
  return (
    <div className="w-full min-h-screen bg-linear-to-br from-primary via-white to-accent text-secondary">
      <Header />

      {/* PRODUCT HERO */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full rounded-3xl shadow-xl"
        />

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center gap-6">
            <span className="text-3xl font-semibold text-accent">
              ${product.price}
            </span>
            <span className="text-gray-500 line-through">
              {product.labelledPrice}
            </span>
          </div>

          <p className="text-sm text-gray-500">
            Category:{" "}
            <span className="font-semibold">{product.category}</span>
          </p>
        </div>
      </div>

      {/* REVIEW FORM */}
      <div className="max-w-4xl mx-auto px-6 py-12 bg-white/70 backdrop-blur rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Leave a <span className="text-accent">Review</span>
        </h2>

        <form onSubmit={submitReview} className="space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border focus:outline-accent"
            required
          />

          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border"
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <option key={star} value={star}>
                {star} Star
              </option>
            ))}
          </select>

          <textarea
            placeholder="Write your review"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border h-28"
            required
          />

          <button className="w-full py-3 rounded-full bg-linear-to-r from-accent to-orange-500 text-white font-semibold shadow-lg hover:scale-105 transition">
            Submit Review
          </button>
        </form>
      </div>

      {/* CUSTOMER REVIEWS */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">
          Customer <span className="text-accent">Reviews</span>
        </h2>

        {reviews.length === 0 && (
          <p className="text-center text-gray-500">No reviews yet.</p>
        )}

        <div className="grid md:grid-cols-3 gap-10">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition"
            >
              <h4 className="font-semibold text-lg">
                {review.customerName}
              </h4>

              <p className="text-accent text-xl">
                {"⭐".repeat(review.rating)}
              </p>

              <p className="text-gray-600 mt-2">
                {review.comment}
              </p>

              {isAdmin && (
                <button
                  onClick={() => deleteReview(review._id)}
                  className="mt-4 text-sm text-red-500 hover:underline"
                >
                  Delete (Admin)
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-secondary py-10 text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} Crystal Beauty Clear — All Rights Reserved
      </div>
    </div>
  );
};
