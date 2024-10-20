import { WaldieNodeGroupManager } from '@waldiez/models/types/agents/waldieGroupManagerAgent';
import { WaldieNodeRagUser } from '@waldiez/models/types/agents/waldieRagUserAgent';
import {
  WaldieNodeAssistant,
  WaldieNodeUserProxy
} from '@waldiez/models/types/agents/waldieUserProxyOrAssistantAgent';

export * from '@waldiez/models/types/agents/waldieAgent';
export * from '@waldiez/models/types/agents/waldieUserProxyOrAssistantAgent';
export * from '@waldiez/models/types/agents/waldieGroupManagerAgent';
export * from '@waldiez/models/types/agents/waldieRagUserAgent';

export type WaldieAgentNode =
  | WaldieNodeUserProxy
  | WaldieNodeAssistant
  | WaldieNodeGroupManager
  | WaldieNodeRagUser;
