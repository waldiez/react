/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { Node } from "@xyflow/react";

import {
    WaldiezAgentAssistant,
    WaldiezAgentCaptain,
    WaldiezAgentGroupManager,
    WaldiezAgentRagUser,
    WaldiezAgentSwarm,
    WaldiezAgentUserProxy,
    WaldiezChatData,
    WaldiezEdge,
    WaldiezModelData,
    WaldiezNodeAgentType,
    WaldiezSkillData,
    agentMapper,
    modelMapper,
    skillMapper,
} from "@waldiez/models";

export const agentId = "test-agent";
export const flowId = "test-flow";
export const createdAt = new Date().toISOString();
export const updatedAt = new Date().toISOString();
export const getAgentData = (agentType: WaldiezNodeAgentType) => {
    if (agentType === "user") {
        return WaldiezAgentUserProxy.create("user").data;
    }
    if (agentType === "assistant") {
        return WaldiezAgentAssistant.create("assistant").data;
    }
    if (agentType === "manager") {
        return WaldiezAgentGroupManager.create("manager").data;
    }
    if (agentType === "rag_user") {
        return WaldiezAgentRagUser.create("rag_user").data;
    }
    if (agentType === "swarm") {
        return WaldiezAgentSwarm.create("swarm").data;
    }
    if (agentType === "reasoning") {
        return WaldiezAgentUserProxy.create("reasoning").data;
    }
    if (agentType === "captain") {
        return WaldiezAgentCaptain.create("captain").data;
    }
};

export const getAgentNode = (
    agentType: WaldiezNodeAgentType,
    nodeOverrides: Partial<Node> = {},
    dataOverrides: { [key: string]: any } = {},
) => {
    const agentData = getAgentData(agentType);
    let node: Node;
    switch (agentType) {
        case "user":
            node = agentMapper.asNode(
                agentMapper.importAgent({
                    ...agentData,
                    agentType: agentType as any,
                    ...dataOverrides,
                }),
            );
            break;
        case "assistant":
            node = agentMapper.asNode(
                agentMapper.importAgent({
                    ...agentData,
                    agentType: agentType as any,
                    ...dataOverrides,
                }),
            );
            break;
        case "manager":
            node = agentMapper.asNode(
                agentMapper.importAgent({
                    ...agentData,
                    agentType: agentType as any,
                    ...dataOverrides,
                }),
            );
            break;
        case "rag_user":
            node = agentMapper.asNode(
                agentMapper.importAgent({
                    ...agentData,
                    agentType: agentType as any,
                    ...dataOverrides,
                }),
            );
            break;
        case "swarm":
            node = agentMapper.asNode(
                agentMapper.importAgent({
                    ...agentData,
                    agentType: agentType as any,
                    ...dataOverrides,
                }),
            );
            break;
        case "reasoning":
            node = agentMapper.asNode(
                agentMapper.importAgent({
                    ...agentData,
                    agentType: agentType as any,
                    ...dataOverrides,
                }),
            );
            break;
        case "captain":
            node = agentMapper.asNode(
                agentMapper.importAgent({
                    ...agentData,
                    agentType: agentType as any,
                    ...dataOverrides,
                }),
            );
            break;
        default:
            throw new Error("Invalid agent type");
    }
    node.id = agentId;
    return { ...node, ...nodeOverrides } as Node;
};

export const getSkillNodes = () => {
    const skillData = new WaldiezSkillData();
    const skill1 = skillMapper.asNode(
        skillMapper.importSkill({
            ...skillData,
            name: "test skill1",
        }),
    );
    skill1.id = "test-skill1";
    const skill2 = skillMapper.asNode(
        skillMapper.importSkill({
            ...skillData,
            name: "test skill2",
        }),
    );
    skill2.id = "test-skill2";
    return [{ ...skill1 }, { ...skill2 }];
};

export const getModelNodes = () => {
    const modelData = new WaldiezModelData();
    const model1 = modelMapper.asNode(
        modelMapper.importModel({
            ...modelData,
            name: "test model1",
        }),
    );
    model1.id = "test-model1";
    const model2 = modelMapper.asNode(
        modelMapper.importModel({
            ...modelData,
            name: "test model2",
        }),
    );
    model2.id = "test-model2";
    return [{ ...model1 }, { ...model2 }];
};
const getEdge = (agent: Node, index: number, isGroup: boolean) => {
    const source = isGroup ? agentId : index % 2 === 0 ? agentId : agent.id;
    const target = isGroup ? agent.id : index % 2 === 0 ? agent.id : agentId;
    const edgeId = `test-edge-${index}`;
    const type = isGroup ? "hidden" : index < 2 ? "nested" : "chat";
    const chatData = new WaldiezChatData();
    const edge: WaldiezEdge = {
        id: edgeId,
        source,
        target,
        type,
        data: {
            ...chatData,
            label: `${source} to ${target}`,
        },
    };
    // edge.type = type;
    if (!isGroup && index < 2) {
        edge.data!.nestedChat = {
            message: {
                type: "string",
                content: "test message",
                context: {
                    key1: "value1",
                },
                use_carryover: false,
            },
            reply: {
                type: "none",
                content: "",
                context: {},
                use_carryover: true,
            },
        };
    }
    return edge;
};
export const getConnectedAgents = (areGroupMembers: boolean = false) => {
    const nodes: Node[] = [];
    const edges = [];
    for (let i = 0; i < 5; i++) {
        const agent = getAgentNode("user");
        agent.data.label = `Agent ${i}`;
        if (areGroupMembers) {
            agent.data.parentId = agentId;
        }
        agent.id = `agent-${i}`;
        nodes.push({ ...agent });
        const edge = getEdge(agent, i, areGroupMembers);
        edges.push({ ...edge });
    }
    return { nodes, edges };
};

export const getGroupMembers = () => {
    return getConnectedAgents(true);
};

export const getNestedChats = () => {
    return getConnectedAgents();
};

export const getGroupNodes = () => {
    const groupData = WaldiezAgentGroupManager.create("manager");
    const group1 = agentMapper.asNode(
        agentMapper.importAgent({
            ...groupData,
            agentType: "manager" as any,
        }),
    );
    group1.data.label = "Group 1";
    group1.id = "test-group1";
    const group2 = agentMapper.asNode(
        agentMapper.importAgent({
            ...groupData,
            agentType: "manager" as any,
        }),
    );
    group2.data.label = "Group 2";
    group2.id = "test-group2";
    return [{ ...group1 }, { ...group2 }];
};
