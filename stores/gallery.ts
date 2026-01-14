import { defineStore } from "pinia";

export const useGalleryStore = defineStore("gallery", {
  state: () => ({
    filter: "wszystkie" as string,
  }),
  actions: {
    async filterProjects(category: string) {
      this.filter = category;

      await refreshNuxtData("projects-gallery");
    },
  },
});
