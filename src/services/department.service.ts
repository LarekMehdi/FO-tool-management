import { DepartmentApi } from "../api/department.api";
import type { Department } from "../interfaces/department.interface";

export abstract class DepartmentService {

    /** FIND ALL **/

    static async findAll(): Promise<Department[]> {
        return await DepartmentApi.findAll();
    }
}