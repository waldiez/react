import { SingleValue } from '@waldiez/components/inputs';
import { WaldiezAgentNodeData } from '@waldiez/models';
import { useWaldiezContext } from '@waldiez/store';
import { isDarkMode } from '@waldiez/theme';

export const useWaldiezAgentTermination = (props: {
  data: WaldiezAgentNodeData;
  onDataChange: (data: Partial<WaldiezAgentNodeData>) => void;
}) => {
  const { data, onDataChange } = props;
  const flowId = useWaldiezContext(s => s.flowId);
  const storageId = useWaldiezContext(s => s.storageId);
  const isDark = isDarkMode(flowId, storageId ?? flowId);
  const onTerminationTypeChange = (
    option: SingleValue<{
      label: string;
      value: 'none' | 'keyword' | 'method';
    }>
  ) => {
    if (option) {
      onDataChange({
        termination: {
          ...data.termination,
          type: option.value
        }
      });
    }
  };
  const onTerminationMethodChange = (content?: string) => {
    if (content) {
      onDataChange({
        termination: {
          ...data.termination,
          methodContent: content
        }
      });
    }
  };
  const onTerminationCriterionChange = (
    option: SingleValue<{
      label: string;
      value: 'found' | 'ending' | 'exact';
    }>
  ) => {
    if (option) {
      onDataChange({
        termination: {
          ...data.termination,
          criterion: option.value
        }
      });
    }
  };
  const onAddTerminationKeyword = (keyword: string) => {
    onDataChange({
      termination: {
        ...data.termination,
        keywords: [...data.termination.keywords, keyword]
      }
    });
  };
  const onDeleteTerminationKeyword = (keyword: string) => {
    onDataChange({
      termination: {
        ...data.termination,
        keywords: data.termination.keywords.filter(k => k !== keyword)
      }
    });
  };
  const onTerminationKeywordChange = (oldKeyword: string, newKeyword: string) => {
    onDataChange({
      termination: {
        ...data.termination,
        keywords: data.termination.keywords.map(keyword => (keyword === oldKeyword ? newKeyword : keyword))
      }
    });
  };
  const defaultTerminationMethodContent =
    data.termination.methodContent && data.termination.methodContent.length > 1
      ? data.termination.methodContent
      : DEFAULT_IS_TERMINATION_MESSAGE_METHOD_CONTENT;
  return {
    terminationCriterionOptions,
    terminationTypeOptions,
    defaultTerminationMethodContent,
    isDarkMode: isDark,
    onTerminationTypeChange,
    onTerminationMethodChange,
    onTerminationCriterionChange,
    onAddTerminationKeyword,
    onDeleteTerminationKeyword,
    onTerminationKeywordChange
  };
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
