import type { ChartOptions } from "chart.js";
import type { MonthlyCostAnalytics } from "../interfaces/analytics.interface";
import type { ChartDataset, LineChartData } from "../interfaces/chart.interface";
import { generateRandomColor } from "../constantes/color.constante";
import type { DepartmentCost } from "../interfaces/department.interface";
import { UtilNumber } from "./number.util";

export abstract class UtilChart {

    /** LINE CHART **/

    static buildMonthlySpendLineChartData(tools: MonthlyCostAnalytics[]): LineChartData {
        const labels = ['Previous Month', 'Current Month'];

        const datasets: ChartDataset[] = tools.map((tool, index) => ({
            label: tool.name,
            data: [tool.previous_month_cost, tool.monthly_cost],
            borderColor: generateRandomColor(index),
            backgroundColor: 'rgba(0,0,0,0)',
            tension: 0.4
        }));

        return { labels, datasets };
    }


    static getDefaultLineChartOptions(): ChartOptions<'line'> {
        return {
            responsive: true,
            maintainAspectRatio: false,
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

    /** DONUT CHART **/

    static buildDepartmentCostDonutChartData(departmentAnalytics: DepartmentCost[]) {
        const labels = departmentAnalytics.map(d => d.department);
        const values = departmentAnalytics.map(d => d.total_cost);
        const color = labels.map((_, index) => generateRandomColor(index));

        return {
            labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: color,
                    borderColor: '#ffffff',
                    borderWidth: 2,
                }
            ]
        };
    }

    static getDefaultDonutOptions(): ChartOptions<'doughnut'> {
        return {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                    },
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const label = context.label || '';
                            const value = UtilNumber.toEnglishString(Number(context.raw)) || 0;
                            return `${label}: ${value}`;
                        },
                    },
                },
            },
        };
    }


}