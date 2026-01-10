export const useGallery = () => {
  const galleryUploadLoading = ref(false);
  const galleryUploadError = ref<string>("");

  const saveGalleryImages = async (id: number, urls: string[]) => {
    galleryUploadLoading.value = true;

    try {
      const payload = urls.map((url) => ({
        project_id: id,
        url: url,
      }));

      await $fetch("/api/gallery/create", {
        method: "POST",
        body: payload,
      });

      return true;
    } catch (error: any) {
      console.error("Błąd zapisu galerii:", error);
      error.value = error.message;
      return false;
    } finally {
      galleryUploadLoading.value = false;
    }
  };

  return { saveGalleryImages, galleryUploadLoading, galleryUploadError };
};
