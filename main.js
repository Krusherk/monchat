import { connectWallet } from './monad.js';

document.addEventListener('DOMContentLoaded', () => {
  const chat = document.getElementById('chat');
  const input = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendMessage');
  const connectBtn = document.getElementById('connectWallet');

  const createMessageBubble = (text) => {
    const p = document.createElement('p');
    p.textContent = text;
    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight;
  };

  sendBtn.onclick = () => {
    const message = input.value.trim();
    if (message) {
      createMessageBubble(message);
      input.value = '';
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });

  connectBtn.onclick = () => connectWallet();
});
