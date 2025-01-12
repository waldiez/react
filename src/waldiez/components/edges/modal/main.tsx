import { useWaldiezEdgeModal } from "@waldiez/components/edges/modal/hooks";
import { WaldiezEdgeBasicTab } from "@waldiez/components/edges/modal/tabs/basic";
import { WaldiezEdgeMessageTab } from "@waldiez/components/edges/modal/tabs/message";
import { WaldiezEdgeNestedTab } from "@waldiez/components/edges/modal/tabs/nested";
import { WaldiezEdgeModalProps } from "@waldiez/components/edges/modal/types";
import { Modal } from "@waldiez/components/modal";
import { TabItem, TabItems } from "@waldiez/components/tabs";

export const WaldiezEdgeModal = (props: WaldiezEdgeModalProps) => {
    const { edgeId, isOpen, onClose } = props;
    const {
        flowId,
        edge,
        edgeData,
        edgeType,
        isDark,
        isDirty,
        isRagUser,
        onDataChange,
        onTypeChange,
        onCancel,
        onSubmit,
    } = useWaldiezEdgeModal(props);
    if (!edgeData || !edge || edgeType === "hidden") {
        return <></>;
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={edgeData.label}
            dataTestId={`edge-modal-${edgeId}`}
            hasUnsavedChanges={isDirty}
            preventCloseIfUnsavedChanges
        >
            <div className="modal-body edge-modal">
                {edgeType !== "group" ? (
                    <TabItems activeTabIndex={0}>
                        <TabItem label="Properties" id={`we-${flowId}-edge-properties-${edgeId}`}>
                            <WaldiezEdgeBasicTab
                                edgeId={edgeId}
                                data={edgeData}
                                edgeType={edgeType}
                                onTypeChange={onTypeChange}
                                onDataChange={onDataChange}
                            />
                        </TabItem>
                        {edgeType === "chat" && (
                            <TabItem label="Message" id={`we-${flowId}-edge-message-${edgeId}`}>
                                <WaldiezEdgeMessageTab
                                    edgeId={edgeId}
                                    data={edgeData}
                                    darkMode={isDark}
                                    skipRagOption={!isRagUser}
                                    onDataChange={onDataChange}
                                />
                            </TabItem>
                        )}
                        {edgeType === "nested" && (
                            <TabItem label="Nested Chat" id={`we-${flowId}-edge-nested-${edgeId}`}>
                                <WaldiezEdgeNestedTab
                                    flowId={flowId}
                                    edgeId={edgeId}
                                    darkMode={isDark}
                                    data={edgeData}
                                    onDataChange={onDataChange}
                                />
                            </TabItem>
                        )}
                    </TabItems>
                ) : (
                    <WaldiezEdgeBasicTab
                        edgeId={edgeId}
                        data={edgeData}
                        edgeType="group"
                        onDataChange={onDataChange}
                        onTypeChange={onTypeChange}
                    />
                )}
                <div className="modal-actions padding-10">
                    <button
                        type="button"
                        title="Cancel"
                        className="modal-action-cancel"
                        onClick={onCancel}
                        data-testid="modal-cancel-btn"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        title={isDirty ? "Save changes" : "No changes to save"}
                        className="modal-action-submit"
                        onClick={onSubmit}
                        data-testid="modal-submit-btn"
                        disabled={!isDirty}
                    >
                        Save
                    </button>
                </div>
            </div>
        </Modal>
    );
};
