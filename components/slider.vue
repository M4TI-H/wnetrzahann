<script setup lang="ts">
const sliderContent = [
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
        <p class="text-xl text-white font-semibold">NAZWA PROJEKTU</p>
        <p class="text-white">Opis projektu</p>
      </div>
    </div>
  </section>
</template>
