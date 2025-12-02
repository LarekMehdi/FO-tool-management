import { ToolApi } from "../api/tool.api";
import type { GenericFilter } from "../interfaces/filter.interface";
import type { Tool } from "../interfaces/tool.interface";

export abstract class ToolService {

    /** FIND ALL **/

    static async findAll(filter: GenericFilter): Promise<Tool[]> {
        return await ToolApi.findAll(filter);
    }
}