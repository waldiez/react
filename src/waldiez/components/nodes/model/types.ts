import { WaldiezModelNodeData } from '@waldiez/models';

export type WaldiezNodeModelViewProps = {
  modelId: string;
  data: WaldiezModelNodeData;
  flowId: string;
  logo: string;
  isOpen: boolean;
  onOpen: () => void;
  setLogo: (logo: string) => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
  onClose: () => void;
  onDataChange: (data: Partial<WaldiezModelNodeData>) => void;
  onDelete: () => void;
  onClone: () => void;
  onSubmit: () => void;
  onCancel: () => void;
};
