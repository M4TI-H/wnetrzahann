import type Project from "~/models/Project";

export const useFetchGalleryProjects = (
  step: number,
  getCategory: () => string
) => {
  const {
    data: projectsData,
    pending: projectsLoading,
    error: projectsError,
    refresh: projectsRefresh,
  } = useAsyncData<Project[]>(
    "projects-gallery",
    () => $fetch(`/api/gallery/fetch/${getCategory()}`),
    {
      watch: [getCategory],
    }
  );

  return { projectsData, projectsLoading, projectsError, projectsRefresh };
};
