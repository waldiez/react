import { EditFlowModalData } from "@waldiez/containers/sidebar/modals/editFlowModal/types";

export type EditFlowModalModalTabOtherProps = {
    flowId: string;
    data: EditFlowModalData;
    onDataChange: (data: Partial<EditFlowModalData>) => void;
};
