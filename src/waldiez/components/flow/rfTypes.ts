import {
  WaldiezEdgeChat,
  WaldiezEdgeGroup,
  WaldiezEdgeHidden,
  WaldiezEdgeNested
} from '@waldiez/components/edges';
import { WaldiezNodeAgent, WaldiezNodeModel, WaldiezNodeSkill } from '@waldiez/components/nodes';

export const edgeTypes = {
  chat: WaldiezEdgeChat,
  group: WaldiezEdgeGroup,
  hidden: WaldiezEdgeHidden,
  nested: WaldiezEdgeNested
};

export const nodeTypes = {
  agent: WaldiezNodeAgent,
  model: WaldiezNodeModel,
  skill: WaldiezNodeSkill
};
