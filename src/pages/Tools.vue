<script lang="ts">
import Title from '../components/shared/Title.vue';

    export default {
        setup() {
            return {}
        },
        components: {
            Title,
        },
    }
</script>

<template>
    <article class="min-h-screen flex flex-col gap-6">
        <Title content="Your Organization’s Tools" subTitle="Track usage, cost, and status of your tools"/>
    </article>
</template>

<style scoped></style>