import { SingleValue } from '@waldiez/components/inputs';
import { WaldieEdge } from '@waldiez/models';

export * from '@waldiez/components/flow/modal/tabs/types';
export type FlowModalData = {
  name: string;
  description: string;
  tags: string[];
  requirements: string[];
};

export type EditFlowModalProps = {
  flowId: string;
  data: FlowModalData;
  isOpen: boolean;
  onDiscard: () => void;
  onSubmit: (data: {
    name: string;
    description: string;
    tags: string[];
    requirements: string[];
    orders: { id: string; order: number }[];
  }) => void;
};

export type EditFlowModalViewProps = {
  flowId: string;
  isOpen: boolean;
  data: FlowModalData;
  onCancel: () => void;
  onClose: () => void;
  onDataChange: (data: Partial<FlowModalData>) => void;
  // order
  remainingEdges: WaldieEdge[];
  sortedEdges: WaldieEdge[];
  selectedNewEdge: WaldieEdge | null;
  onSelectedNewEdgeChange: (option: SingleValue<{ label: string; value: WaldieEdge }>) => void;
  onAddEdge: () => void;
  onRemoveEdge: (edge: WaldieEdge) => void;
  onMoveEdgeUp: (index: number) => void;
  onMoveEdgeDown: (index: number) => void;
  onSubmit: () => void;
};
