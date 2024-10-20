import { WaldieModelNodeData } from '@waldiez/models';

export type WaldieNodeModelViewProps = {
  modelId: string;
  data: WaldieModelNodeData;
  flowId: string;
  logo: string;
  isOpen: boolean;
  onOpen: () => void;
  setLogo: (logo: string) => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
  onClose: () => void;
  onDataChange: (data: Partial<WaldieModelNodeData>) => void;
  onDelete: () => void;
  onClone: () => void;
  onSubmit: () => void;
  onCancel: () => void;
};
