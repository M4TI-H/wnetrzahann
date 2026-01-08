import { defineStore } from "pinia";
import type Project from "~/models/Project";

export const useProjectStore = defineStore("project", {
  state: () => ({
    isProjectFormOpen: false as boolean,
    mode: "new" as "new" | "edit",
    data: {} as Project,
  }),
  actions: {
    openProjectForm(mode: "new" | "edit", data?: Project) {
      this.isProjectFormOpen = true;
      this.mode = mode;
      if (data) this.data = data;
    },
    closeProjectForm() {
      this.isProjectFormOpen = false;
    },
  },
});
