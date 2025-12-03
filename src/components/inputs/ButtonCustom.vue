<script lang="ts">
    export default {
        data() {
            return {}
        },
        props: {
            buttonColor: {
                type: String,
                required: false,
                default: 'bg-blue-600'
            },
            buttonColorHover: {
                type: String,
                required: false,
                default: 'hover:bg-blue-700'
            },
            content: {
                type: String,
                required: true,
            },
        },
        methods: {},
        emits: ['click']
    }
</script>

<template>
    <button
        type="button" 
        :class="[buttonColor, buttonColorHover, 'py-2 px-4 rounded active:shadow-lg min-w-[150px] text-white transition-colors']"
        @click="$emit('click')"
    >
        {{ content }}
    </button>
</template>