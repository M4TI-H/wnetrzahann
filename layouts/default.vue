<template>
  <section class="w-full min-h-screen flex flex-col text-neutral-800">
    <Navbar />

    <main class="flex-1 overflow-y-auto">
      <slot />
    </main>
  </section>
</template>
