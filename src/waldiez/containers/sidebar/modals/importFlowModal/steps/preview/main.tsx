import { FlowAgents } from "@waldiez/containers/sidebar/modals/importFlowModal/steps/preview/flowAgents";
import { FlowInfo } from "@waldiez/containers/sidebar/modals/importFlowModal/steps/preview/flowInfo";
import { FlowModels } from "@waldiez/containers/sidebar/modals/importFlowModal/steps/preview/flowModels";
import { FlowSkills } from "@waldiez/containers/sidebar/modals/importFlowModal/steps/preview/flowSkills";
import { FlowDataPreviewProps } from "@waldiez/containers/sidebar/modals/importFlowModal/steps/types";

export const FlowDataPreviewStep = (props: FlowDataPreviewProps) => {
    const { flowId, state, onStateChange } = props;
    return (
        <div className="flow-data-preview" data-testid={`import-flow-modal-preview-step-${flowId}-view`}>
            <FlowInfo flowId={flowId} state={state} onStateChange={onStateChange} />
            {!state.selectedProps.everything && (
                <>
                    <div className="flow-data-preview-header">
                        <h3>Flow Nodes</h3>
                    </div>
                    <div className="flow-data-preview-body">
                        <FlowModels flowId={flowId} state={state} onStateChange={onStateChange} />
                        <FlowSkills flowId={flowId} state={state} onStateChange={onStateChange} />
                        <FlowAgents flowId={flowId} state={state} onStateChange={onStateChange} />
                    </div>
                </>
            )}
        </div>
    );
};
