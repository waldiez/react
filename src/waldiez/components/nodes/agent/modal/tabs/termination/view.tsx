import { Editor, InfoLabel, Select, StringList } from '@waldiez/components/inputs';
import { TerminationAgentConfigTabViewProps } from '@waldiez/components/nodes/agent/modal/tabs/termination/types';

export const TerminationAgentConfigTabView = (props: TerminationAgentConfigTabViewProps) => {
  const {
    id,
    data,
    isDarkMode,
    onTerminationTypeChange,
    onTerminationMethodChange,
    onTerminationCriterionChange,
    onAddTerminationKeyword,
    onDeleteTerminationKeyword,
    onTerminationKeywordChange
  } = props;
  const defaultTerminationMethodContent =
    data.termination.methodContent && data.termination.methodContent.length > 1
      ? data.termination.methodContent
      : DEFAULT_IS_TERMINATION_MESSAGE_METHOD_CONTENT;
  return (
    <>
      <InfoLabel
        label="Termination:"
        info="After receiving each message, the agent will send a reply to the sender unless the termination condition is met. A termination condition can be a keyword or a custom method."
      />
      <label className="hidden" htmlFor={`termination-type-${id}`}>
        Termination Type:
      </label>
      <Select
        options={terminationTypeOptions}
        value={{
          label:
            terminationTypeOptions.find(option => option.value === data.termination.type)?.label ?? 'None',
          value: data.termination?.type ?? 'none'
        }}
        onChange={onTerminationTypeChange}
        inputId={`termination-type-${id}`}
      />
      {data.termination && data.termination.type === 'method' && (
        <>
          <label>Termination Method:</label>
          <Editor
            darkMode={isDarkMode}
            value={defaultTerminationMethodContent}
            onChange={onTerminationMethodChange}
          />
        </>
      )}
      {data.termination && data.termination.type === 'keyword' && (
        <div className="margin-top-10">
          <label htmlFor={`termination-criterion-${id}`}>Termination Criterion:</label>
          <Select
            options={terminationCriterionOptions}
            value={{
              label:
                terminationCriterionOptions.find(option => option.value === data.termination?.criterion)
                  ?.label ?? 'Keyword is found',
              value: data.termination.criterion ?? 'found'
            }}
            onChange={onTerminationCriterionChange}
            inputId={`termination-criterion-${id}`}
          />
          <StringList
            viewLabel="Termination Keywords:"
            viewLabelInfo="List of keywords to check for termination."
            items={data.termination?.keywords ?? []}
            itemsType="termination-keyword"
            onItemAdded={onAddTerminationKeyword}
            onItemDeleted={onDeleteTerminationKeyword}
            onItemChange={onTerminationKeywordChange}
          />
        </div>
      )}
    </>
  );
};

const terminationCriterionOptions: {
  label: string;
  value: 'found' | 'ending' | 'exact';
}[] = [
  { label: 'Keyword is found', value: 'found' },
  {
    label: 'Keyword is the last word',
    value: 'ending'
  },
  { label: 'Exact match', value: 'exact' }
];

const terminationTypeOptions: {
  label: string;
  value: 'none' | 'keyword' | 'method';
}[] = [
  { label: 'None', value: 'none' },
  { label: 'Keyword', value: 'keyword' },
  { label: 'Method', value: 'method' }
];

const DEFAULT_IS_TERMINATION_MESSAGE_METHOD_CONTENT = `"""Custom termination message function."""
# provide the function to check if the message is a termination message
# complete the \`is_termination_message\` below. Do not change the name or the arguments of the function.
# only complete the function body and the docstring and return True if the message is a termination message, False otherwise.
# example:
# def is_termination_message(message):
#    # type: (dict[str, any]) -> bool
#    return message.get("content", "").lower() == "terminate"
#
def is_termination_message(message):
    """Complete the termination message function"""
    ...
`;
