import {use, useState} from "react";
import {useSkills} from "../context/SkillContext";
import SkillCard from "../components/SkillCard";

export default function ExploreSkillls(){
  const {skills} = useSkills();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

  const categories = [...new Set(skills.map((s) => s.category))];
  const locations = [...new Set(skills.map((s) => s.location))];

  const fillteredSkills = skills.filter((skill) =>{
    const matchesSearch =
    skill.title.toLowerCase().include(searchTerm.toLowerCase())||
    skill.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = category ? skill.category === category : true;
    const matchesLocation = location ? skill.location === location : true;

    return matchesSearch && matchesCategLocation;

  });
  return(
    <div>
      <h1 className="text-2xl font-bold mb-6">Explore skills</h1>
      <div className = "flex flex-col md:flex-row gap-4 mb-6">
        <input
        type="text"
        placeholder="Search skills..."
        value={searchTerm}
        onChange={(e) =>setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full md:w-1/3 focus:ring-2"
        
        />
        <select
        value={category}
          onchange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full md:w-1/4"
          >
            <option value="">All Categories</option>
            {categories.map((cat, i) =>(
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          
        </select>
        

      </div>
    </div>
  );
}