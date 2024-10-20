import { nanoid } from 'nanoid';

import {
  WaldieAgentNodeType,
  WaldieSourceAssistant,
  WaldieSourceAssistantData,
  WaldieSourceGroupManager,
  WaldieSourceGroupManagerData,
  WaldieSourceRagUser,
  WaldieSourceRagUserData,
  WaldieSourceUserProxy,
  WaldieSourceUserProxyData
} from '@waldiez/models';

export const getAgentNode = (agentType: WaldieAgentNodeType, position: { x: number; y: number }) => {
  const nodeId = `wa-${nanoid()}`;
  switch (agentType) {
    case 'user':
      return new WaldieSourceUserProxy(nodeId, new WaldieSourceUserProxyData(), {
        position
      }).asNode();
    case 'assistant':
      return new WaldieSourceAssistant(nodeId, new WaldieSourceAssistantData(), {
        position
      }).asNode();
    case 'manager':
      return new WaldieSourceGroupManager(nodeId, new WaldieSourceGroupManagerData(), {
        position
      }).asNode();
    // rag_users are converted from a user node
    case 'rag_user':
      return new WaldieSourceRagUser(nodeId, new WaldieSourceRagUserData(), {
        position
      }).asNode();
  }
};
