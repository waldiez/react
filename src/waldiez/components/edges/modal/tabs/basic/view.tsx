import { WaldieEdgeBasicTabViewProps } from '@waldiez/components/edges/modal/tabs/basic/types';
import { InfoLabel, NumberInput, Select } from '@waldiez/components/inputs';
import { WaldieEdgeLlmSummaryMethod, WaldieEdgeType } from '@waldiez/models';

export const WaldieEdgeBasicTabView = (props: WaldieEdgeBasicTabViewProps) => {
  const {
    data,
    edgeId,
    edgeType,
    onEdgeTypeChange,
    onLabelChange,
    onDescriptionChange,
    onClearHistoryChange,
    onMaxTurnsChange,
    onSummaryMethodChange,
    onLlmPromptChange,
    onLlmSummaryRoleChange
  } = props;
  const getEdgeSummaryLabel = () => {
    const args = data.summary.args;
    if ('summary_role' in args && ['system', 'user', 'assistant'].includes(args.summary_role)) {
      const role = args.summary_role;
      return role[0].toUpperCase() + role.slice(1);
    }
    return 'System';
  };
  const summaryMethodLabel = summaryMethodMapping[data.summary.method ?? 'none'];
  const summaryRoleValue = data?.summary.args?.summary_role ?? 'system';
  const summaryRoleLabel = getEdgeSummaryLabel();
  const chatTypeLabel = edgeTypeOptions.find(option => option.value === edgeType)?.label as string;
  const currentSelectedChatType = {
    label: chatTypeLabel,
    value: edgeType as WaldieEdgeType
  };
  return (
    <div className="flex-column">
      {edgeType !== 'group' && (
        <>
          <InfoLabel label="Chat Type:" info="The type of the chat." />
          {/* for tests */}
          <label className="hidden" htmlFor={`select-chat-type-${edgeId}`}>
            Chat Type:
          </label>
          <Select
            options={edgeTypeOptions}
            value={currentSelectedChatType}
            onChange={onEdgeTypeChange}
            inputId={`select-chat-type-${edgeId}`}
          />
        </>
      )}
      <label>Name:</label>
      <input
        type="text"
        defaultValue={data.label}
        onChange={onLabelChange}
        data-testid={`edge-${edgeId}-label-input`}
      />
      <label>Description:</label>
      <textarea
        rows={2}
        defaultValue={data.description}
        onChange={onDescriptionChange}
        data-testid={`edge-${edgeId}-description-input`}
      />
      {edgeType !== 'group' && (
        <>
          <label className="checkbox-label clear-history-checkbox">
            <div>Clear History</div>
            <input
              type="checkbox"
              defaultChecked={data.clearHistory}
              onChange={onClearHistoryChange}
              data-testid={`edge-${edgeId}-clear-history-checkbox`}
            />
            <div className="checkbox"></div>
          </label>
          <NumberInput
            label="Max Turns:"
            min={0}
            max={100}
            value={data.maxTurns}
            onChange={onMaxTurnsChange}
            onNull={0}
            setNullOnLower={true}
            onLowerLabel="No limit"
            labelInfo="The maximum number of turns in the conversation. If set to 0, there is no limit."
            dataTestId={`edge-${edgeId}-max-turns-input`}
          />
          <InfoLabel label="Summary Method:" info="The method to be used to summarize the conversation." />
          {/* for tests */}
          <label className="hidden" htmlFor={`select-summary-method-${edgeId}`}>
            Summary Method:
          </label>
          <Select
            options={summaryOptions}
            value={{
              label: summaryMethodLabel,
              value: data.summary.method
            }}
            onChange={onSummaryMethodChange}
            inputId={`select-summary-method-${edgeId}`}
          />
          {data.summary.method === 'reflection_with_llm' && (
            <>
              <InfoLabel label="Summary Prompt:" info="The prompt to be used for the summary generation." />
              <textarea
                rows={2}
                defaultValue={data.summary.prompt}
                onChange={onLlmPromptChange}
                data-testid={`edge-${edgeId}-llm-prompt-input`}
              />
              <label htmlFor={`select-summary-role-${edgeId}`}>Summary Role:</label>
              <Select
                options={summaryRoleOptions}
                value={{
                  label: summaryRoleLabel,
                  value: summaryRoleValue
                }}
                onChange={onLlmSummaryRoleChange}
                inputId={`select-summary-role-${edgeId}`}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
const summaryRoleOptions = [
  { label: 'System', value: 'system' },
  { label: 'User', value: 'user' },
  { label: 'Assistant', value: 'assistant' }
];
const summaryOptions: {
  label: string;
  value: WaldieEdgeLlmSummaryMethod;
}[] = [
  { label: 'None', value: null },
  { label: 'Reflection with LLM', value: 'reflection_with_llm' },
  { label: 'Last Message', value: 'last_msg' }
];
const edgeTypeOptions: {
  label: string;
  value: WaldieEdgeType;
}[] = [
  { label: 'Chat', value: 'chat' },
  { label: 'Nested Chat', value: 'nested' }
];
const summaryMethodMapping = {
  reflection_with_llm: 'Reflection with LLM',
  last_msg: 'Last Message',
  none: 'None'
};
