import type { GenericFilter, ToolListFilter } from "../interfaces/filter.interface";
import type { CreateTool, Tool } from "../interfaces/tool.interface";
import { UtilEntity } from "../utils/entity.util";
import { useApi } from "./useApi";

export abstract class ToolApi {

    /** FIND ALL **/

    static async findAll(filter: GenericFilter): Promise<Tool[]> {
        try {
            const params = UtilEntity.toJsonServerParams(filter);
            const { data } = await useApi().get(`/tools`, {params});
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

    static async findAllForList(filter: ToolListFilter): Promise<Tool[]> {
        try {
            const params = UtilEntity.toJsonServerParams(filter);
            const { data } = await useApi().get(`/tools`, {params});
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }

    /** CREATE **/

    static async createTool(tool: CreateTool): Promise<Tool> {
        try {
            const { data } = await useApi().post(`/tools`, tool);
            return data;
        } catch(e: unknown) {
            throw e;
        }
    }

    /** UPDATE **/

    static async updateTool(tool: Tool): Promise<Tool> {
        try {
            const { data } = await useApi().put(`/tools/${tool.id}`, tool);
            return data;
        } catch(e: unknown) {
            throw e;
        }
    }

    /** DELETE **/

    static async deleteTool(toolId: number): Promise<number> {
        try {
            const { data } = await useApi().delete(`/tools/${toolId}`);
            return data;
        } catch(e: unknown) {
            throw e;
        }
    }
}