import { useState } from "react";
import { useSkills } from "../context/SkillContext";
import { useAuth } from "../context/AuthContext";
import api from "../api";

export default function PostSkill() {
  const { addSkill, skills } = useSkills();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!formData.title || !formData.description) {
      alert("Please fill out all required fields");
      return;
    }
    if (!user) {
      alert("You must be logged in to post a skill.");
      return;
    }

    setLoading(true);

    try {
      
      const response = await api.post("/Skills", {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        location: formData.location,
        ownerId: user.id, 
        status: "available"
      });

      console.log("Skill created:", response.data);
      
      
      addSkill({ 
        ...formData, 
        id: response.data.id,
        owner: user.email, 
        requestedBy: null, 
        status: "available" 
      });
      
      alert("Skill posted successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        location: "",
      });
      
    } catch (error) {
      console.error("Error posting skill:", error);
      setError("Failed to post skill. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-blue-50 p-6 rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-6">Post a New Skill</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded space-y-4"
      >
        <div>
          <label className="block font-medium mb-1">Skill Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Web Development"
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Describe what you can do..."
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="e.g. Design, Education, Cooking"
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g. Remote, Nairobi, Campus"
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
        >
          {loading ? "Posting..." : "Submit Skill"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-2">Posted Skills (Live)</h2>
        <ul className="space-y-2">
          {skills.map((skill) => (
            <li
              key={skill.id}
              className="border rounded p-3 hover:shadow transition"
            >
              <p className="font-medium">{skill.title}</p>
              <p className="text-sm text-gray-600">{skill.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}