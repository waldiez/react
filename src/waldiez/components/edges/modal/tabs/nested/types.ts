import { WaldiezEdgeData, WaldiezMessage, WaldiezMessageType } from '@waldiez/models';

export type WaldiezEdgeNestedTabProps = {
  flowId: string;
  edgeId: string;
  darkMode: boolean;
  data: WaldiezEdgeData;
  onDataChange: (data: Partial<WaldiezEdgeData>) => void;
};
export type WaldiezEdgeNestedTabViewProps = {
  flowId: string;
  edgeId: string;
  darkMode: boolean;
  data: WaldiezEdgeData;
  onNestedMessageTypeChange: (type: WaldiezMessageType) => void;
  onNestedMessageChange: (message: WaldiezMessage) => void;
  onAddNestedMessageContextEntry: (key: string, value: string) => void;
  onRemoveNestedMessageContextEntry: (key: string) => void;
  onUpdateNestedMessageContextEntries: (entries: Record<string, string>) => void;
  onNestedReplyTypeChange: (type: WaldiezMessageType) => void;
  onNestedReplyChange: (reply: WaldiezMessage) => void;
  onAddReplyContextEntry: (key: string, value: string) => void;
  onRemoveReplyContextEntry: (key: string) => void;
  onUpdateReplyContextEntries: (entries: Record<string, string>) => void;
};
