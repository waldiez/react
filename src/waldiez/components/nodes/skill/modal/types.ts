import { WaldiezSkillNodeData } from '@waldiez/models';

export type WaldiezSkillNodeModalProps = {
  skillId: string;
  flowId: string;
  data: WaldiezSkillNodeData;
  isModalOpen: boolean;
  isDirty: boolean;
  darkMode: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSave: () => void;
  onDataChange: (data: Partial<WaldiezSkillNodeData>) => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
};
