import api from "../api";
import { useNavigate } from "react-router-dom";

export default function SkillCard({ skill }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this skill?")) return;
    try {
      await api.delete(`/skills/${skill.id}`);
      alert("Skill deleted successfully ");
      window.location.reload(); 
    } catch (err) {
      console.error("Error deleting skill:", err);
      alert("Failed to delete skill ");
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

      <div className="mt-4 flex gap-2">
        
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
      </div>
    </div>
  );
}
