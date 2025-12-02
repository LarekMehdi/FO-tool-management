import type { DataTablePageEvent, DataTableSortEvent } from "primevue";
import type { GenericFilter } from "../interfaces/filter.interface";

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
}