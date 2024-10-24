import { Edge, Node } from '@xyflow/react';

import { WaldiezAgentNodeType, WaldiezSourceEdgeData } from '@waldiez/models';
import { edgeCommonStyle } from '@waldiez/store/edges/utils';
import { AGENT_COLORS } from '@waldiez/theme';

const VALID_CHAT_TYPES = ['chat', 'nested', 'group', 'hidden'];

export const getFlowChats = (edges: Edge[], nodes: Node[], data: { [key: string]: unknown }) => {
  const flowChats: Edge[] = [];
  if ('chats' in data && Array.isArray(data.chats)) {
    data.chats.forEach((element, index) => {
      if (
        'id' in element &&
        'data' in element &&
        'source' in element.data &&
        'target' in element.data &&
        typeof element.id === 'string' &&
        typeof element.data === 'object' &&
        element.data
      ) {
        const edge = _getFlowChat(nodes, edges, element, index);
        if (edge) {
          flowChats.push(edge);
        }
      }
    });
  }
  return flowChats;
};

const _getEdgeType = (
  element: any,
  edge: Edge,
  edgeData: WaldiezSourceEdgeData,
  sourceAgentType: WaldiezAgentNodeType
) => {
  let edgeType = 'chat';
  if ('type' in element && typeof element.type === 'string' && VALID_CHAT_TYPES.includes(element.type)) {
    edgeType = element.type;
  }
  if ('type' in edgeData) {
    delete edgeData.type;
  }
  let chatType = edge?.type ?? edgeType;
  if (sourceAgentType === 'manager') {
    chatType = 'group';
  }
  if (!VALID_CHAT_TYPES.includes(chatType)) {
    return 'chat';
  }
  return chatType;
};

const _updateFlowEdge = (element: any, index: number, sourceNode: Node, edge: Edge) => {
  const edgeData = WaldiezSourceEdgeData.fromJSON(element.data, index);
  const sourceAgentType = sourceNode.data.agentType as WaldiezAgentNodeType;
  const chatType = _getEdgeType(element, edge, edgeData, sourceAgentType);
  const color = AGENT_COLORS[sourceAgentType];
  edge.type = chatType;
  edge.animated = chatType === 'nested';
  const { markerEnd, style } = edgeCommonStyle(color);
  edge.style = style;
  edge.markerEnd = markerEnd;
  edge.data = {
    ...edgeData,
    label: edgeData.name,
    order: chatType === 'nested' ? -1 : edgeData.order
  };
  return { ...edge };
};

const _getFlowChat = (nodes: Node[], edges: Edge[], element: any, index: number) => {
  const edge = edges.find(e => e.id === element.id);
  if (!edge) {
    return undefined;
  }
  const sourceNode = nodes.find(n => n.id === element.data.source);
  if (!sourceNode || !(sourceNode.type === 'agent')) {
    return undefined;
  }
  const targetNode = nodes.find(n => n.id === element.data.target);
  if (!targetNode || !(targetNode.type === 'agent')) {
    return undefined;
  }
  return _updateFlowEdge(element, index, sourceNode, edge);
};
