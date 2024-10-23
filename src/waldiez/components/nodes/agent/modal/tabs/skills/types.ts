import { SingleValue } from '@waldiez/components/inputs';
import {
  WaldiezAgentLinkedSkill,
  WaldiezAgentNode,
  WaldiezAgentNodeData,
  WaldiezSkillNode
} from '@waldiez/models';

export type SkillsAgentConfigTabProps = {
  id: string;
  data: WaldiezAgentNodeData;
  skills: WaldiezSkillNode[];
  agents: WaldiezAgentNode[];
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
};

export type SkillsAgentConfigTabViewProps = {
  id: string;
  skills: WaldiezSkillNode[];
  linkedSkills: WaldiezAgentLinkedSkill[];
  getSkillName: (linkedSkill: WaldiezAgentLinkedSkill) => string;
  getAgentName: (linkedSkill: WaldiezAgentLinkedSkill) => string;
  skillOptions: { label: string; value: WaldiezSkillNode }[];
  agentOptions: { label: string; value: WaldiezAgentNode }[];
  selectedSkill: { label: string; value: WaldiezSkillNode } | null;
  onSelectedSkillChange: (option: SingleValue<{ label: string; value: WaldiezSkillNode }>) => void;
  selectedExecutor: { label: string; value: WaldiezAgentNode } | null;
  onSelectedExecutorChange: (option: SingleValue<{ label: string; value: WaldiezAgentNode }>) => void;
  onAddSkill: () => void;
  onRemoveSkill: (index: number) => void;
};
