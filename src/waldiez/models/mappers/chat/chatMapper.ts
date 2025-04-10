/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { Edge, Node } from "@xyflow/react";

import { WaldiezChat, WaldiezChatData, WaldiezEdge, WaldiezEdgeData } from "@waldiez/models/Chat";
import { messageMapper } from "@waldiez/models/mappers/chat/messageMapper";
import { summaryMapper } from "@waldiez/models/mappers/chat/summaryMapper";
import {
    checkChatData,
    getAvailable,
    getChatAfterWork,
    getChatClearHistory,
    getChatDescription,
    getChatFlowAfterWork,
    getChatMaxRounds,
    getChatMaxTurns,
    getChatName,
    getChatOrder,
    getChatPosition,
    getChatPrerequisites,
    getChatRest,
    getContextVariables,
    getNestedChat,
    getRealSource,
    getRealTarget,
    updateEdge,
} from "@waldiez/models/mappers/chat/utils";
import {
    getDescriptionFromJSON,
    getNameFromJSON,
    swarmAfterWorkMapper,
} from "@waldiez/models/mappers/common";
import "@waldiez/models/mappers/common/swarmAfterWorkMapper";

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
            prerequisites: getChatPrerequisites(data),
            maxRounds: getChatMaxRounds(data),
            afterWork: data.afterWork ? swarmAfterWorkMapper.exportSwarmAfterWork(data.afterWork) : null,
            flowAfterWork: data.flowAfterWork
                ? swarmAfterWorkMapper.exportSwarmAfterWork(data.flowAfterWork)
                : null,
            available: data.available,
            contextVariables: data.contextVariables,
            realSource: data.realSource,
            realTarget: data.realTarget,
        };
        const rest = { ...edge } as any;
        if (rest.type === "hidden") {
            rest.hidden = true;
        }
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
            prerequisites: chat.data.prerequisites,
            summary: chat.data.summary,
            maxTurns: chat.data.maxTurns,
            maxRounds: chat.data.maxRounds,
            afterWork: chat.data.afterWork,
            flowAfterWork: chat.data.flowAfterWork,
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
            hidden: chat.rest.hidden === true || chat.rest.type === "hidden",
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
    const prerequisites = getChatPrerequisites(json);
    const maxRounds = getChatMaxRounds(json);
    const afterWork = getChatAfterWork(json);
    const flowAfterWork = getChatFlowAfterWork(json);
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
        prerequisites,
        maxRounds,
        afterWork,
        flowAfterWork,
        contextVariables,
        available,
        realSource,
        realTarget,
    });
    return data;
};
