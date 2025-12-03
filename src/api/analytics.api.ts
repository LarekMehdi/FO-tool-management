import type { Analytics } from "../interfaces/analytics.interface";
import { useApi } from "./useApi";

export abstract class AnalyticsApi {

    /** FIND **/

    static async find(): Promise<Analytics> {
        try {
            const { data } = await useApi().get(`/analytics`);
            console.log('analytics => ', data);
            return data;
        } catch(e: unknown) {
            console.error(e);
            throw e;
        }
    }
}