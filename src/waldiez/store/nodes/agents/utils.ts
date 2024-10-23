import { nanoid } from 'nanoid';

import {
  WaldiezAgentNodeType,
  WaldiezSourceAssistant,
  WaldiezSourceAssistantData,
  WaldiezSourceGroupManager,
  WaldiezSourceGroupManagerData,
  WaldiezSourceRagUser,
  WaldiezSourceRagUserData,
  WaldiezSourceUserProxy,
  WaldiezSourceUserProxyData
} from '@waldiez/models';

export const getAgentNode = (agentType: WaldiezAgentNodeType, position: { x: number; y: number }) => {
  const nodeId = `wa-${nanoid()}`;
  switch (agentType) {
    case 'user':
      return new WaldiezSourceUserProxy(nodeId, new WaldiezSourceUserProxyData(), {
        position
      }).asNode();
    case 'assistant':
      return new WaldiezSourceAssistant(nodeId, new WaldiezSourceAssistantData(), {
        position
      }).asNode();
    case 'manager':
      return new WaldiezSourceGroupManager(nodeId, new WaldiezSourceGroupManagerData(), {
        position
      }).asNode();
    // rag_users are converted from a user node
    case 'rag_user':
      return new WaldiezSourceRagUser(nodeId, new WaldiezSourceRagUserData(), {
        position
      }).asNode();
  }
};
