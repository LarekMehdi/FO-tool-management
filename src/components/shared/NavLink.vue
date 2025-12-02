<script lang="ts">
export default {
    props: {
        to: {
            type: String,
            required: true
        }
    },
    computed: {
        isActive(): boolean {
            return this.$route.path === this.to;
        },
        linkClass(): string {
            return this.isActive ? 'text-black' : 'text-gray-500';
        }
    }
}

</script>

<template>
  <router-link
    :to="to"
    :class="linkClass"
  >
    <slot></slot>
  </router-link>
</template>

<style scoped></style>