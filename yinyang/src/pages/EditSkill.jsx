import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

export default function EditSkill() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    status: "available",
  });

  useEffect(() => {
    const fetchSkill = async () => {
      try {
        const response = await api.get(`/skills/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching skill:", error);
      }
    };
    fetchSkill();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    
    const payload = {
      id: Number(id), 
      title: formData.title,
      description: formData.description,
      category: formData.category,
      location: formData.location,
      status: formData.status,
      ownerId: Number(localStorage.getItem("userId"))

    };

    console.log("Updating skill with payload:", payload);

    await api.put(`/skills/${id}`, payload);
    alert("Skill updated successfully ");
    navigate("/explore");
  } catch (error) {
    console.error("Error updating skill:", error);
    alert("Failed to update skill ");
  }
};


  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Skill</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
