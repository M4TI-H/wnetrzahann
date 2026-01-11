<script setup lang="ts">
import { useEditContact } from "~/composables/contact/useUpdateContactData";
import { useField } from "vee-validate";
import { z } from "zod";
import { toTypedSchema } from "@vee-validate/zod";

const props = defineProps<{
  type: string;
  value: string;
  label: string;
  icon: string;
}>();

const emit = defineEmits<{
  (e: "update"): void;
}>();

const editValue = ref<boolean>(false);

const { contactLoading, updateContactData } = useEditContact();

const fieldSchema = computed(() => {
  let schema = z.string().min(1, "Pole nie może być puste");

  if (props.type === "email") {
    schema = schema.email("Niepoprawny adres e-mail");
  } else if (
    props.type === "facebook" ||
    "instagram" ||
    "youtube" ||
    "linkedin"
  ) {
    schema = schema.url("Niepoprawny adres url");
  }

  return toTypedSchema(schema);
});

const fieldOptions = {
  validateOnValueUpdate: false,
  validateOnInput: false,
  validateOnBlur: false,
  initialValue: props.value,
};

const {
  value: fieldValue,
  errorMessage,
  validate,
  resetField,
} = useField<string>("fieldValue", fieldSchema, fieldOptions);

const toggleEdit = () => {
  resetField({ value: props.value });
  editValue.value = !editValue.value;
};

const handleChange = async () => {
  const { valid } = await validate();

  if (!valid) return;

  await updateContactData(props.type, fieldValue.value);
  editValue.value = false;
  emit("update");
};
</script>
<template>
  <div class="flex flex-col">
    <div class="w-full flex items-center">
      <div
        class="w-fit flex items-center gap-2 px-2 py-1 text-sm border-x border-t border-black"
      >
        <i :class="props.icon"></i>
        <p class="text-xs md:text-sm">{{ props.label }}</p>
      </div>
      <div
        v-if="errorMessage"
        class="w-fit flex items-center gap-2 px-1 md:px-2 py-1 text-sm border-x md:border-l-0 border-t border-red-800 bg-red-200"
      >
        <i class="pi pi-exclamation-triangle text-red-800"></i>
        <p class="text-xs md:text-sm text-red-800">Błąd: {{ errorMessage }}</p>
      </div>
    </div>

    <div
      v-if="!editValue"
      class="w-full flex items-center justify-between border border-gray-500"
    >
      <p
        class="italic truncate py-1 md:py-2 px-2 md:px-4 text-gray-500 text-sm md:text-base"
      >
        {{ props.value }}
      </p>
      <button
        @click="toggleEdit"
        class="text-xs text-gray-500 p-2 md:p-3 h-full bg-neutral-800 hover:bg-black transition-colors duration-300 ease-in-out"
      >
        <i class="pi pi-pen-to-square text-gray-100"></i>
      </button>
    </div>
    <form
      v-if="editValue"
      @submit.prevent="handleChange"
      class="w-full flex items-center justify-between border border-gray-500"
    >
      <input
        v-model.trim="fieldValue"
        type="text"
        class="flex-1 py-1 md:py-2 px-2 md:px-4 outline-0 font-semibol text-sm md:text-base"
      />
      <div>
        <button
          type="submit"
          class="text-xs 0 p-2 md:p-3 bg-neutral-800 hover:bg-black transition-colors duration-300 ease-in-out"
        >
          <i class="pi pi-check text-gray-100"></i>
        </button>
        <button
          @click="toggleEdit()"
          class="text-xs p-2 md:p-3 bg-gray-100 hover:bg-gray-300 transition-colors duration-300 ease-in-out"
        >
          <i class="pi pi-times text-neutral-800"></i>
        </button>
      </div>
    </form>
  </div>
</template>
