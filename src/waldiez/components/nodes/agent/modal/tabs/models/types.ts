import { MultiValue } from '@waldiez/components/inputs';
import { WaldiezAgentNodeData, WaldiezModelNode } from '@waldiez/models';

export type ModelsAgentConfigTabProps = {
  id: string;
  data: WaldiezAgentNodeData;
  models: WaldiezModelNode[];
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
};
export type ModelsAgentConfigTabViewProps = {
  id: string;
  models: WaldiezModelNode[];
  data: WaldiezAgentNodeData;
  onModelsChange: (options: MultiValue<{ label: string; value: string }>) => void;
};
