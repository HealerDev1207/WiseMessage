import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import "./popup.css";

const Popup = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    chrome.storage.local.get("messages", (result) => {
      if (result.messages) {
        setMessages(result.messages);
      } else {
        setError("No messages available.");
      }
      setLoading(false);
    });
  }, []);

  const markAsRead = (id) => {
    const updatedMessages = messages.map((message) => {
      if (message.id === id) {
        message.read = true;
      }
      return message;
    });
    setMessages(updatedMessages);
    chrome.storage.local.set({ messages: updatedMessages });
    chrome.action.setBadgeText({ text: "" });
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Messages</h1>
      {messages.length === 0 && <p className="text-gray-500">No messages</p>}
      {messages.map((message) => (
        <div key={message.id} className="border p-4 mb-4 rounded-lg shadow-md">
          <p className={`text-lg ${message.priority === "high" ? "text-red-500" : "text-gray-800"}`}>
            {message.content}
          </p>
          <p className="text-sm text-gray-500">Received at: {new Date(message.timestamp).toLocaleString()}</p>
          {!message.read && (
            <button
              onClick={() => markAsRead(message.id)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
            >
              Mark as Read
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById("app"));