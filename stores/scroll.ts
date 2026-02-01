export const useScrollStore = defineStore("scroll", () => {
  const hideScroll = ref<boolean>(false);

  return { hideScroll };
});
