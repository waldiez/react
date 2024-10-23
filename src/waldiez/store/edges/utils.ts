import { Edge, MarkerType, Node } from '@xyflow/react';

import { nanoid } from 'nanoid';

import { WaldiezAgentNodeType, WaldiezSourceEdge, WaldiezSourceEdgeData } from '@waldiez/models';
import { AGENT_COLORS } from '@waldiez/theme';

export const edgeCommonStyle = (color: string) => ({
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color,
    width: 10,
    height: 10
  },
  style: {
    stroke: color,
    strokeWidth: 3
  }
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
    targetNode
  };
};
const getNewEdgeName = (sourceNode: Node, targetNode: Node) => {
  const sourceLabel = (sourceNode.data.label as string).slice(0, 15);
  const targetLabel = (targetNode.data.label as string).slice(0, 15);
  const edgeName = `${sourceLabel} => ${targetLabel}`;
  return edgeName;
};
const getNewChatType = (sourceNode: Node, targetNode: Node, hidden: boolean) => {
  const agentType = sourceNode.data.agentType as WaldiezAgentNodeType;
  let chatType = agentType === 'manager' ? 'group' : 'chat';
  if (hidden || targetNode.parentId) {
    chatType = 'hidden';
  }
  return chatType;
};
export const getNewEdge = (
  source: string,
  target: string,
  hidden: boolean,
  positionGetter: (chatType: string) => number,
  nodes: Node[]
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
    id: `we-${nanoid()}`,
    source,
    target,
    data: edgeData,
    rest: {}
  }).asEdge();
  return {
    ...newEdge,
    type: chatType,
    animated: false,
    selected: true,
    ...edgeCommonStyle(color)
  };
};
export const getNewChatEdges = (allEdges: Edge[]) => {
  const chatEdges = allEdges.filter(edge => edge.type === 'chat');
  const chatEdgesBySource: { [source: string]: Edge[] } = {};
  chatEdges.forEach(edge => {
    if (!chatEdgesBySource[edge.source]) {
      chatEdgesBySource[edge.source] = [];
    }
    chatEdgesBySource[edge.source].push(edge);
  });
  return chatEdges.map((edge, index) => {
    return {
      ...edge,
      data: { ...edge.data, position: index + 1 }
    };
  });
};
export const getNewNestedEdges = (allEdges: Edge[]) => {
  const nestedEdges = allEdges.filter(edge => edge.type === 'nested');
  const nestedEdgesBySource: { [source: string]: Edge[] } = {};
  nestedEdges.forEach(edge => {
    if (!nestedEdgesBySource[edge.source]) {
      nestedEdgesBySource[edge.source] = [];
    }
    nestedEdgesBySource[edge.source].push(edge);
  });
  return nestedEdges.map(edge => {
    return {
      ...edge,
      data: {
        ...edge.data,
        position: nestedEdgesBySource[edge.source].indexOf(edge) + 1
      }
    };
  });
};
export const getNewGroupEdges = (allEdges: Edge[]) => {
  const groupEdges = allEdges.filter(edge => edge.type === 'group');
  const groupEdgesBySource: { [source: string]: Edge[] } = {};
  groupEdges.forEach(edge => {
    if (!groupEdgesBySource[edge.source]) {
      groupEdgesBySource[edge.source] = [];
    }
    groupEdgesBySource[edge.source].push(edge);
  });
  return groupEdges.map(edge => {
    return {
      ...edge,
      data: {
        ...edge.data,
        position: groupEdgesBySource[edge.source].indexOf(edge) + 1
      }
    };
  });
};
export const getNewHiddenEdges = (allEdges: Edge[]) => {
  const hiddenEdges = allEdges.filter(edge => edge.type === 'hidden');
  return hiddenEdges.map((edge, index) => {
    return {
      ...edge,
      data: { ...edge.data, position: index + 1 }
    };
  });
};
