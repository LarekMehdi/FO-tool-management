<script lang="ts">
import Card from '../components/shared/Card.vue';
import Title from '../components/shared/Title.vue';

    export default {
        data(): {

        }
        {
            return {}
        },
        setup() {

        },
        mounted() {

        },
        components: {
            Title,
            Card,
        }
    }
</script>

<template>
    <Title content="Internal Tools Dashboard" subTitle="Monitor and manage your organization's software tools and expenses"/>

    <div class="grid grid-cols-4 gap-6 sm:grid-cols-2 md:grid-cols-4">
        <Card>Carte 1</Card>
        <Card>Carte 2</Card>
        <Card>Carte 3</Card>
        <Card>Carte 4</Card>
    </div>
</template>

<style scoped>
</style>