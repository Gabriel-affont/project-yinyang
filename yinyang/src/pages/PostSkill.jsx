import { useState } from "react";
import { useSkills } from "../context/SkillContext";

export default function PostSkill() {
  const { addSkill, skills } = useSkills();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.title || !formData.description) {
      alert("Please fill out all fields");
      return;
    }

    addSkill(formData);
    alert("Skill posted successfully!");
    setFormData({
      title: "",
      description: "",
      category: "",
      location: "",
    });
  }

  return (
    <div className="max-w-xl mx-auto bg-blue-50 p-6 rounded shadow mt-10">
      <h1 className="text-3xl font-bold mb-6">Post a New Skill</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded space-y-4"
      >
        <div>
          <label className="block font-medium mb-1">Skill Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Web Development"
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            placeholder="Describe what you can do..."
            className="w-full border rounded p-2 focus:ring-2 focus:ring-blue-400"
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
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Submit Skill
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
