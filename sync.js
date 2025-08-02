import Multisynq from 'https://cdn.multisynq.chat/sdk/v1.js';

export function setupMultisynq(onMsg, onTyping) {
  const apiKey = '2ndohxjGirkf4wcTbvKV1GzdwPsCqKVmtg1YqBNsK';

  const multisynq = new Multisynq(apiKey, { room: 'monchat' });

  multisynq.onMessage((msg) => {
    onMsg(msg);
  });

  multisynq.onTyping((user) => {
    onTyping(user);
  });

  window.multisynq = multisynq;
}
