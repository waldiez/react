import {
  WaldiezAgentNode,
  WaldiezAgentNodeType,
  WaldiezNodeGroupManager,
  WaldiezNodeRagUser,
  WaldiezNodeUserProxyOrAssistant,
  WaldiezSourceAssistant,
  WaldiezSourceGroupManager,
  WaldiezSourceRagUser,
  WaldiezSourceUserProxy
} from '@waldiez/models';
import { getId } from '@waldiez/utils';

export const importAgent: (data: any, agentId?: string, skipLinks?: boolean) => WaldiezAgentNode = (
  data,
  agentId,
  skipLinks = true
) => {
  const id = getAgentId(data, agentId);
  const agentType = getAgentType(data);
  const agentData = { ...data, id };
  let agent: WaldiezAgentNode;
  switch (agentType) {
    case 'user':
      agent = WaldiezSourceUserProxy.fromJSON(agentData, 'user').asNode();
      agent.data.parentId = null;
      return skipLinks ? removeLinks(agent) : agent;
    case 'assistant':
      agent = WaldiezSourceAssistant.fromJSON(agentData, 'assistant').asNode();
      agent.data.parentId = null;
      return skipLinks ? removeLinks(agent) : agent;
    case 'manager':
      agent = WaldiezSourceGroupManager.fromJSON(agentData).asNode();
      agent.data.parentId = null;
      return skipLinks ? removeLinks(agent) : agent;
    case 'rag_user':
      agent = WaldiezSourceRagUser.fromJSON(agentData).asNode();
      agent.data.parentId = null;
      return skipLinks ? removeLinks(agent) : agent;
  }
};

const removeLinks: (agent: WaldiezAgentNode) => WaldiezAgentNode = agent => {
  // remove agent's links to other nodes, such as models, skills, and nested chats
  // if the agent is a manager,
  //    also remove the speaker transitions (allowedOrDisallowedTransitions)
  //    and allowRepeat if it's a list of strings
  // if the agent is a rag_user, also remove the model and docsPath
  if (agent.data.agentType === 'manager') {
    return removeManagerLinks(agent as WaldiezNodeGroupManager);
  }
  const agentCopy = { ...agent };
  agentCopy.data.modelIds = [];
  agentCopy.data.skills = [];
  if (agentCopy.data.codeExecutionConfig) {
    agentCopy.data.codeExecutionConfig.functions = [];
  }
  (agentCopy as WaldiezNodeUserProxyOrAssistant).data.nestedChats = [];
  if (agent.data.agentType === 'rag_user') {
    (agentCopy as WaldiezNodeRagUser).data.retrieveConfig = {
      ...(agentCopy as WaldiezNodeRagUser).data.retrieveConfig,
      model: null,
      docsPath: []
    };
  }
  return agentCopy;
};

const removeManagerLinks: (agent: WaldiezNodeGroupManager) => WaldiezNodeGroupManager = agent => {
  const agentCopy = { ...agent };
  agentCopy.data.modelIds = [];
  agentCopy.data.skills = [];
  if (agentCopy.data.codeExecutionConfig) {
    agentCopy.data.codeExecutionConfig.functions = [];
  }
  (agentCopy as WaldiezNodeGroupManager).data.speakers = {
    ...(agentCopy as WaldiezNodeGroupManager).data.speakers,
    allowRepeat: [],
    allowedOrDisallowedTransitions: {}
  };
  return agentCopy;
};

const getAgentId = (data: any, agentId?: string) => {
  let id = 'wa-' + getId();
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
  let agentType: WaldiezAgentNodeType = 'user';
  if (
    'agentType' in data &&
    typeof data.agentType === 'string' &&
    ['user', 'assistant', 'manager', 'rag_user'].includes(data.agentType)
  ) {
    agentType = data.agentType as WaldiezAgentNodeType;
  }
  return agentType;
};
