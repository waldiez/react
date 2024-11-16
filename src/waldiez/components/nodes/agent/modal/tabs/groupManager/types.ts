import { WaldiezAgentNode, WaldiezAgentNodeData } from '@waldiez/models';

export type WaldiezAgentGroupManagerProps = {
  id: string;
  flowId: string;
  isDarkMode: boolean;
  data: WaldiezAgentNodeData;
  agents: WaldiezAgentNode[];
  agentConnections: {
    source: {
      nodes: WaldiezAgentNode[];
    };
    target: {
      nodes: WaldiezAgentNode[];
    };
  };
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
};
