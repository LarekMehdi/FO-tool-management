import type { MonthlyCostAnalytics } from "../interfaces/analytics.interface";
import type { Tool } from "../interfaces/tool.interface";

export abstract class UtilMapper {

    /** TOOLS **/

    static mapToolListToMonthlyCostAnalytics(tools: Tool[]): MonthlyCostAnalytics[] {
        const datas: MonthlyCostAnalytics[] = [];
        for (const tool of tools) {
            const data: MonthlyCostAnalytics = {
                name: tool.name,
                monthly_cost: tool.monthly_cost,
                previous_month_cost: tool.previous_month_cost,
                updated_at: tool.updated_at,
            }
            datas.push(data);
        }
        return datas;
    }
}