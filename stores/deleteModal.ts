import { defineStore } from "pinia";
import { useDeleteImages } from "~/composables/images/useDeleteImages";
import { useDeleteProject } from "~/composables/projects/useDeleteProject";
import type Project from "~/models/Project";

export const useDeleteModalStore = defineStore("deleteModal", {
  state: () => ({
    isModalOpened: false as boolean,
    project: null as Project | null,
    deleteModalLoading: false as boolean,
  }),
  actions: {
    openModal(data: Project) {
      this.isModalOpened = true;
      this.project = data;
    },
    async deleteProject() {
      const { deleteLoading, deleteProject } = useDeleteProject();
      const { imageDeleteLoading, deleteImages } = useDeleteImages();

      if (!this.project) return;
      const projectId = this.project.id;
      try {
        this.deleteModalLoading = true;

        await deleteImages(this.project.id);

        await deleteProject(projectId);

        await refreshNuxtData("projects-list");

        this.project = null;
        this.closeModal();
      } catch (error) {
        console.error(error);
      } finally {
        this.deleteModalLoading = false;
      }
    },
    closeModal() {
      this.project = null;
      this.isModalOpened = false;
    },
  },
});
