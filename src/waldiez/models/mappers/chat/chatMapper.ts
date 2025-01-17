import { Edge, MarkerType, Node } from "@xyflow/react";

import { WaldiezNodeAgentSwarmContainer, WaldiezNodeAgentType } from "@waldiez/models";
import {
    WaldiezChat,
    WaldiezChatData,
    WaldiezEdge,
    WaldiezEdgeData,
    WaldiezEdgeType,
} from "@waldiez/models/Chat";
import { messageMapper } from "@waldiez/models/mappers/chat/messageMapper";
import { summaryMapper } from "@waldiez/models/mappers/chat/summaryMapper";
import {
    getAvailable,
    getChatAfterWork,
    getChatClearHistory,
    getChatDescription,
    getChatMaxRounds,
    getChatMaxTurns,
    getChatName,
    getChatOrder,
    getChatPosition,
    getContextVariables,
    getNestedChat,
    getRealSource,
    getRealTarget,
} from "@waldiez/models/mappers/chat/utils";
import {
    getDescriptionFromJSON,
    getNameFromJSON,
    swarmAfterWorkMapper,
} from "@waldiez/models/mappers/common";
import "@waldiez/models/mappers/common/swarmAfterWorkMapper";
import { AGENT_COLORS } from "@waldiez/theme";

const VALID_CHAT_TYPES = ["chat", "nested", "group", "hidden", "swarm"];

/* eslint-disable max-statements */
export const chatMapper = {
    importChat: (
        json: unknown,
        edges: Edge[],
        nodes: Node[],
        index: number,
    ): { chat: WaldiezChat; edge: Edge } => {
        if (!json || typeof json !== "object") {
            throw new Error("Invalid edge data");
        }
        const jsonObject = json as Record<string, unknown>;
        let result = null;
        try {
            result = checkChatData(jsonObject, edges, nodes);
        } catch (error: any) {
            throw new Error(error.message);
        }
        const { edge, sourceNode, targetNode } = result;
        const id = jsonObject.id as string;
        const data = getChatData(jsonObject.data as any, index);
        const rest = getChatRest({ ...jsonObject, ...edge });
        const updatedEdge = updateEdge(edge as WaldiezEdge, data, jsonObject, sourceNode, targetNode, rest);
        Object.entries(updatedEdge).forEach(([key, value]) => {
            if (key !== "data" && key !== "source" && key !== "target" && key !== "id") {
                rest[key] = value;
            }
        });
        const chat = new WaldiezChat({ id, data, rest });
        return { chat, edge: updatedEdge };
    },
    exportChat: (edge: WaldiezEdge, index: number) => {
        const edgeData = edge.data as WaldiezEdge["data"];
        const data = { ...edgeData } as WaldiezEdgeData;
        const chatData = {
            source: edge.source,
            target: edge.target,
            name: getChatName(data),
            order: getChatOrder(data),
            description: getChatDescription(data),
            position: getChatPosition(data, index),
            clearHistory: getChatClearHistory(data),
            maxTurns: getChatMaxTurns(data),
            message: messageMapper.exportMessage(data.message),
            summary: summaryMapper.exportSummary(data.summary),
            nestedChat: getNestedChat(data),
            maxRounds: getChatMaxRounds(data),
            afterWork: data.afterWork ? swarmAfterWorkMapper.exportSwarmAfterWork(data.afterWork) : null,
            available: data.available,
            contextVariables: data.contextVariables,
            realSource: data.realSource,
            realTarget: data.realTarget,
        };
        const rest = { ...edge } as any;
        delete rest.data;
        delete rest.type;
        delete rest.source;
        delete rest.target;
        delete rest.id;
        const chat = new WaldiezChat({
            id: edge.id,
            data: chatData,
            rest,
        }) as any;
        const toExport = { ...chat, ...chat.rest };
        delete toExport.rest;
        return toExport;
    },
    asEdge: (chat: WaldiezChat): WaldiezEdge => {
        const data = {
            label: chat.data.name,
            description: chat.data.description,
            position: chat.data.position,
            order: chat.data.order,
            clearHistory: chat.data.clearHistory,
            message: chat.data.message,
            nestedChat: chat.data.nestedChat,
            summary: chat.data.summary,
            maxTurns: chat.data.maxTurns,
            maxRounds: chat.data.maxRounds,
            afterWork: chat.data.afterWork,
            contextVariables: chat.data.contextVariables,
            available: chat.data.available,
            realSource: chat.data.realSource,
            realTarget: chat.data.realTarget,
        };
        return {
            id: chat.id,
            source: chat.source,
            target: chat.target,
            data,
            ...chat.rest,
        };
    },
};

const getChatData = (json: { [key: string]: any }, index: number): WaldiezChatData => {
    const name = getNameFromJSON(json, "New connection")!;
    const description = getDescriptionFromJSON(json, "New connection");
    const source = json.source as string;
    const target = json.target as string;
    const clearHistory = getChatClearHistory(json);
    const maxTurns = getChatMaxTurns(json);
    const position = getChatPosition(json, index);
    const order = getChatOrder(json);
    const message = messageMapper.importMessage(json);
    const summary = summaryMapper.importSummary(json);
    const nestedChat = getNestedChat(json);
    const maxRounds = getChatMaxRounds(json);
    const afterWork = getChatAfterWork(json);
    const contextVariables = getContextVariables(json);
    const available = getAvailable(json);
    const realSource = getRealSource(json);
    const realTarget = getRealTarget(json);
    const data = new WaldiezChatData({
        source,
        target,
        name,
        description,
        clearHistory,
        maxTurns,
        position,
        order,
        message,
        summary,
        nestedChat,
        maxRounds,
        afterWork,
        contextVariables,
        available,
        realSource,
        realTarget,
    });
    return data;
};

const getChatRest = (json: { [key: string]: any }) => {
    const rest = { ...json };
    delete rest.id;
    delete rest.data;
    delete rest.type;
    delete rest.source;
    delete rest.target;
    return rest;
};

const checkChatData = (json: { [key: string]: any }, edges: Edge[], nodes: Node[]) => {
    const isValid =
        "id" in json &&
        typeof json.id === "string" &&
        "data" in json &&
        typeof json.data === "object" &&
        json.data !== null &&
        "source" in json.data &&
        typeof json.data.source === "string" &&
        "target" in json.data &&
        typeof json.data.target === "string";
    if (!isValid) {
        throw new Error("Invalid edge data");
    }
    const edge = edges.find(e => e.id === json.id);
    if (!edge) {
        throw new Error("Edge not found");
    }
    const sourceNode = nodes.find(n => n.id === json.data.source);
    if (!sourceNode || sourceNode.type !== "agent") {
        throw new Error("Source node not found");
    }
    if (edge.source !== json.data.source) {
        throw new Error("Source node does not match edge source");
    }
    const targetNode = nodes.find(n => n.id === json.data.target);
    if (!targetNode || targetNode.type !== "agent") {
        throw new Error("Target node not found");
    }
    if (edge.target !== json.data.target) {
        throw new Error("Target node does not match edge target");
    }
    return { edge, sourceNode, targetNode };
};

const updateEdge = (
    edge: WaldiezEdge,
    chatData: WaldiezChatData,
    json: { [key: string]: any },
    sourceNode: Node,
    targetNode: Node,
    rest: { [key: string]: any },
) => {
    const sourceAgentType = sourceNode.data.agentType as WaldiezNodeAgentType;
    const targetNodeType = targetNode.data.agentType as WaldiezNodeAgentType;
    if (targetNodeType === "swarm_container") {
        const swarmContainer = targetNode as WaldiezNodeAgentSwarmContainer;
        let initialAgent = swarmContainer.data.initialAgent;
        if (chatData.realTarget) {
            initialAgent = chatData.realTarget;
        }
        if (!initialAgent) {
            // search in json for json.swarm_agents, if found select the first one
            if (json.swarm_agents && Array.isArray(json.swarm_agents) && json.swarm_agents.length > 0) {
                const swarmAgent = json.swarm_agents[0];
                if (typeof swarmAgent === "object" && swarmAgent && "id" in swarmAgent) {
                    initialAgent = swarmAgent.id;
                }
            }
        }
        if (initialAgent) {
            edge.target = initialAgent;
            chatData.realTarget = initialAgent;
        }
    }
    const chatType = getChatType(edge, json, sourceNode, targetNode);
    const color = AGENT_COLORS[sourceAgentType];
    edge.type = chatType;
    if (edge.type !== "hidden") {
        edge.animated = isChatAnimated(chatType, sourceNode, targetNode);
    }
    updateChatCommonStyle(edge, chatType, color);
    const sourceLabel = sourceNode.data.label;
    const targetLabel = targetNode.data.label;
    if (sourceLabel && targetLabel) {
        chatData.name = `${sourceLabel} => ${targetLabel}`;
    }
    edge.data = {
        ...chatData,
        label: chatData.name,
        order: chatType === "nested" ? -1 : chatData.order,
    };
    delete (edge.data as any).name;
    chatData.order = chatType === "nested" ? -1 : chatData.order;
    setEdgeSourceHandle(edge, rest);
    setEdgeTargetHandle(edge, rest);
    return { ...edge, ...rest };
};

const getChatType = (edge: WaldiezEdge, json: { [key: string]: any }, sourceNode: Node, targetNode: Node) => {
    let edgeType: WaldiezEdgeType = "chat";
    if (json.type && VALID_CHAT_TYPES.includes(json.type)) {
        edgeType = json.type;
    }
    let chatType = edge?.type ?? edgeType;
    const sourceAgentType = sourceNode.data.agentType as WaldiezNodeAgentType;
    if (sourceAgentType === "manager") {
        chatType = "group";
    }
    if (!VALID_CHAT_TYPES.includes(chatType)) {
        chatType = "chat";
    }
    if (chatType === "group" && targetNode.data.parentId && targetNode.data.parentId === sourceNode.id) {
        chatType = "hidden";
    }
    if (sourceNode.data.agentType === "swarm" || targetNode.data.agentType === "swarm") {
        chatType = "swarm";
    }
    return chatType as WaldiezEdgeType;
};

const updateChatCommonStyle = (edge: WaldiezEdge, edgeType: WaldiezEdgeType, color: string) => {
    if (edge.type === "hidden") {
        return;
    }
    edge.markerEnd =
        edgeType !== "nested"
            ? {
                  type: MarkerType.ArrowClosed,
                  color,
                  width: 10,
                  height: 10,
              }
            : undefined;
    edge.style = {
        stroke: color,
        strokeWidth: 3,
    };
};

const isChatAnimated = (chatType: WaldiezEdgeType, sourceNode: Node, targetNode: Node) => {
    if (chatType === "nested") {
        return true;
    }
    if (sourceNode.data.agentType === "swarm" && targetNode.data.agentType !== "swarm") {
        return true;
    }
    return false;
};

const setEdgeSourceHandle = (edge: WaldiezEdge, rest: { [key: string]: any }) => {
    let sourceHandle: string | null = null;
    if ("sourceHandle" in rest && typeof rest.sourceHandle === "string") {
        // sourceHandle = rest.sourceHandle;
        // format: id={`agent-handle-{top|left|right|bottom}-{source|target}-${agentId}`}
        // so let's check for "{top|left|right|bottom}" and "source|target" in the handle id
        if (rest.sourceHandle.includes("-source") || rest.sourceHandle.includes("-target")) {
            const isSource = rest.sourceHandle.includes("-source");
            const position = ["top", "left", "right", "bottom"].find(pos => rest.sourceHandle.includes(pos));
            if (position) {
                sourceHandle = `agent-handle-${position}-${isSource ? "source" : "target"}-${isSource ? edge.source : edge.target}`;
            }
        }
    }
    rest.sourceHandle = sourceHandle;
    edge.sourceHandle = sourceHandle;
};

const setEdgeTargetHandle = (edge: WaldiezEdge, rest: { [key: string]: any }) => {
    let targetHandle: string | null = null;
    if ("targetHandle" in rest && typeof rest.targetHandle === "string") {
        // targetHandle = rest.targetHandle;
        // format: id={`agent-handle-{top|left|right|bottom}-{source|target}-${agentId}`}
        // so let's check for "{top|left|right|bottom}" and "source|target" in the handle id
        if (rest.targetHandle.includes("-source") || rest.targetHandle.includes("-target")) {
            const isSource = rest.targetHandle.includes("source");
            const position = ["top", "left", "right", "bottom"].find(pos => rest.targetHandle.includes(pos));
            if (position) {
                targetHandle = `agent-handle-${position}-${isSource ? "source" : "target"}-${isSource ? edge.source : edge.target}`;
            }
        }
    }
    rest.targetHandle = targetHandle;
    edge.targetHandle = targetHandle;
};
