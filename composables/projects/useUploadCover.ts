export function useUploadCover() {
  const coverUploadError = ref<string | null>();
  const coverUploadLoading = ref<boolean>(false);

  const uploadCover = async (id: number, url: string) => {
    coverUploadLoading.value = true;
    try {
      await $fetch(`/api/projects/upload_cover/${id}`, {
        method: "PUT",
        body: { cover: url },
      });

      return true;
    } catch (error: any) {
      coverUploadError.value =
        error.data?.statusMessage || "Wystąpił błąd zapisu";
      console.error("Save Error:", error);
      return false;
    } finally {
      coverUploadLoading.value = false;
    }
  };

  return {
    coverUploadError,
    coverUploadLoading,
    uploadCover,
  };
}
