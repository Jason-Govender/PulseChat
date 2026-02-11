document.addEventListener("DOMContentLoaded", loadUsername);
document.getElementById("edit-username").addEventListener("submit", editUsername);

function loadUsername() {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    document.getElementById("current-username").textContent = currentUser.username;
}

function editUsername(event) {
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

    document.getElementById("new-username").value = "";
}