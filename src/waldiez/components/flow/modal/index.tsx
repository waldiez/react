import { useEffect, useState } from 'react';

import { EditFlowModalProps, FlowModalData } from '@waldiez/components/flow/modal/types';
import { EditFlowModalView } from '@waldiez/components/flow/modal/view';
import { SingleValue } from '@waldiez/components/inputs';
import { WaldiezEdge } from '@waldiez/models';
import { useWaldiezContext } from '@waldiez/store';

export const FlowModal = (props: EditFlowModalProps) => {
  const { flowId, data, isOpen, onSubmit, onDiscard } = props;
  const { name, description, requirements, tags } = data;
  const [flowData, setFlowData] = useState<FlowModalData>({
    name,
    description,
    requirements,
    tags
  });
  const [selectedNewEdge, setSelectedNewEdge] = useState<WaldiezEdge | null>(null);
  const getFlowEdges = useWaldiezContext(selector => selector.getFlowEdges);
  const [sortedEdges, remainingEdges] = getFlowEdges();
  // tmp state (to save onSubmit, discard onCancel)
  const [sortedEdgesState, setSortedEdgesState] = useState<WaldiezEdge[]>(sortedEdges);
  const [remainingEdgesState, setRemainingEdgeState] = useState<WaldiezEdge[]>(remainingEdges);
  useEffect(() => {
    setFlowData({ name, description, requirements, tags });
  }, [name, description, requirements, tags, isOpen]);
  useEffect(() => {
    const [sortedEdges, remainingEdges] = getFlowEdges();
    setSortedEdgesState(sortedEdges);
    setRemainingEdgeState(remainingEdges);
  }, [isOpen]);
  // submit/cancel/close
  const onSubmitChanges = () => {
    const edgeOrders = sortedEdgesState
      .map((edge, index) => ({
        id: edge.id,
        order: index + 1
      }))
      .concat(
        remainingEdgesState.map(edge => ({
          id: edge.id,
          order: -1
        }))
      );
    const dataToSubmit = {
      ...flowData,
      orders: edgeOrders
    };
    onSubmit(dataToSubmit);
  };
  const reset = () => {
    setFlowData({ name, description, requirements, tags });
    setSortedEdgesState(sortedEdges);
    setRemainingEdgeState(remainingEdges);
  };
  const onDiscardChanges = () => {
    reset();
    onDiscard();
  };
  const onDataChange = (partialData: Partial<FlowModalData>) => {
    setFlowData({ ...flowData, ...partialData });
  };
  const onSelectedNewEdgeChange = (option: SingleValue<{ label: string; value: WaldiezEdge }>) => {
    if (option) {
      setSelectedNewEdge(option.value);
    }
  };
  const getNewEdgeOrder = () => {
    // find the last order
    let lastOrder = sortedEdgesState[sortedEdgesState.length - 1]?.data?.order;
    if (lastOrder === undefined) {
      lastOrder = sortedEdgesState.length;
    } else {
      lastOrder++;
    }
    if (lastOrder < 0) {
      lastOrder = 0;
    }
    return lastOrder;
  };
  const onAddEdge = () => {
    if (!selectedNewEdge) {
      return;
    }
    // it should be in the 'remaining' list
    if (!remainingEdgesState.find(e => e.id === selectedNewEdge.id)) {
      return;
    }
    const lastOrder = getNewEdgeOrder();
    selectedNewEdge.data = {
      ...selectedNewEdge.data,
      order: lastOrder
    } as any;
    setSortedEdgesState([...sortedEdgesState, selectedNewEdge]);
    setRemainingEdgeState(remainingEdgesState.filter(e => e.id !== selectedNewEdge.id));
    setSelectedNewEdge(null);
  };
  const onRemoveEdge = (edge: WaldiezEdge) => {
    // avoid having zero edges/chats in the flow
    if (sortedEdgesState.length === 1) {
      return;
    }
    // it should be in the 'sorted' list
    if (!sortedEdgesState.find(e => e.id === edge.id)) {
      return;
    }
    // set the order to -1
    edge.data = { ...edge.data, order: -1 } as any;
    setSortedEdgesState(sortedEdgesState.filter(e => e.id !== edge.id));
    setRemainingEdgeState([...remainingEdgesState, edge]);
  };
  const onMoveEdgeUp = (index: number) => {
    // it should be in the 'sorted' list
    if (!sortedEdgesState.find(e => e.id === sortedEdgesState[index].id)) {
      return;
    }
    // swap the order between the current and the previous edge
    const previousEdge = sortedEdgesState[index - 1];
    const previousOrder = previousEdge.data?.order;
    const currentEdge = sortedEdgesState[index];
    const currentOrder = currentEdge.data?.order;
    const newSortedEdges = sortedEdgesState.slice();
    newSortedEdges[index - 1] = {
      ...currentEdge,
      data: { ...currentEdge.data, order: previousOrder }
    } as WaldiezEdge;
    newSortedEdges[index] = {
      ...previousEdge,
      data: { ...previousEdge.data, order: currentOrder }
    } as WaldiezEdge;
    setSortedEdgesState(newSortedEdges);
  };
  const onMoveEdgeDown = (index: number) => {
    // it should be in the 'sorted' list
    if (!sortedEdgesState.find(e => e.id === sortedEdgesState[index].id)) {
      return;
    }
    // swap the order between the current and the next edge
    const nextEdge = sortedEdgesState[index + 1];
    const nextOrder = nextEdge.data?.order;
    const currentEdge = sortedEdgesState[index];
    const currentOrder = currentEdge.data?.order;
    const newSortedEdges = sortedEdgesState.slice();
    newSortedEdges[index + 1] = {
      ...currentEdge,
      data: { ...currentEdge.data, order: nextOrder }
    } as WaldiezEdge;
    newSortedEdges[index] = {
      ...nextEdge,
      data: { ...nextEdge.data, order: currentOrder }
    } as WaldiezEdge;
    setSortedEdgesState(newSortedEdges);
  };
  return (
    <EditFlowModalView
      flowId={flowId}
      data={flowData}
      onDataChange={onDataChange}
      isOpen={isOpen}
      sortedEdges={sortedEdgesState}
      remainingEdges={remainingEdgesState}
      selectedNewEdge={selectedNewEdge}
      onSelectedNewEdgeChange={onSelectedNewEdgeChange}
      onAddEdge={onAddEdge}
      onRemoveEdge={onRemoveEdge}
      onMoveEdgeUp={onMoveEdgeUp}
      onMoveEdgeDown={onMoveEdgeDown}
      onSubmit={onSubmitChanges}
      onCancel={onDiscardChanges}
      onClose={onDiscardChanges}
    />
  );
};
