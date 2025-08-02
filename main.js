import { connectWallet } from './monad.js';
import { setupMultisynq } from './sync.js';

const randomNames = ['Jack', 'Luna', 'Milo', 'Zara', 'Leo', 'Nina', 'Kai', 'Mona', 'Ezra', 'Skye'];
let username = randomNames[Math.floor(Math.random() * randomNames.length)];

document.addEventListener('DOMContentLoaded', () => {
  const connectBtn = document.getElementById('connectWallet');
  const sendBtn = document.getElementById('sendMessage');
  const input = document.getElementById('messageInput');
  const chat = document.getElementById('chat');
  const typingStatus = document.getElementById('typingStatus');

  setupMultisynq(onReceiveMessage, onTyping);

  connectBtn.onclick = connectWallet;

  sendBtn.onclick = () => {
    const msg = input.value.trim();
    if (msg && username) {
      sendMessageToMultisynq(username, msg);
      input.value = '';
    }
  };

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') sendBtn.click();
    else emitTyping(username);
  });

  function onReceiveMessage(data) {
    const { user, text } = data;
    const container = document.createElement('div');
    container.className = 'message-container';
    container.innerHTML = `
      <div class="username">${user}</div>
      <div class="bubble">${text}</div>`;
    chat.appendChild(container);
    chat.scrollTop = chat.scrollHeight;
  }

  function onTyping(user) {
    typingStatus.textContent = `${user} is typing...`;
    setTimeout(() => (typingStatus.textContent = ''), 2000);
  }
});

window.sendMessageToMultisynq = (user, text) => {
  if (window.multisynq) {
    window.multisynq.send({ user, text });
  }
};

window.emitTyping = (user) => {
  if (window.multisynq) {
    window.multisynq.typing(user);
  }
};
