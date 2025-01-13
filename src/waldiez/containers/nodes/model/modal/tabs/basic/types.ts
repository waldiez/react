import { WaldiezNodeModelData } from "@waldiez/models";

export type WaldiezNodeModelModalBasicTabProps = {
    id: string;
    data: WaldiezNodeModelData;
    onLogoChange: (newLogo: string) => void;
    onDataChange: (data: Partial<WaldiezNodeModelData>) => void;
};
