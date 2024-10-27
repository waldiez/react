import { Select } from '@waldiez/components/inputs';
import { NestedChatsAgentConfigTabTriggersViewProps } from '@waldiez/components/nodes/agent/modal/tabs/nestedChats/view/types';

export const NestedChatsAgentConfigTabTriggersView = (props: NestedChatsAgentConfigTabTriggersViewProps) => {
  const {
    id,
    chat,
    allOptions,
    selectedTrigger,
    getEdgeLabel,
    setSelectedTrigger,
    onAddNestedChatTrigger,
    onRemoveNestedChatTrigger
  } = props;
  return (
    <div className="nested-chat-triggers margin-top-20">
      <div className="info margin-bottom-10">
        <b>Trigged by:</b> The agent triggers a sequence of nested chats when a message is received. If it is
        the termination message of a selected chat (e.g., max turns is set to 1) the trigger won't be
        activated.
        <br />
        <b>Agent's Reply:</b> Should be selected if the current agent has initiated the chat to trigger the
        nested chat. If selected, the trigger message is passed to the first nested chat recipient defined in
        “Messages”.
        <br />
      </div>
      <label className="nested-chat-triggers-label">Triggered by:</label>
      <div className="nested-chat-select-trigger-view">
        <div className="nested-chat-select-trigger">
          <label className="hidden" htmlFor={`new-nested-chat-select-trigger-${id}`}>
            Trigger
          </label>
          <Select
            options={allOptions}
            value={
              selectedTrigger
                ? {
                    label: getEdgeLabel(selectedTrigger.id),
                    value: selectedTrigger.id
                  }
                : null
            }
            onChange={selected => {
              if (selected && selected.value) {
                setSelectedTrigger({
                  id: selected.value,
                  isReply: selectedTrigger?.isReply ?? false
                });
              }
            }}
            inputId={`new-nested-chat-select-trigger-${id}`}
          />
        </div>
        <label className="checkbox-label nested-chat-agent-reply-label">
          <div>Agent's Reply</div>
          <input
            type="checkbox"
            checked={selectedTrigger?.isReply ?? false}
            onChange={event => {
              if (selectedTrigger) {
                setSelectedTrigger({
                  id: selectedTrigger.id,
                  isReply: event.target.checked
                });
              }
            }}
            data-testid={`new-nested-chat-trigger-is-agent-reply-${id}`}
          />
          <div className="checkbox"></div>
        </label>
        <button
          className="add-nested-chat margin-left-10 margin-top-10"
          disabled={!selectedTrigger || !selectedTrigger.id}
          onClick={onAddNestedChatTrigger}
          data-testid={`new-nested-chat-add-button-${id}`}
        >
          Add
        </button>
      </div>
      {chat.triggeredBy.length === 0 ? (
        <div className="nested-chat-current-triggers margin-top-10 margin-bottom-10">
          No triggers to register
        </div>
      ) : (
        <div className="nested-chat-current-triggers">
          {chat.triggeredBy.map((trigger, index) => {
            return (
              <div className="nested-chat-trigger-entry" key={`${trigger.id}-${index}`}>
                {getEdgeLabel(trigger.id)} {trigger.isReply ? '(Reply)' : ''}
                <div className="margin-left-10">
                  <div className="nested-chat-remove">
                    <button
                      className="remove-nested-chat"
                      onClick={onRemoveNestedChatTrigger.bind(null, index)}
                      data-testid={`remove-nested-chat-trigger-${index}`}
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
  );
};
