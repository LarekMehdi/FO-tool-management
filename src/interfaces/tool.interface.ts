import type { ToolStatus } from "../constantes/tool-status.constante"

export interface Tool {
    id: number;
    name: string;       // "Slack", "Figma", etc.
    description: string;
    vendor: string;
    category: string;   // "Development", "Design", etc.
    monthly_cost: number;
    previous_month_cost: number; 
    owner_department: string;
    status: ToolStatus;
    website_url: string;
    active_users_count: number;
    icon_url: string;
    created_at: string;
    updated_at: string;
}

export interface ToolList {
    id: number;
    name: string;
    description: string;
    category: string;
    status: ToolStatus;
    monthly_cost: number;
    updated_at: string;
    owner_department: string;
    user_count: number;
}

export interface SmallTool {
    id: number;
    name: string;
    monthly_cost: number;
}

export interface CreateTool {
    name: string;
    description: string;
    vendor: string;
    category: string;
    monthly_cost: number;
    owner_department: string;
    website_url?: string;
    icon_url?: string;
}
