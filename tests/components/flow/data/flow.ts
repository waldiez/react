import { createdAt, description, flowId, name, requirements, tags, updatedAt } from './common';
import { edges } from './edges';
import { nodes } from './nodes';

import { Edge, Node } from '@xyflow/react';

import {
  WaldiezNodeRagUserData,
  WaldiezSourceAssistant,
  WaldiezSourceEdge,
  WaldiezSourceGroupManager,
  WaldiezSourceModel,
  WaldiezSourceRagUser,
  WaldiezSourceSkill,
  WaldiezSourceUserProxy
} from '@waldiez/models';

const agents = {
  users: [] as WaldiezSourceUserProxy[],
  assistants: [] as WaldiezSourceAssistant[],
  managers: [] as WaldiezSourceGroupManager[],
  rag_users: [] as WaldiezSourceRagUser[]
};
const models = [] as WaldiezSourceModel[];
const skills = [] as WaldiezSourceSkill[];

/* eslint-disable max-statements */
const nodesWithoutData = nodes.map((node: Node) => {
  const nodeType = node.type;
  if (nodeType === 'agent') {
    const agentData = node.data as any;
    const agentType = agentData.agentType;
    const jsonData = {
      id: node.id,
      type: nodeType,
      position: agentData.position,
      data: { ...agentData },
      createdAt,
      updatedAt
    };
    if (agentType === 'user') {
      agents.users.push(WaldiezSourceUserProxy.fromJSON(jsonData, agentType, node.data.label as string));
    } else if (agentType === 'assistant') {
      agents.assistants.push(WaldiezSourceAssistant.fromJSON(jsonData, agentType, node.data.label as string));
    } else if (agentType === 'manager') {
      agents.managers.push(WaldiezSourceGroupManager.fromJSON(jsonData));
    } else if (agentType === 'rag_user') {
      const dataWithRetrieveConfig = {
        ...jsonData,
        data: {
          ...jsonData.data,
          retrieveConfig: (jsonData.data as WaldiezNodeRagUserData).retrieveConfig
        }
      };
      agents.rag_users.push(WaldiezSourceRagUser.fromJSON(dataWithRetrieveConfig));
    }
    return { ...node };
  } else if (nodeType === 'model') {
    const modelData = node.data as any;
    const jsonData = {
      id: node.id,
      type: nodeType,
      position: modelData.position,
      data: { ...modelData },
      createdAt,
      updatedAt
    };
    models.push(WaldiezSourceModel.fromJSON(jsonData));
    return { ...node };
  } else if (nodeType === 'skill') {
    const skillData = node.data as any;
    const jsonData = {
      id: node.id,
      type: nodeType,
      position: skillData.position,
      data: { ...skillData },
      createdAt,
      updatedAt
    };
    skills.push(WaldiezSourceSkill.fromJSON(jsonData));
    return { ...node };
  }
  const newNode = { ...node, data: {} };
  return { ...newNode };
});
const chats = [] as WaldiezSourceEdge[];
const edgesWithoutData = edges.map((edge: Edge) => {
  const chatData = edge.data as any;
  const jsonData = {
    id: edge.id,
    source: edge.source,
    target: edge.target,
    data: chatData,
    position: chatData.position,
    hidden: chatData.hidden
  };
  chats.push(WaldiezSourceEdge.fromJSON(jsonData));
  const newEdge = { ...edge, data: {} };
  return { ...newEdge };
});

export const flow = {
  id: flowId,
  type: 'flow',
  name,
  description,
  tags,
  requirements,
  storageId: 'storage-id',
  data: {
    nodes: nodesWithoutData,
    edges: edgesWithoutData,
    viewport: {
      x: 0,
      y: 0,
      zoom: 1
    },
    chats,
    models,
    skills,
    agents
  },
  createdAt,
  updatedAt
};
