import { WaldiezNodeAgent, WaldiezNodeAgentData } from "@waldiez/models";

export type WaldiezAgentGroupProps = {
    id: string;
    data: WaldiezNodeAgentData;
    agents: WaldiezNodeAgent[];
    onDataChange: (partialData: Partial<WaldiezNodeAgentData>, persist?: boolean) => void;
};
