import { defineStore } from 'pinia';
import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import { ToolService } from '../services/tool.service';
import type { Tool } from '../interfaces/tool.interface';
import { computed } from 'vue';

export const useToolStore = defineStore('tool', () => {
    // Query TanStack
    const allToolsQuery: UseQueryReturnType<Tool[], Error> = useQuery({
        queryKey: ['all-tools'],
        queryFn: () => ToolService.findAll({ _limit: 1000, _offset: 0 }),
        staleTime: 1000 * 60 * 5,
    });

    const allTools = computed(() => allToolsQuery.data.value ?? []);
    const isLoading = computed(() => allToolsQuery.isLoading.value);
    const error = computed(() => allToolsQuery.error.value);

    return { allToolsQuery, allTools, isLoading, error };
});
