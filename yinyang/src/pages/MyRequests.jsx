import { useEffect, useState } from "react";
import api from "../api";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      console.log("No userId found in localStorage");
      setLoading(false);
      return;
    }
    
    const fetchRequests = async () => {
      try {
        console.log("Fetching requests for user ID:", userId);
        const response = await api.get(`/requests/user/${userId}`);
        console.log("API Response data:", response.data);
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError("Failed to load requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [userId]);

  
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (loading) return <p>Loading requests...</p>;
  
  console.log("Rendering with requests:", requests);
  
  if (!requests.length) return <p>No requests found.</p>;

  const sentRequests = requests.filter((r) => r.requesterId == userId);
  const receivedRequests = requests.filter((r) => r.skill.ownerId == userId);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">My Requests</h1>

      
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Requests You Sent</h2>
        {sentRequests.length === 0 ? (
          <p className="text-gray-500">You haven't sent any requests yet.</p>
        ) : (
          <ul className="space-y-3">
            {sentRequests.map((req) => (
              <li key={req.id} className="border p-4 rounded">
                <p>
                  You requested <strong>{req.skill.title}</strong> from{" "}
                  <span className="text-blue-600 font-medium">
                    {req.skill.owner.name}
                  </span>
                </p>
                <p>Status: {req.status}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      
      <section>
        <h2 className="text-xl font-semibold mb-2">Requests You Received</h2>
        {receivedRequests.length === 0 ? (
          <p className="text-gray-500">No one has requested your skills yet.</p>
        ) : (
          <ul className="space-y-3">
            {receivedRequests.map((req) => (
              <li key={req.id} className="border p-4 rounded">
                <p>
                  <span className="text-blue-600 font-medium">
                    {req.requester.name}
                  </span>{" "}
                  requested your skill <strong>{req.skill.title}</strong>
                </p>
                <p>Status: {req.status}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}