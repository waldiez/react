import { Select } from '@waldiez/components/inputs';
import { NestedChatsAgentConfigTabMessagesViewProps } from '@waldiez/components/nodes/agent/modal/tabs/nestedChats/view/types';

export const NestedChatsAgentConfigTabMessagesView = (props: NestedChatsAgentConfigTabMessagesViewProps) => {
  const {
    id,
    chat,
    allOptions,
    selectedRecipient,
    getEdgeLabel,
    getMessageLabel,
    setSelectedRecipient,
    onAddNestedChatConnection,
    onRemoveRecipient,
    onNestedChatRecipientMovedUp,
    onNestedChatRecipientMovedDown
  } = props;
  return (
    <div className="nested-chat-messages margin-top-10">
      <div className="info margin-bottom-10">
        <b>Messages:</b> Specifies which nested chat will be triggered. The final message is returned to the
        main chat. <br />
        <b>Agent's Reply:</b> Indicates the recipient of the trigger message. If selected, it is the second in
        the order. For example, if "User =&gt; Assistant" with the box ticked, the message is sent to the
        Assistant; otherwise, it is sent to the user.
      </div>
      <label className="nested-chat-messages-label">Messages:</label>
      <div className="nested-chats-add-message">
        <div className="nested-chat-recipients">
          <label className="hidden" htmlFor={`new-nested-chat-select-recipient-${id}`}>
            Recipient
          </label>
          <Select
            options={allOptions}
            onChange={selected => {
              if (selected && selected.value) {
                setSelectedRecipient({
                  id: selected.value,
                  isReply: selectedRecipient?.isReply ?? false
                });
              }
            }}
            value={
              selectedRecipient
                ? {
                    label: getEdgeLabel(selectedRecipient.id),
                    value: selectedRecipient.id
                  }
                : null
            }
            inputId={`new-nested-chat-select-recipient-${id}`}
          />
        </div>
        <label className="checkbox-label nested-chat-agent-reply-label margin-left-10">
          <div>Agent's Reply</div>
          <input
            type="checkbox"
            checked={selectedRecipient?.isReply ?? false}
            onChange={event => {
              if (selectedRecipient) {
                setSelectedRecipient({
                  id: selectedRecipient.id,
                  isReply: event.target.checked
                });
              }
            }}
            data-testid={`new-nested-chat-recipient-is-agent-reply-${id}`}
          />
          <div className="checkbox"></div>
        </label>
        <div className="nested-chat-add-button margin-left-10 margin-top-10">
          <button
            className="add-nested-chat"
            disabled={!selectedRecipient || !selectedRecipient.id}
            onClick={onAddNestedChatConnection}
            data-testid={`new-nested-chat-add-recipient-${id}`}
          >
            Add
          </button>
        </div>
      </div>
      <div className="nested-chats-registered-messages">
        {chat.messages.length === 0 ? (
          <div className="nested-chat-registered-message">No messages to include</div>
        ) : (
          <div className="flex-1">
            {chat.messages.map((target, index) => {
              return (
                <div
                  key={`${target.id}-${index}`}
                  className="nested-chat-registered-message"
                  data-testid={`nested-chat-message-${id}-0`}
                >
                  {getMessageLabel(index)}
                  {target.isReply ? ' (Reply)' : ''}
                  <div className="nested-chat-message-actions">
                    {chat.messages.length > 1 && index !== 0 && (
                      <div className="nested-chat-reorder">
                        <button
                          onClick={() => onNestedChatRecipientMovedUp(index)}
                          data-testid={`nested-chat-reorder-up-${index}`}
                        >
                          &uarr;
                        </button>
                      </div>
                    )}
                    {chat.messages.length > 1 && index !== chat.messages.length - 1 && (
                      <div className="nested-chat-reorder">
                        <button
                          onClick={() => onNestedChatRecipientMovedDown(index)}
                          data-testid={`nested-chat-reorder-down-${index}`}
                        >
                          &darr;
                        </button>
                      </div>
                    )}
                    <div className="nested-chat-remove">
                      <button
                        onClick={() => onRemoveRecipient(index)}
                        data-testid={`remove-nested-chat-recipient-${index}`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
