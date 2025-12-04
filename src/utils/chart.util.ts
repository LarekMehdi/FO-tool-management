import type { ChartOptions } from "chart.js";
import type { MonthlyCostAnalytics } from "../interfaces/analytics.interface";
import type { ChartDataset, LineChartData } from "../interfaces/chart.interface";

export abstract class UtilChart {

    static buildMonthlySpendLineChartData(tools: MonthlyCostAnalytics[]): LineChartData {
        const labels = ['Previous Month', 'Current Month'];

        const datasets: ChartDataset[] = tools.map(tool => ({
            label: tool.name,
            data: [tool.previous_month_cost, tool.monthly_cost],
            borderColor: this.generateRandomColor(),
            backgroundColor: 'rgba(0,0,0,0)',
            tension: 0.4
        }));

        return { labels, datasets };
    }


    static getDefaultLineChartOptions(): ChartOptions<'line'> {
        return {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top'
                },
                tooltip: {
                    mode: 'index',
                    intersect: false
                }
            },
            interaction: {
                mode: 'nearest',
                axis: 'x',
                intersect: false
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        };
    }

    static generateRandomColor(): string {
        const r = Math.floor(Math.random() * 200);
        const g = Math.floor(Math.random() * 200);
        const b = Math.floor(Math.random() * 200);
        return `rgb(${r},${g},${b})`;
    }

}