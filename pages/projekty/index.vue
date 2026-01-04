<script setup lang="ts">
import ProjectCard from "~/components/projects/projectCard.vue";
import ProjectFilter from "~/components/projects/projectFilter.vue";
import SearchBar from "~/components/projects/searchBar.vue";

definePageMeta({
  navbar: "compact",
});

const selectedPage = ref<number>(0);

const projects = [
  {
    id: 0,
    name: "F403",
    category: "Projekt prywatny",
    creationDate: "31.12.2025",
    cover:
      "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/591860583_122259063038186059_8202967369660707076_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=pOi7oX31FWQQ7kNvwEbuEtf&_nc_oc=Adm0ZVWYhHj2e6FKGyRkC4M6ZhK3biHGw2L8R1d_nxonjyuWv_wyvzsVODdaKWE-k4Re0wEi5fPMZmVZrIcy4OnD&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=bwO4_4qHLAvIfgo0MPxJkQ&oh=00_Afns-tZ-X9SM4ZEu7_CtNwrBk0OY553STmGNkwIXxiDYjQ&oe=695AE0DC",
  },
  {
    id: 1,
    name: "F404",
    category: "Projekt prywatny",
    creationDate: "28.11.2205",
    cover:
      "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/572057477_122254459406186059_2598069039025711577_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f727a1&_nc_ohc=i9QcodmCpJMQ7kNvwFRwMAG&_nc_oc=AdlKnVhFX6zcDMoVm44PnAqhmWBW0Epaax-b0C4cNIAzXwqEaWZP5-kCkj0RhXdQYNm8lz2fAQBhx_OedOXhGHTo&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=v46A2QKZtJZJuQ8v7soLVA&oh=00_Afkn2VstY_C0odB5fIJm5bH2eBDm068OFdKKTai_HbY9Qg&oe=695AFB70",
  },
  {
    id: 2,
    name: "F405",
    category: "Projekt komercyjny",
    creationDate: "13.10.2025",
    cover:
      "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/565814573_122253532052186059_8858413877040990406_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_ohc=BQRYOcMa9d8Q7kNvwErJeiv&_nc_oc=AdngyA6360ZBD7vqluD1icMBoyfge3FhHtES4WRaJEBeSpcT7N_R1B_NYnsfnONatWuiyYHCUqapXiMi5fpA1gIo&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=xnAgalS4LB3PwWLx4lOyDA&oh=00_Aflo4M7zQ28RITSV2a8odZL7-S7xwb54JPfl64nsQdihjw&oe=695B0FDD",
  },
  {
    id: 3,
    name: "F406",
    category: "Projekt komercyjny",
    creationDate: "27.09.2025",
    cover:
      "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/514546010_122234782364186059_8062812865512552472_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=uaZxS2Ag1hgQ7kNvwG5zkMb&_nc_oc=AdkZp05_iJz0rihDCgHHaze-5W1O1zvU7BuTrjs8YdaGO04rVuTYnxjhWGwrZfAtFvDqN6jmPME0fioxxRq4lHJI&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=X-tK0IY5AUMw2QfjNqJRLg&oh=00_Afl6hL-kT960ocMS66Awt7YXvvA-wLmlyXkEjPsOIfuxVw&oe=695AF3D7",
  },
  {
    id: 4,
    name: "F403",
    category: "Projekt prywatny",
    creationDate: "31.12.2025",
    cover:
      "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/591860583_122259063038186059_8202967369660707076_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_ohc=pOi7oX31FWQQ7kNvwEbuEtf&_nc_oc=Adm0ZVWYhHj2e6FKGyRkC4M6ZhK3biHGw2L8R1d_nxonjyuWv_wyvzsVODdaKWE-k4Re0wEi5fPMZmVZrIcy4OnD&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=bwO4_4qHLAvIfgo0MPxJkQ&oh=00_Afns-tZ-X9SM4ZEu7_CtNwrBk0OY553STmGNkwIXxiDYjQ&oe=695AE0DC",
  },
  {
    id: 5,
    name: "F404",
    category: "Projekt prywatny",
    creationDate: "28.11.2205",
    cover:
      "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/572057477_122254459406186059_2598069039025711577_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=f727a1&_nc_ohc=i9QcodmCpJMQ7kNvwFRwMAG&_nc_oc=AdlKnVhFX6zcDMoVm44PnAqhmWBW0Epaax-b0C4cNIAzXwqEaWZP5-kCkj0RhXdQYNm8lz2fAQBhx_OedOXhGHTo&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=v46A2QKZtJZJuQ8v7soLVA&oh=00_Afkn2VstY_C0odB5fIJm5bH2eBDm068OFdKKTai_HbY9Qg&oe=695AFB70",
  },
  {
    id: 6,
    name: "F405",
    category: "Projekt komercyjny",
    creationDate: "13.10.2025",
    cover:
      "https://scontent.fktw6-1.fna.fbcdn.net/v/t39.30808-6/565814573_122253532052186059_8858413877040990406_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=f727a1&_nc_ohc=BQRYOcMa9d8Q7kNvwErJeiv&_nc_oc=AdngyA6360ZBD7vqluD1icMBoyfge3FhHtES4WRaJEBeSpcT7N_R1B_NYnsfnONatWuiyYHCUqapXiMi5fpA1gIo&_nc_zt=23&_nc_ht=scontent.fktw6-1.fna&_nc_gid=xnAgalS4LB3PwWLx4lOyDA&oh=00_Aflo4M7zQ28RITSV2a8odZL7-S7xwb54JPfl64nsQdihjw&oe=695B0FDD",
  },
];
</script>
<template>
  <section class="flex-1 flex flex-col items-center">
    <div
      class="w-full min-h-screen flex flex-col items-center gap-8 bg-white pt-24 pb-8"
    >
      <h1 class="text-5xl font-thin">PROJEKTY</h1>
      <SearchBar />
      <ProjectFilter />

      <div class="w-full grid md:grid-cols-2 gap-4 px-4 md:px-8">
        <template v-for="project in projects" :key="project.id">
          <ProjectCard :data="project" />
        </template>
      </div>

      <button
        class="px-6 py-2 bg-neutral-800 hover:bg-black md:text-lg text-gray-100 border-2 border-gray-100 hover:border-black ring-2 ring-black font-semibold transition-colors duration-300 ease-in-out"
      >
        Pokaż więcej
      </button>
    </div>
  </section>
</template>
