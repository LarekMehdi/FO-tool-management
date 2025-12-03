import type { DataTablePageEvent, DataTableSortEvent } from "primevue";
import type { GenericFilter } from "../interfaces/filter.interface";
import type { Analytics, DisplayAnalytics } from "../interfaces/analytics.interface";
import { UtilNumber } from "./number.util";

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

    static toJsonServerParams(filter: GenericFilter) {
        const params: Record<string, unknown> = {};

        if (filter._limit !== undefined && filter._offset !== undefined) {
            params._page = Math.floor(filter._offset / filter._limit) + 1;
            params._limit = filter._limit;
        }

        if (filter._sort) params._sort = filter._sort;
        if (filter._order) params._order = filter._order;

        return params;
    }

    /** ANALYTICS **/

    static buildDisplayAnalytics(analytics: Analytics, devise: string = '€'): DisplayAnalytics {
        const display: DisplayAnalytics = {
            budget_monthly_limit:  '/' + UtilNumber.toShort(analytics.budget_overview.monthly_limit, devise),
            budget_current_month_total: UtilNumber.toEnglishString(analytics.budget_overview.current_month_total, devise),
            active_tools: "",       // API ne retourne pas l'info
            departments_count: "",  // API ne retourne pas l'info
            cost_per_user: UtilNumber.toEnglishString(analytics.cost_analytics.cost_per_user, devise),
            budget_change: analytics.kpi_trends.budget_change,
            tools_change: analytics.kpi_trends.tools_change,
            departments_change: analytics.kpi_trends.departments_change,
            cost_by_user_change: analytics.kpi_trends.cost_per_user_change,
        }
        return display;
    }
}