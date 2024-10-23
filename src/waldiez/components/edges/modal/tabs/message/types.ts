import { WaldiezEdgeData, WaldiezMessage, WaldiezMessageType } from '@waldiez/models';

export type WaldiezEdgeMessageTabProps = {
  edgeId: string;
  data: WaldiezEdgeData;
  darkMode: boolean;
  skipRagOption: boolean;
  onDataChange: (data: Partial<WaldiezEdgeData>) => void;
};

export type WaldiezEdgeMessageTabViewProps = {
  edgeId: string;
  data: WaldiezEdgeData;
  darkMode: boolean;
  skipRagOption: boolean;
  onMessageChange: (message: WaldiezMessage) => void;
  onMessageTypeChange: (type: WaldiezMessageType) => void;
  onAddMessageContextEntry: (key: string, value: string) => void;
  onRemoveMessageContextEntry: (key: string) => void;
  onUpdateMessageContextEntries: (entries: Record<string, string>) => void;
};
