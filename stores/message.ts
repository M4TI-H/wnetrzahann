import type Message from "~/models/Message";

export const useErrorStore = defineStore("error", {
  state: () => ({
    messages: [] as (Message & { id: number })[],
  }),
  actions: {
    addMessage(data: Message) {
      const id = Date.now() + Math.random();
      const displayInterval = 5000;

      this.messages.push({ ...data, id });

      setTimeout(() => {
        this.removeMessage(id);
      }, displayInterval);
    },

    removeMessage(id: number) {
      this.messages = this.messages.filter((m) => m.id !== id);
    },
  },
});
