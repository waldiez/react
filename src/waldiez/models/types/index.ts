import { WaldieSkillNodeData } from '@waldiez/models/types';
import {
  WaldieModelNodeData,
  WaldieNodeAssistantData,
  WaldieNodeGroupManagerData,
  WaldieNodeRagUserData,
  WaldieNodeUserProxyData
} from '@waldiez/models/types';
import { WaldieAgentNode } from '@waldiez/models/types/agents';
import { WaldieModelNode } from '@waldiez/models/types/waldieModel';
import { WaldieSkillNode } from '@waldiez/models/types/waldieSkill';

export * from '@waldiez/models/types/agents';
export * from '@waldiez/models/types/waldieEdge';
export * from '@waldiez/models/types/waldieMessage';
export * from '@waldiez/models/types/waldieModel';
export * from '@waldiez/models/types/waldieSkill';
export { WaldieMessage } from '@waldiez/models/edge/message';
export type WaldieNodeUserOrAssistantData = WaldieNodeAssistantData | WaldieNodeUserProxyData;
export type WaldieAgentNodeData =
  | WaldieNodeAssistantData
  | WaldieNodeUserProxyData
  | WaldieNodeRagUserData
  | WaldieNodeGroupManagerData;
export type WaldieNodeData = WaldieSkillNodeData | WaldieModelNodeData | WaldieAgentNodeData;

export type WaldieNode = WaldieModelNode | WaldieSkillNode | WaldieAgentNode;
export type WaldieNodeType = 'agent' | 'model' | 'skill';
