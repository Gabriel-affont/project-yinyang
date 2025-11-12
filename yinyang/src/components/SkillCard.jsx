import api from "../api";
import { useNavigate } from "react-router-dom";
import ReviewForm from "./Review";
import { useEffect, useState } from "react";

export default function SkillCard({ skill }) {
  const navigate = useNavigate();


  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await api.delete(`/skills/${skill.id}`);
      alert("Skill deleted successfully");
      window.location.reload();
    } catch (err) {
      console.error("Error deleting skill:", err);
      alert("Failed to delete skill");
    }
  };


  const handleRequest = async () => {
    const requesterId = localStorage.getItem("userId");

    if (!requesterId) {
      alert("You need to log in before requesting a skill!");
      navigate("/login");
      return;
    }

    try {
      const requestBody = {
        skillId: skill.id,
        requesterId: parseInt(requesterId),
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      await api.post("/requests", {
        skillId: skill.id,
        requesterId: parseInt(localStorage.getItem("userId")),
      });

      alert(`Request sent successfully to ${skill.title}!`);
    } catch (err) {
      console.error("Error requesting skill:", err);
      alert("Failed to send request");
    }
  };
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get(`/reviews/skill/${skill.id}`);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchReviews();
  }, [skill.id]);

  return (
    <div className="border rounded p-4 shadow hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-blue-600">{skill.title}</h2>
      <p className="mt-2 text-gray-700">{skill.description}</p>
      <p className="text-sm text-gray-500 mt-2">
        Category: {skill.category} • Location: {skill.location}
      </p>
      <p className="text-xs text-gray-400 mt-1">Status: {skill.status}</p>

      <div className="mt-4 flex flex-wrap gap-2">

        <button
          onClick={() => navigate(`/edit-skill/${skill.id}`)}
          className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
        >
          Edit
        </button>


        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Delete
        </button>


        <button
          onClick={handleRequest}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
        >
          Request Skill
        </button>
        <button
          onClick={async () => {
            const newStatus = skill.status === "available" ? "unavailable" : "available";
            await fetch(`https://localhost:7009/api/skills/${skill.id}/status`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(newStatus),
            });
            alert(`Status changed to ${newStatus}`);
          }}
          className={`px-3 py-1 rounded text-white ${skill.status === "available" ? "bg-green-500" : "bg-red-500"
            }`}
        >
          {skill.status === "available" ? "Mark Unavailable" : "Mark Available"}
        </button>

        <ReviewForm skillId={skill.id} onReviewAdded={() => window.location.reload()} />
      </div>

      <div className="mt-4 w-full">
        <h3 className="font-semibold mb-2">Reviews:</h3>
        {reviews.length === 0 ? (
          <p className="text-sm text-gray-500">No reviews yet.</p>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="border-t pt-2">
              <p className="text-yellow-500">{"⭐".repeat(r.rating)}</p>
              <p className="text-gray-700">{r.comment}</p>
              <p className="text-xs text-gray-400">By {r.user?.name || "Anonymous"}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


