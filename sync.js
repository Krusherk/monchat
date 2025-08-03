import { Multisynq } from 'https://cdn.multisynq.com/v1.js';

export function setupMultisynq(onMessage, onTyping) {
  const room = 'cracked-devs-room';
  const apiKey = '2ndohxjGirkf4wcTbvKV1GzdwPsCqKVmtg1YqBNsK';

  const multisynq = new Multisynq({ apiKey, room });

  multisynq.on('message', onMessage);
  multisynq.on('typing', onTyping);

  window.multisynq = multisynq;
}
