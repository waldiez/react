import { assistantJson, createdAt, updatedAt } from "./data";
import { expectTypeOf } from "vitest";

import { WaldiezSourceAssistant } from "@waldiez/models/agents/assistant";
import { WaldiezSourceAssistantData } from "@waldiez/models/agents/assistant/data";
import {
    WaldiezNodeAssistant,
    WaldiezNodeAssistantData,
} from "@waldiez/models/types/agents/userProxyOrAssistant";

describe("WaldiezSourceAssistant", () => {
    const waldiezSourceAssistantData: WaldiezSourceAssistantData = {
        name: "Assistant",
        nestedChats: [],
        agentType: "assistant",
        systemMessage: null,
        humanInputMode: "NEVER",
        description: "An assistant agent",
        codeExecutionConfig: false,
        agentDefaultAutoReply: null,
        maxConsecutiveAutoReply: null,
        termination: {
            type: "none",
            keywords: [],
            criterion: null,
            methodContent: null,
        },
        teachability: {
            enabled: false,
            verbosity: 0,
            resetDb: false,
            recallThreshold: 0,
            maxMumRetrievals: 0,
        },
        modelIds: [],
        skills: [],
        tags: [],
        requirements: [],
        createdAt,
        updatedAt,
        parentId: null,
    };

    const assistant = new WaldiezSourceAssistant("test-id", waldiezSourceAssistantData);
    const assistantNode = assistant.asNode();

    it("should create a new assistant", () => {
        expect(assistant).toBeInstanceOf(WaldiezSourceAssistant);
    });

    it("should have the correct data", () => {
        expect(assistant.data).toEqual(assistantJson);
    });

    it("should create a new assistant node", () => {
        expectTypeOf(assistantNode).toEqualTypeOf<WaldiezNodeAssistant>();
    });

    it("should have node data of type WaldiezNodeAssistantData", () => {
        expectTypeOf(assistantNode.data).toEqualTypeOf<WaldiezNodeAssistantData>();
    });

    it("should have the correct node id", () => {
        expect(assistantNode.id).toEqual("test-id");
    });

    it("should have the correct node type", () => {
        expect(assistantNode.type).toEqual("agent");
        expect(assistantNode.data.agentType).toEqual("assistant");
    });

    it("should import an assistant from json", () => {
        const importedAssistant = WaldiezSourceAssistant.fromJSON(
            {
                ...assistantJson,
                id: "test-id",
            },
            "assistant",
        );
        const importedAssistantData = importedAssistant.data as any;
        const assistantData = assistantJson as any;
        Object.keys(assistantData).forEach(key => {
            expect(importedAssistantData[key]).toEqual(assistantData[key]);
        });
        expect(importedAssistantData.name).toEqual(assistantData.name);
        expect(importedAssistantData.description).toEqual(assistantData.description);
        expect(importedAssistantData.tags).toEqual(assistantData.tags);
        expect(importedAssistantData.requirements).toEqual(assistantData.requirements);
        expect(importedAssistantData.createdAt).toEqual(assistantData.createdAt);
        expect(importedAssistantData.updatedAt).toEqual(assistantData.updatedAt);
        const assistantNode = importedAssistant.asNode();
        expect(assistantNode.id).toEqual("test-id");
        expect(assistantNode.type).toEqual("agent");
        expect(assistantNode.data.agentType).toEqual("assistant");
        expect(assistantNode.position).toBeDefined();
    });

    it("should create new assistant data", () => {
        const assistantData = new WaldiezSourceAssistantData();
        expect(assistantData).toBeInstanceOf(WaldiezSourceAssistantData);
    });

    it("should import assistant data from json", () => {
        const importedAssistantData = WaldiezSourceAssistantData.fromJSON(assistantJson, "assistant");
        expect(importedAssistantData).toBeInstanceOf(WaldiezSourceAssistantData);
        expect(importedAssistantData).toEqual(assistantJson);
    });
});
