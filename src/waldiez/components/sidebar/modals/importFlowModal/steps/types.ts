import { ImportFlowState } from "@waldiez/components/sidebar/modals/importFlowModal/types";

export type LoadFlowStepProps = {
    flowId: string;
    state: ImportFlowState;
    initialState: ImportFlowState;
    onStateChange: (newState: Partial<ImportFlowState>) => void;
};

export type FlowDataPreviewProps = {
    flowId: string;
    state: ImportFlowState;
    onStateChange: (newState: Partial<ImportFlowState>) => void;
};
