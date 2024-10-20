import { Node } from '@xyflow/react';

import {
  WaldieAgentNodeType,
  WaldieSourceAssistant,
  WaldieSourceAssistantData,
  WaldieSourceEdge,
  WaldieSourceEdgeData,
  WaldieSourceGroupManager,
  WaldieSourceGroupManagerData,
  WaldieSourceModel,
  WaldieSourceModelData,
  WaldieSourceRagUser,
  WaldieSourceRagUserData,
  WaldieSourceSkill,
  WaldieSourceSkillData,
  WaldieSourceUserProxy,
  WaldieSourceUserProxyData
} from '@waldiez/models';

export const agentId = 'test-agent';
export const flowId = 'test-flow';
export const createdAt = new Date().toISOString();
export const updatedAt = new Date().toISOString();
export const getAgentData = (agentType: WaldieAgentNodeType) => {
  if (agentType === 'user') {
    return new WaldieSourceUserProxyData();
  }
  if (agentType === 'assistant') {
    return new WaldieSourceAssistantData();
  }
  if (agentType === 'manager') {
    return new WaldieSourceGroupManagerData();
  }
  return new WaldieSourceRagUserData();
};

export const getAgentNode = (
  agentType: WaldieAgentNodeType,
  nodeOverrides: Partial<Node> = {},
  dataOverrides: { [key: string]: any } = {}
) => {
  const agentData = getAgentData(agentType);
  let node: Node;
  switch (agentType) {
    case 'user':
      node = new WaldieSourceUserProxy(agentId, {
        ...agentData,
        agentType: agentType as any,
        ...dataOverrides
      } as WaldieSourceUserProxyData).asNode({ x: 0, y: 0 });
      break;
    case 'assistant':
      node = new WaldieSourceAssistant(agentId, {
        ...agentData,
        agentType: agentType as any,
        ...dataOverrides
      } as WaldieSourceAssistantData).asNode({ x: 0, y: 0 });
      break;
    case 'manager':
      node = new WaldieSourceAssistant(agentId, {
        ...agentData,
        agentType: agentType as any,
        ...dataOverrides
      } as WaldieSourceAssistantData).asNode({ x: 0, y: 0 });
      break;
    case 'rag_user':
      node = new WaldieSourceRagUser(agentId, {
        ...agentData,
        agentType: agentType as any,
        ...dataOverrides
      } as WaldieSourceRagUserData).asNode({ x: 0, y: 0 });
  }
  return { ...node, ...nodeOverrides } as Node;
};

export const getSkillNodes = () => {
  const skillData = new WaldieSourceSkillData();
  skillData.name = 'test skill1';
  const skill1 = new WaldieSourceSkill('test-skill1', skillData).asNode({
    x: 0,
    y: 0
  });
  skillData.name = 'test skill2';
  const skill2 = new WaldieSourceSkill('test-skill2', skillData).asNode({
    x: 0,
    y: 0
  });
  return [{ ...skill1 }, { ...skill2 }];
};

export const getModelNodes = () => {
  const modelData = new WaldieSourceModelData();
  modelData.name = 'test model1';
  const model1 = new WaldieSourceModel('test-model1', modelData).asNode({
    x: 0,
    y: 0
  });
  modelData.name = 'test model2';
  const model2 = new WaldieSourceModel('test-model2', modelData).asNode({
    x: 0,
    y: 0
  });
  return [{ ...model1 }, { ...model2 }];
};
const getEdge = (agent: Node, index: number, isGroup: boolean) => {
  const source = isGroup ? agentId : index % 2 === 0 ? agentId : agent.id;
  const target = isGroup ? agent.id : index % 2 === 0 ? agent.id : agentId;
  const type = isGroup ? 'hidden' : index < 2 ? 'nested' : 'chat';
  const edgeData = new WaldieSourceEdgeData(source, target, `${source} to ${target}`);
  const edge = new WaldieSourceEdge({
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
    const agentData = new WaldieSourceUserProxyData();
    agentData.name = `Agent ${i}`;
    const agent = new WaldieSourceUserProxy(`test-agent${i}`, agentData).asNode({
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
  const groupData = new WaldieSourceGroupManagerData();
  groupData.name = 'test group1';
  const group1 = new WaldieSourceGroupManager('test-group1', groupData).asNode({
    x: 0,
    y: 0
  });
  groupData.name = 'test group2';
  const group2 = new WaldieSourceGroupManager('test-group2', groupData).asNode({
    x: 0,
    y: 0
  });
  return [{ ...group1 }, { ...group2 }];
};
