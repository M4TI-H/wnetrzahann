import type ProjectImage from "~/models/ProjectImage";

export function useDeleteImages() {
  const imageDeleteLoading = ref<boolean>(false);
  const imageDeleteError = ref<Error | null>(null);

  const deleteImages = async (id: number) => {
    imageDeleteLoading.value = true;

    try {
      await $fetch<ProjectImage>(`/api/gallery/delete/${id}`, {
        method: "DELETE",
      });

      return "success";
    } catch (error: any) {
      imageDeleteError.value =
        error.data?.statusMessage || "Wystąpił błąd przy usuwaniu";
      console.error("Delete Error:", error);

      return "error";
    } finally {
      imageDeleteLoading.value = false;
    }
  };

  return { imageDeleteLoading, imageDeleteError, deleteImages };
}
