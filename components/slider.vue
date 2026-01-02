<script setup lang="ts">
const sliderContent = [
  {
    id: 0,
    image: "/indexImages/1.jpg",
  },
  {
    id: 1,
    image: "/indexImages/2.jpg",
  },
  {
    id: 2,
    image: "/indexImages/3.jpg",
  },
  {
    id: 3,
    image: "/indexImages/4.jpg",
  },
];

const idCounter = ref<number>(0);
const isHovered = ref<boolean>(false);
const isPaused = ref<boolean>(false);

const prevID = () => {
  idCounter.value =
    (idCounter.value - 1 + sliderContent.length) % sliderContent.length;
};

const nextID = () => {
  idCounter.value = (idCounter.value + 1) % sliderContent.length;
};

const touchStartX = ref<number>(0);
const touchEndX = ref<number>(0);

const handleTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.changedTouches[0].clientX;
};

const handleTouchEnd = (e: TouchEvent) => {
  touchEndX.value = e.changedTouches[0].clientX;
  handleSwipe();
};

const handleSwipe = () => {
  const diff = touchStartX.value - touchEndX.value;

  if (Math.abs(diff) < 100) return;

  if (diff > 0) nextID();
  else prevID();
};

onMounted(() => {
  setInterval(() => {
    if (isHovered.value && !isPaused.value) {
      nextID();
    }
  }, 2000);
});
</script>
<template>
  <section class="flex flex-col items-center justify-center">
    <div
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
      class="relative max-w-[80rem] h-[32rem] md:h-[42rem] flex flex-col items-center justify-center overflow-hidden"
    >
      <img
        :src="sliderContent[idCounter].image"
        class="w-full h-full object-cover"
      />
      <div
        :class="[
          isHovered ? 'flex' : 'hidden',
          'absolute z-20 top-2 right-2  items-center gap-2 p-1 pr-2 bg-black/50',
        ]"
      >
        <button @click="isPaused = !isPaused" class="px-1">
          <i
            :class="[
              isPaused ? 'pi-play' : 'pi-pause',
              'pi text-white translate-y-0.5 outline-0',
            ]"
          ></i>
        </button>
        <button
          @click="idCounter = id - 1"
          v-for="id in sliderContent.length"
          :key="id"
          :class="[
            id === idCounter + 1 ? 'bg-white' : 'bg-none hover:bg-gray-300',
            'size-4 border border-white cursor-hover transition-colors duration-150 ease-in-out outline-0',
          ]"
        ></button>
      </div>
      <div
        class="opacity-100 hover:opacity-0 absolute z-10 bottom-0 w-full h-full flex flex-col justify-end p-4 bg-gradient-to-b from-transparent to-black/50 transition-opacity duration-300 ease-in-out"
      >
        <p class="text-sm text-white">Kategoria projektu</p>
        <p class="text-xl text-white font-semibold">
          {{ `NAZWA PROJEKTU`.toUpperCase() }}
        </p>
        <p class="text-white">Opis projektu</p>
      </div>
    </div>
  </section>
</template>
