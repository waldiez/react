/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { describe, expect, it } from "vitest";

import {
    getAgentDefaultAutoReply,
    getAgentId,
    getAgentMeta,
    getAgentName,
    getAgentType,
    getCodeExecutionConfig,
    getFallbackDescription,
    getHumanInputMode,
    getMaximumConsecutiveAutoReply,
    getModelIds,
    getNestedChats,
    getParentId,
    getSkills,
    getSystemMessage,
} from "@waldiez/models/mappers/agent/utils";

describe("getAgentId", () => {
    it("should return a new id", () => {
        const id = getAgentId({});
        expect(id).toBeTruthy();
    });
    it("should return the id from the data", () => {
        const id = getAgentId({ id: "wa-1" }, "wa-2");
        expect(id).toBe("wa-2");
    });
});

describe("getAgentType", () => {
    it("should return the agent type", () => {
        const agentType = getAgentType({ agentType: "user" });
        expect(agentType).toBe("user");
    });
    it("should return the agent type from the data", () => {
        const agentType = getAgentType({ data: { agentType: "assistant" } });
        expect(agentType).toBe("assistant");
    });
    it("should return the default agent type", () => {
        const agentType = getAgentType({});
        expect(agentType).toBe("user");
    });
});

describe("getFallbackDescription", () => {
    it("should return the user fallback description", () => {
        const description = getFallbackDescription("user");
        expect(description).toBe("A user agent");
    });
    it("should return the assistant fallback description", () => {
        const description = getFallbackDescription("assistant");
        expect(description).toBe("An assistant agent");
    });
    it("should return the manager fallback description", () => {
        const description = getFallbackDescription("manager");
        expect(description).toBe("A group chat manager");
    });
    it("should return the rag user fallback description", () => {
        const description = getFallbackDescription("rag_user");
        expect(description).toBe("A RAG user agent");
    });
    it("should return the swarm agent fallback description", () => {
        const description = getFallbackDescription("swarm");
        expect(description).toBe("A Swarm agent");
    });
    it("should return the swarm container fallback description", () => {
        const description = getFallbackDescription("swarm_container");
        expect(description).toBe("A Swarm container");
    });
});

describe("getAgentMeta", () => {
    it("should return the agent meta", () => {
        const meta = getAgentMeta({}, "user");
        expect(meta).toBeTruthy();
    });
});

describe("getSystemMessage", () => {
    it("should return the system message", () => {
        const message = getSystemMessage({ systemMessage: "test" });
        expect(message).toBe("test");
    });
    it("should return null", () => {
        const message = getSystemMessage({});
        expect(message).toBeNull();
    });
});

describe("getHumanInputMode", () => {
    it("should return the default human input mode if the agent is user", () => {
        const mode = getHumanInputMode({}, "user");
        expect(mode).toBe("ALWAYS");
    });
    it("should return the default human input mode if the agent is an assistant", () => {
        const mode = getHumanInputMode({}, "assistant");
        expect(mode).toBe("NEVER");
    });
    it("should return the default human input mode if the agent is a manager", () => {
        const mode = getHumanInputMode({}, "manager");
        expect(mode).toBe("NEVER");
    });
    it("should return the default human input mode if the agent is a rag user", () => {
        const mode = getHumanInputMode({}, "rag_user");
        expect(mode).toBe("ALWAYS");
    });
    it("should return the default human input mode if the agent is a swarm agent", () => {
        const mode = getHumanInputMode({}, "swarm");
        expect(mode).toBe("NEVER");
    });
    it("should return the default human input mode if the agent is a swarm container", () => {
        const mode = getHumanInputMode({}, "swarm_container");
        expect(mode).toBe("NEVER");
    });
    it("should return the human input mode from the data", () => {
        const mode = getHumanInputMode({ humanInputMode: "NEVER" }, "user");
        expect(mode).toBe("NEVER");
    });
});

describe("getCodeExecutionConfig", () => {
    it("should return the code execution config", () => {
        const config = getCodeExecutionConfig({ codeExecutionConfig: {} });
        expect(config).toBeTruthy();
    });
    it("should return false", () => {
        const config = getCodeExecutionConfig({});
        expect(config).toBe(false);
    });
});

describe("getAgentDefaultAutoReply", () => {
    it("should return the default auto reply", () => {
        const reply = getAgentDefaultAutoReply({ agentDefaultAutoReply: "test" });
        expect(reply).toBe("test");
    });
    it("should return null", () => {
        const reply = getAgentDefaultAutoReply({});
        expect(reply).toBeNull();
    });
});

describe("getMaximumConsecutiveAutoReply", () => {
    it("should return the maximum consecutive auto reply", () => {
        const max = getMaximumConsecutiveAutoReply({ maxConsecutiveAutoReply: 3 });
        expect(max).toBe(3);
    });
    it("should return null", () => {
        const max = getMaximumConsecutiveAutoReply({});
        expect(max).toBeNull();
    });
});

describe("getModelIds", () => {
    it("should return the model ids", () => {
        const ids = getModelIds({ modelIds: ["model-1"] });
        expect(ids).toEqual(["model-1"]);
    });
    it("should return an empty array", () => {
        const ids = getModelIds({});
        expect(ids).toEqual([]);
    });
});

describe("getSkills", () => {
    it("should return the skills", () => {
        const skills = getSkills({ skills: [{ id: "skill-1", executorId: "wa-1" }] });
        expect(skills).toEqual([{ id: "skill-1", executorId: "wa-1" }]);
    });
    it("should return an empty array", () => {
        const skills = getSkills({});
        expect(skills).toEqual([]);
    });
});

describe("getAgentName", () => {
    it("should return the agent name", () => {
        const name = getAgentName({ name: "test" }, "user");
        expect(name).toBe("test");
    });
    it("should return the fallback name", () => {
        const name = getAgentName({}, "assistant");
        expect(name).toBe("Assistant");
    });
    it("should return the fallback name for a manager", () => {
        const name = getAgentName({}, "manager");
        expect(name).toBe("Manager");
    });
    it("should return the fallback name for a rag user", () => {
        const name = getAgentName({}, "rag_user");
        expect(name).toBe("RAG User");
    });
    it("should return the fallback name for a swarm agent", () => {
        const name = getAgentName({}, "swarm");
        expect(name).toBe("Swarm Agent");
    });
    it("should return the fallback name for a swarm container", () => {
        const name = getAgentName({}, "swarm_container");
        expect(name).toBe("Swarm Container");
    });
});

describe("getParentId", () => {
    it("should return the parent id", () => {
        const id = getParentId({ parentId: "wa-1" }, "user");
        expect(id).toBe("wa-1");
    });
    it("should return null if no parent id in the data", () => {
        const id = getParentId({}, "user");
        expect(id).toBeNull();
    });
    it("should return null if the agent type is manager or swarm container", () => {
        const id = getParentId({ parentId: "wa-1" }, "manager");
        expect(id).toBeNull();
    });
});

describe("getNestedChats", () => {
    it("should return the nested chats", () => {
        const chats = getNestedChats({
            nestedChats: [{ triggeredBy: ["wa-1"], messages: [{ id: "wa-2", isReply: false }] }],
        });
        expect(chats).toEqual([{ triggeredBy: ["wa-1"], messages: [{ id: "wa-2", isReply: false }] }]);
    });
    it("should return an empty array", () => {
        const chats = getNestedChats({});
        expect(chats).toEqual([]);
    });
});
