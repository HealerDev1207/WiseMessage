chrome.alarms.create('fetchMessages', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'fetchMessages') {
    fetchMessages();
  }
});

const fetchMessages = async () => {
  const mockApiResponse = {
    "messages": [
      {
        "id": "msg123",
        "content": "Team meeting at 3 PM today 🙂",
        "priority": "high",
        "timestamp": "2024-09-30T15:00:00Z",
        "read": false
      },
      {
        "id": "msg124",
        "content": "Please submit your timesheets by Friday.",
        "priority": "medium",
        "timestamp": "2024-10-01T10:00:00Z",
        "read": false
      },
      {
        "id": "msg125",
        "content": "New company policy on remote work.",
        "priority": "low",
        "timestamp": "2024-10-02T09:00:00Z",
        "read": true
      }
    ]
  };

  chrome.storage.local.get(['messages'], (result) => {
    const existingMessages = result.messages || [];
    const newMessages = mockApiResponse.messages.filter(
      (msg) => !existingMessages.some((m) => m.id === msg.id)
    );
    const updatedMessages = [...existingMessages, ...newMessages];
    chrome.storage.local.set({ messages: updatedMessages });
    if (newMessages.length > 0) {
      chrome.action.setBadgeText({ text: `${newMessages.length}` });
    }
  });
};