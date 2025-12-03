import type { Analytics } from "../interfaces/analytics.interface";
import type { SmallTool } from "../interfaces/tool.interface";

export const emptyAnalytics: Analytics = {
  budget_overview: {
    monthly_limit: 0,
    current_month_total: 0,
    previous_month_total: 0,
    budget_utilization: "0",
    trend_percentage: "0"
  },
  kpi_trends: {
    budget_change: "0",
    tools_change: "0",
    departments_change: "0",
    cost_per_user_change: "0"
  },
  cost_analytics: {
    cost_per_user: 0,
    previous_cost_per_user: 0,
    active_users: 0,
    total_users: 0
  }
};

export const emptySmallTool: SmallTool = {
  id: 0,
  name: "",
  monthly_cost: 0
}