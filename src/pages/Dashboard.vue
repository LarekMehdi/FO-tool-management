<script lang="ts">
import { Column, DataTable, type DataTablePageEvent, type DataTableSortEvent } from 'primevue';
import Card from '../components/shared/Card.vue';
import DashboardCard from '../components/shared/DashboardCard.vue';
import Title from '../components/shared/Title.vue';
import type { Tool } from '../interfaces/tool.interface';
import { ToolService } from '../services/tool.service';
import Tag from '../components/shared/Tag.vue';
import Row from '../components/shared/Row.vue';
import type { GenericFilter } from '../interfaces/filter.interface';
import { UtilEntity } from '../utils/entity.util';
import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import { computed, reactive, watch } from 'vue';
import { type DisplayAnalytics, type Analytics } from '../interfaces/analytics.interface';
import { AnalyticsService } from '../services/analytics.service';
import { emptyAnalytics } from '../data/initial.data';
import { useToast } from 'vue-toastification';
import { UtilNumber } from '../utils/number.util';
import ToolActionMenu from '../components/shared/ToolActionMenu.vue';
import Icon from '../components/shared/Icon.vue';
import type { Department } from '../interfaces/department.interface';
import { DepartmentService } from '../services/department.service';


    export default {
        setup() {

            const toast = useToast();
            const filter = reactive<GenericFilter>({
                _limit: 10,
                _offset: 0
            });

            // Query TanStack avec computed pour la queryKey réactive
            // TODO: updated_at <= 30 jours
            const toolsQuery: UseQueryReturnType<Tool[], Error> = useQuery({
                queryKey: computed(() => ['tools', filter]),
                queryFn: () => ToolService.findAll(filter),
                staleTime: 1000 * 60 * 5, // 5 minutes
            });

            const analyticsQuery: UseQueryReturnType<Analytics, Error> = useQuery({
                queryKey: computed(() => ['analytics']),
                queryFn: () => AnalyticsService.find(),
                staleTime: 1000 * 60 * 5,
            });

            const departmentsQuery: UseQueryReturnType<Department[], Error> = useQuery({
                queryKey: computed(() => ['departments']),
                queryFn: () => DepartmentService.findAll(),
                staleTime: 1000 * 60 * 5,
            });

            // Computed 
            const tools = computed(() => toolsQuery.data.value ?? []);
            const loadingTools = computed(() => toolsQuery.isLoading.value);
            const analytics = computed<Analytics>(() => analyticsQuery.data.value ?? emptyAnalytics);
            const loadingAnalytics = computed(() => analyticsQuery.isLoading.value);
            const displayAnalytics = computed<DisplayAnalytics>(() => UtilEntity.buildDisplayAnalytics(analytics.value));
            const departments = computed<Department[]>(() => departmentsQuery.data.value ?? []);
            const loadingDepartments = computed(() => departmentsQuery.isLoading.value);

            // Watchers
            watch(() => toolsQuery.error.value, (err: unknown) => {
                if (err) toast.error('An error occured while fetching tools data');
            });
            watch(() => analyticsQuery.error.value, (err: unknown) => {
                if (err) toast.error('An error occured while fetching analytics data');
            });
            watch(() => departmentsQuery.error.value, (err: unknown) => {
                if (err) toast.error('An error occured while fetching departments data');
            });
            // watch(() => toolsQuery.isSuccess.value, (ok) => {
            //     if (ok) {
            //         toast.success("Tools loaded successfully !");
            //     }
            // });

            // Méthodes
            function onPage(event: DataTablePageEvent) {
                const tempFilter: GenericFilter = UtilEntity.updateFilterOnPage(event, filter);
                filter._offset = tempFilter._offset;
                filter._limit = tempFilter._limit; 
            }

            function onSort(event: DataTableSortEvent) {
                const tempFilter: GenericFilter = UtilEntity.updateFilterOnSort(event, filter);
                filter._sort = tempFilter._sort;
                filter._order = tempFilter._order; 
            };

            return {
                filter,
                tools,
                analytics,
                displayAnalytics,
                loadingTools,
                loadingAnalytics,
                toolsQuery,
                departments,
                loadingDepartments,
                onPage,
                onSort,
                utilNumber: UtilNumber,
                utilEntity: UtilEntity,
            };
            
        },
        components: {
            Title,
            DashboardCard,
            Card,
            DataTable,
            Column,
            Tag,
            Row,
            ToolActionMenu,
            Icon,
        }
    }
</script>

<template>
    <article class="min-h-screen flex flex-col gap-6">
        <Title content="Internal Tools Dashboard" subTitle="Monitor and manage your organization's software tools and expenses"/>

        <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:grid-cols-4">
            <DashboardCard
                title="Monthly Budget"
                icon="chart-line"
                fromColor="from-green-400"
                toColor="to-green-900"
                :content="displayAnalytics.budget_current_month_total"
                :content2="displayAnalytics.budget_monthly_limit"
                :delta="displayAnalytics.budget_change"
            />
            <DashboardCard
                title="Active Tools"
                icon="wrench"
                fromColor="from-blue-400"
                toColor="to-purple-700"
                :content="displayAnalytics.active_tools ?? 'Missing data'"
                :delta="displayAnalytics.tools_change"
            />
            <DashboardCard
                title="Departments"
                icon="building"
                fromColor="from-orange-400"
                toColor="to-red-600"
                :content="String(departments.length) ?? 'Missing data'"
                :delta="displayAnalytics.departments_change"
            />
            <DashboardCard
                title="Cost/User"
                icon="users"
                fromColor="from-fuchsia-400"
                toColor="to-pink-600"
                :content="displayAnalytics.cost_per_user"
                :delta="displayAnalytics.cost_by_user_change"
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
                <article class="overflow-x-auto">
                    <DataTable 
                        class="table-class" 
                        :value="tools" 
                        tableStyle="min-width: 50rem"
                        :loading="loadingTools"
                        :lazy="true"
                        :paginator="true"
                        :rows="10"
                        :totalRecords="99999"
                        style="width: 100%;"
                        @page="onPage"
                        @sort="onSort"
                    >
                        <template #empty>
                            <div class="text-center py-8 text-gray-500"> No data </div>
                        </template>
                        
                        <template #loading>
                            <div class="text-center py-8">
                                <span class="text-gray-600">Loading data...</span>
                            </div>
                        </template>

                        <Column field="name" header="Tool" sortable style="width: 40%;">
                            <template #body="slotProps">
                                <section class="flex items-center gap-8">
                                    <Icon :iconUrl="slotProps.data.icon_url"/>
                                    <strong>{{ slotProps.data.name }}</strong>
                                </section>
                            </template>
                        </Column>
                        <Column field="owner_department" header="Department" sortable style="width: 15%;"></Column>
                        <Column field="active_users_count" header="Users" sortable style="width: 15%;"></Column>
                        <Column field="monthly_cost" header="Monthly Cost" sortable style="width: 15%;">
                            <template #body="slotProps">
                                {{ slotProps.data.monthly_cost ? utilNumber.toEnglishString(slotProps.data.monthly_cost) : '-' }}
                            </template>
                        </Column>
                        <Column field="status" header="Status" sortable style="width: 15%;">
                            <template #body="slotProps">
                                <Tag
                                    :content="slotProps.data.status ?? 'unknown'"
                                    :fromColor="utilEntity.getStatusColor(slotProps.data.status).from"
                                    :toColor="utilEntity.getStatusColor(slotProps.data.status).to"
                                />
                            </template>
                        </Column>
                        <Column header="Action" style="width: 5%;">
                            <template #body="slotProps">
                                <section class="flex justify-center items-center">
                                    <ToolActionMenu
                                        :modelValue="slotProps.data.id"
                                        @details="(id: number) => console.log('open details', id)"
                                        @edit="(id: number) => console.log('edit', id)"
                                        @delete="(id: number) => console.log('delete', id)"
                                    />
                                </section>
                            </template>
                        </Column>
                    </DataTable>
                </article>
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
    ::v-deep(.table-class tbody tr) {
        transition: background-color 0.2s ease;
    }
    ::v-deep(.table-class tbody tr:hover) {
        background-color: rgba(0, 0, 0, 0.05);
    }
</style>