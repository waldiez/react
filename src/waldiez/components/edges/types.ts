import { EdgeProps } from '@xyflow/react';

import { WaldieAgentNode, WaldieEdge, WaldieEdgeType } from '@waldiez/models';

export type WaldieEdgeViewProps = EdgeProps<WaldieEdge> & {
  type: WaldieEdgeType;
  sourceAgent: WaldieAgentNode | null;
  onOpenModal: (event: React.MouseEvent) => void;
  onDelete: () => void;
};
