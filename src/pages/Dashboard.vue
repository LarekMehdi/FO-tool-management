<script lang="ts">
import { Column, DataTable, type DataTablePageEvent, type DataTableSortEvent } from 'primevue';
import Card from '../components/shared/Card.vue';
import DashboardCard from '../components/shared/DashboardCard.vue';
import Title from '../components/shared/Title.vue';
import type { Tool } from '../interfaces/tool.interface';
import { ToolService } from '../services/tool.service';
import Tag from '../components/shared/Tag.vue';
import type { ToolStatus } from '../constantes/tool-status.constante';
import type { ColorGradient } from '../interfaces/shared.interface';
import Row from '../components/shared/Row.vue';
import type { GenericFilter } from '../interfaces/filter.interface';
import { UtilEntity } from '../utils/entity.util';


    export default {
        data(): {
            filter: GenericFilter,
            tools: Tool[],
        }
        {
            return {
                filter: {
                    _limit: 10,
                    _offset: 0
                },
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
                
            },
            async loadRecentTools() {
                const newTools: Tool[] = await ToolService.findAll(this.filter);
                this.tools = newTools;
                
            },
            getStatusColor(status: ToolStatus): ColorGradient {
                switch(status) {
                    case 'active': return { from: 'from-green-500', to: 'to-green-700' };
                    case 'expiring': return { from: 'from-orange-400', to: 'to-orange-700' };
                    case 'unused': return { from: 'from-red-500', to: 'to-red-700' };
                    default: return { from: 'from-gray-500', to: 'to-gray-700' };
                }
            },
            onPage(event: DataTablePageEvent) {
  
                const tempFilter: GenericFilter = UtilEntity.updateFilterOnPage(event, this.filter);
                this.filter._offset = tempFilter._offset;
                this.filter._limit = tempFilter._limit; 
                this.loadRecentTools();
            },
            onSort(event: DataTableSortEvent) {
                const tempFilter: GenericFilter = UtilEntity.updateFilterOnSort(event, this.filter);
                this.filter._sort = tempFilter._sort;
                this.filter._order = tempFilter._order; 
                this.loadRecentTools();
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

                <!-- hack, l'API ne renvois pas le totalRecords -->
                <DataTable 
                    class="table-class" 
                    :value="tools" 
                    tableStyle="min-width: 50rem"
                    :lazy="true"
                    :paginator="true"
                    :rows="10"
                    :totalRecords="99999"
                    style="width: 100%;"
                    @page="onPage"
                    @sort="onSort"
                >
                    <template #empty>No data</template>
                    <Column field="name" header="Tool" sortable style="width: 40%;">
                        <template #body="slotProps">
                            <strong>{{ slotProps.data.name }}</strong>
                        </template>
                    </Column>
                    <Column field="owner_department" header="Department" sortable style="width: 15%;"></Column>
                    <Column field="active_users_count" header="Users" sortable style="width: 15%;"></Column>
                    <Column field="monthly_cost" header="Monthly Cost" sortable style="width: 15%;"></Column>
                    <Column field="status" header="Status" sortable style="width: 15%;">
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