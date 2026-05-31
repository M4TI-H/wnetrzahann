import type Project from "~/models/Project";

export const useFetchGalleryProjects = (options: {
  getCategory: () => string;
  getSearch: () => string;
  getLimit: () => number;
}) => {
  const category = computed(options.getCategory);
  const search = computed(options.getSearch);
  const limit = computed(options.getLimit);

  const {
    data: projectsData,
    pending: projectsLoading,
    error: projectsError,
    refresh: projectsRefresh,
  } = useFetch<Project[]>("/api/projects", {
    query: {
      category,
      search,
      limit,
    },
    default: () => [],
  });
  return { projectsData, projectsLoading, projectsError, projectsRefresh };
};
