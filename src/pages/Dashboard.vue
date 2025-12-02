<script lang="ts">
import DashboardCard from '../components/shared/DashboardCard.vue';
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
            DashboardCard,
        }
    }
</script>

<template>
    <Title content="Internal Tools Dashboard" subTitle="Monitor and manage your organization's software tools and expenses"/>

    <div class="grid grid-cols-4 gap-6 sm:grid-cols-2 md:grid-cols-4">
        <DashboardCard
            title="Monthly Budget"
            icon="arrow-up-right"
            content="oui"
            content2="non"
            delta="+12%"
        />
        <DashboardCard
            title="Active Tools"
            icon="wrench"
            content="oui"
            delta="+8$"
        />
        <DashboardCard
            title="Departments"
            icon="building"
            content="oui"
            delta="+12%"
        />
        <DashboardCard
            title="Cost/User"
            icon="users"
            content="oui"
            delta="+12%"
        />
    </div>
</template>

<style scoped>
</style>