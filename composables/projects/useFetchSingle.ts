import type Project from "~/models/Project";

export const useFetchSingle = (id: number) => {
  const {
    data: projectData,
    pending: projectLoading,
    error: projectError,
    refresh: projectRefresh,
  } = useAsyncData<Project>(`project-${id}`, () =>
    $fetch(`/api/projects/fetch/${id}`)
  );

  return { projectData, projectLoading, projectError, projectRefresh };
};
