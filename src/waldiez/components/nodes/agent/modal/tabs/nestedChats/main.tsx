import { useWaldiezAgentNestedChats } from '@waldiez/components/nodes/agent/modal/tabs/nestedChats/hooks';
import { WaldiezAgentNestedChatsMessages } from '@waldiez/components/nodes/agent/modal/tabs/nestedChats/messages';
import { WaldiezAgentNestedChatsTriggers } from '@waldiez/components/nodes/agent/modal/tabs/nestedChats/triggers';
import { WaldiezAgentNestedChatsProps } from '@waldiez/components/nodes/agent/modal/tabs/nestedChats/types';

export const WaldiezAgentNestedChats = (props: WaldiezAgentNestedChatsProps) => {
  const { id } = props;
  const {
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
  } = useWaldiezAgentNestedChats(props);
  return (
    <div className="agent-panel agent-nestedChats-panel margin-top--10">
      <WaldiezAgentNestedChatsTriggers
        id={id}
        chat={chat}
        selectedTrigger={selectedTrigger}
        onSelectedTriggerChange={onSelectedTriggerChange}
        onSelectedTriggerIsReplyChange={onSelectedTriggerIsReplyChange}
        onAddNestedChatTrigger={onAddNestedChatTrigger}
        onRemoveNestedChatTrigger={onRemoveNestedChatTrigger}
        getEdgeLabel={getEdgeLabel}
        selectOptions={selectOptions}
      />
      {chat.triggeredBy.length > 0 && (
        <>
          <hr style={{ width: '100%', opacity: 0.5 }} />
          <WaldiezAgentNestedChatsMessages
            id={id}
            chat={chat}
            selectOptions={selectOptions}
            selectedRecipient={selectedRecipient}
            onSelectedRecipientChange={onSelectedRecipientChange}
            onSelectedRecipientIsReplyChange={onSelectedRecipientIsReplyChange}
            onAddNestedChatConnection={onAddNestedChatConnection}
            onRemoveRecipient={onRemoveRecipient}
            onNestedChatRecipientMovedUp={onNestedChatRecipientMovedUp}
            onNestedChatRecipientMovedDown={onNestedChatRecipientMovedDown}
            getMessageLabel={getMessageLabel}
            getEdgeLabel={getEdgeLabel}
          />
        </>
      )}
    </div>
  );
};
