import { connectWallet } from './monad.js';

document.addEventListener('DOMContentLoaded', () => {
  const socket = io('https://YOUR_BACKEND_URL'); // Replace with your backend URL
  const chat = document.getElementById('chat');
  const input = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendMessage');
  const connectBtn = document.getElementById('connectWallet');
  const typingStatus = document.getElementById('typingStatus');
  const walletInfo = document.getElementById('walletInfo');

  let username = prompt("Enter your username:")?.trim() || "Anonymous";

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

  input.addEventListener('input', () => {
    socket.emit('typing', username);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });

  sendBtn.onclick = () => {
    const text = input.value.trim();
    if (!text) return;
    socket.emit('message', { username, text });
    input.value = '';
    typingStatus.textContent = '';
  };

  socket.on('message', ({ username, text }) => {
    createMessage(username, text);
  });

  socket.on('typing', (user) => {
    typingStatus.textContent = `${user} is typing...`;
    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      typingStatus.textContent = '';
    }, 1500);
  });

  connectBtn.onclick = () => connectWallet(walletInfo);
});
