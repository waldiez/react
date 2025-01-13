import { Edge } from "@xyflow/react";

import { WaldiezSwarmAfterWork } from "@waldiez/models/Agent";
import { WaldiezMessage } from "@waldiez/models/Chat/Message";

export type WaldiezMessageType = "string" | "method" | "rag_message_generator" | "none";

export type WaldiezChatLlmSummaryMethod = "reflection_with_llm" | "last_msg" | null;
export type WaldiezChatSummary = {
    method: WaldiezChatLlmSummaryMethod;
    prompt: string;
    args: { [key: string]: any };
};

export type WaldiezNestedChat = {
    message: WaldiezMessage | null;
    reply: WaldiezMessage | null;
};

export type WaldiezChatDataCommon = {
    description: string;
    position: number;
    order: number;
    clearHistory: boolean;
    message: WaldiezMessage;
    nestedChat: WaldiezNestedChat;
    summary: WaldiezChatSummary;
    maxTurns: number | null;
    maxRounds: number;
    afterWork: WaldiezSwarmAfterWork | null;
    realSource: string | null;
    realTarget: string | null;
};
export type WaldiezEdgeData = WaldiezChatDataCommon & {
    label: string;
};

export type WaldiezEdgeType = "chat" | "group" | "nested" | "hidden" | "swarm";

export type WaldiezEdge = Edge<WaldiezEdgeData, WaldiezEdgeType>;
