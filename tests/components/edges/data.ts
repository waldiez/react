import { Position } from "@xyflow/react";

import { WaldiezEdgeLlmSummaryMethod, WaldiezMessageType } from "@waldiez/models";

export const createdAt = new Date().toISOString();
export const updatedAt = new Date().toISOString();
export const flowId = "wf-0";
export const edgeId = "we-1";

export const edgeData = {
    label: "Edge label",
    description: "Edge description",
    order: 0,
    position: 1,
    clearHistory: false,
    summary: {
        method: "last_msg" as WaldiezEdgeLlmSummaryMethod,
        prompt: "",
        args: {},
    },
    maxTurns: 2,
    message: {
        type: "none" as WaldiezMessageType,
        content: null,
        context: {},
    },
    nestedChat: {
        message: null,
        reply: null,
    },
};

export const edgeProps = {
    id: edgeId,
    source: "wa-1",
    target: "wa-2",
    sourceX: 0,
    sourceY: 10,
    targetX: 10,
    targetY: 20,
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    markerEnd: undefined,
    data: edgeData,
};

export const nodes = [
    {
        id: edgeProps.source,
        type: "agent",
        position: {
            x: edgeProps.sourceX,
            y: edgeProps.sourceY,
        },
        data: {
            label: "Edge source",
            agentType: "user",
            nestedChats: [],
            skills: [],
            modelIds: [],
        },
    },
    {
        id: edgeProps.target,
        type: "agent",
        position: {
            x: edgeProps.targetX,
            y: edgeProps.targetY,
        },
        data: {
            label: "Edge target",
            agentType: "assistant",
            nestedChats: [],
            skills: [],
            modelIds: [],
        },
    },
];
