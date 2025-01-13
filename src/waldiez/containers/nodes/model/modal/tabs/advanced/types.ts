import { WaldiezNodeModelData } from "@waldiez/models";

export type WaldiezNodeModelModalAdvancedTabProps = {
    data: WaldiezNodeModelData;
    onDataChange: (data: Partial<WaldiezNodeModelData>) => void;
};
