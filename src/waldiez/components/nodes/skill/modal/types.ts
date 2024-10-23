import { WaldiezSkillNodeData } from '@waldiez/models';

export type WaldiezSkillNodeModalProps = {
  skillId: string;
  flowId: string;
  data: WaldiezSkillNodeData;
  isModalOpen: boolean;
  darkMode: boolean;
  onClose: () => void;
  onCancel: () => void;
  onSubmit: () => void;
  onDataChange: (data: Partial<WaldiezSkillNodeData>) => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
};
export type WaldiezSkillNodeModalViewProps = {
  skillId: string;
  flowId: string;
  data: WaldiezSkillNodeData;
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
