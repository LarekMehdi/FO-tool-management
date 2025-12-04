<script lang="ts">
import { computed, watch } from 'vue';
import Card from '../components/shared/Card.vue';
import LineChart from '../components/shared/LineChart.vue';
import Row from '../components/shared/Row.vue';
import Title from '../components/shared/Title.vue';
import type { LineChartData } from '../interfaces/chart.interface';
import { UtilChart } from '../utils/chart.util';
import { useQuery, type UseQueryReturnType } from '@tanstack/vue-query';
import type { Tool } from '../interfaces/tool.interface';
import { ToolService } from '../services/tool.service';
import type { GenericFilter } from '../interfaces/filter.interface';
import { useToast } from 'vue-toastification';
import type { MonthlyCostAnalytics } from '../interfaces/analytics.interface';
import { UtilMapper } from '../utils/mapper.util';
import DonutChart from '../components/shared/DonutChart.vue';
import { UtilEntity } from '../utils/entity.util';


export default {
    setup() {
        const toast = useToast();
        const filter: GenericFilter = {
            _limit: 9999,
            _offset: 0
        };

        // query Tanstack
        const allToolsQuery: UseQueryReturnType<Tool[], Error> = useQuery({
            queryKey: ['all-tools'],
            queryFn: () => ToolService.findAll(filter),
            staleTime: 1000 * 60 * 5,
        });

        // Computed 
        const allTools = computed(() => allToolsQuery.data.value ?? []);

        // Watchers
        watch(() => allToolsQuery.error.value, (err: unknown) => {
            if (err) {
                toast.error('An error occured while fetching tools');
            }
        });

        const departmentCost = computed(() => UtilEntity.computeDepartmentCost(allTools.value));
        const donutData = computed(() => UtilChart.buildDepartmentCostDonutChartData(departmentCost.value));
        const donutOptions = UtilChart.getDefaultDonutOptions();
        const toolDatas = computed<MonthlyCostAnalytics[]>(() => 
            UtilMapper.mapToolListToMonthlyCostAnalytics(allTools.value)
        );
        const chartData = computed<LineChartData>(() => 
            UtilChart.buildMonthlySpendLineChartData(toolDatas.value)
        );
        const chartOptions = UtilChart.getDefaultLineChartOptions();
        
        
        return {
            chartData, 
            chartOptions,
            donutData,
            donutOptions,
        }
    },
    components: {
        Title,
        Card,
        Row,
        LineChart,
        DonutChart,
    },
}
</script>

<template>
    <article class="min-h-screen flex flex-col gap-6">
        <Title content="Tools Performance Insights" subTitle="Analyze usage, costs, and trends to optimize your organization"/>

        <section class="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <!-- LINE CHART -->
            <Card class="h-96 lg:h-[600px] flex flex-col col-span-2">
                <Row>
                    <template #left>
                        <div class="flex items-baseline">
                        <strong>Monthly Spend Evolution</strong>
                        </div>
                    </template>
                </Row>
                <LineChart
                    class="flex-1 w-full"
                    :chartData="chartData"
                    :chartOptions="chartOptions"
                />
            </Card>

            <!-- DONUT CHART -->
            <Card class="h-64 lg:h-[300px] flex flex-col">
                <Row>
                    <template #left>
                        <div class="flex items-baseline">
                        <strong>Department Cost Distribution</strong>
                        </div>
                    </template>
                </Row>
                <DonutChart
                    class="flex-1 w-full"
                    :chartData="donutData"
                    :chartOptions="donutOptions"
                />
            </Card>

            
        </section>
    </article>
</template>

<style scoped></style>