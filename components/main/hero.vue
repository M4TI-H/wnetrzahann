<script setup lang="ts">
const emit = defineEmits<{
  (e: "scrollDown"): void;
}>();

const localePath = useLocalePath();
</script>

<template>
  <div
    class="relative w-full h-screen flex items-center justify-center bg-gray-200 overflow-hidden transition-all duration-500 ease-in-out"
  >
    <div
      class="absolute z-20 inset-0 w-full h-full flex flex-col items-center justify-center gap-8 bg-black/30"
    >
      <Transition name="fade-up-logo" appear>
        <NuxtImg
          alt="Agata Hann Logo"
          src="/logo-white.png"
          class="h-32 lg:h-64 select-none"
          draggable="false"
          format="webp"
        />
      </Transition>
      <Transition name="fade-up-button" appear>
        <NuxtLink
          :to="localePath('/projekty')"
          :aria-label="$t('hero.scrollDown')"
          class="group py-2 px-3 lg:px-4 flex gap-4 items-center border border-white text-white text-sm lg:text-base backdrop-blur-sm hover:backdrop-blur cursor-pointer transition-all duration-300 ease-in-out select-none outline-none focus:backdrop-blur focus-visible:ring-white focus-visible:ring-1"
          >{{ $t("hero.button") }}
          <i
            class="pi pi-arrow-right text-white transition-transform duration-500 group-hover:translate-x-1 select-none"
          ></i>
        </NuxtLink>
      </Transition>
    </div>
    <NuxtImg
      alt="Section background"
      src="/concept.jpg"
      draggable="false"
      class="w-full h-full object-cover select-none"
    />
  </div>
</template>
<style scoped>
.fade-up-logo-enter-active {
  transition: all 1.2s ease-out;
}
.fade-up-logo-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.fade-up-button-enter-active {
  transition: all 1s ease-out;
  transition-delay: 0.4s;
}
.fade-up-button-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.fade-up-scroll-enter-active {
  transition: all 1s ease-out;
  transition-delay: 0.8s;
}
</style>
