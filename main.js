import { connectWallet } from './monad.js';

let username = '';

document.addEventListener('DOMContentLoaded', () => {
  const chat = document.getElementById('chat');
  const input = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendMessage');
  const connectBtn = document.getElementById('connectWallet');
  const typingStatus = document.getElementById('typingStatus');
  const usernameInput = document.getElementById('usernameInput');
  const setUsernameBtn = document.getElementById('setUsername');
  const usernameSetup = document.getElementById('usernameSetup');
  const chatSection = document.getElementById('chatSection');

  connectBtn.onclick = () => connectWallet();

  setUsernameBtn.onclick = () => {
    const name = usernameInput.value.trim();
    username = name || `User${Math.floor(Math.random() * 1000)}`;
    usernameSetup.style.display = 'none';
    chatSection.style.display = 'flex';
  };

  sendBtn.onclick = () => {
    const message = input.value.trim();
    if (message) {
      appendMessage(username, message);
      input.value = '';
      typingStatus.textContent = '';
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendBtn.click();
    else typingStatus.textContent = `${username} is typing...`;

    clearTimeout(window.typingTimeout);
    window.typingTimeout = setTimeout(() => {
      typingStatus.textContent = '';
    }, 1000);
  });

  function appendMessage(sender, message) {
    const container = document.createElement('div');
    container.className = 'message-container';

    const nameEl = document.createElement('div');
    nameEl.className = 'username';
    nameEl.textContent = sender;

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = message;

    container.appendChild(nameEl);
    container.appendChild(bubble);
    chat.appendChild(container);
    chat.scrollTop = chat.scrollHeight;
  }
});
