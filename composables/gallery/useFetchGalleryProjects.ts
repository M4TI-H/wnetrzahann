import type Project from "~/models/Project";

export const useFetchGalleryProjects = (options: {
  getCategory: () => string;
  getSearch: () => string;
  getLimit: () => number;
}) => {
  const {
    data: projectsData,
    pending: projectsLoading,
    error: projectsError,
    refresh: projectsRefresh,
  } = useAsyncData(
    "projects-list",
    () =>
      $fetch<Project[]>("/api/projects", {
        params: {
          category: options.getCategory(),
          search: options.getSearch(),
          limit: options.getLimit(),
        },
      }),
    {
      watch: [options.getCategory, options.getSearch, options.getLimit],
      default: () => [],
    }
  );
  return { projectsData, projectsLoading, projectsError, projectsRefresh };
};
