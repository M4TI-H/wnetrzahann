<script setup lang="ts">
import ImagesInput from "./imagesInput.vue";
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import type Project from "~/models/Project";
import { useCreateProject } from "~/composables/projects/useCreateProject";
import { useGallery } from "~/composables/images/useGallery";

const projectStore = useProjectStore();

const { createProject, projectLoading } = useCreateProject();
const { saveGalleryImages, galleryUploadLoading } = useGallery();

const imagesInputRef = ref<InstanceType<typeof ImagesInput> | null>(null);
const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "Podaj nazwę projektu."),
    category: z.string().min(1, "Wybierz kategorię projektu."),
    area: z.number().min(1, "Podaj wielkość powierzchni."),
    creationDate: z.string().optional(),
  })
);

const formatDateForInput = (dateStr?: string) => {
  if (!dateStr) return "";
  const [day, month, year] = dateStr.split("/");
  return `${year}-${month}-${day}`;
};

const { handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    name: projectStore.data?.name,
    category: projectStore.data?.category,
    area: projectStore.data?.area,
    creationDate: formatDateForInput(projectStore.data?.creation_date),
  },
});

const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: category, errorMessage: categoryError } =
  useField<string>("category");
const { value: area, errorMessage: areaError } = useField<number>("area");
const { value: creationDate, errorMessage: creationDateError } =
  useField<string>("creationDate");

const onSubmit = handleSubmit(async (values) => {
  let finalDate = "";
  if (!values.creationDate) {
    const today = new Date();
    finalDate = today
      .toLocaleDateString("pl-PL", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\./g, "/");
  } else {
    const [y, m, d] = values.creationDate.split("-");
    finalDate = `${d}/${m}/${y}`;
  }

  let coverUrl = null;
  if (imagesInputRef.value) {
    coverUrl = await imagesInputRef.value.uploadCoverImage();
  }

  if (!coverUrl) {
    alert("Dodaj zdjęcia!");
    return;
  }

  const payload = {
    name: values.name,
    category: values.category,
    area: values.area,
    creation_date: finalDate,
    cover: coverUrl,
  };

  try {
    const newProjectId = await createProject(payload);

    if (!newProjectId) {
      console.error("Nie udało się pobrać ID nowego projektu");
      return;
    }

    if (imagesInputRef.value) {
      const galleryUrls = await imagesInputRef.value.uploadGalleryImages();

      if (galleryUrls.length > 0) {
        await saveGalleryImages(newProjectId, galleryUrls);
      }
      imagesInputRef.value.reset();
    }

    await refreshNuxtData("projects-list");
    projectStore.closeProjectForm();
  } catch (e) {
    console.error("Błąd tworzenia projektu", e);
  }
});
</script>
<template>
  <div
    class="fixed z-50 w-screen h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center"
  >
    <form
      @submit="onSubmit"
      class="w-full max-w-[95vw] sm:max-w-4xl p-4 border border-black flex flex-col gap-4 bg-white"
    >
      <div class="w-full flex items-center justify-between">
        <h1 class="text-xl md:text-2xl lg:text-3xl">
          {{
            projectStore.mode === "edit" ? "Edycja projektu" : "Nowy projekt"
          }}
        </h1>
        <button
          @click="projectStore.closeProjectForm"
          class="hover:bg-black/20 active:bg-black/20 text-sm p-1 flex items-center justify-center transition-colors duration-200 ease-in-out"
        >
          <i class="pi pi-times text-gray-500"></i>
        </button>
      </div>
      <div class="w-full flex flex-col md:flex-row gap-4">
        <div class="w-1/2 flex flex-col gap-8">
          <div class="flex flex-col">
            <div
              class="w-fit flex items-center gap-2 px-2 py-1 text-sm border-x border-t border-black"
            >
              <i class="pi pi-tag"></i>
              <p class="text-xs md:text-sm">Nazwa</p>
            </div>

            <input
              v-model="name"
              type="text"
              class="flex-1 py-1 md:py-2 px-2 md:px-4 outline-0 text-sm md:text-base border border-black"
            />
          </div>
          <div class="flex flex-col">
            <div
              class="w-fit flex items-center gap-2 px-2 py-1 text-sm border-x border-t border-black"
            >
              <i class="pi pi-home"></i>
              <p class="text-xs md:text-sm">Kategoria</p>
            </div>
            <select
              v-model="category"
              class="w-full py-1 md:py-2 px-2 md:px-4 outline-0 text-sm md:text-base flex items-center justify-between border border-black"
            >
              <option class="text-xs md:text-sm"></option>
              <option class="text-xs md:text-sm">Projekt komerycjny</option>
              <option class="text-xs md:text-sm">Projekt prywatny</option>
            </select>
          </div>
          <div class="relative w-full flex items-center gap-2">
            <div class="flex-1 w-full flex flex-col">
              <div
                class="w-fit flex items-center gap-2 px-2 py-1 text-sm border-x border-t border-black"
              >
                <i class="pi pi-tag"></i>
                <p class="text-xs md:text-sm">Powierzchnia</p>
              </div>
              <div
                class="w-full flex items-center justify-between border border-black"
              >
                <input
                  v-model="area"
                  type="number"
                  class="flex-1 py-1 md:py-2 px-2 md:px-4 outline-0 text-sm md:text-base w-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <p class="px-2 text-sm md:text-base shrink-0">m&sup2;</p>
              </div>
            </div>

            <div class="flex-1 w-full flex flex-col">
              <div
                class="w-fit flex items-center gap-2 px-2 py-1 text-sm border-x border-t border-black"
              >
                <i class="pi pi-calendar"></i>
                <p class="text-xs md:text-sm">Data utworzenia*</p>
              </div>
              <div
                class="w-full flex items-center justify-between border border-black"
              >
                <input
                  v-model="creationDate"
                  type="date"
                  class="flex-1 py-1 md:py-2 px-2 md:px-4 outline-0 text-sm md:text-base w-0"
                />
              </div>
            </div>
            <p class="absolute -bottom-5 right-6 text-xs text-gray-500">
              *Zostaw puste dla dzisiejszej daty
            </p>
          </div>
        </div>
        <div class="w-1/2 flex flex-col gap-2">
          <ImagesInput ref="imagesInputRef" />
        </div>
      </div>
      <button
        type="submit"
        class="mt-4 ml-auto w-full sm:max-w-56 py-2 px-4 bg-neutral-800 hover:bg-black text-sm lg:text-base text-gray-100 border border-black transition-colors duration-300 ease-in-out"
      >
        {{ projectStore.mode === "edit" ? "Zatwierdź zmiany" : "Potwierdź" }}
      </button>
    </form>
  </div>
</template>
