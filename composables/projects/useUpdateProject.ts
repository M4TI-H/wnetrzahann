import type Project from "~/models/Project";

export function useUpdateProject() {
  const updateError = ref<string | null>();
  const updateLoading = ref<boolean>(false);

  const updateProject = async (data: Project) => {
    updateLoading.value = true;
    try {
      const response = await $fetch<Project>(
        `/api/projects/update/${data.id}`,
        {
          method: "PUT",
          body: {
            name: data.name,
            category: data.category,
            area: data.area,
            creation_date: data.creation_date,
            cover: data.cover,
          },
        }
      );

      return response.id;
    } catch (error: any) {
      updateError.value = error.data?.statusMessage || "Wystąpił błąd zapisu";
      console.error("Update Error:", error);
      return null;
    } finally {
      updateLoading.value = false;
    }
  };

  return {
    updateError,
    updateLoading,
    updateProject,
  };
}
