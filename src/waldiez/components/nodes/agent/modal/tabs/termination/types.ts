import { WaldiezAgentNodeData } from '@waldiez/models';

export type WaldiezAgentTerminationProps = {
  id: string;
  data: WaldiezAgentNodeData;
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
};
