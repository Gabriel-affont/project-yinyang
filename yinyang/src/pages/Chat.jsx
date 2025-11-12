import { useEffect, useState } from "react";
import api from "../api";

export default function Chat() {
  const [receiverId, setReceiverId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const userId = localStorage.getItem("userId");

  const loadMessages = async () => {
    if (!receiverId) return;
    try {
      
      const response = await api.get(`/Messages/conversation/${userId}/${receiverId}`);
      setMessages(response.data);
    } catch (err) {
      console.error("Failed to load messages:", err);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !receiverId) return;
    try {
      await api.post("/Messages", {
        senderId: parseInt(userId),
        receiverId: parseInt(receiverId),
        content: message,
      });
      setMessage("");
      loadMessages(); 
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  useEffect(() => {
    if (!receiverId) return;
    
    loadMessages();
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, [receiverId]);

  return (
    <div className="max-w-md mx-auto mt-10 border rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Chat</h2>

      <input
        type="number"
        placeholder="Enter Receiver ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
        className="border p-2 rounded w-full mb-3"
      />

      <div className="h-64 overflow-y-auto border p-2 rounded mb-3">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-sm">No messages yet.</p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`p-2 my-1 rounded ${
                msg.senderId == userId
                  ? "bg-blue-100 text-right"
                  : "bg-gray-100 text-left"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p className="text-xs text-gray-500">
                {new Date(msg.sentAt).toLocaleTimeString()} 
              </p>
            </div>
          ))
        )}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 rounded flex-grow"
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}