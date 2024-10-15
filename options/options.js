document.addEventListener('DOMContentLoaded', () => {
    // Load saved options
    chrome.storage.sync.get(['enableNotifications', 'enableSounds'], (result) => {
        document.getElementById('enableNotifications').checked = result.enableNotifications || false;
        document.getElementById('enableSounds').checked = result.enableSounds || false;
    });

    // Save options when the "Save" button is clicked
    document.getElementById('save').addEventListener('click', () => {
        const enableNotifications = document.getElementById('enableNotifications').checked;
        const enableSounds = document.getElementById('enableSounds').checked;

        // Save options using Chrome storage API
        chrome.storage.sync.set({ enableNotifications, enableSounds }, () => {
            alert('Options saved.');
        });
    });
});