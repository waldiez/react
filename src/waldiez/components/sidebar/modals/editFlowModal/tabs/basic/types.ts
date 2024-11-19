import { SingleValue } from '@waldiez/components/inputs';
import { EditFlowModalData } from '@waldiez/components/sidebar/modals/editFlowModal/types';
import { WaldiezEdge } from '@waldiez/models';

export type EditFlowModalModalTabBasicProps = {
  flowId: string;
  data: EditFlowModalData;
  onDataChange: (data: Partial<EditFlowModalData>) => void;
  remainingEdges: WaldiezEdge[];
  sortedEdges: WaldiezEdge[];
  selectedNewEdge: WaldiezEdge | null;
  onSelectedNewEdgeChange: (option: SingleValue<{ label: string; value: WaldiezEdge }>) => void;
  onAddEdge: () => void;
  onRemoveEdge: (edge: WaldiezEdge) => void;
  onMoveEdgeUp: (index: number) => void;
  onMoveEdgeDown: (index: number) => void;
};
