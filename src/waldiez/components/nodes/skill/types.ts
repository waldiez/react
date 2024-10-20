import { WaldieSkillNodeData } from '@waldiez/models';

export type WaldieNodeSkillViewProps = {
  skillId: string;
  flowId: string;
  data: WaldieSkillNodeData;
  isModalOpen: boolean;
  darkMode: boolean;
  onOpen: () => void;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  onDelete: () => void;
  onClone: () => void;
  onDataChange: (data: Partial<WaldieSkillNodeData>) => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
};
