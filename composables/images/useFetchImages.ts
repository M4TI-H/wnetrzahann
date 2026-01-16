import type GalleryImage from "~/models/GalleryImage";

export const useFetchImages = (id: number) => {
  const {
    data: imagesList,
    pending: imagesLoading,
    error: imagesError,
    refresh: imagesRefresh,
  } = useAsyncData<GalleryImage[]>(
    `project-${id}-images`,
    () => $fetch(`/api/images/fetch/${id}`),
    { immediate: false }
  );

  return { imagesList, imagesLoading, imagesError, imagesRefresh };
};
