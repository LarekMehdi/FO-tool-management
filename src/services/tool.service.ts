import { ToolApi } from "../api/tool.api";
import type { GenericFilter, ToolListFilter } from "../interfaces/filter.interface";
import type { CreateTool, Tool } from "../interfaces/tool.interface";

export abstract class ToolService {

    /** FIND ALL **/

    static async findAll(filter: GenericFilter): Promise<Tool[]> {
        return await ToolApi.findAll(filter);
    }

    static async findAllForList(filter: ToolListFilter): Promise<Tool[]> {
        return await ToolApi.findAllForList(filter);
    }

    /** FIND **/

    static async findMostExpensive(): Promise<Tool[]> {
        const filter: ToolListFilter = {
            _limit: 1,
            _offset: 0,
            _order: 'desc',
            _sort: 'monthly_cost',
            status: 'active',
        };
        return await ToolApi.findAll(filter);
    }

    static async findCheapest(): Promise<Tool[]> {
        const filter: ToolListFilter = {
            _limit: 1,
            _offset: 0,
            _order: 'asc',
            _sort: 'monthly_cost',
            status: 'active',
        };
        return await ToolApi.findAll(filter);
    }

    /** CREATE **/

    static async createTool(tool: CreateTool): Promise<Tool> {
        return await ToolApi.createTool(tool);
    }

    /** UPDATE **/

    static async updateTool(tool: Tool): Promise<Tool> {
        return await ToolApi.updateTool(tool);
    }

    /** DELETE **/

    static async deleteTool(toolId: number): Promise<number> {
        return await ToolApi.deleteTool(toolId);
    }
}