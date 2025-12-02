<script lang="ts">
import { Column, DataTable } from 'primevue';
import Card from '../components/shared/Card.vue';
import DashboardCard from '../components/shared/DashboardCard.vue';
import Title from '../components/shared/Title.vue';

    export default {
        data(): {
            items: any[],
        }
        {
            return {
                items: [],
            }
        },
        setup() {

        },
        mounted() {

        },
        components: {
            Title,
            DashboardCard,
            Card,
            DataTable,
            Column,
        }
    }
</script>

<template>
    <article class="min-h-screen flex flex-col gap-6">
        <Title content="Internal Tools Dashboard" subTitle="Monitor and manage your organization's software tools and expenses"/>

        <section class="grid grid-cols-4 gap-6 sm:grid-cols-2 md:grid-cols-4">
            <DashboardCard
                title="Monthly Budget"
                icon="arrow-up-right"
                fromColor="from-green-400"
                toColor="to-green-900"
                content="oui"
                content2="non"
                delta="+12%"
            />
            <DashboardCard
                title="Active Tools"
                icon="wrench"
                fromColor="from-blue-400"
                toColor="to-purple-700"
                content="oui"
                delta="+8$"
            />
            <DashboardCard
                title="Departments"
                icon="building"
                fromColor="from-orange-400"
                toColor="to-red-600"
                content="oui"
                delta="+12%"
            />
            <DashboardCard
                title="Cost/User"
                icon="users"
                fromColor="from-fuchsia-400"
                toColor="to-pink-600"
                content="oui"
                delta="+12%"
            />
        </section>
        <section class="flex flex-1">
            <Card width="w-full" height="h-full">
                <DataTable :value="items" tableStyle="min-width: 50rem">
                    <template #empty>No data</template>
                    <Column field="tool" header="Tool"></Column>
                    <Column field="department" header="Department"></Column>
                    <Column field="monthlyCost" header="Monthly Cost"></Column>
                    <Column field="status" header="Status"></Column>
                </DataTable>
            </Card>
        </section>
    </article>
    
</template>

<style scoped></style>