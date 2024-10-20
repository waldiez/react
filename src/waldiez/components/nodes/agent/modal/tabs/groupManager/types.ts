import { WaldieAgentNode, WaldieEdge, WaldieNodeGroupManagerData } from '@waldiez/models';

export type GroupManagerNodeTabProps = {
  flowId: string;
  id: string;
  data: WaldieNodeGroupManagerData;
  isDarkMode: boolean;
  nodeConnections: {
    source: {
      nodes: WaldieAgentNode[];
      edges: WaldieEdge[];
    };
    target: {
      nodes: WaldieAgentNode[];
      edges: WaldieEdge[];
    };
  };
  onDataChange: (data: WaldieNodeGroupManagerData) => void;
};
