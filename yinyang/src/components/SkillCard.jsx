import { useAuth } from "../context/AuthContext";
import { useSkills } from "../context/SkillContext";

export default function SkillCard({ skill }) {
  const { user } = useAuth();
  const { requestSkill } = useSkills();

  const canRequest =
    user && user.email !== skill.owner && skill.status === "available";

  return (
    <div className="border rounded p-4 shadow bg-white">
      <h2 className="text-xl font-semibold">{skill.title}</h2>
      <p className="text-sm mt-1">{skill.description}</p>
      <p className="text-xs text-gray-500 mt-2">
        Category: {skill.category} • Location: {skill.location}
      </p>
      <p className="text-xs text-gray-500">
        Posted by: {skill.owner}
      </p>
      {skill.status !== "available" && (
        <p className="text-xs text-yellow-600 mt-2">
          Status: {skill.status} {skill.requestedBy && `by ${skill.requestedBy}`}
        </p>
      )}
      {canRequest && (
        <button
          onClick={() => requestSkill(skill.id, user.email)}
          className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Request Skill
        </button>
      )}
    </div>
  );
}
