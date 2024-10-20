import { SingleValue } from '@waldiez/components/inputs';
import { WaldieEdgeData } from '@waldiez/models';

export type WaldieEdgeModalProps = {
  flowId: string;
  darkMode: boolean;
  edgeId: string;
  isOpen: boolean;
  onClose: () => void;
};

export type WaldieEdgeModalViewProps = {
  flowId: string;
  edgeId: string;
  data: WaldieEdgeData;
  isOpen: boolean;
  darkMode: boolean;
  sourceIsRagUser: boolean;
  edgeType: 'chat' | 'nested' | 'group' | 'hidden';
  onTypeChange: (
    option: SingleValue<{
      label: string;
      value: 'chat' | 'nested' | 'group' | 'hidden';
    }>
  ) => void;
  onDataChange: (data: Partial<WaldieEdgeData>) => void;
  onCancel: () => void;
  onSubmit: () => void;
  onClose: () => void;
};
