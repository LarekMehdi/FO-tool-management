<script lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  type ChartOptions
} from 'chart.js'
import type { LineChartData } from '../../interfaces/chart.interface';
import type { PropType } from 'vue';
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

    export default {
        props: {
            chartData: {
                type: Object as PropType<LineChartData>,
                required: true,
            },
            chartOptions: {
                type: Object as PropType<ChartOptions<'line'>>,
                required: true,
            }
        },
        components: {
            Line,
        },
    }
</script>

<template>
    <Line :data="chartData" :options="chartOptions" />
</template>

<style scoped></style>