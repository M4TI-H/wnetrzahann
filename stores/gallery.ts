import { defineStore } from "pinia";

export const useGalleryStore = defineStore("gallery", {
  state: () => ({
    filter: "wszystkie" as string,
    searchQuery: "",
  }),
  actions: {
    async filterProjects(category: string) {
      this.filter = category;
    },
    async setSearch(query: string) {
      this.searchQuery = query;
      if (query.trim() !== "") {
        this.filter = "wszystkie";
      }
    },
  },
});
