const API_KEY = "2ndohxjGirkf4wcTbvKV1GzdwPsCqKVmtg1YqBNsK";
let ws;

export function initMultisynq(callback) {
  ws = new WebSocket(`wss://europe.multisynq.live/socket?api_key=${API_KEY}`);

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    callback(data);
  };

  ws.onopen = () => {
    console.log("🔌 Connected to Multisynq");
  };

  ws.onerror = (err) => {
    console.error("Multisynq error:", err);
  };
}

export function sendMessage(payload) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'msg', ...payload }));
  }
}

export function broadcastTyping(name) {
  if (ws && ws.readyState === WebSocket.OPEN) {
    ws.send(JSON.stringify({ type: 'typing', name }));
  }
}
