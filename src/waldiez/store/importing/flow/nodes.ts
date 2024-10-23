import { Edge, Node } from '@xyflow/react';

import {
  WaldiezAgentNodeType,
  WaldiezSourceAssistantData,
  WaldiezSourceGroupManagerData,
  WaldiezSourceModelData,
  WaldiezSourceRagUserData,
  WaldiezSourceSkillData,
  WaldiezSourceUserProxyData
} from '@waldiez/models';
import { getNodeMeta } from '@waldiez/store/importing/common';
import { getAgentNestedChats } from '@waldiez/store/importing/flow/nested';

export const getFlowNodes = (data: { [key: string]: unknown }) => {
  const nodes: Node[] = [];
  if ('nodes' in data && Array.isArray(data.nodes)) {
    data.nodes.forEach((element: any) => {
      if (
        'id' in element &&
        'type' in element &&
        typeof element.id === 'string' &&
        typeof element.type === 'string' &&
        ['agent', 'model', 'skill'].includes(element.type)
      ) {
        const node = element as Node;
        node.data = {};
        nodes.push(node);
      }
    });
  }
  return nodes;
};

export const getFlowAgents = (nodes: Node[], edges: Edge[], data: { [key: string]: unknown }) => {
  if ('agents' in data && typeof data.agents === 'object') {
    const agents = data.agents as {
      [key: string]: unknown;
    };
    getFlowExportedNodes(nodes, edges, agents, 'agent', 'user');
    getFlowExportedNodes(nodes, edges, agents, 'agent', 'assistant');
    getFlowExportedNodes(nodes, edges, agents, 'agent', 'manager');
    getFlowExportedNodes(nodes, edges, agents, 'agent', 'rag_user');
  }
};

export const getNodeData = (
  elementNodeData: any,
  nodeType: 'agent' | 'model' | 'skill',
  name: string,
  description: string,
  tags: string[],
  requirements: string[],
  createdAt: string,
  updatedAt: string,
  agentType?: WaldiezAgentNodeType
) => {
  let elementData: any;
  switch (nodeType) {
    case 'model':
      elementData = WaldiezSourceModelData.fromJSON(
        elementNodeData.data,
        name,
        description,
        tags,
        requirements,
        createdAt,
        updatedAt
      );
      break;
    case 'skill':
      elementData = WaldiezSourceSkillData.fromJSON(
        elementNodeData.data,
        name,
        description,
        tags,
        requirements,
        createdAt,
        updatedAt
      );
      break;
    case 'agent':
      elementData = _getAgentNodeData(name, elementNodeData, agentType);
      break;
  }
  return elementData;
};

export const getFlowExportedNodes = (
  flowNodes: Node[],
  flowEdges: Edge[],
  nodeData: { [key: string]: unknown },
  nodeType: 'agent' | 'model' | 'skill',
  agentType?: WaldiezAgentNodeType
) => {
  const nodeTypes = nodeType !== 'agent' ? `${nodeType}s` : `${agentType}s`;
  if (nodeTypes in nodeData && Array.isArray(nodeData[nodeTypes])) {
    nodeData[nodeTypes].forEach((element: any) => {
      updateFlowExportedNode(element, flowNodes, flowEdges, nodeType, agentType);
    });
  }
};

const updateFlowExportedNode = (
  element: any,
  flowNodes: Node[],
  flowEdges: Edge[],
  nodeType: 'agent' | 'model' | 'skill',
  agentType?: WaldiezAgentNodeType
) => {
  if (
    'id' in element &&
    'data' in element &&
    typeof element.id === 'string' &&
    typeof element.data === 'object' &&
    element.data
  ) {
    const nodeData = getNodeDataToExport(element, flowEdges, nodeType, agentType);
    if (nodeType === 'agent') {
      nodeData.agentType = agentType;
    }
    const name = nodeData.name as string;
    delete nodeData.name;
    const node = flowNodes.find(n => n.id === element.id);
    if (node) {
      node.data = { ...nodeData, label: name };
      node.type = nodeType;
    } else {
      flowNodes.push({
        id: element.id,
        type: nodeType,
        data: { ...nodeData, label: name },
        position: { x: 0, y: 0 }
      });
    }
  }
};

const getNodeDataToExport = (
  element: any,
  flowEdges: Edge[],
  nodeType: 'agent' | 'model' | 'skill',
  agentType?: WaldiezAgentNodeType
) => {
  const { name, description, tags, requirements, createdAt, updatedAt } = getNodeMeta(
    element,
    nodeType,
    agentType
  );
  const elementNodeData = {
    data: {
      ...element.data,
      description,
      tags,
      requirements,
      createdAt,
      updatedAt
    },
    name,
    label: name
  } as { [key: string]: unknown };
  if (nodeType === 'agent') {
    elementNodeData.agentType = agentType;
  }
  const elementData = getNodeData(
    elementNodeData,
    nodeType,
    name,
    description,
    tags,
    requirements,
    createdAt,
    updatedAt,
    agentType
  );
  if (nodeType === 'agent' && agentType !== 'manager') {
    // if the nestedChat.messages[].id have ids not in the edges, remove the message.
    elementData.nestedChats = getAgentNestedChats(elementData, flowEdges);
  }
  const nodeData = {
    ...elementData,
    name,
    description,
    tags,
    requirements,
    createdAt,
    updatedAt
  } as { [key: string]: unknown };
  return nodeData;
};

const _getAgentNodeData = (name: string, elementNodeData: any, agentType?: WaldiezAgentNodeType) => {
  let elementData: any;
  switch (agentType) {
    case 'user':
      elementData = WaldiezSourceUserProxyData.fromJSON(elementNodeData.data, agentType, name);
      break;
    case 'assistant':
      elementData = WaldiezSourceAssistantData.fromJSON(elementNodeData.data, agentType, name);
      break;
    case 'manager':
      elementData = WaldiezSourceGroupManagerData.fromJSON(elementNodeData.data, name);
      break;
    case 'rag_user':
      elementData = WaldiezSourceRagUserData.fromJSON(elementNodeData.data, name);
      break;
  }
  return elementData;
};
