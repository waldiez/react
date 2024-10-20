import { WaldieSkillNodeData } from '@waldiez/models';

export type WaldieSkillNodeModalProps = {
  skillId: string;
  flowId: string;
  data: WaldieSkillNodeData;
  isModalOpen: boolean;
  darkMode: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  onDataChange: (data: Partial<WaldieSkillNodeData>) => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
};
export type WaldieSkillNodeModalViewProps = {
  skillId: string;
  flowId: string;
  data: WaldieSkillNodeData;
  isModalOpen: boolean;
  darkMode: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  onSkillLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSkillDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSkillContentChange: (value: string | undefined) => void;
  onAddSecret: (key: string, value: string) => void;
  onUpdateSecrets: (secrets: { [key: string]: string }) => void;
  onDeleteSecret: (key: string) => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
};
