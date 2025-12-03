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
    status?: ToolStatus;
}