import { WaldieAgentNode, WaldieAgentNodeData, WaldieSkillNode } from '@waldiez/models';

export type WaldieNodeAgentBodyViewProps = {
  id: string;
  parentId?: string;
  data: WaldieAgentNodeData;
  isNodeModalOpen: boolean;
  isEdgeModalOpen: boolean;
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
};
export type WaldieNodeAgentNoManagerViewProps = {
  id: string;
  data: WaldieAgentNodeData;
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
  skills: WaldieSkillNode[];
  agentModelNames: string[];
  agentModelLogos: string[];
  agentWaldieModelAPITypes: string[];
};
export type WaldieNodeAgentManagerBodyViewProps = {
  id: string;
  data: WaldieAgentNodeData;
  skills: WaldieSkillNode[];
  agentModelNames: string[];
  agentWaldieModelAPITypes: string[];
  groupMembers: WaldieAgentNode[];
  agentModelLogos: string[];
  onOpenMemberModal: (agent: WaldieAgentNode) => void;
  onRemoveMember: (agent: WaldieAgentNode) => void;
};
