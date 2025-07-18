import { ChatModel } from "./multisynq-model.js";
import { connectWallet } from "./monad.js";
import * as Multisynq from "https://cdn.skypack.dev/multisynq";

window.onload = () => {
  const model = new ChatModel();
  const view = new Multisynq.View(model);

  // Attach event listeners safely after DOM loads
  const textIn = document.getElementById("textIn");
  const textOut = document.getElementById("textOut");
  const nicknameBox = document.getElementById("nickname");
  const viewCountBox = document.getElementById("viewCount");
  const sendButton = document.getElementById("sendButton");
  const connectBtn = document.getElementById("connectWallet");

  // Send message
  view.send = function () {
    const text = textIn.value;
    if (!text) return;
    if (text === "/reset") {
      this.publish("input", "reset", "user request");
    } else {
      this.publish("input", "newPost", { viewId: this.viewId, text });
    }
    textIn.value = "";
  };

  // Display updates
  view.refreshHistory = function () {
    textOut.innerHTML = model.history.map((m) => m.html).join("<br>");
    textOut.scrollTop = textOut.scrollHeight;
  };

  view.refreshViewInfo = function () {
    nicknameBox.innerHTML = `<b>Nickname:</b> ${model.views.get(this.viewId)}`;
    viewCountBox.innerHTML = `<b>Users:</b> ${model.participants}`;
  };

  // Subscribe to model updates
  view.subscribe("history", "refresh", view.refreshHistory);
  view.subscribe("viewInfo", "refresh", view.refreshViewInfo);
  view.refreshHistory();
  view.refreshViewInfo();

  // Auto-reset chat if alone
  if (
    model.participants === 1 &&
    !model.history.find((item) => item.viewId === view.viewId)
  ) {
    view.publish("input", "reset", "new participant");
  }

  // UI events
  sendButton.onclick = () => view.send();
  textIn.onkeydown = (e) => {
    if (e.key === "Enter") view.send();
  };
  connectBtn.onclick = () => connectWallet();
};
