
document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser") || "null");
  if (!currentUser) {
    location.href = "../index.html";
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const contacts = users.filter(u => u.username !== currentUser.username);

  const membersContainer = document.getElementById("members"); 
  const form = document.getElementById("create-group-form");
  const nameInput = document.getElementById("group-name");

  membersContainer.innerHTML = contacts.map(u => `
    <label class="member-option">
      <input type="checkbox" value="${u.username}">
      <span>${u.username}</span>
    </label>
  `).join("");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = nameInput.value.trim();
    if (!name) {
      alert("Please enter a group name.");
      return;
    }

    const selected = Array.from(membersContainer.querySelectorAll('input[type="checkbox"]:checked'))
      .map(cb => cb.value);

    const members = Array.from(new Set([currentUser.username, ...selected]));

    const groups = JSON.parse(localStorage.getItem("groups") || "[]");
    if (groups.some(g => g.name.toLowerCase() === name.toLowerCase())) {
      alert("A group with that name already exists. Choose a different name.");
      return;
    }

    const group = {
      id: "g_" + Date.now(),
      name,
      members
    };

    groups.push(group);
    localStorage.setItem("groups", JSON.stringify(groups));

    const threads = JSON.parse(localStorage.getItem("threads") || "{}");
    const threadId = "group_" + group.id;

    if (!threads[threadId]) {
      threads[threadId] = {
        id: threadId,
        type: "group",
        name: group.name,
        members: group.members,
        messages: []
      };
      localStorage.setItem("threads", JSON.stringify(threads));
    }

    location.href = "home.html";
  });
});