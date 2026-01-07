<script setup lang="ts">
import { useFetchContact } from "~/composables/contact/useFetchContactData";
import EditableField from "~/components/dashboard/editableField.vue";

const { contactData } = useFetchContact();
</script>

<template>
  <section
    class="lg:w-1/3 h-min p-4 border border-black flex flex-col gap-4 bg-white"
  >
    <h2 class="text-lg md:text-xl lg:text-2xl">Dane kontaktowe</h2>
    <EditableField
      v-model="contactData!.email"
      :label="'Adres email'"
      :icon="'pi pi-envelope'"
    />
    <EditableField
      v-model="contactData!.phone"
      :label="'Numer telefonu'"
      :icon="'pi pi-phone'"
    />
    <EditableField
      v-model="contactData!.facebook"
      :label="'Facebook'"
      :icon="'pi pi-facebook'"
    />
    <EditableField
      v-model="contactData!.instagram"
      :label="'Instagram'"
      :icon="'pi pi-instagram'"
    />
    <EditableField
      v-model="contactData!.linkedin"
      :label="'Linkedin'"
      :icon="'pi pi-linkedin'"
    />
    <EditableField
      v-model="contactData!.youtube"
      :label="'Youtube'"
      :icon="'pi pi-youtube'"
    />
  </section>
</template>
