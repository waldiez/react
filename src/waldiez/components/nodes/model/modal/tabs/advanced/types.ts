import { WaldiezModelNodeData } from "@waldiez/models";

export type WaldiezNodeModelModalAdvancedTabProps = {
    data: WaldiezModelNodeData;
    onDataChange: (data: Partial<WaldiezModelNodeData>) => void;
};
