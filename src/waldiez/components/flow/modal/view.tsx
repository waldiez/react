import { WaldiezFlowModalBasicTab, WaldiezFlowModalOtherTab } from '@waldiez/components/flow/modal/tabs';
import { EditFlowModalViewProps } from '@waldiez/components/flow/modal/types';
import { Modal } from '@waldiez/components/modal';
import { TabItem, TabItems } from '@waldiez/components/tabs';

export const EditFlowModalView = (props: EditFlowModalViewProps) => {
  const {
    flowId,
    data,
    isOpen,
    isDirty,
    onDataChange,
    onCancel,
    onClose,
    // order
    remainingEdges,
    sortedEdges,
    selectedNewEdge,
    onSelectedNewEdgeChange,
    onAddEdge,
    onRemoveEdge,
    onMoveEdgeUp,
    onMoveEdgeDown,
    onSubmit
  } = props;
  return (
    <Modal
      title="Edit Flow"
      isOpen={isOpen}
      onClose={onClose}
      className="edit-flow-modal"
      hasMaximizeBtn={false}
      dataTestId="edit-flow-modal"
    >
      <TabItems activeTabIndex={0}>
        <TabItem label="Edit Flow" id={`rf-${flowId}-edit-flow-modal`}>
          <WaldiezFlowModalBasicTab
            flowId={flowId}
            data={data}
            remainingEdges={remainingEdges}
            sortedEdges={sortedEdges}
            selectedNewEdge={selectedNewEdge}
            onSelectedNewEdgeChange={onSelectedNewEdgeChange}
            onAddEdge={onAddEdge}
            onRemoveEdge={onRemoveEdge}
            onMoveEdgeUp={onMoveEdgeUp}
            onMoveEdgeDown={onMoveEdgeDown}
            onDataChange={onDataChange}
          />
        </TabItem>
        <TabItem label="Other" id={`rf-${flowId}-edit-flow-modal-extras`}>
          <WaldiezFlowModalOtherTab data={data} onDataChange={onDataChange} />
        </TabItem>
      </TabItems>
      <div className="modal-actions">
        <button className="modal-action-cancel" onClick={onCancel} data-testid="edit-flow-cancel-button">
          Cancel
        </button>
        <button
          className="modal-action-submit"
          onClick={onSubmit}
          data-testid="edit-flow-submit-button"
          disabled={!isDirty}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};
