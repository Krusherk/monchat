import { connectWallet } from './monad.js';

document.addEventListener('DOMContentLoaded', () => {
  const chat = document.getElementById('chat');
  const input = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendMessage');
  const connectBtn = document.getElementById('connectWallet');

  sendBtn.onclick = () => {
    const message = input.value.trim();
    if (message) {
      const p = document.createElement('p');
      p.textContent = message;
      chat.appendChild(p);
      chat.scrollTop = chat.scrollHeight;
      input.value = '';
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });

  connectBtn.onclick = () => connectWallet();
});
