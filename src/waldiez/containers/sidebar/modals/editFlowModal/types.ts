export * from "@waldiez/containers/sidebar/modals/editFlowModal/tabs/types";
export type EditFlowModalData = {
    name: string;
    description: string;
    tags: string[];
    requirements: string[];
    isAsync: boolean;
};

export type EditFlowModalProps = {
    flowId: string;
    isOpen: boolean;
    onClose: () => void;
};
