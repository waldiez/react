import { WaldiezNodeAgent, WaldiezNodeAgentData } from "@waldiez/models";

export type WaldiezAgentGroupManagerProps = {
    id: string;
    flowId: string;
    isDarkMode: boolean;
    data: WaldiezNodeAgentData;
    agents: WaldiezNodeAgent[];
    agentConnections: {
        source: {
            nodes: WaldiezNodeAgent[];
        };
        target: {
            nodes: WaldiezNodeAgent[];
        };
    };
    onDataChange: (partialData: Partial<WaldiezNodeAgentData>, persist?: boolean) => void;
};
