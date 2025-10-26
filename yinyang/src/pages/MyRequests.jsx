import { useAuth } from "../context/AuthContext";
import { useSkills } from "../context/SkillContext";

export default function MyRequests() {
  const { user } = useAuth();
  const { skills, updateSkillStatus } = useSkills();

  if (!user) return <p>Please log in to view your requests.</p>;

  const incoming = skills.filter(
    (s) => s.owner === user.email && s.requestedBy
  );
  const outgoing = skills.filter((s) => s.requestedBy === user.email);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Requests</h1>

      {/* Incoming Requests */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Incoming Requests</h2>
      {incoming.length === 0 ? (
        <p>No one has requested your skills yet.</p>
      ) : (
        incoming.map((skill) => (
          <div key={skill.id} className="border p-4 mb-3 rounded shadow">
            <p className="font-semibold">{skill.title}</p>
            <p className="text-sm text-gray-600">
              Requested by: {skill.requestedBy}
            </p>
            {skill.status === "requested" && (
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => updateSkillStatus(skill.id, "accepted")}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateSkillStatus(skill.id, "declined")}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Decline
                </button>
              </div>
            )}
          </div>
        ))
      )}

      {/* Outgoing Requests */}
      <h2 className="text-xl font-semibold mt-8 mb-2">My Outgoing Requests</h2>
      {outgoing.length === 0 ? (
        <p>You haven’t requested any skills yet.</p>
      ) : (
        outgoing.map((skill) => (
          <div key={skill.id} className="border p-4 mb-3 rounded shadow">
            <p className="font-semibold">{skill.title}</p>
            <p className="text-sm text-gray-600">
              Status: {skill.status}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
