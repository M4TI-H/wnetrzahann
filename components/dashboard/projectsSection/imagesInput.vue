<script setup lang="ts">
import { useDeleteImage } from "~/composables/images/useDeleteImage";
import { useFetchImages } from "~/composables/images/useFetchImages";
import { useImage } from "~/composables/images/useImage";
import type ImageObject from "~/models/ImageObject";
import imageCompression from "browser-image-compression";

const props = defineProps<{
  imagesError: string | null;
}>();

const emit = defineEmits<{
  (e: "clearError"): void;
}>();

const projectStore = useProjectStore();
const { uploadImage } = useImage();

const projectIdForFetch =
  projectStore.mode === "edit" ? projectStore.data?.id : null;
const { imagesList, imagesLoading, imagesRefresh } = useFetchImages(
  projectIdForFetch!,
);
const { deleteImage } = useDeleteImage();

const images = ref<ImageObject[]>([]);

watch(
  imagesList,
  (newList) => {
    if (newList && projectStore.mode === "edit") {
      images.value = newList.map((img) => ({
        previewUrl: img.url,
        isCover: img.url === projectStore.data?.cover,
      }));
    }
  },
  { immediate: true },
);

onMounted(async () => {
  if (projectStore.mode === "edit" && projectIdForFetch) {
    await imagesRefresh();
  }
});

const handleFileSelect = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  const options = {
    maxSizeMB: 0.8,
    maxWidthOrHeight: 2560,
    useWebWorker: true,
    fileType: "image/webp",
    initialQuality: 0.85,
  };

  const files = Array.from(target.files);

  const compressedFiles = await Promise.all(
    files.map(async (originalFile) => {
      try {
        const compressedFile = await imageCompression(originalFile, options);

        const fileName = originalFile.name.replace(/\.[^/.]+$/, "") + ".webp";
        const finalFile = new File([compressedFile], fileName, {
          type: "image/webp",
        });

        return {
          file: finalFile,
          previewUrl: URL.createObjectURL(finalFile),
          isCover: false,
        };
      } catch (error) {
        console.error("Błąd przetwarzania zdjęcia:", error);
        return null;
      }
    }),
  );

  const validFiles = compressedFiles.filter((f) => f !== null);

  if (images.value.length === 0 && validFiles.length > 0) {
    validFiles[0].isCover = true;
  }

  images.value.push(...validFiles);
  emit("clearError");
};

const setAsCover = (index: number) => {
  images.value.forEach((img, i) => {
    img.isCover = i === index;
  });
};

const removeImage = async (index: number) => {
  const img = images.value[index];

  if (!img.file && img.previewUrl) {
    try {
      const separator = "/public/images/";
      const pathInStorage = img.previewUrl.split(separator)[1]?.split("?")[0];

      if (pathInStorage) {
        await deleteImage(pathInStorage);
      }
    } catch (e) {
      console.error("Błąd podczas usuwania pliku z serwera:", e);
      return;
    }
  }

  if (img.previewUrl) {
    URL.revokeObjectURL(img.previewUrl);
  }

  images.value.splice(index, 1);

  if (img.isCover && images.value.length > 0) {
    images.value[0].isCover = true;
  }
};

const uploadCoverImage = async (projectId: number): Promise<string | null> => {
  const cover = images.value.find((img) => img.isCover);

  if (!cover || !cover.file) return null;

  const publicUrl = await uploadImage(projectId, cover.file);

  return publicUrl;
};

const uploadGalleryImages = async (projectId: number): Promise<string[]> => {
  const galleryImages = images.value.filter((img) => !img.isCover && img.file);

  if (galleryImages.length === 0) return [];

  const uploadPromises = galleryImages.map((img) =>
    uploadImage(projectId, img.file as File),
  );
  const results = await Promise.all(uploadPromises);

  return results.filter((url): url is string => url !== null);
};

const getSelectedCover = () => {
  return images.value.find((img) => img.isCover) || null;
};

const reset = () => {
  images.value.forEach((img) => URL.revokeObjectURL(img.previewUrl));
  images.value = [];
};

defineExpose({
  images,
  uploadCoverImage,
  uploadGalleryImages,
  getSelectedCover,
  reset,
});
</script>

<template>
  <div class="w-full h-full flex flex-col gap-4">
    <div class="w-full flex items-center justify-between">
      <label
        class="w-fit flex items-center gap-2 py-1 md:py-2 px-2 md:px-4 text-xs text-gray-500 bg-gray-100 hover:bg-gray-200 border border-black transition-colors duration-300 ease-in-out cursor-pointer"
      >
        <input
          type="file"
          multiple
          @change="handleFileSelect"
          class="hidden"
          accept="image/*"
        />
        <i class="pi pi-plus"></i>
        <p class="text-sm">Dodaj zdjęcia</p>
      </label>
      <p class="text-sm text-gray-500 pr-2">
        Wybrane zdjęcia: {{ images.length }}
      </p>
    </div>

    <div
      class="w-full whitespace-nowrap flex gap-2 md:hidden h-32 overflow-x-auto"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="relative flex-shrink-0 h-32 group"
        :class="
          image.isCover ? 'border-4 border-amber-500' : 'border border-black'
        "
      >
        <img
          :src="image.previewUrl"
          class="w-full h-full object-cover"
          draggable="false"
        />
        <button
          type="button"
          @click="removeImage(index)"
          class="absolute top-1 right-1 flex items-center justify-center bg-black/60 text-gray-100 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <i class="pi pi-trash"></i>
        </button>
        <button
          type="button"
          @click="setAsCover(index)"
          class="absolute top-1 left-1 bg-black/60 text-gray-100 text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          {{ image.isCover ? "Okładka" : "Ustaw jako okładkę" }}
        </button>
      </div>
    </div>
    <div
      class="mt-1 hidden md:grid grid-cols-2 gap-2 overflow-y-auto max-h-[20rem]"
    >
      <div
        v-for="(image, index) in images"
        :key="index"
        class="relative h-32 group shrink-0"
        :class="
          image.isCover ? 'border-4 border-amber-500' : 'border border-black'
        "
      >
        <img
          :src="image.previewUrl"
          class="w-full h-full object-cover"
          draggable="false"
        />
        <button
          type="button"
          @click="removeImage(index)"
          class="absolute top-1 right-1 flex items-center justify-center bg-black/60 text-gray-100 p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <i class="pi pi-trash"></i>
        </button>
        <button
          type="button"
          @click="setAsCover(index)"
          class="absolute top-1 left-1 bg-black/60 text-gray-100 text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          {{ image.isCover ? "Okładka" : "Ustaw jako okładkę" }}
        </button>
      </div>
    </div>
  </div>
</template>
