import { connectWallet } from './monad.js';

document.addEventListener('DOMContentLoaded', () => {
  const chat = document.getElementById('chat');
  const input = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendMessage');
  const connectBtn = document.getElementById('connectWallet');
  const typingStatus = document.getElementById('typingStatus');

  let username = '';
  const users = []; // optional in-memory storage
  let typingTimeout;

  const askUsername = () => {
    const name = prompt("Choose your username:");
    username = name?.trim() || "Anonymous";
    if (!users.includes(username)) {
      users.push(username);
    }
  };

  const createMessage = (sender, text) => {
    const container = document.createElement('div');
    container.className = 'message-container';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'username';
    nameDiv.textContent = sender;

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;

    container.appendChild(nameDiv);
    container.appendChild(bubble);
    chat.appendChild(container);
    chat.scrollTop = chat.scrollHeight;
  };

  const handleTyping = () => {
    typingStatus.textContent = `${username} is typing...`;
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      typingStatus.textContent = '';
    }, 1000);
  };

  sendBtn.onclick = () => {
    const text = input.value.trim();
    if (!text) return;
    createMessage(username, text);
    input.value = '';
    typingStatus.textContent = '';
  };

  input.addEventListener('input', handleTyping);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });

  connectBtn.onclick = () => connectWallet();
  askUsername();
});

