
const THREADS_KEY = "threads";
const chatHeader = document.querySelector(".chat-header");
const chatMessages = document.querySelector(".chat-messages");
const welcomeContainer = document.querySelector(".welcome-container");

const renderWelcomeHeader = () => {
  if (!chatHeader) return;

  chatHeader.innerHTML = `
    <button class="mobile-menu-btn" type="button" aria-label="Open menu">☰</button>
    <div class="chat-header-avatar"></div>
    <div class="chat-header-title">PulseChat</div>`;

  hamburgerMenuState();
}

//Helper functions for managing threads and messages in localStorage and sessionStorage

const setActiveThread = (data) => {
  sessionStorage.setItem("activeThread", JSON.stringify(data));
}

const getActiveThread = () => {
  const raw = sessionStorage.getItem("activeThread");
  return raw ? JSON.parse(raw) : null;
}


const loadThreads = () => {
  return JSON.parse(localStorage.getItem(THREADS_KEY)) || {};
}

const saveThreads = (threads) => {
  localStorage.setItem(THREADS_KEY, JSON.stringify(threads));
}


const makeDMThreadId = (userA, userB) => {
  return "dm_" + [userA, userB].sort().join("_");
}

const makeGroupThreadId = (groupName) => {
  return "group_" + groupName;
}

const ensureThread = (threadId, meta) => {
  const threads = loadThreads();

  if (!threads[threadId]) {
    threads[threadId] = {
      id: threadId,
      ...meta,
      messages: []
    };
    saveThreads(threads);
  }

  return threads[threadId];
}

const addMessage = (threadId, sender, text) => {
  const threads = loadThreads();
  const thread = threads[threadId];
  if (!thread) return;

  thread.messages.push({
    id: "m_" + Date.now(),
    sender,
    text,
    ts: Date.now()
  });

  saveThreads(threads);
}

const ensureChatInputUI = () => {
  if (document.querySelector(".chat-input")) return;

  const wrapper = document.createElement("div");
  wrapper.className = "chat-input";

  wrapper.innerHTML = `<input id="message-input" type="text" placeholder="Type a message..." autocomplete="off" />
  <button id="send-btn" type="button" aria-label="Send message">
  <span class="send-icon"></span>
  </button>`;

  chatMessages.after(wrapper);

  const sendBtn = document.getElementById("send-btn");
  const input = document.getElementById("message-input");

  sendBtn.addEventListener("click", handleSend);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
  });
}

const handleSend = () => {
  const active = getActiveThread();
  if (!active) return;

  const input = document.getElementById("message-input");
  const text = input.value.trim();
  if (!text) return;

  addMessage(active.id, currentUser.username, text);
  input.value = "";

  renderThread(active.id, active.title);
}

const renderThread = (threadId, title) => {
  ensureChatInputUI();

  if (welcomeContainer) {
    welcomeContainer.style.display = "none";
  }

  if (chatHeader) {
    chatHeader.innerHTML = `
    <button class="mobile-menu-btn" type="button" aria-label="Open menu">☰</button>
    <div class="chat-header-avatar"></div>
    <div class="chat-header-title">${title || ""}</div>`;
  }

  hamburgerMenuState();

  const threads = loadThreads();
  const thread = threads[threadId];

  chatMessages.innerHTML = "";

  if (!thread || thread.messages.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-chat";
    empty.textContent = "No messages yet. Say hi";
    chatMessages.appendChild(empty);
    return;
  }

  thread.messages.forEach(msg => {
        const isMe = msg.sender === currentUser.username;

        const row = document.createElement("div");
        row.className = "msg-row " + (isMe ? "msg-row-me" : "msg-row-them");

        const bubble = document.createElement("div");
        bubble.className = "bubble " + (isMe ? "bubble-me" : "bubble-them");

        const name = document.createElement("div");
        name.className = "bubble-name";
        name.textContent = isMe ? "You:" : `${msg.sender}:`;

        const text = document.createElement("div");
        text.className = "bubble-text";
        text.textContent = msg.text;

        const time = document.createElement("div");
        time.className = "bubble-time";
        time.textContent = new Date(msg.ts).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

        bubble.appendChild(name);
        bubble.appendChild(text);
        bubble.appendChild(time);

        row.appendChild(bubble);
        chatMessages.appendChild(row);
    });

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

const hamburgerMenuState = () =>{
  const menuBtn = document.querySelector(".mobile-menu-btn");
  const sidebar = document.querySelector(".side-bar");
  const overlay = document.getElementById("mobile-overlay");

  function openDrawer(){
    sidebar?.classList.add("is-open");
    overlay?.classList.add("is-open");
  }

  function closeDrawer(){
    sidebar?.classList.remove("is-open");
    overlay?.classList.remove("is-open");
  }

  if (menuBtn) menuBtn.onclick = openDrawer;
  if (overlay) overlay.onclick = closeDrawer;
}

  document.addEventListener("DOMContentLoaded", () => {
  const active = getActiveThread();

  if (active) {
    renderThread(active.id, active.title);
  } else {
    renderWelcomeHeader();
  }
});

addEventListener("storage", (e) => {
  if (e.key === THREADS_KEY) {
    const active = getActiveThread();
    if (active) {
      renderThread(active.id, active.title);
    }
  }
});