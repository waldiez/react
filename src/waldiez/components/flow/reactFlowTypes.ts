import {
  WaldieEdgeChat,
  WaldieEdgeGroup,
  WaldieEdgeHidden,
  WaldieEdgeNested
} from '@waldiez/components/edges';
import { WaldieNodeAgent, WaldieNodeModel, WaldieNodeSkill } from '@waldiez/components/nodes';

export const edgeTypes = {
  chat: WaldieEdgeChat,
  group: WaldieEdgeGroup,
  hidden: WaldieEdgeHidden,
  nested: WaldieEdgeNested
};

export const nodeTypes = {
  agent: WaldieNodeAgent,
  model: WaldieNodeModel,
  skill: WaldieNodeSkill
};
