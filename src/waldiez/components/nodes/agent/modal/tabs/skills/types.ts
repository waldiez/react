import { SingleValue } from '@waldiez/components/inputs';
import {
  WaldieAgentLinkedSkill,
  WaldieAgentNode,
  WaldieAgentNodeData,
  WaldieSkillNode
} from '@waldiez/models';

export type SkillsAgentConfigTabProps = {
  id: string;
  data: WaldieAgentNodeData;
  skills: WaldieSkillNode[];
  agents: WaldieAgentNode[];
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
};

export type SkillsAgentConfigTabViewProps = {
  id: string;
  skills: WaldieSkillNode[];
  linkedSkills: WaldieAgentLinkedSkill[];
  getSkillName: (linkedSkill: WaldieAgentLinkedSkill) => string;
  getAgentName: (linkedSkill: WaldieAgentLinkedSkill) => string;
  skillOptions: { label: string; value: WaldieSkillNode }[];
  agentOptions: { label: string; value: WaldieAgentNode }[];
  selectedSkill: { label: string; value: WaldieSkillNode } | null;
  onSelectedSkillChange: (option: SingleValue<{ label: string; value: WaldieSkillNode }>) => void;
  selectedExecutor: { label: string; value: WaldieAgentNode } | null;
  onSelectedExecutorChange: (option: SingleValue<{ label: string; value: WaldieAgentNode }>) => void;
  onAddSkill: () => void;
  onRemoveSkill: (index: number) => void;
};
