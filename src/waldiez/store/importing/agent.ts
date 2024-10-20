import { nanoid } from 'nanoid';

import {
  WaldieAgentNode,
  WaldieAgentNodeType,
  WaldieNodeGroupManager,
  WaldieNodeRagUser,
  WaldieNodeUserProxyOrAssistant,
  WaldieSourceAssistant,
  WaldieSourceGroupManager,
  WaldieSourceRagUser,
  WaldieSourceUserProxy
} from '@waldiez/models';

export const importAgent: (data: any, agentId?: string, skipLinks?: boolean) => WaldieAgentNode = (
  data,
  agentId,
  skipLinks = true
) => {
  const id = getAgentId(data, agentId);
  const agentType = getAgentType(data);
  const agentData = { ...data, id };
  let agent: WaldieAgentNode;
  switch (agentType) {
    case 'user':
      agent = WaldieSourceUserProxy.fromJSON(agentData, 'user').asNode();
      return skipLinks ? removeLinks(agent) : agent;
    case 'assistant':
      agent = WaldieSourceAssistant.fromJSON(agentData, 'assistant').asNode();
      return skipLinks ? removeLinks(agent) : agent;
    case 'manager':
      agent = WaldieSourceGroupManager.fromJSON(agentData).asNode();
      return skipLinks ? removeLinks(agent) : agent;
    case 'rag_user':
      agent = WaldieSourceRagUser.fromJSON(agentData).asNode();
      return skipLinks ? removeLinks(agent) : agent;
  }
};

const removeLinks: (agent: WaldieAgentNode) => WaldieAgentNode = agent => {
  // remove agent's links to other nodes, such as models, skills, and nested chats
  // if the agent is a manager,
  //    also remove the speaker transitions (allowedOrDisallowedTransitions)
  //    and allowRepeat if it's a list of strings
  // if the agent is a rag_user, also remove the model and docsPath
  if (agent.data.agentType === 'manager') {
    return removeManagerLinks(agent as WaldieNodeGroupManager);
  }
  const agentCopy = { ...agent };
  agentCopy.data.modelIds = [];
  agentCopy.data.skills = [];
  if (agentCopy.data.codeExecutionConfig) {
    agentCopy.data.codeExecutionConfig.functions = [];
  }
  (agentCopy as WaldieNodeUserProxyOrAssistant).data.nestedChats = [];
  if (agent.data.agentType === 'rag_user') {
    (agentCopy as WaldieNodeRagUser).data.retrieveConfig = {
      ...(agentCopy as WaldieNodeRagUser).data.retrieveConfig,
      model: null,
      docsPath: []
    };
  }
  return agentCopy;
};

const removeManagerLinks: (agent: WaldieNodeGroupManager) => WaldieNodeGroupManager = agent => {
  const agentCopy = { ...agent };
  agentCopy.data.modelIds = [];
  agentCopy.data.skills = [];
  if (agentCopy.data.codeExecutionConfig) {
    agentCopy.data.codeExecutionConfig.functions = [];
  }
  (agentCopy as WaldieNodeGroupManager).data.speakers = {
    ...(agentCopy as WaldieNodeGroupManager).data.speakers,
    allowRepeat: [],
    allowedOrDisallowedTransitions: {}
  };
  return agentCopy;
};

const getAgentId = (data: any, agentId?: string) => {
  let id = 'wa-' + nanoid();
  if (!agentId || typeof agentId !== 'string') {
    if (data && typeof data === 'object' && 'id' in data && typeof data.id === 'string') {
      id = data.id;
    }
  } else {
    id = agentId;
  }
  return id;
};

const getAgentType = (data: any) => {
  let agentType: WaldieAgentNodeType = 'user';
  if (
    'agentType' in data &&
    typeof data.agentType === 'string' &&
    ['user', 'assistant', 'manager', 'rag_user'].includes(data.agentType)
  ) {
    agentType = data.agentType as WaldieAgentNodeType;
  }
  return agentType;
};
