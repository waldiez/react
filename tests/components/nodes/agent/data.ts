import { Node } from '@xyflow/react';

import {
  WaldiezAgentNodeType,
  WaldiezSourceAssistant,
  WaldiezSourceAssistantData,
  WaldiezSourceEdge,
  WaldiezSourceEdgeData,
  WaldiezSourceGroupManager,
  WaldiezSourceGroupManagerData,
  WaldiezSourceModel,
  WaldiezSourceModelData,
  WaldiezSourceRagUser,
  WaldiezSourceRagUserData,
  WaldiezSourceSkill,
  WaldiezSourceSkillData,
  WaldiezSourceUserProxy,
  WaldiezSourceUserProxyData
} from '@waldiez/models';

export const agentId = 'test-agent';
export const flowId = 'test-flow';
export const createdAt = new Date().toISOString();
export const updatedAt = new Date().toISOString();
export const getAgentData = (agentType: WaldiezAgentNodeType) => {
  if (agentType === 'user') {
    return new WaldiezSourceUserProxyData();
  }
  if (agentType === 'assistant') {
    return new WaldiezSourceAssistantData();
  }
  if (agentType === 'manager') {
    return new WaldiezSourceGroupManagerData();
  }
  return new WaldiezSourceRagUserData();
};

export const getAgentNode = (
  agentType: WaldiezAgentNodeType,
  nodeOverrides: Partial<Node> = {},
  dataOverrides: { [key: string]: any } = {}
) => {
  const agentData = getAgentData(agentType);
  let node: Node;
  switch (agentType) {
    case 'user':
      node = new WaldiezSourceUserProxy(agentId, {
        ...agentData,
        agentType: agentType as any,
        ...dataOverrides
      } as WaldiezSourceUserProxyData).asNode({ x: 0, y: 0 });
      break;
    case 'assistant':
      node = new WaldiezSourceAssistant(agentId, {
        ...agentData,
        agentType: agentType as any,
        ...dataOverrides
      } as WaldiezSourceAssistantData).asNode({ x: 0, y: 0 });
      break;
    case 'manager':
      node = new WaldiezSourceAssistant(agentId, {
        ...agentData,
        agentType: agentType as any,
        ...dataOverrides
      } as WaldiezSourceAssistantData).asNode({ x: 0, y: 0 });
      break;
    case 'rag_user':
      node = new WaldiezSourceRagUser(agentId, {
        ...agentData,
        agentType: agentType as any,
        ...dataOverrides
      } as WaldiezSourceRagUserData).asNode({ x: 0, y: 0 });
  }
  return { ...node, ...nodeOverrides } as Node;
};

export const getSkillNodes = () => {
  const skillData = new WaldiezSourceSkillData();
  skillData.name = 'test skill1';
  const skill1 = new WaldiezSourceSkill('test-skill1', skillData).asNode({
    x: 0,
    y: 0
  });
  skillData.name = 'test skill2';
  const skill2 = new WaldiezSourceSkill('test-skill2', skillData).asNode({
    x: 0,
    y: 0
  });
  return [{ ...skill1 }, { ...skill2 }];
};

export const getModelNodes = () => {
  const modelData = new WaldiezSourceModelData();
  modelData.name = 'test model1';
  const model1 = new WaldiezSourceModel('test-model1', modelData).asNode({
    x: 0,
    y: 0
  });
  modelData.name = 'test model2';
  const model2 = new WaldiezSourceModel('test-model2', modelData).asNode({
    x: 0,
    y: 0
  });
  return [{ ...model1 }, { ...model2 }];
};
const getEdge = (agent: Node, index: number, isGroup: boolean) => {
  const source = isGroup ? agentId : index % 2 === 0 ? agentId : agent.id;
  const target = isGroup ? agent.id : index % 2 === 0 ? agent.id : agentId;
  const type = isGroup ? 'hidden' : index < 2 ? 'nested' : 'chat';
  const edgeData = new WaldiezSourceEdgeData(source, target, `${source} to ${target}`);
  const edge = new WaldiezSourceEdge({
    id: `test-edge${index}`,
    source,
    target,
    data: edgeData,
    rest: { type, position: { x: 10, y: 10 } }
  }).asEdge();
  edge.type = type;
  if (!isGroup && index < 2) {
    edge.data!.nestedChat = {
      message: {
        type: 'string',
        content: 'test message',
        context: {
          key1: 'value1'
        },
        use_carryover: false
      },
      reply: {
        type: 'none',
        content: '',
        context: {},
        use_carryover: true
      }
    };
  }
  return edge;
};
export const getConnectedAgents = (areGroupMembers: boolean = false) => {
  const nodes: Node[] = [];
  const edges = [];
  for (let i = 0; i < 5; i++) {
    const agentData = new WaldiezSourceUserProxyData();
    agentData.name = `Agent ${i}`;
    const agent = new WaldiezSourceUserProxy(`test-agent${i}`, agentData).asNode({
      x: 0,
      y: 0
    });
    if (areGroupMembers) {
      agent.parentId = agentId;
    }
    agent.id = `agent-${i}`;
    nodes.push({ ...agent });
    const edge = getEdge(agent, i, areGroupMembers);
    edges.push({ ...edge });
  }
  return { nodes, edges };
};

export const getGroupMembers = () => {
  return getConnectedAgents(true);
};

export const getNestedChats = () => {
  return getConnectedAgents();
};

export const getGroupNodes = () => {
  const groupData = new WaldiezSourceGroupManagerData();
  groupData.name = 'test group1';
  const group1 = new WaldiezSourceGroupManager('test-group1', groupData).asNode({
    x: 0,
    y: 0
  });
  groupData.name = 'test group2';
  const group2 = new WaldiezSourceGroupManager('test-group2', groupData).asNode({
    x: 0,
    y: 0
  });
  return [{ ...group1 }, { ...group2 }];
};
