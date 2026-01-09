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
      :type="`email`"
      :value="contactData!.email"
      :label="'Adres email'"
      :icon="'pi pi-envelope'"
    />
    <EditableField
      :type="`phone`"
      :value="contactData!.phone"
      :label="'Numer telefonu'"
      :icon="'pi pi-phone'"
    />
    <EditableField
      :type="`facebook`"
      :value="contactData!.facebook"
      :label="'Facebook'"
      :icon="'pi pi-facebook'"
    />
    <EditableField
      :type="`instagram`"
      :value="contactData!.instagram"
      :label="'Instagram'"
      :icon="'pi pi-instagram'"
    />
    <EditableField
      :type="`linkedin`"
      :value="contactData!.linkedin"
      :label="'Linkedin'"
      :icon="'pi pi-linkedin'"
    />
    <EditableField
      :type="`youtube`"
      :value="contactData!.youtube"
      :label="'Youtube'"
      :icon="'pi pi-youtube'"
    />
  </section>
</template>
