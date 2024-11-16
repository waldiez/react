import { WaldiezModelNodeData } from '@waldiez/models';

export type WaldiezNodeModelModalPriceTabProps = {
  modelId: string;
  data: WaldiezModelNodeData;
  onDataChange: (data: Partial<WaldiezModelNodeData>) => void;
};
