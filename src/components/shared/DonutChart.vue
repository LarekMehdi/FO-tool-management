<script lang="ts">
import { Doughnut } from 'vue-chartjs'
import type { ChartData, ChartOptions } from 'chart.js'
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'
import type { PropType } from 'vue'

ChartJS.register(Tooltip, Legend, ArcElement);

    export default {
        props: {
            chartData: { 
                type: Object as PropType<ChartData<'doughnut', number[], unknown>>, 
                required: true 
            },
            chartOptions: { 
                type: Object as PropType<ChartOptions<'doughnut'>>, 
                required: false, 
                default: () => ({}) 
            },
        },
        components: {
            Doughnut,
        },
    }
</script>

<template>
    <Doughnut :data="chartData" :options="chartOptions" />
</template>

<style scoped></style>