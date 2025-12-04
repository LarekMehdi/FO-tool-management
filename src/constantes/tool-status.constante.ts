import type { OptionSelectInterface } from "../interfaces/input.interface";

export type ToolStatus = "active" | "unused" | "expiring";


export const TOOL_STATUS_VALUES: readonly ToolStatus[] = [
    "active",
    "unused",
    "expiring"
];

export function getToolStatusOptions(): OptionSelectInterface[] {
    return TOOL_STATUS_VALUES.map((value) => ({
        label: getToolStatusLabel(value),
        value,
    }));
}

export function getToolStatusLabel(status: ToolStatus): string {
    switch (status) {
        case "active": return "Active";
        case "unused": return "Unused";
        case "expiring": return "Expiring Soon";
        default: return status;
    }
}