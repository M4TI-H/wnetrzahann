import { defineStore } from "pinia";

export const useContactStore = defineStore("contact", {
  state: () => ({
    isContactFormOpen: false as boolean,
  }),
  actions: {
    openContactForm() {
      this.isContactFormOpen = true;
    },
    closeContactForm() {
      this.isContactFormOpen = false;
    },
  },
});
