document.addEventListener('DOMContentLoaded', () => {
    const popupRoot = document.getElementById('popup-root');
    let messages = [];
    let loading = true;
  
    // Helper function to update the popup UI
    function renderMessages() {
      popupRoot.innerHTML = '';
  
      if (loading) {
        popupRoot.innerHTML = '<div>Loading...</div>';
        return;
      }
  
      if (messages.length === 0) {
        popupRoot.innerHTML = '<div>No new messages.</div>';
        return;
      }
  
      const ul = document.createElement('ul');
      messages.forEach((msg) => {
          const li = document.createElement('li');
          const p = document.createElement('p');
          p.textContent = msg.content;
    
          const button = document.createElement('button');
          button.textContent = 'Mark as Read';
          button.addEventListener('click', () => markAsRead(msg.id));
    
          li.appendChild(p);
          li.appendChild(button);
          ul.appendChild(li);
      });

      popupRoot.appendChild(ul);
    }
  
    // Fetch messages from Chrome storage
    function fetchMessages() {
        chrome.storage.local.get(['messages'], (result) => {
            messages = result.messages || [];
            loading = false;
            renderMessages();
        });
    }
  
    // Mark a message as read
    function markAsRead(id) {
        messages = messages.map((msg) =>
            msg.id === id ? { ...msg, read: true } : msg
        );
  
        // Update messages in Chrome storage
        chrome.storage.local.set({ messages }, renderMessages);
    }
  
    // Initial fetch and rendering
    fetchMessages();
});
  