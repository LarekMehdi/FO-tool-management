<script lang="ts">

    export default {
        props: {
            iconUrl: {
                type: String,
                required: true,
            },
            alt: {
                type: String,
                required: false,
                default: 'Tool Icon'
            },
            size: {
                type: Number,
                required: false,
                default: 24,
            }
        },
        components: {

        },
    }
</script>

<template>
    <img 
        :src="iconUrl" 
        :alt="alt" 
        :width="size" 
        :height="size" 
        class="object-contain rounded" 
    />
</template>

<style scoped></style>