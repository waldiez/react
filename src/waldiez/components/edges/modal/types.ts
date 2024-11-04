import { SingleValue } from '@waldiez/components/inputs';
import { WaldiezEdgeData } from '@waldiez/models';

export type WaldiezEdgeModalProps = {
  flowId: string;
  darkMode: boolean;
  edgeId: string;
  isOpen: boolean;
  onClose: () => void;
};

export type WaldiezEdgeModalViewProps = {
  flowId: string;
  edgeId: string;
  data: WaldiezEdgeData;
  isOpen: boolean;
  isDirty: boolean;
  darkMode: boolean;
  sourceIsRagUser: boolean;
  edgeType: 'chat' | 'nested' | 'group' | 'hidden';
  onTypeChange: (
    option: SingleValue<{
      label: string;
      value: 'chat' | 'nested' | 'group' | 'hidden';
    }>
  ) => void;
  onDataChange: (data: Partial<WaldiezEdgeData>) => void;
  onCancel: () => void;
  onSubmit: () => void;
  onClose: () => void;
};
