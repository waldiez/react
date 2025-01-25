/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { FlowAgents } from "@waldiez/containers/flow/modals/importFlowModal/steps/preview/flowAgents";
import { FlowInfo } from "@waldiez/containers/flow/modals/importFlowModal/steps/preview/flowInfo";
import { FlowModels } from "@waldiez/containers/flow/modals/importFlowModal/steps/preview/flowModels";
import { FlowSkills } from "@waldiez/containers/flow/modals/importFlowModal/steps/preview/flowSkills";
import { FlowDataPreviewProps } from "@waldiez/containers/flow/modals/importFlowModal/steps/types";

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
