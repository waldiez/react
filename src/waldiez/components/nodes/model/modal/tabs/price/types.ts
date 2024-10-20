import { WaldieModelNodeData } from '@waldiez/models';

export type WaldieNodeModelModalPriceTabProps = {
  modelId: string;
  data: WaldieModelNodeData;
  onDataChange: (data: Partial<WaldieModelNodeData>) => void;
};

export type WaldieNodeModelModalPriceTabViewProps = {
  modelId: string;
  data: WaldieModelNodeData;
  onPricePromptChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceCompletionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
