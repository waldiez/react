import { WaldiezNodeAgentData, WaldiezNodeModel } from "@waldiez/models";

export type WaldiezAgentModelsProps = {
    id: string;
    data: WaldiezNodeAgentData;
    models: WaldiezNodeModel[];
    onDataChange: (partialData: Partial<WaldiezNodeAgentData>, persist?: boolean) => void;
};
