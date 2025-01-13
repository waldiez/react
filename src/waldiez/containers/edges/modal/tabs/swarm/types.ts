import { WaldiezEdgeData, WaldiezNodeAgent } from "@waldiez/models";

export type WaldiezEdgeSwarmTabsProps = {
    flowId: string;
    edgeId: string;
    edgeData: WaldiezEdgeData;
    darkMode: boolean;
    isOpen: boolean;
    sourceAgent: WaldiezNodeAgent;
    targetAgent: WaldiezNodeAgent;
    onDataChange: (data: Partial<WaldiezEdgeData>) => void;
};
