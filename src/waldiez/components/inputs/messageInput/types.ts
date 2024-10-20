import { WaldieMessage, WaldieMessageType } from '@waldiez/models';

export type MessageInputProps = {
  current: WaldieMessage;
  defaultContent: string;
  darkMode: boolean;
  selectLabel: string;
  includeContext: boolean;
  skipRagOption: boolean;
  skipCarryoverOption: boolean;
  selectTestId: string;
  notNoneLabel?: string;
  notNoneLabelInfo?: string;
  onTypeChange: (type: WaldieMessageType) => void;
  onMessageChange: (message: WaldieMessage) => void;
  onAddContextEntry?: (key: string, value: string) => void;
  onRemoveContextEntry?: (key: string) => void;
  onUpdateContextEntries?: (entries: Record<string, string>) => void;
};
