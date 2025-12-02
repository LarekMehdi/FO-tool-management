<script lang="ts">
    export default {
        props: {
            content: {
                type: String,
                required: true,
            },
            color: {
                type: String,
                required: false,
                default: 'bg-gray-200',
            },
            isIcon: {
                type: Boolean,
                required: false,
                default: false,
            },
            isRounded: {
                type: Boolean,
                required: false,
                default: false,
            }
        }
    }
</script>

<template>
    <section :class="`inline-flex items-center justify-center ${isRounded ? 'w-8 h-8' : 'px-3 py-1'} rounded-xl text-sm ${color}`">
        <i v-if="isIcon" :class="`pi pi-${content} text-gray-50`"></i>
        <small v-else class="text-gray-50">{{ content }}</small>
    </section>
</template>

<style scoped></style>