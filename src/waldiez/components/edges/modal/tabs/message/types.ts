import { WaldieEdgeData, WaldieMessage, WaldieMessageType } from '@waldiez/models';

export type WaldieEdgeMessageTabProps = {
  edgeId: string;
  data: WaldieEdgeData;
  darkMode: boolean;
  skipRagOption: boolean;
  onDataChange: (data: Partial<WaldieEdgeData>) => void;
};

export type WaldieEdgeMessageTabViewProps = {
  edgeId: string;
  data: WaldieEdgeData;
  darkMode: boolean;
  skipRagOption: boolean;
  onMessageChange: (message: WaldieMessage) => void;
  onMessageTypeChange: (type: WaldieMessageType) => void;
  onAddMessageContextEntry: (key: string, value: string) => void;
  onRemoveMessageContextEntry: (key: string) => void;
  onUpdateMessageContextEntries: (entries: Record<string, string>) => void;
};
