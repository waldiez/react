import {
  WaldiezAgentNestedChat,
  WaldiezAgentNode,
  WaldiezAgentNodeData,
  WaldiezEdge,
  WaldiezNodeUserOrAssistantData
} from '@waldiez/models';

export type NestedChatsAgentConfigTabProps = {
  id: string;
  data: WaldiezNodeUserOrAssistantData;
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
  agentConnections: {
    source: {
      nodes: WaldiezAgentNode[];
      edges: WaldiezEdge[];
    };
    target: {
      nodes: WaldiezAgentNode[];
      edges: WaldiezEdge[];
    };
  };
};

export type NestedChatsAgentConfigTabViewProps = {
  id: string;
  chat: WaldiezAgentNestedChat;
  allOptions: { label: string; value: string }[];
  selectedTrigger: { id: string; isReply: boolean } | null;
  selectedRecipient: { id: string; isReply: boolean } | null;
  getEdgeLabel: (id: string) => string;
  getMessageLabel: (index: number) => string;
  setSelectedTrigger: (
    option: {
      id: string;
      isReply: boolean;
    } | null
  ) => void;
  setSelectedRecipient: (
    option: {
      id: string;
      isReply: boolean;
    } | null
  ) => void;
  onAddNestedChatTrigger: () => void;
  onRemoveNestedChatTrigger: (index: number) => void;
  onAddNestedChatConnection: () => void;
  onRemoveRecipient: (index: number) => void;
  onNestedChatRecipientMovedUp: (index: number) => void;
  onNestedChatRecipientMovedDown: (index: number) => void;
};
