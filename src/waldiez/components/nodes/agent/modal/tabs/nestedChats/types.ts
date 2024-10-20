import {
  WaldieAgentNestedChat,
  WaldieAgentNode,
  WaldieAgentNodeData,
  WaldieEdge,
  WaldieNodeUserOrAssistantData
} from '@waldiez/models';

export type NestedChatsAgentConfigTabProps = {
  id: string;
  data: WaldieNodeUserOrAssistantData;
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
  agentConnections: {
    source: {
      nodes: WaldieAgentNode[];
      edges: WaldieEdge[];
    };
    target: {
      nodes: WaldieAgentNode[];
      edges: WaldieEdge[];
    };
  };
};

export type NestedChatsAgentConfigTabViewProps = {
  id: string;
  chat: WaldieAgentNestedChat;
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
