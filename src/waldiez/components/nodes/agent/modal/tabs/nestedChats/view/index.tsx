import { NestedChatsAgentConfigTabViewProps } from '@waldiez/components/nodes/agent/modal/tabs/nestedChats/types';
import { NestedChatsAgentConfigTabMessagesView } from '@waldiez/components/nodes/agent/modal/tabs/nestedChats/view/messages';
import { NestedChatsAgentConfigTabTriggersView } from '@waldiez/components/nodes/agent/modal/tabs/nestedChats/view/triggers';

export const NestedChatsAgentConfigTabView = (props: NestedChatsAgentConfigTabViewProps) => {
  const {
    id,
    chat,
    allOptions,
    selectedTrigger,
    selectedRecipient,
    getEdgeLabel,
    getMessageLabel,
    setSelectedTrigger,
    setSelectedRecipient,
    onAddNestedChatTrigger,
    onRemoveNestedChatTrigger,
    onAddNestedChatConnection,
    onRemoveRecipient,
    onNestedChatRecipientMovedUp,
    onNestedChatRecipientMovedDown
  } = props;
  return (
    <div className="agent-panel agent-models-panel">
      <NestedChatsAgentConfigTabTriggersView
        id={id}
        chat={chat}
        allOptions={allOptions}
        selectedTrigger={selectedTrigger}
        getEdgeLabel={getEdgeLabel}
        setSelectedTrigger={setSelectedTrigger}
        onAddNestedChatTrigger={onAddNestedChatTrigger}
        onRemoveNestedChatTrigger={onRemoveNestedChatTrigger}
      />
      {chat.triggeredBy.length > 0 && (
        <NestedChatsAgentConfigTabMessagesView
          id={id}
          chat={chat}
          allOptions={allOptions}
          selectedRecipient={selectedRecipient}
          getEdgeLabel={getEdgeLabel}
          getMessageLabel={getMessageLabel}
          setSelectedRecipient={setSelectedRecipient}
          onAddNestedChatConnection={onAddNestedChatConnection}
          onRemoveRecipient={onRemoveRecipient}
          onNestedChatRecipientMovedUp={onNestedChatRecipientMovedUp}
          onNestedChatRecipientMovedDown={onNestedChatRecipientMovedDown}
        />
      )}
    </div>
  );
};
