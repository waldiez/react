import { WaldiezAgentNode, WaldiezAgentNodeData, WaldiezSkillNode } from '@waldiez/models';

export type WaldiezAgentSkillsProps = {
  id: string;
  data: WaldiezAgentNodeData;
  skills: WaldiezSkillNode[];
  agents: WaldiezAgentNode[];
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
};
