<script lang="ts">
import { Column, DataTable } from 'primevue';
import Card from '../components/shared/Card.vue';
import Row from '../components/shared/Row.vue';
import Title from '../components/shared/Title.vue';
import { useToast } from 'vue-toastification';
import { useInfiniteQuery, useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import { computed, watch, onMounted, onUnmounted, ref, nextTick } from 'vue';
import type { ToolListFilter } from '../interfaces/filter.interface';
import { ToolService } from '../services/tool.service';
import { ITEMS_PER_PAGE, SCROLL_THRESHOLD } from '../constantes/filter.constante';
import { UtilDate } from '../utils/date.util';
import DashboardCard from '../components/shared/DashboardCard.vue';
import type { SmallTool } from '../interfaces/tool.interface';
import { emptySmallTool } from '../data/initial.data';
import { UtilNumber } from '../utils/number.util';
import { UtilEntity } from '../utils/entity.util';
import Tag from '../components/shared/Tag.vue';
import ToolActionMenu from '../components/shared/ToolActionMenu.vue';
import ButtonCustom from '../components/inputs/ButtonCustom.vue';
import ToolListFilterPanel from '../components/filters/ToolListFilterPanel.vue';
import { filter } from '@primeuix/themes/nora/tree';

export default {
    setup() {
        const toast = useToast();
        const dataTableRef = ref<any>(null);
        const displayFilterDrawer = ref<boolean>(false);
        let scrollListener: ((event: Event) => void) | null = null;
        const filter: ToolListFilter = {
            _limit: ITEMS_PER_PAGE,
            _offset: 0
        };
        

        // Infinite Query
        const toolsQuery = useInfiniteQuery({
            queryKey: ['tool-list-infinite'],
            queryFn: async ({ pageParam = 0 }) => {
                filter._offset = pageParam;
                return await ToolService.findAllForList(filter);
            },
            getNextPageParam: (lastPage, allPages) => {
                if (!lastPage || lastPage.length < ITEMS_PER_PAGE) {
                    return undefined;
                }
                return allPages.length * ITEMS_PER_PAGE;
            },
            initialPageParam: 0,
            staleTime: 1000 * 60 * 5,
        });

        // Tanstack Query
        const expensiveToolQuery: UseQueryReturnType<SmallTool[], Error> = useQuery({
            queryKey: computed(() => ['expensive-tool']),
            queryFn: () => ToolService.findMostExpensive(),
            staleTime: 1000 * 60 * 5,
        });
        const cheapestToolQuery: UseQueryReturnType<SmallTool[], Error> = useQuery({
            queryKey: computed(() => ['cheapest-tool']),
            queryFn: () => ToolService.findCheapest(),
            staleTime: 1000 * 60 * 5,
        });

        // Computed
        const loadingTools = computed(() => toolsQuery.isLoading.value);
        const isFetchingMore = computed(() => toolsQuery.isFetchingNextPage.value);
        const hasNextPage = computed(() => toolsQuery.hasNextPage.value);
        const loadingExpensiveTool = computed(() => expensiveToolQuery.isLoading.value);
        const loadingCheapestTool = computed(() => cheapestToolQuery.isLoading.value);

        const expensiveTool = computed(() => {
            const data = expensiveToolQuery.data.value ;
            return (data && data.length > 0) ? data[0] : emptySmallTool;
        });

        const cheapestTool = computed(() => {
            const data = cheapestToolQuery.data.value;
            return (data && data.length > 0) ? data[0] : emptySmallTool;
        });
        
        const tools = computed(() => {
            if (!toolsQuery.data.value) return [];
            return toolsQuery.data.value.pages.flat();
        });

        // Watchers
        watch(() => toolsQuery.error.value, (err: unknown) => {
            if (err) {
                toast.error('An error occured while fetching tool list');
            }
        });
        watch(() => expensiveToolQuery.error.value, (err: unknown) => {
            if (err) {
                toast.error('An error occured while fetching most expensive tool');
            }
        });
        watch(() => cheapestToolQuery.error.value, (err: unknown) => {
            if (err) {
                toast.error('An error occured while fetching cheapest tool');
            }
        });
        

        // Methodes
        function onScroll(event: Event) {
            const target: HTMLElement = event.target as HTMLElement;
            const distanceFromBottom: number = target.scrollHeight - target.scrollTop - target.clientHeight;

            if (distanceFromBottom < SCROLL_THRESHOLD && !isFetchingMore.value && hasNextPage.value) {
                toolsQuery.fetchNextPage();
            }
        }

        // scrollListener sur datatable
        function attachScrollListener() {
            if (!dataTableRef.value) return;

            const scrollableElement = dataTableRef.value.$el.querySelector('.p-datatable-table-container');
            
            if (scrollableElement) {
                scrollListener = onScroll;
                scrollableElement.addEventListener('scroll', scrollListener);
            }
        }

        function detachScrollListener() {
            if (dataTableRef.value && scrollListener) {
                const scrollableElement = dataTableRef.value.$el.querySelector('.p-datatable-table-container');
                if (scrollableElement) {
                    scrollableElement.removeEventListener('scroll', scrollListener);
                }
            }
        }

        function toggleFilterDrawer() {
            displayFilterDrawer.value = !displayFilterDrawer.value;
        }

        onMounted(async () => {
            await nextTick();
            attachScrollListener();
        });

        onUnmounted(() => {
            detachScrollListener();
        });

        return {
            dataTableRef,
            displayFilterDrawer,
            filter,
            tools,
            expensiveTool,
            cheapestTool,
            loadingExpensiveTool,
            loadingCheapestTool,
            loadingTools,
            isFetchingMore,
            hasNextPage,
            toggleFilterDrawer,
            utilDate: UtilDate,
            utilNumber: UtilNumber,
            utilEntity: UtilEntity,
        }
    },
    components: {
        Title,
        Card,
        Row,
        DataTable,
        Column,
        DashboardCard,
        Tag,
        ToolActionMenu,
        ButtonCustom,
        ToolListFilterPanel,
    },
}
</script>

<template>
    <article class="min-h-screen flex flex-col gap-6">
        <Title content="Your Organization's Tools" subTitle="Track usage, cost, and status of your tools"/>

        <section class="grid grid-cols-4 gap-6 sm:grid-cols-2 md:grid-cols-4">
            <DashboardCard
                title="Most Expensive Tool"
                icon="dollar"
                fromColor="from-red-400"
                toColor="to-red-700"
                :content="expensiveTool!.name"
                :delta="utilNumber.toEnglishString(expensiveTool!.monthly_cost) + '/month'"
            />
            <DashboardCard
                title="Cheapest Tool"
                icon="trophy"
                fromColor="from-teal-400"
                toColor="to-teal-700"
                :content="cheapestTool!.name"
                :delta="utilNumber.toEnglishString(cheapestTool!.monthly_cost) + '/month'"
            />
        </section>

        <Row>
            <template #right>
                <ButtonCustom content="Filter" @click="toggleFilterDrawer"/>
            </template>
        </Row>

        <section class="flex flex-1">
            <Card width="w-full" height="h-full">
                <Row class="mb-7">
                    <template #left>
                        <div class="flex items-baseline">
                            <strong>All Tools</strong>
                            <small class="ml-2 text-gray-500">({{ tools.length }} loaded)</small>
                        </div>
                        
                    </template>
                    <template #right>
                        <span v-if="hasNextPage" class="text-sm text-gray-500">
                            Scroll to load more
                        </span>
                        <span v-else-if="tools.length > 0" class="text-sm text-green-600">
                            All data loaded
                        </span>
                    </template>
                </Row>

                <DataTable 
                    ref="dataTableRef"
                    class="table-class" 
                    :value="tools" 
                    tableStyle="min-width: 50rem"
                    :loading="loadingTools"
                    :scrollable="true"
                    scrollHeight="500px"
                    style="width: 100%;"
                >
                    <template #empty>
                        <div class="text-center py-8 text-gray-500"> No tools found </div>
                    </template>
                    
                    <template #loading>
                        <div class="text-center py-8">
                            <span class="text-gray-600">Loading data...</span>
                        </div>
                    </template>

                    <Column field="name" header="Tool" sortable style="width: 10%;">
                        <template #body="slotProps">
                            <strong>{{ slotProps.data.name }}</strong>
                        </template>
                    </Column>
                    <Column field="description" header="Description" sortable style="width: 35%;"></Column>
                    <Column field="category" header="Category" sortable style="width: 10%;"></Column>
                    <Column field="status" header="Status" sortable style="width: 5%;">
                        <template #body="slotProps">
                            <Tag
                                :content="slotProps.data.status"
                                :fromColor="utilEntity.getStatusColor(slotProps.data.status).from"
                                :toColor="utilEntity.getStatusColor(slotProps.data.status).to"
                            />
                        </template>
                    </Column>
                    <Column field="monthly_cost" header="Monthly Cost" sortable style="width: 5%;">
                        <template #body="slotProps">
                            {{ utilNumber.toEnglishString(slotProps.data.monthly_cost) }}
                        </template>
                    </Column>
                    <Column field="updated_at" header="Last Update" sortable style="width: 15%;">
                        <template #body="slotProps">
                            {{ utilDate.formatEnglish(slotProps.data.updated_at) }}
                        </template>
                    </Column>
                    <Column field="owner_department" header="Department" sortable style="width: 10%;"></Column>
                    <Column field="active_users_count" header="User Count" sortable style="width: 5%;"></Column>
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

                <div v-if="isFetchingMore" class="text-center py-3 border-t">
                    <span class="text-gray-600">Loading more tools...</span>
                </div>

                <div v-if="!hasNextPage && tools.length > 0" class="text-center py-3 text-sm text-gray-500 border-t">
                    End of list - {{ tools.length }} tools total
                </div>
            </Card>
        </section>
    </article>

    <!-- ----------------- -->

    <ToolListFilterPanel v-model:display="displayFilterDrawer" :filter="filter"/>
    
</template>

<style scoped>
.table-class :deep(.p-datatable-table-container) {
    scroll-behavior: smooth;
}
</style>