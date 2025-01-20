import { Edge, Node } from "@xyflow/react";

import {
    WaldiezAgentSwarmContainerData,
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
import { isAfterWork } from "@waldiez/store/utils";
import {
    WaldiezAgentSwarm,
    WaldiezChat,
    WaldiezFlowProps,
    WaldiezNodeAgentSwarmContainer,
    WaldiezSwarmAfterWork,
} from "@waldiez/types";

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
        const edges: Edge[] = getRFEdges(flow);
        const nodes: Node[] = getRFNodes(flow, edges);
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
    waldiezAgent.agentType = agent.data.agentType;
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

const getRFNodes = (flow: WaldiezFlow, edges: Edge[]) => {
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
    const swarmNodes = getSwarmRFNodes(flow, edges);
    nodes.push(...swarmNodes);
    return nodes;
};

const getRFEdges = (flow: WaldiezFlow) => {
    const flowEdges: Edge[] = [];
    flow.data.chats.forEach(chat => {
        const edge = chatMapper.asEdge(chat);
        const { sourceHandle, targetHandle } = getEdgeHandles(flow, chat);
        edge.sourceHandle = sourceHandle;
        edge.targetHandle = targetHandle;
        if (edge.type === "swarm" && edge.target.startsWith("swarm-container")) {
            handleEdgeToSwarmContainer(edge, flow);
        }
        flowEdges.push(edge);
    });
    return flowEdges;
};

// eslint-disable-next-line max-statements
const getEdgeHandles = (flow: WaldiezFlow, chat: WaldiezChat) => {
    // if in chat.rest there is a "sourceHandle" and "targetHandle" use them
    // else, check flow.edges (compare the id) and use the sourceHandle and targetHandle from there
    // if not found, use the default ones
    let sourceHandle; // = `agent-handle-right-source-${chat.source}`;
    let targetHandle; // = `agent-handle-left-target-${chat.target}`;
    if (chat.rest.sourceHandle && typeof chat.rest.sourceHandle === "string") {
        sourceHandle = chat.rest.sourceHandle;
    }
    if (chat.rest.targetHandle && typeof chat.rest.targetHandle === "string") {
        targetHandle = chat.rest.targetHandle;
    }
    if (!sourceHandle || !targetHandle) {
        const edge = flow.data.edges.find(edge => edge.id === chat.id);
        if (edge) {
            sourceHandle = edge.sourceHandle || sourceHandle;
            targetHandle = edge.targetHandle || targetHandle;
        }
    }
    if (!sourceHandle) {
        sourceHandle = `agent-handle-right-source-${chat.source}`;
    }
    if (!targetHandle) {
        targetHandle = `agent-handle-left-target-${chat.target}`;
    }
    return { sourceHandle, targetHandle };
};

const handleEdgeToSwarmContainer = (edge: Edge, flow: WaldiezFlow) => {
    const initialAgent = getSwarmInitialAgent(flow);
    edge.target = initialAgent.id;
    edge.sourceHandle = `agent-handle-right-source-${edge.source}`;
    edge.targetHandle = `agent-handle-left-target-${initialAgent.id}`;
    if (edge.data) {
        edge.data.realTarget = initialAgent.id;
    }
};

const getSwarmRFNodes = (flow: WaldiezFlow, edges: Edge[]) => {
    const nodes: Node[] = [];
    if (flow.data.agents.swarm_agents.length > 0) {
        const containerNode = getSwarmContainerNode(flow, edges);
        nodes.push(containerNode);
        flow.data.agents.swarm_agents.forEach(swarmAgent => {
            const swarmNode = agentMapper.asNode(swarmAgent);
            swarmNode.parentId = containerNode.id;
            nodes.push(swarmNode);
        });
    }
    return nodes;
};

const getSwarmContainerNode = (flow: WaldiezFlow, edges: Edge[]) => {
    const parentId = getSwarmContainerId(flow);
    if (parentId) {
        const agentNode = flow.data.nodes.find(node => node.id === parentId);
        if (agentNode) {
            const agentData = new WaldiezAgentSwarmContainerData() as any;
            agentNode.data = agentData;
            return updateSwarmContainer(flow, agentNode as WaldiezNodeAgentSwarmContainer, edges);
        }
    }
    return getSwarmContainer(flow, []);
};

const updateSwarmContainer = (
    flow: WaldiezFlow,
    agentNode: WaldiezNodeAgentSwarmContainer,
    edges: Edge[],
) => {
    const initialAgent = getSwarmInitialAgent(flow);
    const containerId = getSwarmContainerId(flow);
    agentNode.data.initialAgent = initialAgent.id;
    agentNode.id = `swarm-container-${flow.id}`;
    agentNode.data.agentType = "swarm_container";
    // missing:
    // - maxRounds: number;
    // - afterWork: WaldiezSwarmAfterWork | null;
    // - contextVariables: { [key: string]: string };
    updateSwarmContainerFromEdgeTrigger(edges, agentNode, initialAgent, containerId);
    // let's try to get these from the edge trigger.
    // find the edge that has as target the swarm_container
    // if not found (no userAgent), find the edge that has as source the initialAgent of the swarm_container
    return agentNode;
};

const updateSwarmContainerFromEdgeTrigger = (
    edges: Edge[],
    agentNode: WaldiezNodeAgentSwarmContainer,
    initialAgent: WaldiezAgentSwarm,
    containerId: string,
) => {
    const edgeTrigger = getEdgeTrigger(edges, agentNode, initialAgent, containerId);
    if (edgeTrigger) {
        updateSwarmContainerFromEdge(edgeTrigger, agentNode);
    }
};

const getEdgeTrigger = (
    edges: Edge[],
    agentNode: WaldiezNodeAgentSwarmContainer,
    initialAgent: WaldiezAgentSwarm,
    containerId: string,
) => {
    const edgeTrigger = edges.find(
        edge =>
            edge.target === initialAgent.id ||
            edge.data?.realTarget === initialAgent.id ||
            edge.target === containerId,
    );
    if (edgeTrigger && edgeTrigger.type === "swarm" && edgeTrigger.data) {
        edgeTrigger.data.realTarget = initialAgent.id;
        updateSwarmContainerFromEdge(edgeTrigger, agentNode);
    }
    return edgeTrigger;
};
const updateSwarmContainerFromEdge = (edgeTrigger: Edge, agentNode: WaldiezNodeAgentSwarmContainer) => {
    if (typeof edgeTrigger.data?.maxRounds !== "number") {
        agentNode.data.maxRounds = 20;
    } else {
        agentNode.data.maxRounds = edgeTrigger.data.maxRounds;
    }
    if (!edgeTrigger.data?.afterWork) {
        agentNode.data.afterWork = null;
    } else if (isAfterWork(edgeTrigger.data.afterWork)) {
        agentNode.data.afterWork = edgeTrigger.data.afterWork as WaldiezSwarmAfterWork;
    }
    agentNode.data.contextVariables = {};
    if (edgeTrigger.data?.contextVariables && typeof edgeTrigger.data.contextVariables === "object") {
        agentNode.data.contextVariables = edgeTrigger.data.contextVariables as Record<string, string>;
    }
};

const getSwarmContainerId = (flow: WaldiezFlow) => {
    let parentId = `swarm-container-${flow.id}`;
    for (const agent of flow.data.agents.swarm_agents) {
        if (agent.data.parentId && typeof agent.data.parentId === "string") {
            parentId = agent.data.parentId;
            break;
        } else if (agent.rest?.parentId && typeof agent.rest.parentId === "string") {
            parentId = agent.rest.parentId as string;
            break;
        }
    }
    return parentId;
};

const getSwarmInitialAgent = (flow: WaldiezFlow) => {
    const initialAgent = flow.data.agents.swarm_agents.find(agent => agent.data.isInitial);
    return initialAgent || flow.data.agents.swarm_agents[0];
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
