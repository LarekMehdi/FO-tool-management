import { ToolApi } from "../api/tool.api";
import type { Tool } from "../interfaces/tool.interface";

export abstract class ToolService {

    /** FIND ALL **/

    static async findAll(): Promise<Tool[]> {
        return await ToolApi.findAll();
    }
}