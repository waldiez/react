import { WaldieEdgeData, WaldieMessage, WaldieMessageType } from '@waldiez/models';

export type WaldieEdgeNestedTabProps = {
  flowId: string;
  edgeId: string;
  darkMode: boolean;
  data: WaldieEdgeData;
  onDataChange: (data: Partial<WaldieEdgeData>) => void;
};
export type WaldieEdgeNestedTabViewProps = {
  flowId: string;
  edgeId: string;
  darkMode: boolean;
  data: WaldieEdgeData;
  onNestedMessageTypeChange: (type: WaldieMessageType) => void;
  onNestedMessageChange: (message: WaldieMessage) => void;
  onAddNestedMessageContextEntry: (key: string, value: string) => void;
  onRemoveNestedMessageContextEntry: (key: string) => void;
  onUpdateNestedMessageContextEntries: (entries: Record<string, string>) => void;
  onNestedReplyTypeChange: (type: WaldieMessageType) => void;
  onNestedReplyChange: (reply: WaldieMessage) => void;
  onAddReplyContextEntry: (key: string, value: string) => void;
  onRemoveReplyContextEntry: (key: string) => void;
  onUpdateReplyContextEntries: (entries: Record<string, string>) => void;
};
