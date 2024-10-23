import { SingleValue } from '@waldiez/components/inputs';
import { WaldiezAgentNodeData } from '@waldiez/models';

export type TerminationAgentConfigTabProps = {
  id: string;
  data: WaldiezAgentNodeData;
  isDarkMode: boolean;
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
};

export type TerminationAgentConfigTabViewProps = {
  id: string;
  data: WaldiezAgentNodeData;
  isDarkMode: boolean;
  onTerminationTypeChange: (
    option: SingleValue<{
      label: string;
      value: 'none' | 'keyword' | 'method';
    }>
  ) => void;
  onTerminationMethodChange: (content?: string) => void;
  onTerminationCriterionChange: (
    option: SingleValue<{
      label: string;
      value: 'found' | 'ending' | 'exact';
    }>
  ) => void;
  onAddTerminationKeyword: (keyword: string) => void;
  onDeleteTerminationKeyword: (keyword: string) => void;
  onTerminationKeywordChange: (oldKeyword: string, newKeyword: string) => void;
};
