import { MultiValue } from '@waldiez/components/inputs';
import { WaldieAgentNodeData, WaldieModelNode } from '@waldiez/models';

export type ModelsAgentConfigTabProps = {
  id: string;
  data: WaldieAgentNodeData;
  models: WaldieModelNode[];
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
};
export type ModelsAgentConfigTabViewProps = {
  id: string;
  models: WaldieModelNode[];
  data: WaldieAgentNodeData;
  onModelsChange: (options: MultiValue<{ label: string; value: string }>) => void;
};
