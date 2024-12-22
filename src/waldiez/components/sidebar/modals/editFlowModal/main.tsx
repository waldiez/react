import { Modal } from "@waldiez/components/modal";
import { useEditFlowModal } from "@waldiez/components/sidebar/modals/editFlowModal/hooks";
import {
    EditFlowModalModalTabBasic,
    EditFlowModalModalTabOther,
} from "@waldiez/components/sidebar/modals/editFlowModal/tabs";
import { EditFlowModalProps } from "@waldiez/components/sidebar/modals/editFlowModal/types";
import { TabItem, TabItems } from "@waldiez/components/tabs";

export const EditFlowModal = (props: EditFlowModalProps) => {
    const { flowId } = props;
    const {
        flowData,
        isOpen,
        sortedEdgesState,
        remainingEdgesState,
        selectedNewEdge,
        isDirty,
        onClose,
        onSubmit,
        onCancel,
        onDataChange,
        onSelectedNewEdgeChange,
        onAddEdge,
        onRemoveEdge,
        onMoveEdgeUp,
        onMoveEdgeDown,
    } = useEditFlowModal(props);
    return (
        <Modal
            title="Edit Flow"
            isOpen={isOpen}
            onClose={onClose}
            className="edit-flow-modal"
            hasMaximizeBtn={false}
            dataTestId={`edit-flow-modal-${flowId}`}
            hasUnsavedChanges={isDirty}
            preventCloseIfUnsavedChanges
        >
            <TabItems activeTabIndex={0}>
                <TabItem label="Edit Flow" id={`rf-${flowId}-edit-flow-modal`}>
                    <EditFlowModalModalTabBasic
                        flowId={flowId}
                        data={flowData}
                        remainingEdges={remainingEdgesState}
                        sortedEdges={sortedEdgesState}
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
                    <EditFlowModalModalTabOther flowId={flowId} data={flowData} onDataChange={onDataChange} />
                </TabItem>
            </TabItems>
            <div className="modal-actions">
                <button
                    className="modal-action-cancel"
                    onClick={onCancel}
                    data-testid="edit-flow-cancel-button"
                    type="button"
                    title="Cancel"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    title="Save"
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
