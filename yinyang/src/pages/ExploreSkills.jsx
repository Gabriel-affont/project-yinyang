
import { useEffect, useState } from "react";
import SkillCard from "../components/SkillCard";
import api from "../api";

export default function ExploreSkills() {
  const [skills, setSkills] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/skills", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
        setError("Failed to load skills. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading skills...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">{error}</div>;
  }

  
  const categories = [...new Set(skills?.map((s) => s.category) || [])];
  const locations = [...new Set(skills?.map((s) => s.location) || [])];

  const filteredSkills = skills?.filter((skill) => {
    const matchesSearch =
      skill.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = category ? skill.category === category : true;
    const matchesLocation = location ? skill.location === location : true;

    return matchesSearch && matchesCategory && matchesLocation;
  }) || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Explore Skills</h1>

      {/* Your existing JSX */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* ... existing filter inputs ... */}
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