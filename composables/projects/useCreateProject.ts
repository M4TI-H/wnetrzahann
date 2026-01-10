import type Project from "~/models/Project";

export function useCreateProject() {
  const projectError = ref<string | null>();
  const projectLoading = ref<boolean>(false);

  const createProject = async (data: Omit<Project, "id">) => {
    projectLoading.value = true;
    try {
      const response = await $fetch<Project>("/api/projects/create", {
        method: "POST",
        body: {
          name: data.name,
          category: data.category,
          area: data.area,
          creation_date: data.creation_date,
          cover: data.cover,
        },
      });

      return response.id;
    } catch (error: any) {
      projectError.value = error.data?.statusMessage || "Wystąpił błąd zapisu";
      console.error("Save Error:", error);
      return null;
    } finally {
      projectLoading.value = false;
    }
  };

  return {
    projectError,
    projectLoading,
    createProject,
  };
}
