import { EdgeProps } from '@xyflow/react';

import { WaldiezAgentNode, WaldiezEdge, WaldiezEdgeType } from '@waldiez/models';

export type WaldiezEdgeViewProps = EdgeProps<WaldiezEdge> & {
  type: WaldiezEdgeType;
  sourceAgent: WaldiezAgentNode | null;
  onOpenModal: (event: React.MouseEvent) => void;
  onDelete: () => void;
};
