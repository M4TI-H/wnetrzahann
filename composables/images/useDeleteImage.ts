export function useDeleteImage() {
  const deleteLoading = ref<boolean>(false);
  const deleteError = ref<Error | null>(null);

  const deleteImage = async (path: string) => {
    deleteLoading.value = true;

    try {
      await $fetch("/api/images/delete/", {
        method: "DELETE",
        query: { path },
      });

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

  return { deleteLoading, deleteError, deleteImage };
}
