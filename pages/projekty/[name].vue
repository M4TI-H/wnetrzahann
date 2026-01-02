<script setup lang="ts">
const route = useRoute();
const projectName = computed(() => String(route.params.name ?? ""));
definePageMeta({
  navbar: "compact",
});

const images = [
  {
    id: 0,
    image:
      "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/591860583_122259063038186059_8202967369660707076_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=72i98EKS5Z4Q7kNvwHS4_zU&_nc_oc=AdlWjmIW4doGsrEUo3M9dWg2sqU2Ndk-xzwVKsGvbX25hpaeFdXZj9VytWfJoLfnAcBe8LZj9a3OTSaIikUKRwOQ&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=IEJjJQY5P__Rk3wBUPDkmw&oh=00_AfnMzvpfQ8i3uQ9ppaoMU5BekDrk11M69-vatA3JEPIRyw&oe=69575CDC",
  },
  {
    id: 1,
    image:
      "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/590219833_122259063020186059_1135699340169672861_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=f727a1&_nc_ohc=PvF1iJRlKMgQ7kNvwFHYp0C&_nc_oc=AdnCy5oIkG2odhDxUEU4xdZjA1L96Jeyf3hQr5Oqw1G6cxNLi2UFk3ganBvp8CZSFYFXw8qrjlqs-8QBGhfAlzS_&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=5GHBrXQEL6tLzsYXy9CxAg&oh=00_AfkGZkV3rUnNeuJvC2YoZdASxI7ZqKjl7MCv0yWUWWMwkg&oe=695759EE",
  },
  {
    id: 2,
    image:
      "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/590350985_122259063026186059_260088556128226255_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=f727a1&_nc_ohc=MhAl3Sn31bQQ7kNvwG-1XGb&_nc_oc=Adm4_dcD7PRMl1RRvyR_qlrKuHVXUV3c0oQj8s4Kkod7p-ZqbKv8HrqI0CaTXMnUO0onSqN1i2OnzAaqEfm6b00k&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=3EonLTE7O_rJoWl0GwnhZQ&oh=00_AfnET1cjIHM9-aQvByr_S2qxA7njMzXFwD3wQbQtULP5fA&oe=69576743",
  },
  {
    id: 3,
    image:
      "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/590170352_122259062912186059_3366128718492769298_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=f727a1&_nc_ohc=MfOkmM7SP8QQ7kNvwE1Ply8&_nc_oc=Adnqrjc7hs8vnfAS2nmUQb9PTeWtloL0LOOz75gEqViu-p2rApjMhpj1jEHtyBlpPONhC8czPaG3pazCiCuW5LuD&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=1R8edfGp3W4qwX3TDbx_lQ&oh=00_AfkkCuOL4Qt0AdgpyeLBH05VKlQXOK9YnEWPrjYh2pvG5Q&oe=69574E93",
  },
  {
    id: 4,
    image:
      "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/590975583_122259062870186059_3809378153496470090_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=f727a1&_nc_ohc=mz4yDreculwQ7kNvwHPOXpd&_nc_oc=Adk0N9JPM-_O2xbDLQmpl2NROmGEf4TkRP17x2XhP5S93PZv8B6U7DvViESsId3aL1rzg-hyEhW8ZaNRkyPhyG7Q&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=_mpS7gFMg6e7_qQ2uAx-_Q&oh=00_AfmmtitpcUTHOXpfHZzdTVCT69iYv2H26_vLWByKB2SQNg&oe=695742FD",
  },
];
const activeIndex = ref<number>(0);
const setCurrent = (index: number) => {
  activeIndex.value = index;
};

const nextImage = () => {
  if (activeIndex.value === images.length - 1) return;
  activeIndex.value = activeIndex.value + 1;
};

const previousImage = () => {
  if (activeIndex.value === 0) return;
  activeIndex.value = activeIndex.value - 1;
};

const isImageHovered = ref<boolean>(false);
</script>

<template>
  <section class="flex-1 flex flex-col items-center gap-8">
    <div
      class="relative w-full md:w-2/3 min-h-screen flex flex-col gap-4 md:gap-8 pt-20 md:pt-28 pb-4 md:pb-8 px-4 md:px-0 mx-auto"
    >
      <div
        class="w-full flex flex-col md:flex-row items-start md:items-center justify-between md:gap-2"
      >
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/projekty"
            class="group w-min hidden md:flex p-3 bg-gray-100 hover:bg-gray-200 border border-black transition-colors duration-300 ease-in-out"
          >
            <i
              class="pi pi-arrow-left text-sm transition-transform duration-300 group-hover:-translate-x-1"
            ></i>
          </NuxtLink>
          <h1 class="text-4xl font-semibold">{{ projectName }}</h1>
        </div>
        <p class="text-gray-500">Projekt prywatny</p>
      </div>

      <!-- Fullscreen -->
      <div class="hidden md:flex flex-col items-center gap-4 mx-auto">
        <div
          @mouseenter="isImageHovered = true"
          @mouseleave="isImageHovered = false"
          class="relative w-full h-auto overflow-hidden"
        >
          <img
            :src="images[activeIndex].image"
            class="w-full h-full object-cover"
          />
          <button
            v-if="activeIndex > 0"
            @click="previousImage"
            :class="[isImageHovered ? 'opacity-100' : 'opacity-0']"
            class="absolute z-20 left-0 top-0 h-full bg-black/10 hover:bg-black/30 w-12 transition-all duration-300 ease-in-out"
          >
            <i class="pi pi-chevron-left text-2xl text-gray-100"></i>
          </button>
          <button
            v-if="activeIndex < images.length - 1"
            @click="nextImage"
            :class="[isImageHovered ? 'opacity-100' : 'opacity-0']"
            class="absolute z-20 right-0 top-0 h-full bg-black/10 hover:bg-black/30 w-12 transition-all duration-300 ease-in-out"
          >
            <i class="pi pi-chevron-right text-2xl text-gray-100"></i>
          </button>
        </div>

        <div class="flex items-center flex-wrap gap-2">
          <div
            v-for="img in images"
            :key="img.id"
            @click="setCurrent(img.id)"
            class="max-w-44 w-full h-32 overflow-hidden cursor-pointer border-2"
            :class="{
              'border-black': img.id === activeIndex,
              'border-transparent': img.id !== activeIndex,
            }"
          >
            <img :src="img.image" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <!-- Mobile -->
      <div class="flex md:hidden flex-col items-center gap-4 mx-auto">
        <div
          @mouseenter="isImageHovered = true"
          @mouseleave="isImageHovered = false"
          class="relative w-full h-auto overflow-hidden"
        >
          <img
            :src="images[activeIndex].image"
            class="w-full h-full object-cover"
          />
        </div>
        <div
          class="scrollbar-hide flex w-full overflow-x-auto whitespace-nowrap gap-2"
        >
          <div
            v-for="img in images"
            :key="img.id"
            @click="setCurrent(img.id)"
            class="flex-shrink-0 max-w-32 w-full h-20 overflow-hidden cursor-pointer border-2"
            :class="{
              'border-black': img.id === activeIndex,
              'border-transparent': img.id !== activeIndex,
            }"
          >
            <img :src="img.image" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div class="w-full flex flex-col gap-4">
        <p class="md:text-lg text-gray-500">
          Głównym wyzwaniem tego projektu było wprowadzenie nowoczesnej
          funkcjonalności do wysokich, ale słabo doświetlonych wnętrz gdańskiej
          kamienicy. Zastosowano paletę barw opartą na złamanej bieli i
          naturalnym dębie, co optycznie powiększyło przestrzeń. Sercem
          apartamentu stała się otwarta strefa dzienna z antresolą, gdzie
          stalowe elementy konstrukcyjne nawiązują do industrialnej historii
          budynku.
        </p>
        <p class="md:text-lg">Data dodania: 29.12.2025</p>
      </div>
    </div>
  </section>
</template>
