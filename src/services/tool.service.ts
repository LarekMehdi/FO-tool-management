import { ToolApi } from "../api/tool.api";
import type { GenericFilter, ToolListFilter } from "../interfaces/filter.interface";
import type { Tool } from "../interfaces/tool.interface";

export abstract class ToolService {

    /** FIND ALL **/

    static async findAll(filter: GenericFilter): Promise<Tool[]> {
        return await ToolApi.findAll(filter);
    }

    static async findAllForList(filter: ToolListFilter) {
        return await ToolApi.findAllForList(filter);
    }
}