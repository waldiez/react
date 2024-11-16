import { useState } from 'react';

import { SingleValue } from '@waldiez/components/inputs';
import { WaldiezAgentNestedChatsProps } from '@waldiez/components/nodes/agent/modal/tabs/nestedChats/types';
import { WaldiezAgentNestedChat, WaldiezEdge } from '@waldiez/models';

export const useWaldiezAgentNestedChats = (props: WaldiezAgentNestedChatsProps) => {
  const { data, onDataChange, agentConnections } = props;
  const [selectedTrigger, setSelectedTrigger] = useState<{
    id: string;
    isReply: boolean;
  } | null>(null);
  const [selectedRecipient, setSelectedRecipient] = useState<{
    id: string;
    isReply: boolean;
  } | null>(null);
  const chat: WaldiezAgentNestedChat =
    data.nestedChats.length > 0
      ? data.nestedChats[0]
      : ({ triggeredBy: [], messages: [] } as WaldiezAgentNestedChat);
  const sources = agentConnections.source;
  const targets = agentConnections.target;
  const triggerEdges = sources.edges;
  const recipientEdges = targets.edges;
  const allEdges = triggerEdges.concat(recipientEdges);
  const selectOptions = allEdges.map((edge: WaldiezEdge) => {
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
        console.log('trigger already exists');
        return;
      }
      const newChat = {
        triggeredBy: [
          ...chat.triggeredBy,
          {
            id: selectedTrigger.id,
            isReply: selectedTrigger.isReply
          }
        ],
        messages: []
      } as WaldiezAgentNestedChat;
      onDataChange({
        nestedChats: [newChat]
      });
    }
  };
  const onRemoveNestedChatTrigger = (index: number) => {
    const newChat = {
      triggeredBy: chat.triggeredBy.filter((_, i) => i !== index),
      messages: []
    } as WaldiezAgentNestedChat;
    onDataChange({
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
        messages: [
          ...chat.messages,
          {
            id: selectedRecipient.id,
            isReply: selectedRecipient.isReply
          }
        ],
        triggeredBy: chat.triggeredBy
      } as WaldiezAgentNestedChat;
      onDataChange({
        nestedChats: [newChat]
      });
    }
  };
  const onRemoveRecipient = (index: number) => {
    const newChat = {
      messages: chat.messages.filter((_, i) => i !== index),
      triggeredBy: chat.triggeredBy
    } as WaldiezAgentNestedChat;
    onDataChange({
      nestedChats: [newChat]
    });
  };
  const onNestedChatRecipientMovedUp = (index: number) => {
    const recipients = [...chat.messages];
    const temp = recipients[index];
    recipients[index] = recipients[index - 1];
    recipients[index - 1] = temp;
    const newChat = {
      ...chat,
      messages: recipients
    } as WaldiezAgentNestedChat;
    onDataChange({
      nestedChats: [newChat]
    });
  };
  const onNestedChatRecipientMovedDown = (index: number) => {
    const recipients = [...chat.messages];
    const temp = recipients[index];
    recipients[index] = recipients[index + 1];
    recipients[index + 1] = temp;
    const newChat = {
      ...chat,
      messages: recipients
    } as WaldiezAgentNestedChat;
    onDataChange({
      nestedChats: [newChat]
    });
  };
  const onSelectedTriggerChange = (option: SingleValue<{ label: string; value: string }> | null) => {
    if (option && option.value) {
      setSelectedTrigger({
        id: option.value,
        isReply: selectedTrigger?.isReply || false
      });
    } else {
      setSelectedTrigger(null);
    }
  };
  const onSelectedTriggerIsReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedTrigger) {
      setSelectedTrigger({
        id: selectedTrigger.id,
        isReply: event.target.checked
      });
    }
  };
  const onSelectedRecipientChange = (option: SingleValue<{ label: string; value: string }> | null) => {
    if (option && option.value) {
      setSelectedRecipient({
        id: option.value,
        isReply: selectedRecipient?.isReply || false
      });
    } else {
      setSelectedRecipient(null);
    }
  };
  const onSelectedRecipientIsReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedRecipient) {
      setSelectedRecipient({
        id: selectedRecipient.id,
        isReply: event.target.checked
      });
    }
  };
  return {
    chat,
    selectOptions,
    selectedTrigger,
    selectedRecipient,
    onSelectedTriggerChange,
    onSelectedTriggerIsReplyChange,
    onSelectedRecipientChange,
    onSelectedRecipientIsReplyChange,
    onAddNestedChatTrigger,
    onRemoveNestedChatTrigger,
    onAddNestedChatConnection,
    onRemoveRecipient,
    onNestedChatRecipientMovedUp,
    onNestedChatRecipientMovedDown,
    getMessageLabel,
    getEdgeLabel
  };
};
