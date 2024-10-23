import { WaldiezAgentNestedChat } from '@waldiez/models';

export type NestedChatsAgentConfigTabTriggersViewProps = {
  id: string;
  chat: WaldiezAgentNestedChat;
  allOptions: { label: string; value: string }[];
  selectedTrigger: { id: string; isReply: boolean } | null;
  getEdgeLabel: (id: string) => string;
  setSelectedTrigger: (
    option: {
      id: string;
      isReply: boolean;
    } | null
  ) => void;
  onAddNestedChatTrigger: () => void;
  onRemoveNestedChatTrigger: (index: number) => void;
};

export type NestedChatsAgentConfigTabMessagesViewProps = {
  id: string;
  chat: WaldiezAgentNestedChat;
  allOptions: { label: string; value: string }[];
  selectedRecipient: { id: string; isReply: boolean } | null;
  getEdgeLabel: (id: string) => string;
  getMessageLabel: (index: number) => string;
  setSelectedRecipient: (
    option: {
      id: string;
      isReply: boolean;
    } | null
  ) => void;
  onAddNestedChatConnection: () => void;
  onRemoveRecipient: (index: number) => void;
  onNestedChatRecipientMovedUp: (index: number) => void;
  onNestedChatRecipientMovedDown: (index: number) => void;
};
