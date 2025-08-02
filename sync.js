import { Multisynq } from 'multisynq';

const API_KEY = '2ndohxjGirkf4wcTbvKV1GzdwPsCqKVmtg1YqBNsK';

export function setupMultisynq(onReceive, onTyping) {
  const sync = new Multisynq(API_KEY);

  sync.onMessage(data => {
    if (onReceive) onReceive(data);
  });

  sync.onTyping(user => {
    if (onTyping) onTyping(user);
  });

  window.multisynq = sync;
}