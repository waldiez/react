import {
    WaldiezAgentSwarm,
    WaldiezEdge,
    WaldiezNodeAgent,
    WaldiezNodeAgentSwarm,
    WaldiezNodeAgentSwarmContainer,
    WaldiezNodeAgentSwarmContainerData,
    WaldiezSwarmHandoff,
    WaldiezSwarmOnCondition,
    agentMapper,
} from "@waldiez/models";
import { getEdgeTrigger, getOnConditionFromEdge } from "@waldiez/models/mappers/flow/utils/swarm/edges";
import { getAgentConnections, getHandoffConditions, isAfterWork } from "@waldiez/store/utils";

export { getSwarmContainer } from "@waldiez/models/mappers/flow/utils/swarm/nodes";

export const exportSwarmAgents = (
    agentNodes: WaldiezNodeAgent[],
    edges: WaldiezEdge[],
    skipLinks: boolean,
) => {
    const swarmAgentNodes = agentNodes.filter(
        node =>
            "data" in node &&
            typeof node.data === "object" &&
            node.data &&
            "agentType" in node.data &&
            node.data.agentType === "swarm",
    ) as WaldiezNodeAgentSwarm[];
    if (swarmAgentNodes.length === 0) {
        return { swarmAgents: [], edges };
    }
    const swarmContainerNode = agentNodes.find(
        node =>
            node.type === "agent" &&
            "data" in node &&
            typeof node.data === "object" &&
            node.data &&
            "agentType" in node.data &&
            node.data.agentType === "swarm_container",
    ) as WaldiezNodeAgentSwarmContainer | undefined;
    if (!swarmContainerNode) {
        return { swarmAgents: [], edges };
    }
    return _exportSwarmAgents(swarmAgentNodes, swarmContainerNode, agentNodes, edges, skipLinks);
};

const _exportSwarmAgents = (
    swarmAgentNodes: WaldiezNodeAgentSwarm[],
    swarmContainerNode: WaldiezNodeAgentSwarmContainer,
    agentNodes: WaldiezNodeAgent[],
    edges: WaldiezEdge[],
    skipLinks: boolean,
) => {
    const swarmAgents: WaldiezAgentSwarm[] = [];
    let updatedEdges = [...edges];
    const swarmContainerData = swarmContainerNode.data;
    const initialAgent = getSwarmInitialAgent(swarmContainerData, swarmAgentNodes);
    const edgeTrigger = getEdgeTrigger(edges, agentNodes, initialAgent, swarmContainerData);
    if (!edgeTrigger) {
        return { swarmAgents, edges };
    }
    updatedEdges = edges.map(edge => {
        if (edge.id === edgeTrigger.id) {
            return { ...edgeTrigger };
        }
        return edge;
    });
    swarmAgentNodes.forEach(node => {
        const handoffs = setSwarmAgentHandoffs(node, agentNodes, updatedEdges, swarmAgentNodes);
        const updatedData = { ...node.data, handoffs };
        const updatedNode = { ...node, data: updatedData };
        const exported = agentMapper.exportAgent(updatedNode, skipLinks); // WaldiezNodeAgent to WaldiezAgent.
        swarmAgents.push(exported);
    });
    return { swarmAgents, edges: updatedEdges };
};

const setSwarmAgentHandoffs = (
    node: WaldiezNodeAgentSwarm,
    agentNodes: WaldiezNodeAgent[],
    updatedEdges: WaldiezEdge[],
    swarmAgentNodes: WaldiezNodeAgentSwarm[],
) => {
    const agentConnections = getAgentConnections(agentNodes, updatedEdges, node.id);
    const onConditions = getHandoffConditions(node.id, swarmAgentNodes, agentConnections, node.data);
    const agentOnConditions: WaldiezSwarmOnCondition[] = [];
    onConditions.forEach(onCondition => {
        const conditionTarget = onCondition.target as any;
        if (onCondition.targetType === "agent") {
            const nodeOnCondition = setSwarmAgentOnCondition(node, conditionTarget, agentNodes, updatedEdges);
            if (nodeOnCondition) {
                agentOnConditions.push(nodeOnCondition);
            }
        } else if (onCondition.targetType === "nested_chat") {
            const nodeOnCondition = setSwarmNestedOnCondition(
                node,
                conditionTarget,
                agentNodes,
                updatedEdges,
            );
            if (nodeOnCondition) {
                agentOnConditions.push(nodeOnCondition);
            }
        }
    });
    const agentHandoffs: WaldiezSwarmHandoff[] = [...agentOnConditions];
    const afterWork = node.data.handoffs.find(handoff => isAfterWork(handoff));
    if (afterWork) {
        agentHandoffs.push(afterWork);
    }
    return agentHandoffs;
};

const setSwarmAgentOnCondition = (
    node: WaldiezNodeAgentSwarm,
    conditionTarget: any,
    nodes: WaldiezNodeAgent[],
    edges: WaldiezEdge[],
) => {
    const targetNode = nodes.find(node => node.id === conditionTarget.id);
    if (!targetNode) {
        return null;
    }
    const edge = edges.find(edge => edge.source === node.id && edge.target === targetNode.id);
    if (!edge) {
        return null;
    }
    const { condition, available, availableCheckType } = getOnConditionFromEdge(edge, targetNode);
    const newOnCondition: WaldiezSwarmOnCondition = {
        targetType: "agent",
        target: targetNode.id,
        condition,
        available,
        availableCheckType,
    };
    return newOnCondition;
};

const setSwarmNestedOnCondition = (
    node: WaldiezNodeAgentSwarm,
    conditionTarget: any,
    nodes: WaldiezNodeAgent[],
    edges: WaldiezEdge[],
) => {
    const nodeOnCondition: WaldiezSwarmOnCondition | null = null;
    const edge = edges.find(edge => edge.id === conditionTarget.id);
    if (!edge || edge.source !== node.id) {
        return nodeOnCondition;
    }
    const targetNode = nodes.find(node => node.id === edge.target);
    if (!targetNode) {
        return nodeOnCondition;
    }
    const { condition, available, availableCheckType } = getOnConditionFromEdge(edge, targetNode);
    const isReply: boolean = conditionTarget.isReply ?? false;
    const newOnCondition: WaldiezSwarmOnCondition = {
        targetType: "nested_chat",
        target: {
            id: edge.id,
            isReply,
        },
        condition,
        available,
        availableCheckType,
    };
    return newOnCondition;
};

const getSwarmInitialAgent = (data: WaldiezNodeAgentSwarmContainerData, agents: WaldiezNodeAgentSwarm[]) => {
    if (!data.initialAgent) {
        return agents[0];
    }
    const agent = agents.find(agent => agent.id === data.initialAgent);
    return agent || agents[0];
};
