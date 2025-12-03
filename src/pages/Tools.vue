<script lang="ts">
import { Column, DataTable } from 'primevue';
import Card from '../components/shared/Card.vue';
import Row from '../components/shared/Row.vue';
import Title from '../components/shared/Title.vue';
import { useToast } from 'vue-toastification';
import { useInfiniteQuery } from '@tanstack/vue-query';
import { computed, watch, onMounted, onUnmounted, ref } from 'vue';
import type { ToolListFilter } from '../interfaces/filter.interface';
import { ToolService } from '../services/tool.service';
import { ITEMS_PER_PAGE, SCROLL_THRESHOLD } from '../constantes/filter.constante';

export default {
    setup() {
        const toast = useToast();

        const dataTableRef = ref<any>(null);
        let scrollListener: ((event: Event) => void) | null = null;

        // Infinite Query
        const toolsQuery = useInfiniteQuery({
            queryKey: ['tool-list-infinite'],
            queryFn: async ({ pageParam = 0 }) => {
                const filter: ToolListFilter = {
                    _limit: ITEMS_PER_PAGE,
                    _offset: pageParam
                };
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

        // Computed
        const loadingTools = computed(() => toolsQuery.isLoading.value);
        const isFetchingMore = computed(() => toolsQuery.isFetchingNextPage.value);
        const hasNextPage = computed(() => toolsQuery.hasNextPage.value);
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

        onMounted(() => {
            setTimeout(attachScrollListener, 300);
        });

        onUnmounted(() => {
            detachScrollListener();
        });

        return {
            dataTableRef,
            tools,
            loadingTools,
            isFetchingMore,
            hasNextPage,
        }
    },
    components: {
        Title,
        Card,
        Row,
        DataTable,
        Column,
    },
}
</script>

<template>
    <article class="min-h-screen flex flex-col gap-6">
        <Title content="Your Organization's Tools" subTitle="Track usage, cost, and status of your tools"/>

        <section class="grid grid-cols-4 gap-6 sm:grid-cols-2 md:grid-cols-4">
            <!-- TODO: Stats cards  -->
        </section>

        <section class="flex flex-1">
            <Card width="w-full" height="h-full">
                <Row class="mb-7">
                    <template #left>
                        <strong>All Tools</strong>
                        <span class="ml-2 text-sm text-gray-500">({{ tools.length }} loaded)</span>
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
                        <div class="text-center py-8 text-gray-500">
                            No tools found
                        </div>
                    </template>
                    
                    <template #loading>
                        <div class="text-center py-8">
                            <span class="text-gray-600">Loading data...</span>
                        </div>
                    </template>

                    <Column field="name" header="Tool" sortable style="width: 15%;">
                        <template #body="slotProps">
                            <strong>{{ slotProps.data.name }}</strong>
                        </template>
                    </Column>
                    <Column field="description" header="Description" sortable style="width: 45%;"></Column>
                    <Column field="category" header="Category" sortable style="width: 10%;"></Column>
                    <Column field="status" header="Status" sortable style="width: 5%;"></Column>
                    <Column field="updated_at" header="Last Update" sortable style="width: 5%;"></Column>
                    <Column field="department" header="Department" sortable style="width: 10%;"></Column>
                    <Column field="user_count" header="User Count" sortable style="width: 5%;"></Column>
                    <Column header="Action" style="width: 5%;"></Column>
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
</template>

<style scoped>
.table-class :deep(.p-datatable-table-container) {
    scroll-behavior: smooth;
}
</style>