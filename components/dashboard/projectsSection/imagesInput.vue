<script setup lang="ts">
import type ImageObject from "~/models/ImageObject";

const { uploadImage } = useImage();
const images = ref<ImageObject[]>([]);

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files) return;

  const files = Array.from(target.files).map((file) => ({
    file,
    previewUrl: URL.createObjectURL(file),
    isCover: false,
  }));

  if (images.value.length === 0 && files.length > 0) {
    files[0].isCover = true;
  }

  images.value.push(...files);
};

const setAsCover = (index: number) => {
  images.value.forEach((img, i) => {
    img.isCover = i === index;
  });
};

const removeImage = (index: number) => {
  const removed = images.value.splice(index, 1)[0];
  if (removed.isCover && images.value.length > 0) {
    images.value[0].isCover = true;
  }
};

const uploadCoverImage = async (): Promise<string | null> => {
  const cover = images.value.find((img) => img.isCover);

  if (!cover) return null;

  const publicUrl = await uploadImage(cover.file);

  return publicUrl;
};

const reset = () => {
  images.value = [];
};

defineExpose({
  uploadCoverImage,
  reset,
});
</script>

<template>
  <div class="flex flex-col gap-4">
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

    <div class="h-56 grid grid-cols-2 gap-2 overflow-y-auto">
      <div
        v-for="(image, index) in images"
        :key="index"
        class="relative h-32 group"
        :class="
          image.isCover ? 'border-4 border-amber-500' : 'border border-black'
        "
      >
        <img :src="image.previewUrl" class="w-full h-full object-cover" />
        <button
          @click="removeImage(index)"
          class="absolute top-1 right-1 flex items-center justify-center bg-black/60 text-gray-100 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <i class="pi pi-trash"></i>
        </button>
        <button
          @click="setAsCover(index)"
          class="absolute top-1 left-1 bg-black/60 text-gray-100 text-xs p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {{ image.isCover ? "Okładka" : "Ustaw jako okładkę" }}
        </button>
      </div>
    </div>
  </div>
</template>
