import { createClient } from 'https://cdn.skypack.dev/@multisynq/client';

export function setupMultisynq(onMessage, onTyping) {
  const multisynq = createClient({
    apiKey: '2ndohxjGirkf4wcTbvKV1GzdwPsCqKVmtg1YqBNsK',
    room: 'cracked-devs-room',
  });

  multisynq.on('message', onMessage);
  multisynq.on('typing', onTyping);

  window.multisynq = multisynq;
}
