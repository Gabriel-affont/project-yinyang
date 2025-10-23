import { useParams } from "react-router-dom";
import { dummySkills } from "../data/dummySkills";

export default function SkillDetails() {
  const { id } = useParams();
  
  const skill = dummySkills.find((s) => s.id === Number (id));

  if (!skill) {
    return <p className="text-red-500">Skill not found.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{skill.title}</h1>
      <p className="mb-4">{skill.description}</p>
      <p className="text-gray-600">
        <strong>Category:</strong> {skill.category}
      </p>
      <p className="text-gray-600">
        <strong>Location:</strong> {skill.location}
      </p>
    </div>
  );
}
