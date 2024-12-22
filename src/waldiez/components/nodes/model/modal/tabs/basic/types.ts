import { WaldiezModelNodeData } from "@waldiez/models";

export type WaldiezNodeModelModalBasicTabProps = {
    id: string;
    data: WaldiezModelNodeData;
    onLogoChange: (newLogo: string) => void;
    onDataChange: (data: Partial<WaldiezModelNodeData>) => void;
};
