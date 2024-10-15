# Wide Messages Chrome Extension

## Overview
This Chrome extension displays organization-wide messages from the admin to users. It shows unread messages via a badge icon and allows users to mark messages as read. Message data is stored locally using the Chrome Storage API.

## Setup Instructions
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Build the React project using `npm run build`.
4. Load the extension into Chrome:
   - Go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the extension folder

## Future Improvements
- Add message categories or sorting by priority.
- Implement notification sounds for high-priority messages.
- Provide an options page for user preferences like notification settings.

## Architecture Decisions
- Used React for modular and component-based UI.
- TailwindCSS for quick and responsive styling.
- Chrome's storage API to handle message persistence.
