import type Project from "~/models/Project";

export const useSearch = (getName: () => string) => {
  const {
    data: projectData,
    pending: projectLoading,
    error: projectError,
    refresh: projectRefresh,
  } = useAsyncData<Project[]>(
    "search-result",
    async () => {
      const query = getName();
      if (!query || query.trim().length === 0) return [];

      return $fetch(`/api/projects/search/${encodeURIComponent(query)}`);
    },
    {
      watch: [getName],
      immediate: false,
    }
  );

  return { projectData, projectLoading, projectError, projectRefresh };
};
