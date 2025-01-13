import { Edge, MarkerType, Node } from "@xyflow/react";

import { WaldiezNodeAgentType } from "@waldiez/models";
import {
    WaldiezChat,
    WaldiezChatData,
    WaldiezEdge,
    WaldiezEdgeData,
    WaldiezEdgeType,
    WaldiezNestedChat,
} from "@waldiez/models/Chat";
import { messageMapper } from "@waldiez/models/mappers/chat/messageMapper";
import { summaryMapper } from "@waldiez/models/mappers/chat/summaryMapper";
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
        const rest = getChatRest(jsonObject);
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

const getChatClearHistory = (data: { [key: string]: any }) => {
    let clearHistory = true;
    if ("clearHistory" in data && typeof data.clearHistory === "boolean") {
        clearHistory = data.clearHistory;
    }
    return clearHistory;
};

const getChatName = (data: { [key: string]: any }) => {
    let name = "Chat";
    if ("label" in data && data.label) {
        if (typeof data.label === "string") {
            name = data.label;
        }
    }
    return name;
};

const getChatDescription = (data: { [key: string]: any }) => {
    let description = "Chat Description";
    if ("description" in data && data.description) {
        if (typeof data.description === "string") {
            description = data.description;
        }
    }
    return description;
};

const getChatPosition = (data: { [key: string]: any }, fallback: number) => {
    let chatPosition = fallback;
    if ("position" in data && typeof data.position === "number") {
        chatPosition = data.position;
    }
    return chatPosition;
};

const getChatMaxTurns = (data: { [key: string]: any }) => {
    let maxTurns = null;
    if ("maxTurns" in data && typeof data.maxTurns === "number") {
        maxTurns = data.maxTurns;
    }
    return maxTurns;
};

const getNestedChat = (data: { [key: string]: any }): WaldiezNestedChat => {
    const nestedChat = {
        message: null,
        reply: null,
    } as WaldiezNestedChat;
    if ("nestedChat" in data && data.nestedChat) {
        if ("message" in data.nestedChat && data.nestedChat.message) {
            nestedChat.message = messageMapper.importMessage({ message: data.nestedChat.message });
        }
        if ("reply" in data.nestedChat && data.nestedChat.reply) {
            nestedChat.reply = messageMapper.importMessage({ message: data.nestedChat.reply });
        }
    }
    return nestedChat;
};

const getChatOrder = (data: { [key: string]: any }) => {
    let order = -1;
    if ("order" in data && typeof data.order === "number") {
        order = data.order >= 0 ? data.order : -1;
    }
    return order;
};

const getChatMaxRounds = (data: { [key: string]: any }) => {
    let maxRounds = 20;
    if ("maxRounds" in data && typeof data.maxRounds === "number") {
        maxRounds = data.maxRounds;
    }
    return maxRounds;
};

const getChatAfterWork = (data: { [key: string]: any }) => {
    let afterWorkData = null;
    if ("afterWork" in data && typeof data.afterWork === "object") {
        afterWorkData = swarmAfterWorkMapper.importSwarmAfterWork(data.afterWork);
    }
    return afterWorkData;
};

const getRealSource = (data: { [key: string]: any }) => {
    let realSource = null;
    if ("realSource" in data && typeof data.realSource === "string") {
        realSource = data.realSource;
    }
    return realSource;
};

const getRealTarget = (data: { [key: string]: any }) => {
    let realTarget = null;
    if ("realTarget" in data && typeof data.realTarget === "string") {
        realTarget = data.realTarget;
    }
    return realTarget;
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
