import type { ProficiencyLevel } from "../constantes/proficiency-level.constante";
import type { UsageFrequency } from "../constantes/usage-frequency.constante"

export interface UserTool {
    user_id: number;
    tool_id: number;
    usage_frequency: UsageFrequency;
    last_used: string; // ISO date
    proficiency_level: ProficiencyLevel;
}