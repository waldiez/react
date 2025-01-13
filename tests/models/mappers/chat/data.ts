import { Edge, Node } from "@xyflow/react";

export const chatJson = {
    id: "wc-1",
    data: {
        source: "wa-1",
        target: "wa-2",
        name: "custom_chat",
        description: "custom_description",
        position: 0,
        order: 0,
        clearHistory: false,
        message: {
            type: "none",
            use_carryover: false,
            content: null,
            context: {
                context_key: "context_value",
            },
        },
        nestedChat: {
            message: null,
            reply: null,
        },
        summary: {
            method: "reflection_with_llm",
            prompt: "summarize the conversation",
            args: {
                summary_role: "user",
            },
        },
        maxTurns: 0,
        maxRounds: 0,
        afterWork: {
            recipientType: "agent",
            recipient: "wa-2",
        },
    },
    type: "chat",
};
export const edges: Edge[] = [
    {
        id: "wc-1",
        type: "chat",
        source: "wa-1",
        target: "wa-2",
        data: {
            label: "wa-1 => wa-2",
        },
    },
    {
        id: "wc-2",
        type: "chat",
        source: "wa-2",
        target: "wa-3",
        data: {
            label: "wa-2 => wa-3",
        },
    },
];
export const agents: Node[] = [
    {
        id: "wa-1",
        type: "agent",
        data: {
            label: "wa-1",
            agentType: "user",
        },
        position: { x: 0, y: 0 },
    },
    {
        id: "wa-2",
        type: "agent",
        data: {
            agentType: "manager",
            label: "wa-2",
        },
        position: { x: 10, y: 10 },
    },
    {
        id: "wa-3",
        type: "agent",
        data: {
            agentType: "assistant",
            label: "wa-3",
        },
        position: { x: 20, y: 20 },
    },
];
