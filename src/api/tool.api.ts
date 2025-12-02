import type { GenericFilter } from "../interfaces/filter.interface";
import type { Tool } from "../interfaces/tool.interface";
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
}