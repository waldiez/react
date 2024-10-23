import { WaldiezNodeGroupManager } from '@waldiez/models/types/agents/groupManager';
import { WaldiezNodeRagUser } from '@waldiez/models/types/agents/ragUser';
import {
  WaldiezNodeAssistant,
  WaldiezNodeUserProxy
} from '@waldiez/models/types/agents/userProxyOrAssistant';

export * from '@waldiez/models/types/agents/agent';
export * from '@waldiez/models/types/agents/userProxyOrAssistant';
export * from '@waldiez/models/types/agents/groupManager';
export * from '@waldiez/models/types/agents/ragUser';

export type WaldiezAgentNode =
  | WaldiezNodeUserProxy
  | WaldiezNodeAssistant
  | WaldiezNodeGroupManager
  | WaldiezNodeRagUser;
