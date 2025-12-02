<script lang="ts">
    export default {
        props: {
            width: {
                type: String,
                required: false,
                default: "w-50"
            },
            height: {
                type: String,
                required: false,
                default: "h-48"
            }
        }
    }
</script>

<template>
    <article :class="`${width} ${height} bg-white border rounded-lg shadow-sm p-4`">
        <slot></slot>
    </article>
</template>

<style scoped></style>