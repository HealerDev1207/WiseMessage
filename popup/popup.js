document.addEventListener('DOMContentLoaded', function () {
  const messagesContainer = document.getElementById('messages');
  const loadingElement = document.getElementById('loading');
  const noMessagesElement = document.getElementById('no-messages');

  // Fetch messages from Chrome storage
  chrome.storage.local.get("messages", function (result) {
    const messages = result.messages || [];
    
    // Hide loading element
    loadingElement.style.display = 'none';

    if (messages.length === 0) {
      // Show "No messages" if no messages are present
      noMessagesElement.style.display = 'block';
    } else {
      // Display messages
      messages.forEach(function (message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('border', 'p-4', 'mb-4', 'rounded-lg', 'shadow-md');

        const contentElement = document.createElement('p');
        contentElement.classList.add('text-lg');
        if (message.priority === 'high') {
          contentElement.classList.add('text-red-500');
        } else {
          contentElement.classList.add('text-gray-800');
        }
        contentElement.textContent = message.content;
        messageElement.appendChild(contentElement);

        const timestampElement = document.createElement('p');
        timestampElement.classList.add('text-sm', 'text-gray-500');
        const timestamp = new Date(message.timestamp);
        timestampElement.textContent = `Received at: ${timestamp.toLocaleString()}`;
        messageElement.appendChild(timestampElement);

        if (!message.read) {
          const markAsReadButton = document.createElement('button');
          markAsReadButton.textContent = 'Mark as Read';
          markAsReadButton.classList.add('mt-2', 'bg-blue-500', 'text-white', 'px-4', 'py-2', 'rounded-lg');
          markAsReadButton.addEventListener('click', function () {
            markMessageAsRead(message.id, messageElement);
          });
          messageElement.appendChild(markAsReadButton);
        }

        messagesContainer.appendChild(messageElement);
      });
    }
  });

  function markMessageAsRead(messageId, messageElement) {
    // Update the message's `read` status in storage
    chrome.storage.local.get("messages", function (result) {
      const messages = result.messages || [];
      const updatedMessages = messages.map(function (message) {
        if (message.id === messageId) {
          message.read = true;
        }
        return message;
      });

      // Save updated messages back to storage
      chrome.storage.local.set({ messages: updatedMessages }, function () {
        // Remove the "Mark as Read" button
        const markAsReadButton = messageElement.querySelector('button');
        if (markAsReadButton) {
          markAsReadButton.remove();
        }

        // Clear the badge text if all messages are read
        const unreadCount = updatedMessages.filter(msg => !msg.read).length;
        chrome.action.setBadgeText({ text: unreadCount > 0 ? unreadCount.toString() : '' });
      });
    });
  }
});
