import { Connection, Edge, EdgeChange, applyEdgeChanges } from "@xyflow/react";

import {
    WaldiezAgentNode,
    WaldiezAgentNodeType,
    WaldiezEdge,
    WaldiezNodeUserProxyOrAssistantData,
} from "@waldiez/models";
import {
    edgeCommonStyle,
    getNewChatEdges,
    getNewEdge,
    getNewGroupEdges,
    getNewHiddenEdges,
    getNewNestedEdges,
} from "@waldiez/store/edges/utils";
import { AGENT_COLORS } from "@waldiez/theme";
import { typeOfGet, typeOfSet } from "@waldiez/types";
import { getFlowRoot } from "@waldiez/utils";

export class EdgesStore {
    static onEdgesChange: (changes: EdgeChange[], get: typeOfGet, set: typeOfSet) => void = (
        changes,
        get,
        set,
    ) => {
        const edges = applyEdgeChanges(changes, get().edges);
        set({
            edges,
            updatedAt: new Date().toISOString(),
        });
    };
    static onEdgeDoubleClick: (flowId: string, edge: Edge) => void = (flowId, edge) => {
        // first, make sure there is no `<dialog .. open>` in the flow
        const openDialogs = document.querySelectorAll("dialog[open]");
        if (openDialogs.length > 0) {
            return;
        }
        const flowRoot = getFlowRoot(flowId);
        if (flowRoot) {
            const srcModalBtn = flowRoot.querySelector(
                `#open-edge-modal-node-${edge.source}`,
            ) as HTMLButtonElement;
            if (srcModalBtn) {
                srcModalBtn.setAttribute("data-edge-id", edge.id);
                srcModalBtn.click();
            } else {
                const dstModalBtn = flowRoot.querySelector(
                    `#open-edge-modal-node-${edge.target}`,
                ) as HTMLButtonElement;
                if (dstModalBtn) {
                    dstModalBtn.setAttribute("data-edge-id", edge.id);
                    dstModalBtn.click();
                }
            }
        }
    };
    static addEdge: (
        source: string,
        target: string,
        hidden: boolean,
        get: typeOfGet,
        set: typeOfSet,
    ) => Edge = (source, target, hidden, get, set) => {
        const nodes = get().nodes as WaldiezAgentNode[];
        const edgesCounter = (chatType: string) => get().edges.filter(edge => edge.type === chatType).length;
        const newEdge = getNewEdge(source, target, hidden, edgesCounter, nodes);
        set({
            edges: [
                ...get().edges,
                {
                    ...newEdge,
                },
            ],
            updatedAt: new Date().toISOString(),
        });
        EdgesStore.resetEdgePositions(get, set);
        const newStoredEdge = get().edges.find(edge => edge.id === newEdge.id);
        return newStoredEdge ?? newEdge;
    };
    static getEdgeById: (edgeId: string, get: typeOfGet) => Edge | null = (edgeId, get) => {
        const edge = get().edges.find(edge => edge.id === edgeId);
        if (!edge) {
            return null;
        }
        return edge;
    };
    static getEdgeSourceAgent: (edge: Edge, get: typeOfGet) => WaldiezAgentNode | null = (edge, get) => {
        const sourceNode = get().nodes.find(node => node.id === edge.source);
        if (!sourceNode) {
            return null;
        }
        return sourceNode as WaldiezAgentNode;
    };
    static deleteEdge: (edgeId: string, get: typeOfGet, set: typeOfSet) => void = (edgeId, get, set) => {
        const nodesWithNestedChats = get().nodes.filter(
            node => node.type === "agent" && node.data.agentType !== "manager",
        );
        const newNodesWithNestedChats = nodesWithNestedChats.map(agentNode => {
            const nestedChats = (agentNode.data as WaldiezNodeUserProxyOrAssistantData).nestedChats;
            return {
                ...agentNode,
                data: {
                    ...agentNode.data,
                    nestedChats: nestedChats.map(nestedChat => {
                        return {
                            ...nestedChat,
                            messages: nestedChat.messages.filter(message => message.id !== edgeId),
                            // also check if the edge sources (agent's triggeredBy) are still valid
                            triggeredBy: nestedChat.triggeredBy,
                        };
                    }),
                },
            };
        });
        const nodesWithoutNestedChats = get().nodes.filter(
            node => node.type !== "agent" || node.data.agentType === "manager",
        );
        const nodes = [...newNodesWithNestedChats, ...nodesWithoutNestedChats];
        const newEdges = get().edges.filter(edge => edge.id !== edgeId);
        set({
            nodes,
            edges: newEdges.map((edge, index) => {
                return {
                    ...edge,
                    data: { ...edge.data, position: index + 1 },
                };
            }),
            updatedAt: new Date().toISOString(),
        });
        EdgesStore.resetEdgePositions(get, set);
        EdgesStore.resetEdgeOrders(get, set);
    };
    static updateEdgeData: (edgeId: string, data: Edge["data"], get: typeOfGet, set: typeOfSet) => void = (
        edgeId,
        data,
        get,
        set,
    ) => {
        set({
            edges: get().edges.map(edge => {
                if (edge.id === edgeId) {
                    return { ...edge, data };
                }
                return edge;
            }),
            updatedAt: new Date().toISOString(),
        });
        EdgesStore.resetEdgePositions(get, set);
        EdgesStore.resetEdgeOrders(get, set);
    };
    static resetEdgePositions: (get: typeOfGet, set: typeOfSet) => void = (get, set) => {
        const edges = get().edges as WaldiezEdge[];
        const newEdges = edges.map(edge => {
            return {
                ...edge,
                data: { ...edge.data, position: 1 },
            };
        });
        const newChatEdges = getNewChatEdges(newEdges);
        const newNestedEdges = getNewNestedEdges(newEdges);
        const newGroupEdges = getNewGroupEdges(newEdges);
        const newHiddenEdges = getNewHiddenEdges(newEdges);
        // ensure no dupe ids
        const allEdges = [...newChatEdges, ...newNestedEdges, ...newGroupEdges, ...newHiddenEdges];
        const edgeIds = allEdges.map(edge => edge.id);
        const uniqueEdgeIds = Array.from(new Set(edgeIds));
        const uniqueEdges = allEdges.filter(edge => uniqueEdgeIds.includes(edge.id));
        set({
            edges: uniqueEdges,
            updatedAt: new Date().toISOString(),
        });
        EdgesStore.updateNestedEdges(get, set);
    };
    static resetEdgeOrders: (get: typeOfGet, set: typeOfSet) => void = (get, set) => {
        // if the edge.data.order is < 0, leave it as is
        // else start counting from 1 (not 0)
        const edges = get().edges as WaldiezEdge[];
        const newEdges = edges.map((edge, index) => {
            let edgeOrder = edge.data?.order;
            if (edgeOrder === undefined) {
                edgeOrder = -1;
            }
            return {
                ...edge,
                data: { ...edge.data, order: edgeOrder < 0 ? edgeOrder : index + 1 },
            };
        });
        set({
            edges: newEdges,
            updatedAt: new Date().toISOString(),
        });
    };
    static updateNestedEdges: (get: typeOfGet, set: typeOfSet) => void = (get, set) => {
        const agentNodes = get().nodes.filter(
            node => node.type === "agent" && node.data.agentType !== "manager",
        );
        const nestedEdges: Edge[] = [];
        const nestedEdgeIds: string[] = [];
        agentNodes.forEach(agentNode => {
            const nestedChats = (agentNode.data as WaldiezNodeUserProxyOrAssistantData).nestedChats ?? [];
            nestedChats.forEach(nestedChat => {
                const messages = nestedChat.messages;
                let edgeIndex = 0;
                messages.forEach(message => {
                    const edge = get().edges.find(edge => edge.id === message.id);
                    // only if nested chat
                    // and if not already added (in case a message is registered both as a reply and not)
                    if (edge && edge.type === "nested" && !nestedEdgeIds.includes(edge.id)) {
                        nestedEdges.push({
                            ...edge,
                            data: { ...edge.data, position: edgeIndex + 1 },
                        });
                        nestedEdgeIds.push(edge.id);
                        edgeIndex++;
                    }
                });
            });
        });
        const otherEdges = get().edges.filter(edge => !nestedEdgeIds.includes(edge.id));
        set({
            edges: [...otherEdges, ...nestedEdges],
            updatedAt: new Date().toISOString(),
        });
    };
    static updateEdgeType: (
        edgeId: string,
        edgeType: "chat" | "nested" | "group" | "hidden",
        get: typeOfGet,
        set: typeOfSet,
    ) => void = (edgeId, edgeType, get, set) => {
        set({
            edges: get().edges.map(edge => {
                if (edge.id === edgeId) {
                    const sourceNode = get().nodes.find(node => node.id === edge.source);
                    if (!sourceNode) {
                        throw new Error(`Source node not found for edge ${edgeId}`);
                    }
                    const color = AGENT_COLORS[sourceNode.data.agentType as WaldiezAgentNodeType];
                    return {
                        ...edge,
                        type: edgeType,
                        hidden: false,
                        order: -1,
                        animated: edgeType === "nested",
                        ...edgeCommonStyle(edgeType, color),
                    };
                }
                return edge;
            }),
            updatedAt: new Date().toISOString(),
        });
        EdgesStore.resetEdgePositions(get, set);
        EdgesStore.resetEdgeOrders(get, set);
    };
    static updateEdgePath: (
        edgeId: string,
        agentType: WaldiezAgentNodeType,
        get: typeOfGet,
        set: typeOfSet,
    ) => void = (edgeId, agentType, get, set) => {
        const currentEdge = get().edges.find(edge => edge.id === edgeId);
        if (!currentEdge) {
            return;
        }
        const edgeType = currentEdge.type as "chat" | "nested" | "group" | "hidden";
        const color = AGENT_COLORS[agentType];
        const { style, markerEnd } = edgeCommonStyle(edgeType, color);
        set({
            edges: get().edges.map(edge => {
                if (edge.id === edgeId) {
                    return { ...edge, style, markerEnd };
                }
                return { ...edge };
            }),
            updatedAt: new Date().toISOString(),
        });
    };

    static onReconnect: (oldEdge: Edge, newConnection: Connection, get: typeOfGet, set: typeOfSet) => void = (
        oldEdge,
        newConnection,
        get,
        set,
    ) => {
        const { oldSourceNode, oldTargetNode, newSourceNode, newTargetNode, color } =
            getReconnectNodesAndColor(oldEdge, newConnection, get);
        if (!oldSourceNode || !oldTargetNode || !newSourceNode || !newTargetNode) {
            console.error("Not all nodes found");
            return;
        }
        if (oldSourceNode.id === newSourceNode.id && oldTargetNode.id === newTargetNode.id) {
            return;
        }
        if (!color) {
            console.error("Color not found");
            return false;
        }
        set({
            edges: [
                ...get().edges.map(edge => {
                    if (edge.id !== oldEdge.id) {
                        return edge;
                    }
                    return {
                        ...oldEdge,
                        source: newConnection.source,
                        target: newConnection.target,
                        ...edgeCommonStyle(oldEdge.type as "chat" | "nested" | "group" | "hidden", color),
                    };
                }),
            ],
            updatedAt: new Date().toISOString(),
        });
        EdgesStore.resetEdgePositions(get, set);
        EdgesStore.resetEdgeOrders(get, set);
    };
}

const getReconnectNodesAndColor = (
    oldEdge: Edge,
    newConnection: Connection,
    get: typeOfGet,
): {
    oldSourceNode: WaldiezAgentNode | undefined;
    oldTargetNode: WaldiezAgentNode | undefined;
    newSourceNode: WaldiezAgentNode | undefined;
    newTargetNode: WaldiezAgentNode | undefined;
    color: string | undefined;
} => {
    let oldSourceNode: WaldiezAgentNode | undefined;
    let oldTargetNode: WaldiezAgentNode | undefined;
    let newSourceNode: WaldiezAgentNode | undefined;
    let newTargetNode: WaldiezAgentNode | undefined;
    let color: string | undefined;
    for (const node of get().nodes) {
        if (node.id === oldEdge.source) {
            oldSourceNode = node as WaldiezAgentNode;
        }
        if (node.id === oldEdge.target) {
            oldTargetNode = node as WaldiezAgentNode;
        }
        if (node.id === newConnection.source) {
            newSourceNode = node as WaldiezAgentNode;
            color = AGENT_COLORS[newSourceNode.data.agentType];
        }
        if (node.id === newConnection.target) {
            newTargetNode = node as WaldiezAgentNode;
        }
        if (oldSourceNode && oldTargetNode && newSourceNode && newTargetNode) {
            break;
        }
    }
    return { oldSourceNode, oldTargetNode, newSourceNode, newTargetNode, color };
};
