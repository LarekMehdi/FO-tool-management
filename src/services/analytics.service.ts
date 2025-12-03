import { AnalyticsApi } from "../api/analytics.api";
import type { Analytics } from "../interfaces/analytics.interface";

export abstract class AnalyticsService {

    /** FIND **/

    static async find(): Promise<Analytics> {
        return await AnalyticsApi.find();
    }
}