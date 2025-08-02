import { connectWallet } from './monad.js';
import { initMultisynq, sendMessage, listenForMessages, broadcastTyping } from './sync.js';

let username = '';

document.addEventListener('DOMContentLoaded', () => {
  const chat = document.getElementById('chat');
  const input = document.getElementById('messageInput');
  const sendBtn = document.getElementById('sendMessage');
  const connectBtn = document.getElementById('connectWallet');
  const typingIndicator = document.getElementById('typingIndicator');

  connectBtn.onclick = () => connectWallet();

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendBtn.click();
    else broadcastTyping(username);
  });

  sendBtn.onclick = () => {
    const message = input.value.trim();
    if (message) {
      appendMessage(username, message, true);
      sendMessage({ name: username, text: message });
      input.value = '';
    }
  };

  function appendMessage(name, text, isSelf = false) {
    const p = document.createElement('div');
    p.className = 'message' + (isSelf ? ' self' : '');
    p.textContent = `${name}: ${text}`;
    chat.appendChild(p);
    chat.scrollTop = chat.scrollHeight;
  }

  document.getElementById('confirmName').onclick = () => {
    const entered = document.getElementById('usernameInput').value.trim();
    username = entered || getRandomName();
    document.getElementById('nameModal').style.display = 'none';
    initMultisynq((data) => {
      if (data.type === 'msg') {
        appendMessage(data.name, data.text);
      }
      if (data.type === 'typing' && data.name !== username) {
        typingIndicator.style.display = 'block';
        clearTimeout(typingIndicator._hideTimer);
        typingIndicator._hideTimer = setTimeout(() => {
          typingIndicator.style.display = 'none';
        }, 1000);
      }
    });
  };
});

function getRandomName() {
  const names = ['Jack', 'Annie', 'Mona', 'Leo', 'Ray', 'Suki', 'Kai', 'Lara'];
  return names[Math.floor(Math.random() * names.length)];
}
