<script setup lang="ts">
import ImagesInput from "./imagesInput.vue";
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useCreateProject } from "~/composables/projects/useCreateProject";
import { useGallery } from "~/composables/images/useGallery";

const projectStore = useProjectStore();

const { createProject, projectLoading } = useCreateProject();
const { saveGalleryImages, galleryUploadLoading } = useGallery();

const imagesInputRef = ref<InstanceType<typeof ImagesInput> | null>(null);

const validationSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, { message: "Podaj nazwę projektu." }),
    category: z.string().min(1, { message: "Wybierz kategorię projektu." }),
    area: z.coerce
      .number()
      .min(0.01, { message: "Podaj wielkość powierzchni." }),
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
    name: projectStore.data?.name || "",
    category: projectStore.data?.category || "",
    area: projectStore.data?.area || 0,
    creationDate: formatDateForInput(projectStore.data?.creation_date),
  },
});

const fieldOptions = {
  validateOnValueUpdate: false,
  validateOnInput: false,
  validateOnBlur: false,
};

const { value: name, errorMessage: nameError } = useField<string>(
  "name",
  undefined,
  fieldOptions
);
const { value: category, errorMessage: categoryError } = useField<string>(
  "category",
  undefined,
  fieldOptions
);
const { value: area, errorMessage: areaError } = useField<number>(
  "area",
  undefined,
  fieldOptions
);
const { value: creationDate, errorMessage: creationDateError } =
  useField<string>("creationDate", undefined, fieldOptions);

const imageError = ref<string | null>(null);

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
    imageError.value = "Dodaj zdjęcia do albumu.";
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

const blockInvalidChar = (e: KeyboardEvent) => {
  if (["-", "+", "e", "E"].includes(e.key)) {
    e.preventDefault();
  }
};

useHead({
  bodyAttrs: {
    class: computed(() =>
      projectStore.isProjectFormOpen ? "overflow-hidden" : ""
    ),
  },
});
</script>
<template>
  <div
    class="fixed z-50 w-screen h-screen bg-black/60 backdrop-blur-sm flex items-center justify-center"
  >
    <form
      @submit="onSubmit"
      class="w-full max-w-[95vw] md:max-w-4xl h-full md:h-auto max-h-[90vh] p-4 border border-black flex flex-col gap-4 bg-white overflow-auto"
    >
      <div class="w-full flex items-center justify-between">
        <h1 class="text-2xl md:text-3xl">
          {{
            projectStore.mode === "edit" ? "Edycja projektu" : "Nowy projekt"
          }}
        </h1>
        <button
          @click="projectStore.closeProjectForm"
          class="hover:bg-black/20 active:bg-black/20 p-1 flex items-center justify-center transition-colors duration-200 ease-in-out"
        >
          <i class="pi pi-times text-gray-500"></i>
        </button>
      </div>
      <div class="w-full flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-1/2 flex flex-col gap-4 md:gap-8">
          <div class="flex flex-col">
            <div class="w-full flex flex-col md:flex-row md:items-center">
              <div
                class="w-fit flex items-center gap-2 px-2 py-1 text-sm border-x border-t border-black"
              >
                <i class="pi pi-tag"></i>
                <p class="text-xs md:text-sm">Nazwa</p>
              </div>
              <div
                v-if="nameError"
                class="w-fit flex items-center gap-2 px-1 md:px-2 py-1 text-sm border-x md:border-l-0 border-t border-red-800 bg-red-200"
              >
                <i class="pi pi-exclamation-triangle text-red-800"></i>
                <p class="text-xs md:text-sm text-red-800">
                  Błąd: {{ nameError }}
                </p>
              </div>
            </div>

            <input
              v-model="name"
              type="text"
              class="flex-1 py-1 md:py-2 px-2 md:px-4 outline-0 border border-black"
            />
          </div>
          <div class="flex flex-col">
            <div class="w-full flex flex-col md:flex-row md:items-center">
              <div
                class="w-fit flex items-center gap-2 px-2 py-1 text-sm border-x border-t border-black"
              >
                <i class="pi pi-home"></i>
                <p class="text-xs md:text-sm">Kategoria</p>
              </div>
              <div
                v-if="categoryError"
                class="w-fit flex items-center gap-2 px-1 md:px-2 py-1 text-sm border-x md:border-l-0 border-t border-red-800 bg-red-200"
              >
                <i class="pi pi-exclamation-triangle text-red-800"></i>
                <p class="text-xs md:text-sm text-red-800">
                  Błąd: {{ categoryError }}
                </p>
              </div>
            </div>

            <select
              v-model="category"
              class="w-full py-1 md:py-2 px-2 md:px-4 outline-0 flex items-center justify-between border border-black"
            >
              <option class="text-xs md:text-sm"></option>
              <option class="text-xs md:text-sm">Projekt komerycjny</option>
              <option class="text-xs md:text-sm">Projekt prywatny</option>
            </select>
          </div>
          <div class="flex-1 w-full flex flex-col">
            <div class="w-full flex flex-col md:flex-row md:items-center">
              <div
                class="w-fit flex items-center gap-2 px-2 py-1 text-sm border-x border-t border-black"
              >
                <i class="pi pi-tag"></i>
                <p class="text-xs md:text-sm">Powierzchnia</p>
              </div>
              <div
                v-if="areaError"
                class="w-fit flex items-center gap-2 px-1 md:px-2 py-1 text-sm border-x md:border-l-0 border-t border-red-800 bg-red-200"
              >
                <i class="pi pi-exclamation-triangle text-red-800"></i>
                <p class="text-xs md:text-sm text-red-800">
                  Błąd: {{ areaError }}
                </p>
              </div>
            </div>

            <div
              class="w-full flex items-center justify-between border border-black"
            >
              <input
                v-model="area"
                type="number"
                min="0"
                @keydown="blockInvalidChar"
                class="flex-1 py-1 md:py-2 px-2 md:px-4 outline-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <p class="px-2 text-sm md:text-base shrink-0">m&sup2;</p>
            </div>
          </div>

          <div class="flex-1 w-full flex flex-col">
            <div class="w-full flex flex-col md:flex-row md:items-center">
              <div
                class="w-fit flex items-center gap-2 px-2 py-1 text-sm border-x border-t border-black"
              >
                <i class="pi pi-calendar"></i>
                <p class="text-xs md:text-sm">Data utworzenia*</p>
              </div>
              <div
                v-if="creationDateError"
                class="w-fit flex items-center gap-2 px-2 py-1 text-sm border-r border-t border-red-800 bg-red-200"
              >
                <i class="pi pi-exclamation-triangle text-red-800"></i>
                <p class="text-xs md:text-sm text-red-800">
                  Błąd: {{ creationDateError }}
                </p>
              </div>
            </div>

            <div
              class="w-full flex items-center justify-between border border-black"
            >
              <input
                v-model="creationDate"
                type="date"
                class="flex-1 py-1 md:py-2 px-2 md:px-4 outline-0 w-0"
              />
            </div>
            <p class="mt-1 ml-1 text-xs text-gray-500">
              *Zostaw puste dla dzisiejszej daty
            </p>
          </div>
        </div>
        <div class="w-full md:w-1/2 flex flex-col gap-2">
          <ImagesInput ref="imagesInputRef" />
        </div>
      </div>

      <button
        type="submit"
        class="mt-auto ml-auto w-full sm:max-w-56 py-2 px-4 bg-neutral-800 hover:bg-black text-sm lg:text-base text-gray-100 border border-black transition-colors duration-300 ease-in-out"
      >
        {{ projectStore.mode === "edit" ? "Zatwierdź zmiany" : "Potwierdź" }}
      </button>
    </form>
  </div>
</template>
