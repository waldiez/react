import { WaldiezNodeModelData } from "@waldiez/models";

export type WaldiezNodeModelModalPriceTabProps = {
    modelId: string;
    data: WaldiezNodeModelData;
    onDataChange: (data: Partial<WaldiezNodeModelData>) => void;
};
