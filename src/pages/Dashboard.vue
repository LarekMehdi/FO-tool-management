<script lang="ts">
import { Column, DataTable } from 'primevue';
import Card from '../components/shared/Card.vue';
import DashboardCard from '../components/shared/DashboardCard.vue';
import Title from '../components/shared/Title.vue';
import type { Tool } from '../interfaces/tool.interface';
import { ToolService } from '../services/tool.service';
import Tag from '../components/shared/Tag.vue';
import type { ToolStatus } from '../constantes/tool-status.constante';
import type { ColorGradient } from '../interfaces/shared.interface';
import Row from '../components/shared/Row.vue';


    export default {
        data(): {
            tools: Tool[],
        }
        {
            return {
                tools: [],
            }
        },
        setup() {

        },
        mounted() {
            this.initDashboard();
        },
        methods: {
            initDashboard() {
                this.loadCardData();
                this.loadRecentTools();
            },
            loadCardData() {
                console.log('load');
            },
            async loadRecentTools() {
                this.tools = await ToolService.findAll();
                console.log('tools => ', this.tools);
            },
            getStatusColor(status: ToolStatus): ColorGradient {
                switch(status) {
                    case 'active': return { from: 'from-green-500', to: 'to-green-700' };
                    case 'expiring': return { from: 'from-orange-400', to: 'to-orange-700' };
                    case 'unused': return { from: 'from-red-500', to: 'to-red-700' };
                    default: return { from: 'from-gray-500', to: 'to-gray-700' };
                }
            },
        },
        components: {
            Title,
            DashboardCard,
            Card,
            DataTable,
            Column,
            Tag,
            Row,
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

                <Row class="mb-7">
                    <template #left>
                        <strong>Recent Tools</strong>
                    </template>
                    <template #right>
                        <i class="pi pi-calendar text-gray-500 text-sm"></i>
                        <small class="text-gray-500">Last 30 days</small>
                    </template>
                </Row>

                <DataTable class="table-class" :value="tools" tableStyle="min-width: 50rem">
                    <template #empty>No data</template>
                    <Column field="name" header="Tool">
                        <template #body="slotProps">
                            <strong>{{ slotProps.data.name }}</strong>
                        </template>
                    </Column>
                    <Column field="owner_department" header="Department"></Column>
                    <Column field="active_users_count" header="Users"></Column>
                    <Column field="monthly_cost" header="Monthly Cost"></Column>
                    <Column field="status" header="Status">
                        <template #body="slotProps">
                            <Tag
                                :content="slotProps.data.status"
                                :fromColor="getStatusColor(slotProps.data.status).from"
                                :toColor="getStatusColor(slotProps.data.status).to"
                            />
                        </template>
                    </Column>
                </DataTable>
            </Card>
        </section>
    </article>
    
</template>

<style scoped>
    ::v-deep(.table-class thead th) {
        font-weight: normal;
        font-size: 0.875rem;
    }
    ::v-deep(.table-class thead th),
    ::v-deep(.table-class thead th span) {
        font-weight: normal !important;
        font-size: 0.875rem;
    }
</style>