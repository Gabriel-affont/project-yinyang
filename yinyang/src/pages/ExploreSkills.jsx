import { useState } from "react";
import { useSkills } from "../context/SkillContext";
import SkillCard from "../components/SkillCard";

export default function ExploreSkills() {
  const { skills } = useSkills();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  // Get unique categories and locations for dropdowns
  const categories = [...new Set(skills.map((s) => s.category))];
  const locations = [...new Set(skills.map((s) => s.location))];

  // Filter logic
  const filteredSkills = skills.filter((skill) => {
    const matchesSearch =
      skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = category ? skill.category === category : true;
    const matchesLocation = location ? skill.location === location : true;

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Explore Skills</h1>

      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        
        <input
          type="text"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3 focus:ring-2 focus:ring-blue-400"
        />

        
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Categories</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4 focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Locations</option>
          {locations.map((loc, i) => (
            <option key={i} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        
        <button
          onClick={() => {
            setSearchTerm("");
            setCategory("");
            setLocation("");
          }}
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Reset
        </button>
      </div>

      
      {filteredSkills.length === 0 ? (
        <p className="text-gray-500">No skills match your filters.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => (
            <SkillCard key={skill.id} skill={skill} />
          ))}
        </div>
      )}
    </div>
  );
}
