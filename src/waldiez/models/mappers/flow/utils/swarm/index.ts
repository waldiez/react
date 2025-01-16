import {
    WaldiezAgentSwarm,
    WaldiezEdge,
    WaldiezNodeAgent,
    WaldiezNodeAgentSwarm,
    WaldiezNodeAgentSwarmContainer,
    WaldiezNodeAgentSwarmContainerData,
    agentMapper,
} from "@waldiez/models";
import { getEdgeTrigger } from "@waldiez/models/mappers/flow/utils/swarm/edges";
import { getAgentConnections, getSwarmAgentHandoffs } from "@waldiez/store/utils";

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
    if (!swarmContainerNode.data.label) {
        swarmContainerNode.data.label = "Swarm Container";
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
    const edgeTrigger = getEdgeTrigger(
        edges,
        agentNodes,
        initialAgent,
        swarmContainerData,
        swarmContainerNode.id,
    );
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
        const agentConnections = getAgentConnections(agentNodes, updatedEdges, node.id);
        const handoffs = getSwarmAgentHandoffs(
            node,
            agentConnections,
            agentNodes,
            swarmAgentNodes,
            updatedEdges,
        );
        const updatedData = { ...node.data, handoffs };
        const updatedNode = { ...node, data: updatedData };
        const exported = agentMapper.exportAgent(updatedNode, skipLinks); // WaldiezNodeAgent to WaldiezAgent.
        swarmAgents.push(exported);
    });
    return { swarmAgents, edges: updatedEdges };
};

const getSwarmInitialAgent = (data: WaldiezNodeAgentSwarmContainerData, agents: WaldiezNodeAgentSwarm[]) => {
    let selectedAgent: WaldiezNodeAgentSwarm;
    if (!data.initialAgent) {
        const fromAgents = agents.filter(agent => agent.data.isInitial);
        if (fromAgents.length > 0) {
            selectedAgent = fromAgents[0];
        } else {
            selectedAgent = agents[0];
        }
    } else {
        selectedAgent = agents.find(agent => agent.id === data.initialAgent) ?? agents[0];
    }
    if (!selectedAgent) {
        selectedAgent = agents[0];
    }
    agents.forEach(agent => {
        agent.data.isInitial = agent.id === selectedAgent.id;
    });
    return selectedAgent;
};
