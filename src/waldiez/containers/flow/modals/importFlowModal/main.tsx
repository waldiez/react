import { Modal, Wizard, WizardStep } from "@waldiez/components";
import { useImportFlowModal } from "@waldiez/containers/flow/modals/importFlowModal/hooks";
import { FlowDataPreviewStep, LoadFlowStep } from "@waldiez/containers/flow/modals/importFlowModal/steps";
import { ImportFlowModalProps } from "@waldiez/containers/flow/modals/importFlowModal/types";

export const ImportFlowModal = (props: ImportFlowModalProps) => {
    const { flowId, isOpen } = props;
    const { state, initialState, onStateChange, onClose, onBack, onForward } = useImportFlowModal(props);
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Import Flow"
            dataTestId={`import-flow-modal-${flowId}`}
        >
            <div className="modal-body padding-10">
                <Wizard
                    activeStep={0}
                    canGoForward={!!state.loadedFlowData}
                    firstBackTitle="Cancel"
                    lastNextTitle="Import"
                    onBack={onBack}
                    onForward={onForward}
                >
                    <WizardStep id={`import-flow-modal-load-step-${flowId}`} title="Load Flow">
                        <LoadFlowStep
                            initialState={initialState}
                            flowId={flowId}
                            state={state}
                            onStateChange={onStateChange}
                        />
                    </WizardStep>
                    <WizardStep id={`import-flow-modal-preview-step-${flowId}`} title="Preview Flow">
                        {state.loadedFlowData ? (
                            <FlowDataPreviewStep
                                flowId={flowId}
                                state={state}
                                onStateChange={onStateChange}
                            />
                        ) : null}
                    </WizardStep>
                </Wizard>
            </div>
        </Modal>
    );
};
