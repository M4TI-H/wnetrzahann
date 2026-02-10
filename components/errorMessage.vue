<script setup lang="ts">
const errorStore = useErrorStore();
</script>

<template>
  <div
    class="fixed z-100 top-2 sm:top-4 left-1/2 -translate-x-1/2 sm:left-auto sm:right-4 sm:translate-x-0 flex flex-col gap-3 w-full max-w-[96vw] sm:max-w-sm pointer-events-none"
  >
    <TransitionGroup name="notification">
      <section
        v-for="msg in errorStore.messages"
        :key="msg.id"
        @click="errorStore.removeMessage(msg.id)"
        class="pointer-events-auto w-full flex flex-col items-start px-4 pt-2 pb-4 gap-2 border-2 transition-all duration-300 shadow-lg cursor-pointer"
        :class="[
          msg.type === 'success'
            ? 'bg-green-100 border-green-800'
            : 'bg-red-100 border-red-800',
        ]"
      >
        <div class="w-full flex items-center justify-between gap-2">
          <div class="flex items-center gap-2">
            <i
              :class="[
                'pi text-xl',
                msg.type === 'success'
                  ? 'pi-check text-green-600'
                  : 'pi-times text-red-600',
              ]"
            ></i>
            <p
              class="md:text-lg font-bold"
              :class="[
                msg.type === 'success' ? 'text-green-600' : 'text-red-600',
              ]"
            >
              {{ msg.type === "success" ? "Sukces" : "Błąd" }}
            </p>
          </div>
        </div>
        <p class="text-sm md:text-base text-neutral-600">
          {{ msg.message }}
        </p>
      </section>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notification-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.notification-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
.notification-leave-active {
  position: absolute;
}
</style>
