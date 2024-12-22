import { WaldiezEdgeLlmSummaryMethod } from "@waldiez/models/types";

export class WaldiezEdgeSummaryData {
    data: {
        method: WaldiezEdgeLlmSummaryMethod;
        prompt: string;
        args: { [key: string]: any };
    };
    constructor(
        method: WaldiezEdgeLlmSummaryMethod = "last_msg",
        prompt: string = "",
        args: { [key: string]: any } = {},
    ) {
        this.data = {
            method,
            prompt,
            args,
        };
    }
    static fromJSON(data: Record<string, unknown>): WaldiezEdgeSummaryData {
        let method: WaldiezEdgeLlmSummaryMethod = "last_msg";
        let prompt = "";
        const args: { [key: string]: any } = {};
        if (
            "method" in data &&
            typeof data.method === "string" &&
            ["reflection_with_llm", "last_msg"].includes(data.method)
        ) {
            method = data.method as WaldiezEdgeLlmSummaryMethod;
        }
        if ("prompt" in data && typeof data.prompt === "string") {
            prompt = data.prompt;
        }
        if ("args" in data && typeof data.args === "object") {
            const argsObject = data.args as { [key: string]: any };
            for (const key in argsObject) {
                if (typeof key === "string") {
                    args[key] = argsObject[key];
                }
            }
        }
        return new WaldiezEdgeSummaryData(method, prompt, args);
    }
}
