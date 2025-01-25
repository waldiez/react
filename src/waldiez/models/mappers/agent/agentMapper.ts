/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import {
    WaldiezAgent,
    WaldiezAgentAssistant,
    WaldiezAgentAssistantData,
    WaldiezAgentData,
    WaldiezAgentGroupManager,
    WaldiezAgentGroupManagerData,
    WaldiezAgentRagUser,
    WaldiezAgentRagUserData,
    WaldiezAgentReasoning,
    WaldiezAgentReasoningData,
    WaldiezAgentSwarm,
    WaldiezAgentSwarmData,
    WaldiezAgentUserProxy,
    WaldiezAgentUserProxyData,
    WaldiezNodeAgent,
    WaldiezNodeAgentGroupManager,
    WaldiezNodeAgentRagUser,
    WaldiezNodeAgentType,
} from "@waldiez/models/Agent";
import {
    getAdminName,
    getAgentDefaultAutoReply,
    getAgentId,
    getAgentMeta,
    getAgentType,
    getCodeExecutionConfig,
    getEnableClearHistory,
    getHumanInputMode,
    getIsInitial,
    getMaxRound,
    getMaximumConsecutiveAutoReply,
    getModelIds,
    getNestedChats,
    getParentId,
    getReasonConfig,
    getRetrieveConfig,
    getSendIntroductions,
    getSkills,
    getSpeakers,
    getSwarmFunctions,
    getSwarmHandoffs,
    getSwarmUpdateAgentStateBeforeReply,
    getSystemMessage,
    getTermination,
    getVerbose,
} from "@waldiez/models/mappers/agent/utils";
import { getNodePositionFromJSON, getRestFromJSON } from "@waldiez/models/mappers/common";

export const agentMapper = {
    importAgent: (thing: unknown, agentId?: string): WaldiezAgent => {
        if (!thing || typeof thing !== "object") {
            throw new Error("Invalid agent data");
        }
        const json = thing as Record<string, unknown>;
        const id = getAgentId(json, agentId);
        const agentType = getAgentType(json);
        const { name, description, tags, requirements, createdAt, updatedAt } = getAgentMeta(json, agentType);
        const jsonData = (json.data || json) as Record<string, unknown>;
        const data = getAgentData(jsonData, agentType);
        const toExclude = getKeysToExclude(agentType);
        const rest = getRestFromJSON(json, toExclude);
        return getAgent(
            agentType,
            id,
            name,
            description,
            tags,
            requirements,
            createdAt,
            updatedAt,
            data,
            rest,
        );
    },

    exportAgent: (agentNode: WaldiezNodeAgent, skipLinks?: boolean) => {
        const agentCopy: any = skipLinks ? removeLinks(agentNode) : { ...agentNode };
        const data = { ...agentCopy.data };
        const name = agentCopy.data.label;
        delete agentCopy.data;
        const agentType = data.agentType as WaldiezNodeAgentType;
        const agentData: any = {
            systemMessage: data.systemMessage,
            humanInputMode: data.humanInputMode,
            codeExecutionConfig: data.codeExecutionConfig,
            agentDefaultAutoReply: data.agentDefaultAutoReply,
            maxConsecutiveAutoReply: data.maxConsecutiveAutoReply,
            termination: data.termination,
            modelIds: data.modelIds,
            skills: data.skills,
            parentId: data.parentId,
            nestedChats: data.nestedChats,
        };
        updateAgentDataToExport(agentType, agentData, data);
        for (const key of [
            "description",
            "name",
            "tags",
            "requirements",
            "createdAt",
            "updatedAt",
            "agentType",
        ]) {
            delete agentCopy[key];
        }
        return {
            type: "agent",
            agentType,
            name,
            description: data.description,
            tags: data.tags,
            requirements: data.requirements,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            data: agentData,
            ...agentCopy,
        };
    },
    asNode: (
        agent: WaldiezAgent,
        position?: { x: number; y: number },
        skipLinks?: boolean,
    ): WaldiezNodeAgent => {
        const nodePosition = getNodePositionFromJSON(agent, position);
        const nodeData = {
            ...agent.data,
            agentType: agent.agentType,
            label: agent.name,
            description: agent.description,
            tags: agent.tags,
            requirements: agent.requirements,
            createdAt: agent.createdAt,
            updatedAt: agent.updatedAt,
        } as any;
        delete nodeData.name;
        const agentNode: WaldiezNodeAgent = {
            id: agent.id,
            type: "agent",
            data: nodeData,
            ...agent.rest,
            position: nodePosition,
        };
        if (skipLinks === true) {
            return removeLinks(agentNode);
        }
        return agentNode;
    },
};
const getCommonAgentData = (
    data: Record<string, unknown>,
    agentType: WaldiezNodeAgentType,
): WaldiezAgentData => {
    const systemMessage = getSystemMessage(data);
    const humanInputMode = getHumanInputMode(data, agentType);
    const codeExecutionConfig = getCodeExecutionConfig(data);
    const agentDefaultAutoReply = getAgentDefaultAutoReply(data);
    const maxConsecutiveAutoReply = getMaximumConsecutiveAutoReply(data);
    const termination = getTermination(data);
    const modelIds = getModelIds(data);
    const skills = getSkills(data);
    const parentId = getParentId(data, agentType);
    const nestedChats = getNestedChats(data);
    return new WaldiezAgentData({
        systemMessage,
        humanInputMode,
        codeExecutionConfig,
        agentDefaultAutoReply,
        maxConsecutiveAutoReply,
        termination,
        modelIds,
        skills,
        parentId,
        nestedChats,
    });
};

const getKeysToExclude = (agentType: WaldiezNodeAgentType) => {
    const toExclude = ["id", "name", "description", "tags", "requirements", "createdAt", "updatedAt", "data"];
    if (agentType === "rag_user") {
        toExclude.push("retrieveConfig");
    }
    if (agentType === "manager") {
        toExclude.push("maxRound", "adminName", "speakers", "enableClearHistory", "sendIntroductions");
    }
    if (agentType === "swarm") {
        toExclude.push("functions", "updateAgentStateBeforeReply", "handoffs");
    }
    if (agentType === "reasoning") {
        toExclude.push("verbose", "reasonConfig");
    }
    return toExclude;
};

const getAgentData = (
    jsonData: Record<string, unknown>,
    agentType: WaldiezNodeAgentType,
): WaldiezAgentData => {
    const data = getCommonAgentData(jsonData, agentType);
    if (agentType === "rag_user") {
        return new WaldiezAgentRagUserData({
            ...data,
            retrieveConfig: getRetrieveConfig(jsonData),
        });
    }
    if (agentType === "manager") {
        return new WaldiezAgentGroupManagerData({
            ...data,
            maxRound: getMaxRound(jsonData),
            adminName: getAdminName(jsonData),
            speakers: getSpeakers(jsonData),
            enableClearHistory: getEnableClearHistory(jsonData),
            sendIntroductions: getSendIntroductions(jsonData),
        });
    }
    if (agentType === "swarm") {
        return new WaldiezAgentSwarmData({
            ...data,
            isInitial: getIsInitial(jsonData),
            functions: getSwarmFunctions(jsonData),
            updateAgentStateBeforeReply: getSwarmUpdateAgentStateBeforeReply(jsonData),
            handoffs: getSwarmHandoffs(jsonData),
        });
    }
    if (agentType === "reasoning") {
        return new WaldiezAgentReasoningData({
            ...data,
            verbose: getVerbose(jsonData),
            reasonConfig: getReasonConfig(jsonData),
        });
    }
    return data;
};

const removeLinks: (agent: WaldiezNodeAgent) => WaldiezNodeAgent = agent => {
    // remove agent's links to other nodes, such as models, skills, and nested chats
    // if the agent is a manager,
    //    also remove the speaker transitions (allowedOrDisallowedTransitions)
    //    and allowRepeat if it's a list of strings
    // if the agent is a rag_user, also remove the model and docsPath
    const agentCopy = { ...agent };
    agentCopy.data.modelIds = [];
    agentCopy.data.skills = [];
    agentCopy.data.nestedChats = [];
    if (agentCopy.data.codeExecutionConfig) {
        agentCopy.data.codeExecutionConfig.functions = [];
    }
    if (agent.data.agentType === "rag_user") {
        (agentCopy as WaldiezNodeAgentRagUser).data.retrieveConfig = {
            ...(agentCopy as WaldiezNodeAgentRagUser).data.retrieveConfig,
            model: null,
            docsPath: [],
        };
    }
    if (agent.data.agentType === "manager") {
        (agentCopy as WaldiezNodeAgentGroupManager).data.speakers = {
            ...(agentCopy as WaldiezNodeAgentGroupManager).data.speakers,
            allowRepeat: [],
            allowedOrDisallowedTransitions: {},
        };
    }
    return agentCopy;
};

// eslint-disable-next-line max-statements
const getAgent = (
    agentType: WaldiezNodeAgentType,
    id: string,
    name: string,
    description: string,
    tags: string[],
    requirements: string[],
    createdAt: string,
    updatedAt: string,
    data: WaldiezAgentData,
    rest: { [key: string]: any },
) => {
    if (agentType === "user") {
        return new WaldiezAgentUserProxy({
            id,
            agentType,
            name,
            description,
            tags,
            requirements,
            createdAt,
            updatedAt,
            data: data as WaldiezAgentUserProxyData,
            rest,
        });
    }
    if (agentType === "assistant") {
        return new WaldiezAgentAssistant({
            id,
            agentType,
            name,
            description,
            tags,
            requirements,
            createdAt,
            updatedAt,
            data: data as WaldiezAgentAssistantData,
            rest,
        });
    }
    if (agentType === "manager") {
        return new WaldiezAgentGroupManager({
            id,
            agentType,
            name,
            description,
            tags,
            requirements,
            createdAt,
            updatedAt,
            data: data as WaldiezAgentGroupManagerData,
            rest,
        });
    }
    if (agentType === "rag_user") {
        return new WaldiezAgentRagUser({
            id,
            agentType,
            name,
            description,
            tags,
            requirements,
            createdAt,
            updatedAt,
            data: data as WaldiezAgentRagUserData,
            rest,
        });
    }
    if (agentType === "swarm") {
        return new WaldiezAgentSwarm({
            id,
            agentType,
            name,
            description,
            tags,
            requirements,
            createdAt,
            updatedAt,
            data: data as WaldiezAgentSwarmData,
            rest,
        });
    }
    if (agentType === "reasoning") {
        return new WaldiezAgentReasoning({
            id,
            agentType,
            name,
            description,
            tags,
            requirements,
            createdAt,
            updatedAt,
            data: data as WaldiezAgentReasoningData,
            rest,
        });
    }
    return new WaldiezAgent({
        id,
        agentType,
        name,
        description,
        tags,
        requirements,
        createdAt,
        updatedAt,
        data,
        rest,
    });
};

const updateAgentDataToExport = (agentType: WaldiezNodeAgentType, agentData: any, data: any) => {
    if (agentType === "rag_user") {
        updateRagAgent(agentData, data);
    }
    if (agentType === "manager") {
        updateGroupManager(agentData, data);
    }
    if (agentType === "swarm") {
        updateSwarmAgent(agentData, data);
    }
    if (agentType === "reasoning") {
        updateReasoningAgent(agentData, data);
    }
};

const updateRagAgent = (agentData: WaldiezAgentRagUserData, data: any) => {
    agentData.retrieveConfig = getRetrieveConfig(data);
};

const updateGroupManager = (agentData: WaldiezAgentGroupManagerData, data: any) => {
    agentData.maxRound = getMaxRound(data);
    agentData.adminName = getAdminName(data);
    agentData.speakers = getSpeakers(data);
    agentData.enableClearHistory = getEnableClearHistory(data);
    agentData.sendIntroductions = getSendIntroductions(data);
};

const updateSwarmAgent = (agentData: WaldiezAgentSwarmData, data: any) => {
    agentData.functions = (data as WaldiezAgentSwarmData).functions;
    agentData.updateAgentStateBeforeReply = (data as WaldiezAgentSwarmData).updateAgentStateBeforeReply;
    agentData.handoffs = (data as WaldiezAgentSwarmData).handoffs;
    agentData.isInitial = (data as WaldiezAgentSwarmData).isInitial;
};

const updateReasoningAgent = (agentData: WaldiezAgentReasoningData, data: any) => {
    agentData.verbose = getVerbose(data);
    agentData.reasonConfig = getReasonConfig(data);
};
