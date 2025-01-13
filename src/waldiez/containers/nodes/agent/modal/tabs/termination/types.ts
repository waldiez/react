import { WaldiezNodeAgentData } from "@waldiez/models";

export type WaldiezAgentTerminationProps = {
    id: string;
    data: WaldiezNodeAgentData;
    onDataChange: (partialData: Partial<WaldiezNodeAgentData>, persist?: boolean) => void;
};
