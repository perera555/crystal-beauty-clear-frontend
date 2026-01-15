import { useState } from "react";

/*
  NOTE:
  This uses MOCK DATA shaped EXACTLY like your Product model.
  Replace mockProducts with API data later (axios / fetch).
*/

export default function ProductPage() {
  const [selectedProduct, setSelectedProduct] = useState();
  const [reviews, setReviews] = useState([
    { name: "Sarah", rating: 5, comment: "Absolutely love this product!" },
    { name: "Emily", rating: 4, comment: "Very good quality and smooth texture." },
  ]);

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const addReview = () => {
    if (!name || !comment) return alert("Please fill all fields");

    setReviews([
      ...reviews,
      { name, rating, comment },
    ]);

    setName("");
    setRating(5);
    setComment("");
  };

  return (
    <div className="w-full min-h-screen bg-primary text-secondary px-8 md:px-20 py-16">
      
      {/* PAGE TITLE */}
      <h1 className="text-5xl font-bold mb-12 text-center">
        Our <span className="text-accent">Products</span>
      </h1>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
        {mockProducts.map((p) => (
          <div
            key={p.productID}
            onClick={() => setSelectedProduct(p)}
            className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition cursor-pointer p-6 text-center"
          >
            <img
              src={p.images[0]}
              alt={p.name}
              className="w-full h-56 object-cover rounded-2xl mb-4"
            />
            <h3 className="text-xl font-semibold">{p.name}</h3>
            <p className="text-gray-500 text-sm">{p.category}</p>
            <p className="text-accent font-bold mt-2">
              {p.labelledPrice}
            </p>
          </div>
        ))}
      </div>

      {/* PRODUCT DETAILS */}
      <div className="bg-white rounded-[40px] shadow-2xl p-10 mb-20 grid grid-cols-1 md:grid-cols-2 gap-16">
        
        {/* IMAGE */}
        <img
          src={selectedProduct.images[0]}
          alt={selectedProduct.name}
          className="rounded-3xl shadow-lg"
        />

        {/* DETAILS */}
        <div>
          <h2 className="text-4xl font-bold mb-4">
            {selectedProduct.name}
          </h2>

          <p className="text-gray-600 mb-4">
            {selectedProduct.description}
          </p>

          <p className="text-sm text-gray-500 mb-2">
            Also known as: {selectedProduct.altNames.join(", ")}
          </p>

          <div className="text-2xl font-bold text-accent mb-6">
            {selectedProduct.labelledPrice}
          </div>

          <div className="flex gap-4">
            <button className="px-6 py-3 rounded-full bg-accent text-white font-semibold hover:scale-105 transition">
              Add to Cart
            </button>
            <button className="px-6 py-3 rounded-full border border-accent text-accent font-semibold hover:bg-accent hover:text-white transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">
          Product <span className="text-accent">Reviews</span>
        </h2>

        {/* ADD REVIEW */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-semibold mb-6">Add a Review</h3>

          <input
            className="w-full border p-3 rounded mb-4"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <select
            className="w-full border p-3 rounded mb-4"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            <option value={5}>★★★★★ (5)</option>
            <option value={4}>★★★★ (4)</option>
            <option value={3}>★★★ (3)</option>
            <option value={2}>★★ (2)</option>
            <option value={1}>★ (1)</option>
          </select>

          <textarea
            className="w-full border p-3 rounded mb-4"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button
            onClick={addReview}
            className="px-6 py-3 bg-accent text-white rounded-full font-semibold hover:opacity-90"
          >
            Submit Review
          </button>
        </div>

        {/* REVIEW LIST */}
        <div className="space-y-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-md p-6"
            >
              <div className="flex justify-between mb-2">
                <h4 className="font-semibold">{r.name}</h4>
                <div className="text-yellow-400">
                  {"★".repeat(r.rating)}
                </div>
              </div>
              <p className="text-gray-600">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
