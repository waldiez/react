export * from "@waldiez/components/sidebar/modals/editFlowModal/tabs/types";
export type EditFlowModalData = {
    name: string;
    description: string;
    tags: string[];
    requirements: string[];
};

export type EditFlowModalProps = {
    flowId: string;
    isOpen: boolean;
    onClose: () => void;
};
