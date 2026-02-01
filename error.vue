<script setup lang="ts">
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });

const errorDetails = computed(() => {
  if (props.error?.statusCode === "404") {
    return `${$t("error.e404")}`;
  } else if (props.error?.statusCode === "500") {
    return `${$t("error.e500")}`;
  }
});
</script>

<template>
  <section
    class="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 md:p-8 gap-4 md:gap-8 overflow-hidden"
  >
    <h1 class="text-[80px] md:text-[100px] text-neutral-500">
      {{ error?.statusCode }}
    </h1>
    <p class="text-neutral-500 text-lg md:text-xl">
      {{ errorDetails }}
    </p>

    <button
      @click="handleError"
      class="mt-8 md:mt-16 px-4 md:px-8 h-12 md:h-16 bg-neutral-500 hover:bg-neutral-700 md:text-lg text-white border-2 border-white hover:border-neutral-700 ring-2 ring-neutral-700 outline-0 focus:border-neutral-700 focus:bg-neutral-700 font-semibold transition-colors duration-300 ease-in-out"
    >
      Powrót do strony głównej
    </button>
  </section>
</template>
