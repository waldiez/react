/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { agents, chatJson, edges } from "./data";
import { describe, expect, it } from "vitest";

import { WaldiezChat } from "@waldiez/models";
import { chatMapper } from "@waldiez/models/mappers";

describe("chatMapper.importChat", () => {
    it("should import a chat", () => {
        const imported = chatMapper.importChat(chatJson, edges, agents, 0);
        expect(imported).toBeTruthy();
        const chat = imported?.chat as WaldiezChat;
        expect(chat).toBeTruthy();
        expect(chat.id).toBe("wc-1");
        expect(chat.data.source).toBe("wa-1");
        expect(chat.data.target).toBe("wa-2");
        expect(chat.data.name).toBe("wa-1 => wa-2");
        expect(chat.data.description).toBe("custom_description");
        expect(chat.data.position).toBe(0);
        expect(chat.data.order).toBe(0);
        expect(chat.data.clearHistory).toBe(false);
        expect(chat.data.message).toEqual({
            type: "none",
            use_carryover: false,
            content: null,
            context: {
                context_key: "context_value",
            },
        });
        expect(chat.data.nestedChat).toEqual({
            message: null,
            reply: null,
        });
        expect(chat.data.summary).toEqual({
            method: "reflection_with_llm",
            prompt: "summarize the conversation",
            args: {
                summary_role: "user",
            },
        });
        expect(chat.data.maxTurns).toBe(0);
        expect(chat.data.maxRounds).toBe(0);
        expect(chat.data.afterWork).toEqual({
            recipientType: "agent",
            recipient: "wa-2",
        });
    });
    it("should throw an error when importing an invalid chat", () => {
        expect(() => chatMapper.importChat(4, edges, agents, 1)).toThrowError("Invalid edge data");
    });
    it("should throw an error if the edge is not found", () => {
        expect(() =>
            chatMapper.importChat({ id: "1", data: { source: "wa-1", target: "wa-2" } }, [], agents, 1),
        ).toThrowError("Edge not found");
    });
    it("should throw an error if the source is not found", () => {
        expect(() =>
            chatMapper.importChat({ id: "wc-1", data: { source: "1", target: "wa-2" } }, edges, agents, 1),
        ).toThrowError("Source node not found");
    });
    it("should throw an error if the target is not found", () => {
        expect(() =>
            chatMapper.importChat({ id: "wc-1", data: { source: "wa-1", target: "2" } }, edges, agents, 1),
        ).toThrowError("Target node not found");
    });
    it("should throw an error if an invalid edge is provided", () => {
        expect(() =>
            chatMapper.importChat({ id: "1", data: { source: "wa-1" } }, [], agents, 1),
        ).toThrowError("Invalid edge data");
    });
    it("should throw an error if the edge source does not match the data source", () => {
        expect(() =>
            chatMapper.importChat(
                { id: "wc-1", data: { source: "wa-2", target: "wa-2" }, type: "chat" },
                edges,
                agents,
                1,
            ),
        ).toThrowError("Source node does not match edge source");
    });
    it("should throw an error if the edge target does not match the data target", () => {
        expect(() =>
            chatMapper.importChat(
                { id: "wc-1", data: { source: "wa-1", target: "wa-3" }, type: "chat" },
                edges,
                agents,
                1,
            ),
        ).toThrowError("Target node does not match edge target");
    });
    it("should change the edge type to chat if the chat.type not a valid type", () => {
        const { chat, edge } = chatMapper.importChat(
            { id: "wc-1", type: "other", data: { source: "wa-1", target: "wa-2" } },
            edges,
            agents,
            1,
        );
        expect(chat).toBeTruthy();
        expect(edge.type).toBe("chat");
    });
    it("should use the edge type if provided", () => {
        const newEdges = [{ ...edges[0], type: "nested" }, edges[1]];
        const { chat, edge } = chatMapper.importChat(chatJson, newEdges, agents, 1);
        expect(chat).toBeTruthy();
        expect(edge.type).toBe("nested");
    });
    it("should use the chat type if provided and edge.type is not", () => {
        const newEdges = [...edges];
        delete newEdges[0].type;
        const { chat, edge } = chatMapper.importChat(
            { id: "wc-1", type: "nested", data: { source: "wa-1", target: "wa-2" } },
            newEdges,
            agents,
            1,
        );
        expect(chat).toBeTruthy();
        expect(edge.type).toBe("nested");
    });
    it("should change the edge type to chat if the edge.type is not a valid type", () => {
        const { chat, edge } = chatMapper.importChat(
            { id: "wc-1", data: { source: "wa-1", target: "wa-2" } },
            [{ ...edges[0], type: "other" }],
            agents,
            1,
        );
        expect(chat).toBeTruthy();
        expect(edge.type).toBe("chat");
    });
    it("should change the edge type to hidden if the target is a group and the source is the parent", () => {
        const newAgents = [...agents];
        newAgents[2] = { ...newAgents[2], data: { ...newAgents[2].data, parentId: "wa-2" } };
        const { chat, edge } = chatMapper.importChat(
            { id: "wc-2", data: { type: "group", source: "wa-2", target: "wa-3" } },
            edges,
            newAgents,
            1,
        );
        expect(chat).toBeTruthy();
        expect(edge.type).toBe("hidden");
    });
    it("should import a chat's nested chat", () => {
        const chatJsonWithNestedChat = {
            ...chatJson,
            data: {
                ...chatJson.data,
                nestedChat: {
                    message: {
                        type: "string",
                        content: "nested_message",
                        context: {},
                    },
                    reply: {
                        type: "method",
                        content: "nested_reply",
                        context: {},
                    },
                },
            },
        };
        const { chat } = chatMapper.importChat(chatJsonWithNestedChat, edges, agents, 1);
        expect(chat).toBeTruthy();
        expect(chat.data.nestedChat).toBeTruthy();
        expect(chat.data.nestedChat.message).toBeTruthy();
        expect(chat.data.nestedChat.message!.type).toBe("string");
        expect(chat.data.nestedChat.message!.content).toBe("nested_message");
        expect(chat.data.nestedChat.reply).toBeTruthy();
        expect(chat.data.nestedChat.reply!.type).toBe("method");
        expect(chat.data.nestedChat.reply!.content).toBe("nested_reply");
    });
    it("should use last_msg as summary method", () => {
        const chatJsonWithSummaryMethod = {
            ...chatJson,
            data: {
                ...chatJson.data,
                summary: {
                    method: "lastMsg",
                    prompt: "summarize the conversation",
                    args: {
                        summary_role: "user",
                    },
                },
            },
        };
        const { chat } = chatMapper.importChat(chatJsonWithSummaryMethod, edges, agents, 1);
        expect(chat).toBeTruthy();
        expect(chat.data.summary.method).toBe("last_msg");
    });
    it("should set the order to -1 for a nested chat", () => {
        const chatJsonWithNestedChat = {
            ...chatJson,
            type: "nested",
        };
        const newEdges = [{ ...edges[0], type: "nested" }, edges[1]];
        const { chat, edge } = chatMapper.importChat(chatJsonWithNestedChat, newEdges, agents, 1);
        expect(chat).toBeTruthy();
        expect(edge.data?.order).toBe(-1);
        expect(chat.data.order).toBe(-1);
    });
    it("should set the order to -1 for a chat with an order < 0", () => {
        const chatJsonWithNegativeOrder = {
            ...chatJson,
            data: {
                ...chatJson.data,
                order: -1,
            },
        };
        const { chat } = chatMapper.importChat(chatJsonWithNegativeOrder, edges, agents, 1);
        expect(chat).toBeTruthy();
        expect(chat.data.order).toBe(-1);
    });
    it("should have null afterWork if not provided", () => {
        const chatJsonWithoutAfterWork = {
            ...chatJson,
            data: {
                ...chatJson.data,
                afterWork: null,
            },
        };
        const { chat } = chatMapper.importChat(chatJsonWithoutAfterWork, edges, agents, 1);
        expect(chat).toBeTruthy();
        expect(chat.data.afterWork).toBeNull();
    });
    it("should animate swarm chat if the source is swarm and the target is not", () => {
        const newAgents = [...agents];
        newAgents[0] = { ...newAgents[0], data: { ...newAgents[0].data, agentType: "swarm" } };
        const { chat, edge } = chatMapper.importChat(chatJson, edges, newAgents, 1);
        expect(chat).toBeTruthy();
        expect(edge?.animated).toBe(true);
    });
    it("should accept useCarryover as a key for use_carryover", () => {
        const chatJsonWithUseCarryover = {
            ...chatJson,
            data: {
                ...chatJson.data,
                message: {
                    ...chatJson.data.message,
                    useCarryover: true,
                },
            },
        };
        const { chat } = chatMapper.importChat(chatJsonWithUseCarryover, edges, agents, 1);
        expect(chat).toBeTruthy();
        expect(chat.data.message.use_carryover).toBe(true);
    });
});
