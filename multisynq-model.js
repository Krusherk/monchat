import * as Multisynq from "https://cdn.skypack.dev/multisynq";

export class ChatModel extends Multisynq.Model {
  init() {
    this.views = new Map();
    this.participants = 0;
    this.history = [];
    this.inactivity_timeout_ms = 20 * 60 * 1000;
    this.lastPostTime = null;

    this.subscribe(this.sessionId, "view-join", this.viewJoin);
    this.subscribe(this.sessionId, "view-exit", this.viewExit);
    this.subscribe("input", "newPost", this.newPost);
    this.subscribe("input", "reset", this.resetHistory);
  }

  viewJoin(viewId) {
    if (!this.views.has(viewId)) {
      const names = ["Jack", "Mona", "Zed", "Nina", "Acorn"];
      this.views.set(viewId, names[Math.floor(Math.random() * names.length)]);
    }
    this.participants++;
    this.publish("viewInfo", "refresh");
  }

  viewExit(viewId) {
    this.views.delete(viewId);
    this.participants--;
    this.publish("viewInfo", "refresh");
  }

  newPost(post) {
    const user = this.views.get(post.viewId);
    const html = `<b>${user}:</b> ${this.escape(post.text)}`;
    this.addToHistory({ viewId: post.viewId, html });
    this.lastPostTime = this.now();
    this.future(this.inactivity_timeout_ms).resetIfInactive();
  }

  addToHistory(item) {
    this.history.push(item);
    if (this.history.length > 100) this.history.shift();
    this.publish("history", "refresh");
  }

  resetIfInactive() {
    if (this.lastPostTime !== this.now() - this.inactivity_timeout_ms) return;
    this.resetHistory("due to inactivity");
  }

  resetHistory(reason) {
    this.history = [{ html: `<i>Chat reset ${reason}</i>` }];
    this.lastPostTime = null;
    this.publish("history", "refresh");
  }
}
