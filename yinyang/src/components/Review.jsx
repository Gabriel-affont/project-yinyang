import { useState } from "react";
import api from "../api";

export default function ReviewForm({ skillId, onReviewAdded }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please log in first!");
      return;
    }

    try {
      await api.post("/reviews", {
        skillId,
        userId: parseInt(userId),
        rating,
        comment,
      });

      alert("Review submitted successfully!");
      setComment("");
      onReviewAdded();
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        className="border p-2 rounded mr-2"
      >
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} ⭐
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Leave a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="border p-2 rounded w-1/2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
      >
        Submit
      </button>
    </form>
  );
}
