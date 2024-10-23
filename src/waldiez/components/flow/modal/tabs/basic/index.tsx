import { WaldiezFlowModalBasicTabProps } from '@waldiez/components/flow/modal/tabs/basic/types';
import { WaldiezFlowModalBasicTabView } from '@waldiez/components/flow/modal/tabs/basic/view';

export const WaldiezFlowModalBasicTab = (props: WaldiezFlowModalBasicTabProps) => {
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
    <WaldiezFlowModalBasicTabView
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
