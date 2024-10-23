import { WaldiezAgentNode, WaldiezAgentNodeData, WaldiezSkillNode } from '@waldiez/models';

export type WaldiezNodeAgentBodyViewProps = {
  id: string;
  parentId?: string;
  data: WaldiezAgentNodeData;
  isNodeModalOpen: boolean;
  isEdgeModalOpen: boolean;
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
};
export type WaldiezNodeAgentNoManagerViewProps = {
  id: string;
  data: WaldiezAgentNodeData;
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
  skills: WaldiezSkillNode[];
  agentModelNames: string[];
  agentModelLogos: string[];
  agentWaldiezModelAPITypes: string[];
};
export type WaldiezNodeAgentManagerBodyViewProps = {
  id: string;
  data: WaldiezAgentNodeData;
  skills: WaldiezSkillNode[];
  agentModelNames: string[];
  agentWaldiezModelAPITypes: string[];
  groupMembers: WaldiezAgentNode[];
  agentModelLogos: string[];
  onOpenMemberModal: (agent: WaldiezAgentNode) => void;
  onRemoveMember: (agent: WaldiezAgentNode) => void;
};
