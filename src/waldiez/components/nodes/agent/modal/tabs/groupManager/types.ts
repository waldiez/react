import { WaldiezAgentNode, WaldiezEdge, WaldiezNodeGroupManagerData } from '@waldiez/models';

export type GroupManagerNodeTabProps = {
  flowId: string;
  id: string;
  data: WaldiezNodeGroupManagerData;
  isDarkMode: boolean;
  nodeConnections: {
    source: {
      nodes: WaldiezAgentNode[];
      edges: WaldiezEdge[];
    };
    target: {
      nodes: WaldiezAgentNode[];
      edges: WaldiezEdge[];
    };
  };
  onDataChange: (data: WaldiezNodeGroupManagerData) => void;
};
