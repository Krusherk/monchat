import { connectWallet } from './monad.js';

document.addEventListener('DOMContentLoaded', () => {
  const chat = document.getElementById('chat');
  const input = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendMessage');
  const connectBtn = document.getElementById('connectWallet');

  let username = '';

  const askUsername = () => {
    const name = prompt("Pick a username:");
    if (name && name.trim() !== '') {
      username = name.trim();
    } else {
      username = 'Anonymous';
    }
  };

  const createMessageBubble = (text, sender) => {
    const container = document.createElement('div');
    container.style.marginBottom = '1rem';

    const nameTag = document.createElement('div');
    nameTag.textContent = sender;
    nameTag.style.fontWeight = '600';
    nameTag.style.marginBottom = '0.2rem';
    nameTag.style.color = '#00aaff';
    nameTag.style.fontSize = '0.85rem';

    const bubble = document.createElement('p');
    bubble.textContent = text;

    container.appendChild(nameTag);
    container.appendChild(bubble);
    chat.appendChild(container);
    chat.scrollTop = chat.scrollHeight;
  };

  sendBtn.onclick = () => {
    const message = input.value.trim();
    if (message) {
      createMessageBubble(message, username);
      input.value = '';
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendBtn.click();
  });

  connectBtn.onclick = () => connectWallet();

  // Ask for username on load
  askUsername();
});
