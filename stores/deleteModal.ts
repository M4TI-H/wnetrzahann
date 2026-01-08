import { defineStore } from "pinia";
import type Project from "~/models/Project";

export const useDeleteModalStore = defineStore("deleteModal", {
  state: () => ({
    isModalOpened: false as boolean,
    project: {} as Project,
  }),
  actions: {
    openModal(data: Project) {
      this.isModalOpened = true;
      this.project = data;
    },
    deleteProject() {
      console.log("Deleting", this.project.id);
    },
    closeModal() {
      this.isModalOpened = false;
    },
  },
});
