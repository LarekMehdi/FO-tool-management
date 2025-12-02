<script lang="ts"></script>

<template>
  <div class="flex items-center w-full">
    <div class="flex gap-x-4">
      <slot name="left"></slot>
    </div>
    <div class="ml-auto flex gap-x-4">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<style scoped></style>