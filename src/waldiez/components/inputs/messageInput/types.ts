import { WaldiezMessage, WaldiezMessageType } from '@waldiez/models';

export type MessageInputProps = {
  current: WaldiezMessage;
  defaultContent: string;
  darkMode: boolean;
  selectLabel: string;
  includeContext: boolean;
  skipRagOption: boolean;
  skipCarryoverOption: boolean;
  selectTestId: string;
  notNoneLabel?: string;
  notNoneLabelInfo?: string;
  onTypeChange: (type: WaldiezMessageType) => void;
  onMessageChange: (message: WaldiezMessage) => void;
  onAddContextEntry?: (key: string, value: string) => void;
  onRemoveContextEntry?: (key: string) => void;
  onUpdateContextEntries?: (entries: Record<string, string>) => void;
};
