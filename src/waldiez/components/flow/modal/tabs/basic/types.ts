import { FlowModalData } from '@waldiez/components/flow/modal/types';
import { SingleValue } from '@waldiez/components/inputs';
import { WaldiezEdge } from '@waldiez/models';

export type WaldiezFlowModalBasicTabProps = {
  flowId: string;
  data: FlowModalData;
  onDataChange: (data: Partial<FlowModalData>) => void;
  remainingEdges: WaldiezEdge[];
  sortedEdges: WaldiezEdge[];
  selectedNewEdge: WaldiezEdge | null;
  onSelectedNewEdgeChange: (option: SingleValue<{ label: string; value: WaldiezEdge }>) => void;
  onAddEdge: () => void;
  onRemoveEdge: (edge: WaldiezEdge) => void;
  onMoveEdgeUp: (index: number) => void;
  onMoveEdgeDown: (index: number) => void;
};
export type WaldiezFlowModalBasicTabViewProps = {
  flowId: string;
  name: string;
  description: string;
  remainingEdges: WaldiezEdge[];
  sortedEdges: WaldiezEdge[];
  selectedNewEdge: WaldiezEdge | null;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSelectedNewEdgeChange: (option: SingleValue<{ label: string; value: WaldiezEdge }>) => void;
  onAddEdge: () => void;
  onRemoveEdge: (edge: WaldiezEdge) => void;
  onMoveEdgeUp: (index: number) => void;
  onMoveEdgeDown: (index: number) => void;
};
