<script setup lang="ts">
const props = defineProps<{
  label: string;
  icon: string;
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();

const editValue = ref<boolean>(false);
const localValue = ref<string>(props.modelValue);

function toggleEdit() {
  editValue.value = !editValue.value;
  localValue.value = props.modelValue;
}

function saveEdit() {
  emit("update:modelValue", localValue.value);
  editValue.value = false;
}
</script>
<template>
  <div class="flex flex-col">
    <div
      class="w-fit flex items-center gap-2 px-2 py-1 text-sm border-x border-t border-black"
    >
      <i :class="props.icon"></i>
      <p class="text-xs md:text-sm">{{ props.label }}</p>
    </div>
    <div
      v-if="!editValue"
      class="w-full flex items-center justify-between border border-gray-500"
    >
      <p
        class="italic truncate py-1 md:py-2 px-2 md:px-4 text-gray-500 text-sm md:text-base"
      >
        {{ modelValue }}
      </p>
      <button
        @click="toggleEdit"
        class="text-xs text-gray-500 p-2 md:p-3 bg-neutral-800 hover:bg-black transition-colors duration-300 ease-in-out"
      >
        <i class="pi pi-pen-to-square text-gray-100"></i>
      </button>
    </div>
    <div
      v-if="editValue"
      class="w-full flex items-center justify-between border border-gray-500"
    >
      <input
        v-model="localValue"
        type="text"
        class="flex-1 py-1 md:py-2 px-2 md:px-4 outline-0 font-semibol text-sm md:text-base"
      />
      <div>
        <button
          @click="saveEdit"
          class="text-xs 0 p-2 md:p-3 bg-neutral-800 hover:bg-black transition-colors duration-300 ease-in-out"
        >
          <i class="pi pi-check text-gray-100"></i>
        </button>
        <button
          @click="toggleEdit"
          class="text-xs p-2 md:p-3 bg-gray-100 hover:bg-gray-300 transition-colors duration-300 ease-in-out"
        >
          <i class="pi pi-times text-neutral-800"></i>
        </button>
      </div>
    </div>
  </div>
</template>
