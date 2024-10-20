import { WaldieModelNodeData } from '@waldiez/models';

export * from '@waldiez/components/nodes/model/modal/tabs/types';
export type WaldieNodeModelModalProps = {
  modelId: string;
  data: WaldieModelNodeData;
  isOpen: boolean;
  importExportView: React.ReactNode;
  onLogoChange: (newLogo: string) => void;
  onClose: () => void;
  onDataChange: (data: Partial<WaldieModelNodeData>) => void;
  onSubmit: () => void;
  onCancel: () => void;
};
