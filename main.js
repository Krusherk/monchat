import { ChatModel } from "./multisynq-model.js";
import { connectWallet } from "./monad.js";
import * as Multisynq from "https://cdn.skypack.dev/multisynq";

const model = new ChatModel();
const view = new Multisynq.View(model);

view.send = function () {
  const text = document.getElementById("textIn").value;
  if (!text) return;
  if (text === "/reset") {
    this.publish("input", "reset", "user request");
  } else {
    this.publish("input", "newPost", { viewId: this.viewId, text });
  }
  document.getElementById("textIn").value = "";
};

view.refreshHistory = function () {
  document.getElementById("textOut").innerHTML =
    model.history.map((msg) => msg.html).join("<br>");
};

view.refreshViewInfo = function () {
  document.getElementById("nickname").innerHTML =
    "<b>Nickname:</b> " + model.views.get(this.viewId);
  document.getElementById("viewCount").innerHTML =
    "<b>Users:</b> " + model.participants;
};

view.subscribe("history", "refresh", view.refreshHistory);
view.subscribe("viewInfo", "refresh", view.refreshViewInfo);
view.refreshHistory();
view.refreshViewInfo();

document.getElementById("sendButton").onclick = () => view.send();
document.getElementById("textIn").onkeydown = (e) => {
  if (e.key === "Enter") view.send();
};
document.getElementById("connectWallet").onclick = connectWallet;
