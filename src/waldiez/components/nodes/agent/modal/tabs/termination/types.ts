import { SingleValue } from '@waldiez/components/inputs';
import { WaldieAgentNodeData } from '@waldiez/models';

export type TerminationAgentConfigTabProps = {
  id: string;
  data: WaldieAgentNodeData;
  isDarkMode: boolean;
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
};

export type TerminationAgentConfigTabViewProps = {
  id: string;
  data: WaldieAgentNodeData;
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
