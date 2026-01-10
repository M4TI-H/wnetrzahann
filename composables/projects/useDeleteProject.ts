import type Project from "~/models/Project";

export function useDeleteProject() {
  const deleteLoading = ref<boolean>(false);
  const deleteError = ref<Error | null>(null);

  const deleteProject = async (id: number) => {
    deleteLoading.value = true;

    try {
      await $fetch<Project>(`/api/projects/delete/${id}`, { method: "DELETE" });

      return "success";
    } catch (error: any) {
      deleteError.value =
        error.data?.statusMessage || "Wystąpił błąd przy usuwaniu";
      console.error("Delete Error:", error);

      return "error";
    } finally {
      deleteLoading.value = false;
    }
  };

  return { deleteLoading, deleteError, deleteProject };
}
