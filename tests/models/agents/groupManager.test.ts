import { createdAt, groupManagerJson, updatedAt } from "./data";
import { expectTypeOf } from "vitest";

import { WaldiezSourceGroupManager } from "@waldiez/models/agents/manager";
import { WaldiezSourceGroupManagerData } from "@waldiez/models/agents/manager/data";
import {
    WaldiezNodeGroupManager,
    WaldiezNodeGroupManagerData,
} from "@waldiez/models/types/agents/groupManager";

describe("WaldiezSourceGroupManager", () => {
    const waldiezSourceGroupManagerData: WaldiezSourceGroupManagerData = {
        name: "Group Manager",
        agentType: "manager",
        systemMessage: null,
        humanInputMode: "ALWAYS",
        description: "A group manager agent",
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
        maxRound: 0,
        adminName: "Admin",
        enableClearHistory: false,
        sendIntroductions: false,
        speakers: {
            selectionMethod: "auto",
            selectionCustomMethod: "",
            selectionMode: "transition",
            transitionsType: "allowed",
            allowRepeat: true,
            maxRetriesForSelecting: 2,
            allowedOrDisallowedTransitions: {
                agent1: ["agent2", "agent3"],
                agent2: ["agent1", "agent3"],
                agent3: ["agent1", "agent2"],
            },
        },
        modelIds: [],
        skills: [],
        tags: [],
        requirements: [],
        createdAt,
        updatedAt,
        parentId: null,
    };

    const manager = new WaldiezSourceGroupManager("manager-id", waldiezSourceGroupManagerData);

    const managerNode = manager.asNode();

    it("should create a new Group Manager", () => {
        expectTypeOf(manager).toEqualTypeOf<WaldiezSourceGroupManager>();
    });

    it("should have the correct agentType", () => {
        expect(manager.data.agentType).toBe("manager");
    });

    it("should create a new manager node", () => {
        expectTypeOf(managerNode).toEqualTypeOf<WaldiezNodeGroupManager>();
    });

    it("should have node data of type WaldiezNodeGroupManagerData", () => {
        expectTypeOf(managerNode.data).toEqualTypeOf<WaldiezNodeGroupManagerData>();
    });

    it("should have the correct node id", () => {
        expect(managerNode.id).toBe("manager-id");
    });

    it("should import a manager from json", () => {
        const managerFromJSON = WaldiezSourceGroupManager.fromJSON(groupManagerJson);
        expect(managerFromJSON.data).toEqual(groupManagerJson);
    });

    it("should create new manager data", () => {
        const managerData = new WaldiezSourceGroupManagerData();
        expect(managerData).toBeInstanceOf(WaldiezSourceGroupManagerData);
    });

    it("should import manager data from json", () => {
        const managerData = WaldiezSourceGroupManagerData.fromJSON(groupManagerJson);
        expect(managerData).toEqual(waldiezSourceGroupManagerData);
    });

    it("should create a manager with default values", () => {
        const importedAgent = WaldiezSourceGroupManager.fromJSON(null);
        expect(importedAgent).toBeInstanceOf(WaldiezSourceGroupManager);
    });

    it("should import manager data with default values", () => {
        const managerData = WaldiezSourceGroupManagerData.fromJSON(null);
        expect(managerData).toBeInstanceOf(WaldiezSourceGroupManagerData);
    });

    it("should import manager data with label instead of name", () => {
        const managerJson = {
            ...groupManagerJson,
            label: "label of Group Manager",
        } as any;
        delete managerJson.name;
        const managerDataFromJSON = WaldiezSourceGroupManagerData.fromJSON(managerJson);
        expect(managerDataFromJSON.name).toBe("label of Group Manager");
    });

    it("should import manager data with name in args", () => {
        const jsonWithoutName = {
            ...groupManagerJson,
        } as any;
        delete jsonWithoutName.name;
        const managerDataWithName = WaldiezSourceGroupManagerData.fromJSON(jsonWithoutName, "Manager Name");
        expect(managerDataWithName.name).toBe("Manager Name");
    });

    it("should import manager data without a name", () => {
        const jsonWithoutName = {
            ...groupManagerJson,
        } as any;
        delete jsonWithoutName.name;
        const managerDataWithoutName = WaldiezSourceGroupManagerData.fromJSON(jsonWithoutName);
        expect(managerDataWithoutName.name).toBe("Manager");
    });

    it("should create a manager with id in json", () => {
        const jsonWithId = {
            ...groupManagerJson,
            id: "manager-id",
        };
        const managerFromJSON = WaldiezSourceGroupManager.fromJSON(jsonWithId);
        expect(managerFromJSON.id).toBe("manager-id");
    });

    it("should create a manager node with position in args", () => {
        const managerNodeWithPosition = manager.asNode({ x: 120, y: 200 });
        expect(managerNodeWithPosition.position).toEqual({ x: 120, y: 200 });
    });

    it("should create a manager node with position in json", () => {
        const managerNodeWithPosition = new WaldiezSourceGroupManager(
            "manager-id",
            waldiezSourceGroupManagerData,
            {
                position: { x: 15, y: 25 },
            },
        ).asNode();
        expect(managerNodeWithPosition.position).toEqual({ x: 15, y: 25 });
    });
});
