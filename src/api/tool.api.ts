import type { Tool } from "../interfaces/tool.interface";
import { useApi } from "./useApi";

export abstract class ToolApi {

    /** FIND ALL **/

    static async findAll(): Promise<Tool[]> {
        try {
            const { data } = await useApi().get(`/tools`, {params: {}});
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }
}