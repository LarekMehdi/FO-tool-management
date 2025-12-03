<script lang="ts">
import { Drawer } from 'primevue';

    export default {
        props: {
            display: {
                type: Boolean,
                required: true,
            },
            header: {
                type: String,
                required: false,
                default: 'Search'
            },
        },
        methods: {
            onUpdateVisible(val: boolean) {
                this.$emit('update:display', val);
            }
        },
        emits: ['update:display'],
        components: {
            Drawer,
        },
    }
</script>

<template>
    <Drawer :visible="display" @update:visible="onUpdateVisible" :header="header" position="right">
        <slot name="body"></slot>
    </Drawer>
</template>

<style scoped></style>

