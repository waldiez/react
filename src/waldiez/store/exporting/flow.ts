import { Edge, Node, Viewport } from '@xyflow/react';

import { WaldiezAgentNode, WaldiezModelNode, WaldiezSkillNode } from '@waldiez/models/types';
import { exportAgent } from '@waldiez/store/exporting/agent';
import { exportChat } from '@waldiez/store/exporting/chat';
import { exportModel } from '@waldiez/store/exporting/model';
import { exportSkill } from '@waldiez/store/exporting/skill';

export const exportFlow = (
  flow: {
    nodes: Node[];
    edges: Edge[];
    viewport: Viewport;
  },
  meta: {
    name: string;
    description: string;
    tags: string[];
    requirements: string[];
    storageId: string;
    createdAt: string;
    updatedAt: string;
  },
  hideSecrets: boolean
) => {
  const { name, description, tags, requirements, storageId, createdAt, updatedAt } = meta;
  const { nodes, edges, viewport } = flow;
  const rfInstanceObject = { nodes, edges, viewport };
  const agentNodes = rfInstanceObject.nodes.filter(node => node.type === 'agent');
  const agents = exportAgents(agentNodes as WaldiezAgentNode[]);
  const models = exportModels(rfInstanceObject.nodes, hideSecrets);
  const skills = exportSkills(rfInstanceObject.nodes, hideSecrets);
  const chats = exportChats(rfInstanceObject.edges);
  rfInstanceObject.nodes = rfInstanceObject.nodes.map((element: any) => {
    const elementData = { ...element };
    delete elementData.data;
    return { ...elementData };
  });
  rfInstanceObject.edges = rfInstanceObject.edges.map((element: any) => {
    const elementData = { ...element };
    delete elementData.data;
    return { ...elementData };
  });
  return {
    type: 'flow',
    name,
    description,
    tags,
    requirements,
    storageId,
    createdAt,
    updatedAt,
    data: {
      ...rfInstanceObject,
      agents,
      models,
      skills,
      chats
    }
  };
};

const exportAgents = (agentNodes: WaldiezAgentNode[]) => {
  const userNodes = agentNodes.filter(node => node.data.agentType === 'user');
  const assistantNodes = agentNodes.filter(node => node.data.agentType === 'assistant');
  const managerNodes = agentNodes.filter(node => node.data.agentType === 'manager');
  const ragUserNodes = agentNodes.filter(node => node.data.agentType === 'rag_user');
  const users = userNodes.map(agent => exportAgent(agent));
  const assistants = assistantNodes.map(agent => exportAgent(agent));
  const managers = managerNodes.map(agent => exportAgent(agent));
  const rag_users = ragUserNodes.map(agent => exportAgent(agent));
  return {
    users,
    assistants,
    managers,
    rag_users
  };
};

const exportModels = (nodes: Node[], hideSecrets: boolean) => {
  const modelNodes = nodes.filter(node => node.type === 'model');
  return modelNodes.map(model => exportModel(model as WaldiezModelNode, hideSecrets));
};

const exportSkills = (nodes: Node[], hideSecrets: boolean) => {
  const skillNodes = nodes.filter(node => node.type === 'skill');
  return skillNodes.map(skill => exportSkill(skill as WaldiezSkillNode, hideSecrets));
};

const exportChats = (edges: Edge[]) => {
  const validTypes = ['chat', 'nested', 'group', 'hidden'];
  return edges
    .filter((element: Edge) => element.type && validTypes.includes(element.type))
    .map((element: Edge) => {
      return exportChat(element);
    });
};
