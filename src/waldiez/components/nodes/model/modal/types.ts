import { WaldiezModelNodeData } from '@waldiez/models';

export * from '@waldiez/components/nodes/model/modal/tabs/types';
export type WaldiezNodeModelModalProps = {
  modelId: string;
  data: WaldiezModelNodeData;
  isOpen: boolean;
  isDirty: boolean;
  importExportView: React.ReactNode;
  onLogoChange: (newLogo: string) => void;
  onClose: () => void;
  onDataChange: (data: Partial<WaldiezModelNodeData>) => void;
  onSave: () => void;
  onCancel: () => void;
};
