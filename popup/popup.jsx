import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const Popup = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    chrome.storage.local.get(['messages'], (result) => {
      setMessages(result.messages || []);
      setLoading(false);
    });
  }, []);

  const markAsRead = (id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, read: true } : msg
      )
    );
    
    chrome.storage.local.set({ messages });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (messages.length === 0) {
    return <div>No new messages.</div>;
  }

  return (
    <div>
      <ul>
        {messages.map((msg) => (
          <li key={msg.id}>
            <p>{msg.content}</p>
            <button onClick={() => markAsRead(msg.id)}>Mark as Read</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<Popup />, document.getElementById('popup-root'));