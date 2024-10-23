import { WaldiezSkillNodeData } from '@waldiez/models';

export type WaldiezNodeSkillViewProps = {
  skillId: string;
  flowId: string;
  data: WaldiezSkillNodeData;
  isModalOpen: boolean;
  darkMode: boolean;
  onOpen: () => void;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  onDelete: () => void;
  onClone: () => void;
  onDataChange: (data: Partial<WaldiezSkillNodeData>) => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
};
