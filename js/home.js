const header = document.querySelector(".section-header");
const contactsList = document.querySelector(".contacts-list");
const arrow = document.querySelector(".arrow");
const placeholderAvatar = "../assets/images/placeholder.png"; 
const users = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
const displayUsername = document.querySelector(".username");



if (!currentUser) {
  location.replace("index.html");
}

header.addEventListener("click", () => {
    console.log("clicked");
  contactsList.classList.toggle("hidden");
  arrow.classList.toggle("rotate");
});



const logoutBtn = document.getElementById("logout");

logoutBtn.addEventListener("click", () => {

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) return;

  const onlineUsers = JSON.parse(localStorage.getItem("onlineUsers")) || [];

  const updatedOnline = onlineUsers.filter(
    username => username !== currentUser.username
  );

  localStorage.setItem("onlineUsers", JSON.stringify(updatedOnline));

  sessionStorage.clear(); 

  location.replace("index.html");
});

window.addEventListener("beforeunload", () => {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) return;

  const onlineUsers = JSON.parse(localStorage.getItem("onlineUsers")) || [];

  const updatedOnline = onlineUsers.filter(
    username => username !== currentUser.username
  );

  localStorage.setItem("onlineUsers", JSON.stringify(updatedOnline));
});




if (currentUser && displayUsername) {
  displayUsername.textContent = currentUser.username;
}

function getUser(user) {
  return user.username;
}

function getOnlineUsers() {
  const arr = JSON.parse(localStorage.getItem("onlineUsers")) || [];
  return new Set(arr);
}

function loadContacts() {
  contactsList.innerHTML = "";

  const onlineSet = getOnlineUsers();

  users.forEach((user) => {
    if (currentUser && user.username === currentUser.username) return;

    const contact = document.createElement("div");
    contact.classList.add("contact-item");
    contact.dataset.userKey = getUser(user);

    const avatar = document.createElement("div");
    avatar.classList.add("small-avatar");

    const img = document.createElement("img");
    img.src = placeholderAvatar;
    img.alt = "avatar";
    avatar.appendChild(img);

    const name = document.createElement("div");
    name.classList.add("contact-name");
    name.textContent = user.username;

    const dot = document.createElement("div");
    dot.classList.add("status-dot"); 

    if (onlineSet.has(getUser(user))) {
    dot.classList.add("status-dot-online");
    }

    contact.addEventListener("click", () => {

        document.querySelectorAll(".contact-item").forEach(item => {
            item.classList.remove("active");
        });

        contact.classList.add("active");

        openChatWith(user);
    });

    contact.appendChild(avatar);
    contact.appendChild(name);
    contact.appendChild(dot);

    contactsList.appendChild(contact);
  });
}

addEventListener("storage", (e) => {
  if (e.key === "users" || e.key === "onlineUsers") {

    const updatedUsers = JSON.parse(localStorage.getItem("users")) || [];
    users.length = 0;
    users.push(...updatedUsers);

    loadContacts();
  }
});

function openChatWith(user) {
  sessionStorage.setItem("activeChatUser", JSON.stringify(user));
  sessionStorage.setItem("activeChatUserKey", user.username); 
}



const groupsHeader = document.getElementById("groups-header");
const groupsList = document.getElementById("groups-list");
const groupsArrow = document.getElementById("groups-arrow");

groupsHeader.addEventListener("click", () => {
  groupsList.classList.toggle("hidden");
  groupsArrow.classList.toggle("rotate");
});

function loadGroups() {
  const groups = JSON.parse(localStorage.getItem("groups")) || [];
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser")) || null;

  groupsList.innerHTML = "";

  groups.forEach(group => {

    if (!currentUser || !group.members.includes(currentUser.username)) return;

    const groupItem = document.createElement("div");
    groupItem.classList.add("contact-item");
    groupItem.dataset.groupName = group.name;

    const avatar = document.createElement("div");
    avatar.classList.add("small-avatar");

    const img = document.createElement("img");
    img.src = "./assets/images/placeholder.png";
    avatar.appendChild(img);

    const name = document.createElement("div");
    name.classList.add("contact-name");
    name.textContent = group.name;

    groupItem.addEventListener("click", () => {
      document.querySelectorAll(".contact-item").forEach(item => {
        item.classList.remove("active");
      });

      groupItem.classList.add("active");
      openGroupChat(group);
    });

    groupItem.appendChild(avatar);
    groupItem.appendChild(name);

    groupsList.appendChild(groupItem);
  });
}

loadContacts();
loadGroups();
