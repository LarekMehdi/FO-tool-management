import type { Department } from "../interfaces/department.interface";
import { useApi } from "./useApi";

export abstract class DepartmentApi {

    /** FIND ALL **/

    static async findAll(): Promise<Department[]> {
        try {
            const { data } = await useApi().get(`/departments`);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }
}