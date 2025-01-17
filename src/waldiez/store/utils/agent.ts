import { Edge, Node } from "@xyflow/react";

import {
    WaldiezAgent,
    WaldiezAgentGroupManagerData,
    WaldiezAgentRagUserData,
    WaldiezAgentSwarmContainerData,
    WaldiezAgentSwarmData,
    WaldiezEdge,
    WaldiezNodeAgent,
    WaldiezNodeAgentType,
    agentMapper,
} from "@waldiez/models";
import { typeOfGet, typeOfSet } from "@waldiez/types";

export const getAgentNode = (
    agentType: WaldiezNodeAgentType,
    position: { x: number; y: number } | undefined,
    parentId: string | undefined,
) => {
    const newAgent = WaldiezAgent.create(agentType);
    const agentNode = agentMapper.asNode(newAgent, position);
    if (agentType !== "swarm") {
        agentNode.data.parentId = parentId;
        if (agentType === "rag_user") {
            const agentExtras = new WaldiezAgentRagUserData();
            agentNode.data = { ...agentNode.data, ...agentExtras };
        } else if (agentType === "manager") {
            const agentExtras = new WaldiezAgentGroupManagerData();
            agentNode.data = { ...agentNode.data, ...agentExtras };
        } else if (agentType === "swarm_container") {
            const agentExtras = new WaldiezAgentSwarmContainerData();
            agentNode.data = { ...agentNode.data, ...agentExtras };
        }
    } else {
        agentNode.parentId = parentId;
        agentNode.extent = "parent";
        const agentExtras = new WaldiezAgentSwarmData();
        agentNode.data = { ...agentNode.data, ...agentExtras };
    }
    return agentNode as WaldiezNodeAgent;
};

export const getAgentConnections = (
    nodes: Node[],
    edges: Edge[],
    nodeId: string,
    options?: {
        sourcesOnly?: boolean;
        targetsOnly?: boolean;
        skipManagers?: boolean;
    },
) => {
    if (!options) {
        options = {
            sourcesOnly: false,
            targetsOnly: false,
            skipManagers: false,
        };
    }
    const sourceConnectedNodes = [];
    const sourceConnectionEdges = [];
    const targetConnectedNodes = [];
    const targetConnectionEdges = [];
    for (const edge of edges) {
        const { sourceNode, targetNode } = getAgentEdgeConnections(nodeId, edge, nodes, options);
        if (sourceNode) {
            sourceConnectedNodes.push(sourceNode);
            sourceConnectionEdges.push(edge);
        }
        if (targetNode) {
            targetConnectedNodes.push(targetNode);
            targetConnectionEdges.push(edge);
        }
    }
    return {
        source: {
            nodes: sourceConnectedNodes as WaldiezNodeAgent[],
            edges: sourceConnectionEdges as WaldiezEdge[],
        },
        target: {
            nodes: targetConnectedNodes as WaldiezNodeAgent[],
            edges: targetConnectionEdges as WaldiezEdge[],
        },
    };
};
const getAgentEdgeConnections = (
    nodeId: string,
    edge: Edge,
    nodes: Node[],
    options: {
        sourcesOnly?: boolean;
        targetsOnly?: boolean;
        skipManagers?: boolean;
    },
) => {
    let targetNode;
    let sourceNode;
    if (edge.target === nodeId && !options.targetsOnly) {
        sourceNode = nodes.find(node => node.id === edge.source);
    }
    if (edge.source === nodeId && !options.sourcesOnly) {
        targetNode = nodes.find(node => node.id === edge.target);
    }
    return { sourceNode, targetNode };
};

export const setSwarmInitialAgent = (agentId: string, get: typeOfGet, set: typeOfSet) => {
    set({
        nodes: get().nodes.map(node => {
            if (node.data.agentType === "swarm") {
                if (node.id === agentId) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            isInitial: true,
                        },
                    };
                }
                return {
                    ...node,
                    data: {
                        ...node.data,
                        isInitial: false,
                    },
                };
            }
            if (node.data.agentType === "swarm_container") {
                return {
                    ...node,
                    data: {
                        ...node.data,
                        initialAgent: agentId,
                    },
                };
            }
            return node;
        }),
        updatedAt: new Date().toISOString(),
    });
};
