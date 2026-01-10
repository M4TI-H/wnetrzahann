import type Project from "~/models/Project";

export const useFetchProjects = () => {
  const {
    data: projectsData,
    pending: projectsLoading,
    error: projectsError,
    refresh: projectsRefresh,
  } = useAsyncData<Project[]>("projects-list", () =>
    $fetch("/api/projects/fetch_all")
  );

  return { projectsData, projectsLoading, projectsError, projectsRefresh };
};
