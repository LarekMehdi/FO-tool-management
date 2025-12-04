export interface Analytics {
    budget_overview: BudgetOverview;
    kpi_trends: KpiTrend;
    cost_analytics: CostAnalytics;
}

export interface BudgetOverview {
    monthly_limit: number;        // 30000
    current_month_total: number;  // Current total
    previous_month_total: number; // Previous month total  
    budget_utilization: string;   // "95.8%" 
    trend_percentage: string;     // "+12.0"
}

export interface KpiTrend {
    budget_change: string;        // "+12%"
    tools_change: string;         // "+9"
    departments_change: string;   // "+2"
    cost_per_user_change: string; // "-€12"
}

export interface CostAnalytics {
    cost_per_user: number;          // 156
    previous_cost_per_user: number; // 168
    active_users: number;           // 56
    total_users: number;            // 66
}

export interface DisplayAnalytics {
    budget_monthly_limit: string;
    budget_current_month_total: string;
    active_tools: string | null;
    departments_count: string | null;
    cost_per_user: string;
    budget_change: string;
    tools_change: string;
    departments_change: string;
    cost_by_user_change: string;
}