
<script setup lang="ts">
  import Navbar from "./components/shared/Navbar.vue";
</script>


<template>
  <div class="flex flex-col min-h-screen m-0 p-0">
    <nav>
      <Navbar/>
    </nav>

    <main class="flex-1 px-3 sm:px-6 lg:px-10 bg-gray-50 pt-8">
      <RouterView/>
    </main>
  </div>
</template>

<style scoped></style>