import { InfoCheckbox, NumberInput, Select, TextInput } from '@waldiez/components/inputs';
import { BasicAgentConfigTabViewProps } from '@waldiez/components/nodes/agent/modal/tabs/basic/types';
import { WaldieAgentHumanInputMode } from '@waldiez/types';

export const BasicAgentConfigTabView = (props: BasicAgentConfigTabViewProps) => {
  const {
    id,
    data,
    onRagChange,
    onNameChange,
    onDescriptionChange,
    onSystemMessageChange,
    onHumanInputModeChange,
    onMaxTokensChange,
    onMaxConsecutiveAutoReplyChange,
    onAgentDefaultAutoReplyChange
  } = props;
  return (
    <div className="agent-panel agent-config-panel">
      {(data.agentType === 'user' || data.agentType === 'rag_user') && (
        <InfoCheckbox
          label={'Use RAG'}
          info={
            'If checked, the agent will use Retrieval augmented generation (RAG) for generating responses.'
          }
          checked={data.agentType === 'rag_user'}
          onChange={onRagChange}
          dataTestId={`agent-rag-toggle-${id}`}
        />
      )}
      <TextInput
        label="Name:"
        value={data.label}
        onChange={onNameChange}
        dataTestId={`agent-name-input-${id}`}
      />
      <label>Description:</label>
      <textarea
        rows={2}
        value={data.description}
        onChange={onDescriptionChange}
        data-testid={`agent-description-input-${id}`}
      />
      <label>System Message:</label>
      <textarea
        rows={2}
        value={data.systemMessage ?? ''}
        onChange={onSystemMessageChange}
        data-testid={`agent-system-message-input-${id}`}
      />
      <label htmlFor={`agent-human-input-mode-select-${id}`}>Human Input mode:</label>
      <Select
        options={inputMethodOptions}
        value={{
          label: inputMethodsMapping[data.humanInputMode],
          value: data.humanInputMode
        }}
        onChange={onHumanInputModeChange}
        inputId={`agent-human-input-mode-select-${id}`}
      />
      <NumberInput
        label="Max tokens:"
        value={data.maxTokens}
        onChange={onMaxTokensChange}
        min={0}
        max={50000}
        step={1}
        forceInt
        setNullOnLower={true}
        onLowerLabel="Unset"
        labelInfo="Maximum number of tokens to use for the agent."
        dataTestId={`agent-max-tokens-input-${id}`}
      />
      <NumberInput
        label="Max consecutive auto reply: "
        value={data.maxConsecutiveAutoReply}
        onChange={onMaxConsecutiveAutoReplyChange}
        min={0}
        max={1001}
        step={1}
        setNullOnUpper={true}
        setNullOnLower={false}
        onLowerLabel="No auto reply"
        onUpperLabel="Unset"
        labelInfo="Maximum number of consecutive auto replies. If set to zero, no auto reply will be generated."
        dataTestId={`agent-max-consecutive-auto-reply-input-${id}`}
      />
      <TextInput
        label="Agent Default Auto Reply:"
        value={data.agentDefaultAutoReply ?? ''}
        onChange={onAgentDefaultAutoReplyChange}
        dataTestId={`agent-default-auto-reply-input-${id}`}
      />
      <div className="margin-bottom-10" />
    </div>
  );
};
const inputMethodsMapping = {
  ALWAYS: 'Always',
  NEVER: 'Never',
  TERMINATE: 'Terminate'
};
const inputMethodOptions: {
  label: string;
  value: WaldieAgentHumanInputMode;
}[] = [
  { label: 'Always', value: 'ALWAYS' },
  { label: 'Never', value: 'NEVER' },
  { label: 'Terminate', value: 'TERMINATE' }
];
