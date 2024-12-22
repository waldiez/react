import { Edge, MarkerType, Node } from "@xyflow/react";

import {
    WaldiezAgentNodeType,
    WaldiezEdgeType,
    WaldiezSourceEdge,
    WaldiezSourceEdgeData,
} from "@waldiez/models";
import { AGENT_COLORS } from "@waldiez/theme";
import { getId } from "@waldiez/utils";

export const edgeCommonStyle = (edgeType: WaldiezEdgeType, color: string) => ({
    markerEnd:
        edgeType !== "nested"
            ? {
                  type: MarkerType.ArrowClosed,
                  color,
                  width: 10,
                  height: 10,
              }
            : undefined,
    style: {
        stroke: color,
        strokeWidth: 3,
    },
});

const getNewEdgeNodes = (allNodes: Node[], source: string, target: string) => {
    const sourceNode = allNodes.find(node => node.id === source);
    if (!sourceNode) {
        throw new Error(`Source node with id ${source} not found`);
    }
    const targetNode = allNodes.find(node => node.id === target);
    if (!targetNode) {
        throw new Error(`Target node with id ${target} not found`);
    }
    return {
        sourceNode,
        targetNode,
    };
};
const getNewEdgeName = (sourceNode: Node, targetNode: Node) => {
    const sourceLabel = (sourceNode.data.label as string).slice(0, 15);
    const targetLabel = (targetNode.data.label as string).slice(0, 15);
    const edgeName = `${sourceLabel} => ${targetLabel}`;
    return edgeName;
};
const getNewChatType: (sourceNode: Node, targetNode: Node, hidden: boolean) => WaldiezEdgeType = (
    sourceNode,
    targetNode,
    hidden,
) => {
    if (hidden) {
        return "hidden" as WaldiezEdgeType;
    }
    const agentType = sourceNode.data.agentType as WaldiezAgentNodeType;
    let chatType: WaldiezEdgeType = agentType === "manager" ? "group" : "chat";
    if (targetNode.data.parentId) {
        chatType = "hidden";
    }
    return chatType;
};
export const getNewEdge = (
    source: string,
    target: string,
    hidden: boolean,
    positionGetter: (chatType: string) => number,
    nodes: Node[],
) => {
    const { sourceNode, targetNode } = getNewEdgeNodes(nodes, source, target);
    const edgeName = getNewEdgeName(sourceNode, targetNode);
    const edgeData = new WaldiezSourceEdgeData(source, target, edgeName);
    edgeData.order = -1;
    const agentType = sourceNode.data.agentType as WaldiezAgentNodeType;
    const chatType = getNewChatType(sourceNode, targetNode, hidden);
    edgeData.position = positionGetter(chatType);
    const color = AGENT_COLORS[agentType];
    const newEdge = new WaldiezSourceEdge({
        id: `we-${getId()}`,
        source,
        target,
        data: edgeData,
        rest: {},
    }).asEdge();
    return {
        ...newEdge,
        type: chatType,
        animated: false,
        selected: true,
        ...edgeCommonStyle(chatType, color),
    };
};

const getNewChatsOfType = (allEdges: Edge[], type: string) => {
    const edgesOfType = allEdges.filter(edge => edge.type === type);
    const edgesOfTypeBySource: { [source: string]: Edge[] } = {};
    edgesOfType.forEach(edge => {
        if (!edgesOfTypeBySource[edge.source]) {
            edgesOfTypeBySource[edge.source] = [];
        }
        edgesOfTypeBySource[edge.source].push(edge);
    });
    return edgesOfType.map((edge, index) => {
        return {
            ...edge,
            data: { ...edge.data, position: index + 1 },
        };
    });
};

export const getNewChatEdges = (allEdges: Edge[]) => {
    return getNewChatsOfType(allEdges, "chat");
};

export const getNewNestedEdges = (allEdges: Edge[]) => {
    return getNewChatsOfType(allEdges, "nested");
};

export const getNewGroupEdges = (allEdges: Edge[]) => {
    return getNewChatsOfType(allEdges, "group");
};

export const getNewHiddenEdges = (allEdges: Edge[]) => {
    return getNewChatsOfType(allEdges, "hidden");
};
