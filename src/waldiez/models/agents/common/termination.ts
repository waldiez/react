import { WaldiezAgentTerminationMessageCheck } from "@waldiez/models/types/agents";

export class TerminationData {
    data: WaldiezAgentTerminationMessageCheck;
    constructor(data: WaldiezAgentTerminationMessageCheck) {
        this.data = data;
    }
    static fromJSON = (data: Record<string, unknown>): TerminationData => {
        const type = TerminationData.getType(data);
        const keywords = TerminationData.getKeywords(data);
        const criterion = TerminationData.getCriterion(data);
        const methodContent = TerminationData.getMethodContent(data);
        return new TerminationData({
            type,
            keywords,
            criterion,
            methodContent,
        });
    };
    private static getType = (data: Record<string, unknown>): "none" | "keyword" | "method" => {
        let type: "none" | "keyword" | "method" = "none";
        if (
            "type" in data &&
            typeof data.type === "string" &&
            ["none", "keyword", "method"].includes(data.type)
        ) {
            type = data.type as "none" | "keyword" | "method";
        }
        return type;
    };
    private static getKeywords = (data: Record<string, unknown>): string[] => {
        let keywords: string[] = [];
        if ("keywords" in data && Array.isArray(data.keywords)) {
            // all elements should be strings
            keywords = data.keywords.filter(k => typeof k === "string") as string[];
        }
        return keywords;
    };
    private static getCriterion = (data: Record<string, unknown>): "found" | "ending" | "exact" | null => {
        let criterion: "found" | "ending" | "exact" | null = null;
        if (
            "criterion" in data &&
            typeof data.criterion === "string" &&
            ["found", "ending", "exact"].includes(data.criterion)
        ) {
            criterion = data.criterion as "found" | "ending" | "exact";
        }
        return criterion;
    };
    private static getMethodContent = (data: Record<string, unknown>): string | null => {
        let methodContent: string | null = null;
        if ("methodContent" in data && typeof data.methodContent === "string") {
            methodContent = data.methodContent;
        }
        return methodContent;
    };
}
