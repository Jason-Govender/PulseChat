# PulseChat

## Overview

PulseChat is a real-time chat application built using HTML, CSS, and Vanilla JavaScript.

The application allows multiple users to register, log in, and communicate through private and group chats. Chat history is persisted using `localStorage` to retain data across page refreshes.

The project follows clean coding principles, semantic HTML structure, organized CSS, and a structured Git workflow.

---

## Features

### Authentication
- User registration with unique username validation
- Login validation
- Logout functionality
- Username editing (optional enhancement)

### Chat Functionality
- Private one-on-one messaging
- Group chat creation and messaging
- Online user indicators
- Real-time interface updates via `localStorage` events
- Message timestamps
- Distinct message alignment for sender and receiver

### Data Persistence
- Messages stored in `localStorage`
- User data stored in JSON format
- Chat history retained after page refresh

### User Interface
- Two-panel layout:
  - Sidebar (users and groups)
  - Chat panel (messages and input field)
- Styled message bubbles with timestamps
- Responsive layout for mobile devices
- Slide-out sidebar on small screens
- Create Group page with selectable members

---

## Technologies Used

- HTML5 (semantic markup)
- CSS3 (Flexbox, responsive design)
- Vanilla JavaScript (no frameworks or libraries)
- Git and GitHub (branch protection rules applied)
- GitHub Pages (deployment)

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Jason-Govender/PulseChat.git
```

2. Open `index.html` in a browser  
   or deploy using GitHub Pages.

No external dependencies are required.

---

## Usage

1. Register a new user with a unique username.
2. Log in using your credentials.
3. Select a user to start a private chat.
4. Create a group and add members.
5. Send messages. Each message includes a timestamp.
6. Refresh the page to verify that messages persist.
7. Test responsiveness by resizing the browser or using mobile view.

---

## Development Guidelines

This project adheres to the specified requirements:

- Plain HTML, CSS, and JavaScript (no frameworks)
- Clean, readable, and modular code
- Semantic HTML
- Organized CSS structure
- Cross-browser compatibility
- Responsive design
- Structured branching workflow
- Protected main branch with pull request reviews

---

## Deployment

The application is hosted using GitHub Pages.

---

## Author

Jason Govender
