import { defineStore } from "pinia";
import { useCreateProject } from "~/composables/projects/useCreateProject";
import { useUpdateProject } from "~/composables/projects/useUpdateProject";
import { useUploadCover } from "~/composables/projects/useUploadCover";
import type Project from "~/models/Project";

export const useProjectStore = defineStore("project", {
  state: () => ({
    isProjectFormOpen: false as boolean,
    mode: "new" as "new" | "edit",
    data: null as Project | null,
    loading: false as boolean,
  }),
  actions: {
    openProjectForm(mode: "new" | "edit", data?: Project) {
      this.isProjectFormOpen = true;
      this.mode = mode;
      if (data) this.data = data;
    },
    closeProjectForm() {
      this.isProjectFormOpen = false;
      this.data = null;
    },
    async createProject(payload: any, imagesInputRef: any) {
      const { createProject } = useCreateProject();
      const { uploadCover } = useUploadCover();

      this.loading = true;
      try {
        const newProjectId = await createProject(payload);

        if (!newProjectId) {
          console.error("Nie udało się pobrać ID nowego projektu");
          return;
        }

        if (imagesInputRef.value) {
          const coverUrl = await imagesInputRef.value.uploadCoverImage(
            newProjectId
          );

          if (coverUrl) {
            await uploadCover(newProjectId, coverUrl);
          }

          await imagesInputRef.value.uploadGalleryImages(newProjectId);

          imagesInputRef.value.reset();
        }

        await refreshNuxtData("projects-list");

        this.closeProjectForm();
      } catch (e) {
        console.error("Błąd tworzenia projektu", e);
      }

      this.loading = false;
    },
    async updateProject(payload: any, imagesInputRef: any) {
      const { updateProject } = useUpdateProject();
      const { uploadCover } = useUploadCover();

      this.loading = true;
      try {
        const projectId = this.data?.id;
        if (!projectId) {
          throw new Error("Brak ID projektu do edycji");
        }

        await updateProject(payload);

        if (!imagesInputRef.value) {
          console.error("Błąd formularza. Spróbuj ponownie.");
          return;
        }

        const selectedCover = imagesInputRef.value.getSelectedCover();

        if (selectedCover) {
          if (selectedCover.file) {
            const newUrl = await imagesInputRef.value.uploadCoverImage(
              projectId
            );
            if (newUrl) await uploadCover(projectId, newUrl);
          } else if (selectedCover.previewUrl !== this.data?.cover) {
            await uploadCover(projectId, selectedCover.previewUrl);
          }
        }

        await imagesInputRef.value.uploadGalleryImages(projectId);

        imagesInputRef.value.reset();
        await refreshNuxtData("projects-list");

        this.closeProjectForm();
      } catch (e) {
        console.error("Błąd tworzenia projektu", e);
      }

      this.loading = false;
    },
  },
});
