import { defineStore } from "pinia";

export const useCookiesModalStore = defineStore("cookies", {
  state: () => ({
    isModalOpened: false as boolean,
  }),
  actions: {
    openModal() {
      this.isModalOpened = true;
    },

    closeModal() {
      this.isModalOpened = false;
    },
  },
});
