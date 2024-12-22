import { WaldiezMessage } from "@waldiez/models/edge/message";
import { WaldiezEdgeSummaryData } from "@waldiez/models/edge/summary";
import { IWaldiezMessage, IWaldiezSourceEdgeData, WaldiezEdgeLlmSummaryMethod } from "@waldiez/models/types";

export class WaldiezSourceEdgeData implements IWaldiezSourceEdgeData {
    source: string;
    target: string;
    name: string;
    description: string;
    position: number;
    order: number;
    clearHistory: boolean;
    message: IWaldiezMessage;
    maxTurns: number | null;
    summary: {
        method: WaldiezEdgeLlmSummaryMethod;
        prompt: string;
        args: { [key: string]: any };
    };
    nestedChat: {
        message: IWaldiezMessage | null;
        reply: IWaldiezMessage | null;
    };
    constructor(
        source: string = "source",
        target: string = "target",
        name: string = "Chat",
        description: string = "New connection",
        clearHistory: boolean = true,
        maxTurns: number | null = null,
        summary: {
            method: WaldiezEdgeLlmSummaryMethod;
            prompt: string;
            args: { [key: string]: any };
        } = {
            method: "last_msg",
            prompt: "",
            args: {},
        },
        position = 1,
        order = -1,
        message: IWaldiezMessage = {
            type: "none",
            use_carryover: false,
            content: null,
            context: {},
        },
        nestedChat: {
            message: IWaldiezMessage | null;
            reply: IWaldiezMessage | null;
        } = {
            message: null,
            reply: null,
        },
    ) {
        this.source = source;
        this.target = target;
        this.name = name;
        this.description = description;
        this.clearHistory = clearHistory;
        this.maxTurns = maxTurns;
        this.summary = summary;
        this.message = message;
        this.position = position;
        this.order = order;
        this.nestedChat = nestedChat;
    }

    private static getName(data: Record<string, unknown>): string {
        let name = "New connection";
        if ("name" in data && typeof data.name === "string") {
            name = data.name;
        } else if ("label" in data && typeof data.label === "string") {
            name = data.label;
        }
        return name;
    }
    private static getSource(data: Record<string, unknown>): string {
        let source = "source";
        if ("source" in data && typeof data.source === "string") {
            source = data.source;
        }
        return source;
    }
    private static getTarget(data: Record<string, unknown>): string {
        let target = "target";
        if ("target" in data && typeof data.target === "string") {
            target = data.target;
        }
        return target;
    }
    private static getDescription(data: Record<string, unknown>): string {
        let description = "New connection";
        if ("description" in data && typeof data.description === "string") {
            description = data.description;
        }
        return description;
    }
    private static getClearHistory(data: Record<string, unknown>): boolean {
        let clearHistory: boolean = true;
        if ("clearHistory" in data && typeof data.clearHistory === "boolean") {
            clearHistory = data.clearHistory as boolean;
        }
        return clearHistory;
    }
    private static getMessage(data: Record<string, unknown>): IWaldiezMessage {
        let message: IWaldiezMessage = {
            type: "none",
            use_carryover: false,
            content: null,
            context: {},
        };
        if ("message" in data && typeof data.message === "object") {
            message = WaldiezMessage.fromJSON(data.message);
        }
        return message;
    }
    private static getNestedChat(data: Record<string, unknown>): {
        message: IWaldiezMessage | null;
        reply: IWaldiezMessage | null;
    } {
        const nestedChat: {
            message: IWaldiezMessage | null;
            reply: IWaldiezMessage | null;
        } = {
            message: null,
            reply: null,
        };
        if ("nestedChat" in data && typeof data.nestedChat === "object") {
            const nestedChatObject = data.nestedChat as Record<string, unknown>;
            const messageObject = nestedChatObject.message ?? null;
            const replyObject = nestedChatObject.reply ?? null;
            if (messageObject && typeof messageObject === "object") {
                nestedChat.message = WaldiezMessage.fromJSON(messageObject);
            }
            if (replyObject && typeof replyObject === "object") {
                nestedChat.reply = WaldiezMessage.fromJSON(replyObject);
            }
        }
        return nestedChat;
    }
    private static getSummary(data: Record<string, unknown>): {
        method: WaldiezEdgeLlmSummaryMethod;
        prompt: string;
        args: { [key: string]: any };
    } {
        const summary: {
            method: WaldiezEdgeLlmSummaryMethod;
            prompt: string;
            args: { [key: string]: any };
        } = {
            method: "last_msg",
            prompt: "",
            args: {},
        };
        if ("summary" in data && typeof data.summary === "object" && data.summary !== null) {
            const summaryObject = data.summary as Record<string, unknown>;
            const summaryData = WaldiezEdgeSummaryData.fromJSON(summaryObject);
            summary.method = summaryData.data.method;
            summary.prompt = summaryData.data.prompt;
            summary.args = summaryData.data.args;
        }
        return summary;
    }
    private static getMaxTurns(data: Record<string, unknown>): number | null {
        let maxTurns: number | null = null;
        if ("maxTurns" in data && typeof data.maxTurns === "number") {
            maxTurns = data.maxTurns;
        }
        return maxTurns;
    }
    private static getPosition(data: Record<string, unknown>, position: number | null): number {
        let chatPosition = position !== null ? position : 0;
        if ("position" in data && typeof data.position === "number") {
            chatPosition = data.position > 0 ? data.position : chatPosition;
        }
        return chatPosition;
    }
    private static getOrder(data: Record<string, unknown>): number {
        let chatOrder = -1;
        if ("order" in data && typeof data.order === "number") {
            chatOrder = data.order >= 0 ? data.order : -1;
        }
        return chatOrder;
    }

    static fromJSON(json: unknown, position: number | null = null): IWaldiezSourceEdgeData {
        if (!json || typeof json !== "object") {
            return new WaldiezSourceEdgeData();
        }
        const data = json as Record<string, unknown>;
        const name = WaldiezSourceEdgeData.getName(data);
        const source = WaldiezSourceEdgeData.getSource(data);
        const target = WaldiezSourceEdgeData.getTarget(data);
        const description = WaldiezSourceEdgeData.getDescription(data);
        const clearHistory = WaldiezSourceEdgeData.getClearHistory(data);
        const message = WaldiezSourceEdgeData.getMessage(data);
        const nestedChat = WaldiezSourceEdgeData.getNestedChat(data);
        const summary = WaldiezSourceEdgeData.getSummary(data);
        const maxTurns = WaldiezSourceEdgeData.getMaxTurns(data);
        const chatPosition = WaldiezSourceEdgeData.getPosition(data, position);
        const chatOrder = WaldiezSourceEdgeData.getOrder(data);
        return new WaldiezSourceEdgeData(
            source,
            target,
            name,
            description,
            clearHistory,
            maxTurns,
            summary,
            chatPosition,
            chatOrder,
            message,
            nestedChat,
        );
    }
}
