import type { DataTablePageEvent, DataTableSortEvent } from "primevue";
import type { GenericFilter } from "../interfaces/filter.interface";
import type { Analytics, DisplayAnalytics } from "../interfaces/analytics.interface";
import { UtilNumber } from "./number.util";
import type { ToolStatus } from "../constantes/tool-status.constante";
import type { ColorGradient } from "../interfaces/shared.interface";
import type { DepartmentCost } from "../interfaces/department.interface";
import type { Tool } from "../interfaces/tool.interface";

export abstract class UtilEntity {

    /** FILTER **/

    static updateFilterOnPage(event: DataTablePageEvent, filter: GenericFilter): GenericFilter {
        filter._offset = event.first;
        filter._limit = event.rows;
        return filter;
    }

    static updateFilterOnSort(event: DataTableSortEvent, filter: GenericFilter): GenericFilter {
        filter._sort = event.sortField as string;

        if (event.sortOrder === 1) {
            filter._order = 'asc';
        } else if (event.sortOrder === -1) {
            filter._order = 'desc';
        } else {
            filter._order = undefined;
        }
    
        return filter;
    }

    static toJsonServerParams<T extends GenericFilter>(filter: T) {
        const params: Record<string, unknown> = {};

        // pagination
        if (filter._limit !== undefined && filter._offset !== undefined) {
            params._page = Math.floor(filter._offset / filter._limit) + 1;
            params._limit = filter._limit;
        }

        // tri
        if (filter._sort) params._sort = filter._sort;
        if (filter._order) params._order = filter._order;

        // filtres perso
        Object.entries(filter).forEach(([key, value]) => {
            if (!key.startsWith('_') && value !== undefined && value !== null && value !== '') {
                
                //  min/max pour numbers
                if (key.endsWith('_min') && typeof value === 'number') {
                    const baseKey = key.replace('_min', '');
                    params[`${baseKey}_gte`] = value;
                } 
                else if (key.endsWith('_max') && typeof value === 'number') {
                    const baseKey = key.replace('_max', '');
                    params[`${baseKey}_lte`] = value;
                }
                // min/max pour dates
                else if (key.endsWith('_min') && value instanceof Date) {
                    const baseKey = key.replace('_min', '');
                    const dateMin = new Date(value);
                    dateMin.setHours(0, 0, 0, 0);
                    params[`${baseKey}_gte`] = dateMin.toISOString();
                }
                else if (key.endsWith('_max') && value instanceof Date) {
                    const baseKey = key.replace('_max', '');
                    const dateMax = new Date(value);
                    dateMax.setHours(23, 59, 59, 999);
                    params[`${baseKey}_lte`] = dateMax.toISOString();
                }
                // string
                else if (typeof value === 'string') {
                    params[`${key}_like`] = value;
                }
                // number: greater than or equal
                else if (typeof value === 'number') {
                    params[`${key}_gte`] = value;
                }
                // date
                else if (value instanceof Date) {
                    const dateMin = new Date(value);
                    const dateMax = new Date(value);
                    dateMin.setHours(0, 0, 0, 0);
                    dateMax.setHours(23, 59, 59, 999);
                    params[`${key}_gte`] = dateMin.toISOString();
                    params[`${key}_lte`] = dateMax.toISOString();
                }
                // enum, boolean
                else {
                    params[key] = value;
                }
            }
        });

        return params;
    }

    /** ANALYTICS **/

    static buildDisplayAnalytics(analytics: Analytics, devise: string = '€'): DisplayAnalytics {
        const display: DisplayAnalytics = {
            budget_monthly_limit:  '/' + UtilNumber.toShort(analytics.budget_overview.monthly_limit, devise),
            budget_current_month_total: UtilNumber.toEnglishString(analytics.budget_overview.current_month_total, devise),
            active_tools: null,       // API ne retourne pas l'info
            departments_count: null,  // API ne retourne pas l'info
            cost_per_user: UtilNumber.toEnglishString(analytics.cost_analytics.cost_per_user, devise),
            budget_change: analytics.kpi_trends.budget_change,
            tools_change: analytics.kpi_trends.tools_change,
            departments_change: analytics.kpi_trends.departments_change,
            cost_by_user_change: analytics.kpi_trends.cost_per_user_change,
        }
        return display;
    }

    static computeDepartmentCost(tools: Tool[]): DepartmentCost[] {
        const datas: DepartmentCost[] = [];
        const toolsByDepartment: Map<string, Tool[]> = new Map<string, Tool[]>();

        // regroupement des données
        tools.forEach(tool => {
            const dept = tool.owner_department || 'Unknown';
            if (!toolsByDepartment.has(dept)) {
                toolsByDepartment.set(dept, []);
            }
            toolsByDepartment.get(dept)!.push(tool);
        });

        // calcul des monthly_cost
        toolsByDepartment.forEach((toolsInDept, department) => {
            const total_cost = toolsInDept.reduce((sum, t) => sum + Number(t.monthly_cost || 0), 0);
            datas.push({
                department,
                total_cost,
            });
        });

        return datas;
    }

    static computeActiveTools(tools: Tool[]): number {
        return tools.filter(tool => tool.status === 'active').length;
    }

    /** STATUS **/

    // TODO: a mettre dans UtilConstante
    static getStatusColor = (status: ToolStatus): ColorGradient => {
        switch(status) {
            case 'active': return { from: 'from-green-500', to: 'to-green-700' };
            case 'expiring': return { from: 'from-orange-400', to: 'to-orange-700' };
            case 'unused': return { from: 'from-red-500', to: 'to-red-700' };
            default: return { from: 'from-gray-500', to: 'to-gray-700' };
        }
    };
}