import { SingleValue } from 'react-select';

import { TerminationAgentConfigTabProps } from '@waldiez/components/nodes/agent/modal/tabs/termination/types';
import { TerminationAgentConfigTabView } from '@waldiez/components/nodes/agent/modal/tabs/termination/view';

export const TerminationAgentConfigTab = (props: TerminationAgentConfigTabProps) => {
  const { id, data, isDarkMode, onDataChange } = props;
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
  return (
    <TerminationAgentConfigTabView
      id={id}
      data={data}
      isDarkMode={isDarkMode}
      onTerminationTypeChange={onTerminationTypeChange}
      onTerminationMethodChange={onTerminationMethodChange}
      onTerminationCriterionChange={onTerminationCriterionChange}
      onAddTerminationKeyword={onAddTerminationKeyword}
      onDeleteTerminationKeyword={onDeleteTerminationKeyword}
      onTerminationKeywordChange={onTerminationKeywordChange}
    />
  );
};
