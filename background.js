chrome.alarms.create('fetchMessages', { periodInMinutes: 1 });

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'fetchMessages') {
    fetchMessages();
  }
});

const fetchMessages = async () => {
  const mockApiResponse = {
    messages: [
      {
        id: 'msg123',
        content: 'Team meeting at 3 PM today 🙂',
        priority: 'high',
        timestamp: '2024-09-30T15:00:00Z',
        read: false,
      },
    ],
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