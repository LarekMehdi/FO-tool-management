import type { SortOrder } from "../constantes/filter.constante";
import type { ToolStatus } from "../constantes/tool-status.constante";

export interface GenericFilter {
    _limit: number;
    _offset: number;
    _sort?: string;
    _order?: SortOrder;
}

export interface ToolSearchFilter {
    query: string;
}

export interface ToolListFilter extends GenericFilter{
    name?: string;
    status?: ToolStatus;
    category?: string;
    owner_department?: string;
    monthly_cost_min?: number;
    monthly_cost_max?: number;
}