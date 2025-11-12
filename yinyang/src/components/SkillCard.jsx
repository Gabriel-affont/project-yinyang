import api from "../api";
import { useNavigate } from "react-router-dom";

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
      </div>
    </div>
  );
}
