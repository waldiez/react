import { WaldieFlowModalBasicTabProps } from '@waldiez/components/flow/modal/tabs/basic/types';
import { WaldieFlowModalBasicTabView } from '@waldiez/components/flow/modal/tabs/basic/view';

export const WaldieFlowModalBasicTab = (props: WaldieFlowModalBasicTabProps) => {
  const {
    flowId,
    data,
    remainingEdges,
    sortedEdges,
    selectedNewEdge,
    onDataChange,
    onSelectedNewEdgeChange,
    onAddEdge,
    onRemoveEdge,
    onMoveEdgeUp,
    onMoveEdgeDown
  } = props;
  const { name, description } = data;
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    onDataChange({ name });
  };
  const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const description = event.target.value;
    onDataChange({ description });
  };
  return (
    <WaldieFlowModalBasicTabView
      flowId={flowId}
      name={name}
      description={description}
      remainingEdges={remainingEdges}
      sortedEdges={sortedEdges}
      selectedNewEdge={selectedNewEdge}
      onNameChange={onNameChange}
      onDescriptionChange={onDescriptionChange}
      onSelectedNewEdgeChange={onSelectedNewEdgeChange}
      onAddEdge={onAddEdge}
      onRemoveEdge={onRemoveEdge}
      onMoveEdgeUp={onMoveEdgeUp}
      onMoveEdgeDown={onMoveEdgeDown}
    />
  );
};
