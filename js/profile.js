const loadUsername = () => {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    document.getElementById("current-username").textContent = currentUser.username;
}

const editUsername = (event) => {
    event.preventDefault();
    const newUsername = document.getElementById("new-username").value.trim();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.some(user => user.username === newUsername);
    if( userExists) {
        alert("Username Has Been Taken");
        return;
    }

    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const oldUsername = currentUser.username;
    currentUser.username = newUsername;
    sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
    document.getElementById("current-username").textContent = newUsername;

    const updatedUsers = users.map(user => {
        if (user.username === oldUsername) {
            return { ...user, username: newUsername };
        }
        return user;
    });
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    migrateChatSenderUsername(oldUsername, newUsername);

    document.getElementById("new-username").value = "";
}


const migrateChatSenderUsername = (oldUsername, newUsername) => {
  const THREADS_KEY = "threads";
  const threads = JSON.parse(localStorage.getItem(THREADS_KEY)) || {};

  for (const thread of Object.values(threads)) {

    if (Array.isArray(thread.members)) {
      thread.members = thread.members.map(m => (m === oldUsername ? newUsername : m));
    }

    if (Array.isArray(thread.messages)) {
      thread.messages = thread.messages.map(msg => ({
        ...msg,
        sender: msg.sender === oldUsername ? newUsername : msg.sender
      }));
    }
  }

  localStorage.setItem(THREADS_KEY, JSON.stringify(threads));
}

document.addEventListener("DOMContentLoaded", loadUsername);
document.getElementById("edit-username").addEventListener("submit", editUsername);

