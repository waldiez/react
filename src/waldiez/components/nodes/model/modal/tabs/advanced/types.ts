import { WaldieModelNodeData } from '@waldiez/models';

export type WaldieNodeModelModalAdvancedTabProps = {
  data: WaldieModelNodeData;
  onDataChange: (data: Partial<WaldieModelNodeData>) => void;
};
export type WaldieNodeModelModalAdvancedTabViewProps = {
  data: WaldieModelNodeData;
  onTemperatureChange: (temperature: number | null) => void;
  onTopPChange: (topP: number | null) => void;
  onMaxTokensChange: (maxTokens: number | null) => void;
  onUpdateHeaders: (items: { [key: string]: string }) => void;
  onDeleteHeader: (headerKey: string) => void;
  onAddHeader: (headerKey: string, headerValue: string) => void;
  onAddTag: (tag: string) => void;
  onUpdateTag: (oldTag: string, newTag: string) => void;
  onDeleteTag: (tag: string) => void;
};
