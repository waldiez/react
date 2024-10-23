import { WaldiezModelNodeData } from '@waldiez/models';

export type WaldiezNodeModelModalPriceTabProps = {
  modelId: string;
  data: WaldiezModelNodeData;
  onDataChange: (data: Partial<WaldiezModelNodeData>) => void;
};

export type WaldiezNodeModelModalPriceTabViewProps = {
  modelId: string;
  data: WaldiezModelNodeData;
  onPricePromptChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPriceCompletionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
