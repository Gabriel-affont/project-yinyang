import { Link } from "react-router-dom";

export default function SkillCard({ skill }) {
  return (
    <Link to ={`/skill/${skill.id}`} className="block" >
   
      <div className="border rounded p-4 shadow hover:shadow-lg transition">
        <h2 className="text-xl font-semibold">{skill.title}</h2>
        <p className="text-sm mt-1">{skill.description}</p>
        <p className="text-xs text-gray-500 mt-2">
          Category: {skill.category} • Location: {skill.location}
        </p>
      </div>
    </Link>
  );
}
