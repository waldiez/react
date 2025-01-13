import { Edge, Node } from "@xyflow/react";

import {
    WaldiezEdge,
    WaldiezFlow,
    WaldiezFlowData,
    WaldiezNodeAgent,
    WaldiezNodeModel,
    WaldiezNodeSkill,
    emptyFlow,
} from "@waldiez/models";
import { agentMapper } from "@waldiez/models/mappers/agent";
import { chatMapper } from "@waldiez/models/mappers/chat";
import {
    exportSwarmAgents,
    getAgentNodes,
    getAgents,
    getChats,
    getEdges,
    getFlowViewport,
    getIsAsync,
    getModels,
    getNodes,
    getSkills,
    getSwarmContainer,
    importFlowMeta,
} from "@waldiez/models/mappers/flow/utils";
import { modelMapper } from "@waldiez/models/mappers/model";
import { skillMapper } from "@waldiez/models/mappers/skill";
import { WaldiezFlowProps } from "@waldiez/types";

export const flowMapper = {
    importFlow: (item: any, newId?: string) => {
        const flowJson = getFlowJson(item);
        if (!flowJson.type || flowJson.type !== "flow") {
            return emptyFlow;
        }
        const { id, storageId, name, description, tags, requirements, createdAt, updatedAt, rest } =
            importFlowMeta(flowJson);
        const flowData = (flowJson.data || flowJson) as Record<string, unknown>;
        const data = getFlowDataToImport(flowData);
        return new WaldiezFlow({
            id: newId || id,
            storageId,
            name,
            description,
            tags,
            requirements,
            data,
            createdAt,
            updatedAt,
            rest,
        });
    },
    toReactFlow(flow: WaldiezFlow) {
        const edges: Edge[] = flow.data.chats.map(chatMapper.asEdge);
        const nodes: Node[] = getRFNodes(flow);
        const flowProps: WaldiezFlowProps = {
            flowId: flow.id,
            isAsync: flow.data.isAsync ?? false,
            storageId: flow.storageId,
            name: flow.name,
            description: flow.description,
            tags: flow.tags,
            requirements: flow.requirements,
            createdAt: flow.createdAt,
            updatedAt: flow.updatedAt,
            edges,
            nodes,
            viewport: flow.data.viewport || { zoom: 1, position: { x: 0, y: 0 } },
            ...flow.rest,
        };
        return flowProps;
    },
    exportFlow: (flow: WaldiezFlowProps, hideSecrets: boolean, skipLinks: boolean = false) => {
        const waldiezFlow: WaldiezFlow = {
            id: flow.flowId,
            type: "flow",
            storageId: flow.storageId,
            name: flow.name,
            description: flow.description,
            tags: flow.tags,
            requirements: flow.requirements,
            createdAt: flow.createdAt || new Date().toISOString(),
            updatedAt: flow.updatedAt || new Date().toISOString(),
            data: getFlowDataToExport(flow, hideSecrets, skipLinks),
        };
        return waldiezFlow;
    },
};

const getFlowDataToImport = (json: Record<string, unknown>) => {
    const isAsync = getIsAsync(json);
    const viewport = getFlowViewport(json);
    const nodes = getNodes(json);
    let edges = getEdges(json);
    const chatsNEdges = getChats(json, nodes, edges);
    edges = chatsNEdges.edges;
    const chats = chatsNEdges.chats;
    const models = getModels(json, nodes);
    const skills = getSkills(json, nodes);
    const agents = getAgents(
        json,
        nodes,
        models.map(model => model.id),
        skills.map(skill => skill.id),
        edges.map(edge => edge.id),
    );
    return new WaldiezFlowData({ nodes, edges, agents, models, skills, chats, isAsync, viewport });
};

const getFlowDataToExport = (flow: WaldiezFlowProps, hideSecrets: boolean, skipLinks: boolean) => {
    const nodes = flow.nodes || [];
    const flowEdges = (flow.edges || []) as WaldiezEdge[];
    const modelNodes = nodes.filter(node => node.type === "model") as WaldiezNodeModel[];
    const skillNodes = nodes.filter(node => node.type === "skill") as WaldiezNodeSkill[];
    const { agentNodes, userAgentNodes, assistantAgentNodes, managerNodes, ragUserNodes } =
        getAgentNodes(nodes);
    const { edges, swarmAgents } = exportSwarmAgents(agentNodes, flowEdges, skipLinks);
    return new WaldiezFlowData({
        nodes: nodes.map(node => {
            const nodeCopy = { ...node } as any;
            delete nodeCopy.data;
            delete nodeCopy.agentType;
            return nodeCopy;
        }),
        edges: edges.map(edge => {
            const edgeCopy = { ...edge } as any;
            delete edgeCopy.data;
            return edgeCopy;
        }),
        agents: {
            users: userAgentNodes.map(userAgentNode => exportAgent(userAgentNode, nodes, skipLinks)),
            assistants: assistantAgentNodes.map(assistantAgentNode =>
                exportAgent(assistantAgentNode, nodes, skipLinks),
            ),
            managers: managerNodes.map(managerNode => exportAgent(managerNode, nodes, skipLinks)),
            rag_users: ragUserNodes.map(ragUserNode => exportAgent(ragUserNode, nodes, skipLinks)),
            swarm_agents: swarmAgents,
        },
        models: modelNodes.map(modelNode => exportModel(modelNode, nodes, hideSecrets)),
        skills: skillNodes.map(skillNode => exportSkill(skillNode, nodes, hideSecrets)),
        chats: edges.map((edge, index) => exportChat(edge, edges, index)),
        isAsync: flow.isAsync,
        viewport: flow.viewport,
    });
};

const exportAgent = (agent: WaldiezNodeAgent, nodes: Node[], skipLinks: boolean) => {
    const waldiezAgent = agentMapper.exportAgent(agent, skipLinks);
    const agentNode = nodes.find(node => node.id === agent.id);
    if (agentNode) {
        Object.keys(agentNode).forEach(key => {
            if (key !== "id" && key !== "type" && key !== "data") {
                delete waldiezAgent[key];
            }
        });
    }
    return waldiezAgent;
};

const exportModel = (model: WaldiezNodeModel, nodes: Node[], hideSecrets: boolean) => {
    const waldiezModel = modelMapper.exportModel(model, hideSecrets) as any;
    const modelNode = nodes.find(node => node.id === model.id);
    if (modelNode) {
        Object.keys(modelNode).forEach(key => {
            if (!["id", "type", "data"].includes(key)) {
                delete waldiezModel[key];
            }
        });
    }
    return waldiezModel;
};

const exportSkill = (skill: WaldiezNodeSkill, nodes: Node[], hideSecrets: boolean) => {
    const waldiezSkill = skillMapper.exportSkill(skill, hideSecrets) as any;
    const skillNode = nodes.find(node => node.id === skill.id);
    if (skillNode) {
        Object.keys(skillNode).forEach(key => {
            if (!["id", "type", "data"].includes(key)) {
                delete waldiezSkill[key];
            }
        });
    }
    return waldiezSkill;
};

const exportChat = (edge: WaldiezEdge, edges: WaldiezEdge[], index: number) => {
    const chat = chatMapper.exportChat(edge, index);
    const chatEdge = edges.find(e => e.id === edge.id);
    if (chatEdge) {
        Object.keys(chatEdge).forEach(key => {
            if (!["id", "type", "source", "target", "data"].includes(key)) {
                delete chat[key];
            }
        });
    }
    return chat;
};

const getRFNodes = (flow: WaldiezFlow) => {
    const nodes: Node[] = [];
    flow.data.models.forEach(model => {
        nodes.push(modelMapper.asNode(model));
    });
    flow.data.skills.forEach(skill => {
        nodes.push(skillMapper.asNode(skill));
    });
    flow.data.agents.users.forEach(user => {
        nodes.push(agentMapper.asNode(user));
    });
    flow.data.agents.assistants.forEach(assistant => {
        nodes.push(agentMapper.asNode(assistant));
    });
    flow.data.agents.managers.forEach(manager => {
        nodes.push(agentMapper.asNode(manager));
    });
    flow.data.agents.rag_users.forEach(ragUser => {
        nodes.push(agentMapper.asNode(ragUser));
    });
    const swarmNodes = getSwarmRFNodes(flow);
    nodes.push(...swarmNodes);
    return nodes;
};

const getSwarmRFNodes = (flow: WaldiezFlow) => {
    const nodes: Node[] = [];
    if (flow.data.agents.swarm_agents.length > 0) {
        // nodes.push(getSwarmContainer(flow, nodes));
        const containerNode = getSwarmContainer(flow, nodes);
        nodes.push(containerNode);
        flow.data.agents.swarm_agents.forEach(swarmAgent => {
            const swarmNode = agentMapper.asNode(swarmAgent);
            swarmNode.parentId = containerNode.id;
            nodes.push(swarmNode);
        });
    }
    return nodes;
};

const getFlowJson = (item: any) => {
    let flowJson: Record<string, unknown> = {};
    if (typeof item === "string") {
        try {
            flowJson = JSON.parse(item);
        } catch (_) {
            return {};
        }
    } else if (typeof item === "object") {
        flowJson = item;
    }
    return flowJson;
};
