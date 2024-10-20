import { useState } from 'react';

import { NestedChatsAgentConfigTabProps } from '@waldiez/components/nodes/agent/modal/tabs/nestedChats/types';
import { NestedChatsAgentConfigTabView } from '@waldiez/components/nodes/agent/modal/tabs/nestedChats/view';
import { WaldieAgentNestedChat, WaldieEdge } from '@waldiez/models';

export const NestedChatsAgentConfigTab = (props: NestedChatsAgentConfigTabProps) => {
  const { id, data, onDataChange, agentConnections } = props;
  const [selectedTrigger, setSelectedTrigger] = useState<{
    id: string;
    isReply: boolean;
  } | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<{
    id: string;
    isReply: boolean;
  } | null>(null);
  const chat: WaldieAgentNestedChat =
    data.nestedChats.length > 0
      ? data.nestedChats[0]
      : ({ triggeredBy: [], messages: [] } as WaldieAgentNestedChat);
  const sources = agentConnections.source;
  const targets = agentConnections.target;
  const triggerEdges = sources.edges;
  const recipientEdges = targets.edges;
  const allEdges = triggerEdges.concat(recipientEdges);
  const allOptions = allEdges.map((edge: WaldieEdge) => {
    return {
      label: edge.data?.label as string,
      value: edge.id
    };
  });
  const getEdgeLabel = (id: string) => {
    const edge = allEdges.find(e => e.id === id);
    return edge?.data?.label as string;
  };
  const getMessageLabel = (index: number) => {
    return getEdgeLabel(chat.messages[index].id);
  };
  const onAddNestedChatTrigger = () => {
    if (selectedTrigger) {
      // check if the exact trigger is already registered
      if (
        chat.triggeredBy.find(
          trigger => trigger.id === selectedTrigger.id && trigger.isReply === selectedTrigger.isReply
        )
      ) {
        return;
      }
      const newChat = {
        ...chat,
        triggeredBy: [
          ...chat.triggeredBy,
          {
            id: selectedTrigger.id,
            isReply: selectedTrigger.isReply
          }
        ],
        messages: []
      } as WaldieAgentNestedChat;
      onDataChange({
        ...data,
        nestedChats: [newChat]
      });
    }
  };
  const onRemoveNestedChatTrigger = (index: number) => {
    const newChat = {
      ...chat,
      triggeredBy: chat.triggeredBy.filter((_, i) => i !== index),
      messages: []
    } as WaldieAgentNestedChat;
    onDataChange({
      ...data,
      nestedChats: [newChat]
    });
  };
  const onAddNestedChatConnection = () => {
    if (selectedRecipient) {
      // check if the exact recipient is already registered
      if (
        chat.messages.find(
          recipient =>
            recipient.id === selectedRecipient.id && recipient.isReply === selectedRecipient.isReply
        )
      ) {
        return;
      }
      const newChat = {
        ...chat,
        messages: [
          ...chat.messages,
          {
            id: selectedRecipient.id,
            isReply: selectedRecipient.isReply
          }
        ]
      } as WaldieAgentNestedChat;
      onDataChange({
        ...data,
        nestedChats: [newChat]
      });
    }
  };
  const onRemoveRecipient = (index: number) => {
    const newChat = {
      ...chat,
      messages: chat.messages.filter((_, i) => i !== index)
    } as WaldieAgentNestedChat;
    onDataChange({
      ...data,
      nestedChats: [newChat]
    });
  };
  const onNestedChatRecipientMovedUp = (index: number) => {
    const recipients = chat.messages;
    const temp = recipients[index];
    recipients[index] = recipients[index - 1];
    recipients[index - 1] = temp;
    const newChats = [
      {
        ...chat,
        messages: recipients
      }
    ] as WaldieAgentNestedChat[];
    onDataChange({
      ...data,
      nestedChats: newChats
    });
  };
  const onNestedChatRecipientMovedDown = (index: number) => {
    const recipients = chat.messages;
    const temp = recipients[index];
    recipients[index] = recipients[index + 1];
    recipients[index + 1] = temp;
    const newChats = [
      {
        ...chat,
        messages: recipients
      }
    ] as WaldieAgentNestedChat[];
    onDataChange({
      ...data,
      nestedChats: newChats
    });
  };
  return (
    <NestedChatsAgentConfigTabView
      id={id}
      chat={chat}
      selectedTrigger={selectedTrigger}
      selectedRecipient={selectedRecipient}
      allOptions={allOptions}
      setSelectedRecipient={setSelectedRecipient}
      setSelectedTrigger={setSelectedTrigger}
      getEdgeLabel={getEdgeLabel}
      getMessageLabel={getMessageLabel}
      onAddNestedChatTrigger={onAddNestedChatTrigger}
      onRemoveNestedChatTrigger={onRemoveNestedChatTrigger}
      onAddNestedChatConnection={onAddNestedChatConnection}
      onRemoveRecipient={onRemoveRecipient}
      onNestedChatRecipientMovedUp={onNestedChatRecipientMovedUp}
      onNestedChatRecipientMovedDown={onNestedChatRecipientMovedDown}
    />
  );
};
