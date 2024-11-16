import { Select, SingleValue } from '@waldiez/components/inputs';
import { WaldiezAgentNestedChat } from '@waldiez/models';

export const WaldiezAgentNestedChatsTriggers = (props: {
  chat: WaldiezAgentNestedChat;
  id: string;
  selectOptions: {
    label: string;
    value: string;
  }[];
  selectedTrigger: {
    id: string;
    isReply: boolean;
  } | null;
  getEdgeLabel: (id: string) => string;
  onSelectedTriggerChange: (option: SingleValue<{ label: string; value: string }> | null) => void;
  onSelectedTriggerIsReplyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddNestedChatTrigger: () => void;
  onRemoveNestedChatTrigger: (index: number) => void;
}) => {
  const {
    chat,
    id,
    selectOptions,
    selectedTrigger,
    getEdgeLabel,
    onSelectedTriggerChange,
    onSelectedTriggerIsReplyChange,
    onAddNestedChatTrigger,
    onRemoveNestedChatTrigger
  } = props;
  const selectedTriggerValue = selectedTrigger
    ? {
        label: getEdgeLabel(selectedTrigger.id),
        value: selectedTrigger.id
      }
    : null;
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
            options={selectOptions}
            value={selectedTriggerValue}
            onChange={onSelectedTriggerChange}
            inputId={`new-nested-chat-select-trigger-${id}`}
          />
        </div>
        <label className="checkbox-label nested-chat-agent-reply-label">
          <div>Agent's Reply</div>
          <input
            type="checkbox"
            checked={selectedTrigger?.isReply ?? false}
            onChange={onSelectedTriggerIsReplyChange}
            data-testid={`new-nested-chat-trigger-is-agent-reply-${id}`}
          />
          <div className="checkbox"></div>
        </label>
        <button
          className="add-nested-chat margin-left-10"
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
