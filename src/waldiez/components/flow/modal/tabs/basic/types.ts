import { FlowModalData } from '@waldiez/components/flow/modal/types';
import { SingleValue } from '@waldiez/components/inputs';
import { WaldieEdge } from '@waldiez/models';

export type WaldieFlowModalBasicTabProps = {
  flowId: string;
  data: FlowModalData;
  onDataChange: (data: Partial<FlowModalData>) => void;
  remainingEdges: WaldieEdge[];
  sortedEdges: WaldieEdge[];
  selectedNewEdge: WaldieEdge | null;
  onSelectedNewEdgeChange: (option: SingleValue<{ label: string; value: WaldieEdge }>) => void;
  onAddEdge: () => void;
  onRemoveEdge: (edge: WaldieEdge) => void;
  onMoveEdgeUp: (index: number) => void;
  onMoveEdgeDown: (index: number) => void;
};
export type WaldieFlowModalBasicTabViewProps = {
  flowId: string;
  name: string;
  description: string;
  remainingEdges: WaldieEdge[];
  sortedEdges: WaldieEdge[];
  selectedNewEdge: WaldieEdge | null;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSelectedNewEdgeChange: (option: SingleValue<{ label: string; value: WaldieEdge }>) => void;
  onAddEdge: () => void;
  onRemoveEdge: (edge: WaldieEdge) => void;
  onMoveEdgeUp: (index: number) => void;
  onMoveEdgeDown: (index: number) => void;
};
