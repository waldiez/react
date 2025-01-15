import { Node } from "@xyflow/react";

import {
    WaldiezChatData,
    WaldiezEdge,
    WaldiezNodeAgent,
    WaldiezNodeAgentSwarm,
    WaldiezNodeAgentSwarmContainerData,
} from "@waldiez/models";

// node:
// - initialAgent: string | null;  (node)
// edge:
// - maxRounds: number;
// - afterWork: WaldiezSwarmAfterWork | null;
// - contextVariables: { [key: string]: string };
//   and set them to the edge that triggers the chat:
//      - edge.type === "swarm" and
//      - either the source is a user|rag_user (UserProxy)
//      - or the edge that has as source the initialAgent of the swarm_container
//           and target another swarm (not other type of agent [avoid edge with nested_chat])
export const getEdgeTrigger = (
    allEdges: WaldiezEdge[],
    nodes: Node[],
    initialAgent: WaldiezNodeAgentSwarm,
    containerData: WaldiezNodeAgentSwarmContainerData,
    containerId: string,
) => {
    let edgeTrigger: WaldiezEdge | null;
    try {
        edgeTrigger = findEdgeTrigger(allEdges, nodes, initialAgent, containerId);
    } catch (_) {
        return null;
    }
    return updateEdgeTrigger(edgeTrigger, containerData);
};

const findEdgeTrigger = (
    allEdges: WaldiezEdge[],
    nodes: Node[],
    initialAgent: WaldiezNodeAgentSwarm,
    containerId: string,
) => {
    // search in nodes: node.type === "agent" && node.data.agentType === "user" || "rag_user"
    const userNodes = nodes.filter(
        node =>
            node.type === "agent" &&
            "data" in node &&
            typeof node.data === "object" &&
            node.data &&
            "agentType" in node.data &&
            (node.data.agentType === "user" || node.data.agentType === "rag_user"),
    ) as WaldiezNodeAgent[];
    // if an edge has source a userNode and one of:
    // - target the initialAgent.id
    // - realTarget the initialAgent.id
    // - target the containerAgent.id
    const edgeFromUser = allEdges.find(
        edge =>
            userNodes.some(node => node.id === edge.source) &&
            (edge.target === initialAgent.id ||
                edge.data?.realTarget === initialAgent.id ||
                edge.target === containerId),
    );
    if (edgeFromUser && edgeFromUser.type === "swarm" && edgeFromUser.data) {
        edgeFromUser.data.realTarget = initialAgent.id;
        return edgeFromUser;
    }
    // if not found, return the first edge that has as source the initialAgent and target a swarmAgent (not other agent [avoid edge with nested_chat])
    const initialAgentEdges = allEdges.filter(edge => edge.source === initialAgent.id);
    if (initialAgentEdges.length === 0) {
        throw new Error("No edge found with initialAgent as source");
    }
    const edgeFromInitialAgent = initialAgentEdges.find(edge => {
        const targetAgent = nodes.find(node => node.id === edge.target);
        return targetAgent && targetAgent.type === "agent" && targetAgent.data.agentType === "swarm";
    });
    return edgeFromInitialAgent || initialAgentEdges[0];
};

const updateEdgeTrigger = (edge: WaldiezEdge, data: WaldiezNodeAgentSwarmContainerData) => {
    const edgeCopy = { ...edge };
    if (!edgeCopy.data) {
        const chatData = new WaldiezChatData();
        edgeCopy.data = { ...chatData, label: "" };
    }
    edgeCopy.data.maxRounds = data.maxRounds;
    edgeCopy.data.afterWork = data.afterWork;
    edgeCopy.data.contextVariables = data.contextVariables;
    return edgeCopy;
};
