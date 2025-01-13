import { WaldiezEdgeData } from "@waldiez/types";

export type WaldiezEdgeSwarmTriggerTabProps = {
    flowId: string;
    activeTabIndex: number;
    edgeId: string;
    data: WaldiezEdgeData;
    onDataChange: (data: Partial<WaldiezEdgeData>) => void;
};
export type WaldiezEdgeSwarmHandoffTabProps = {
    flowId: string;
    activeTabIndex: number;
    edgeId: string;
    data: WaldiezEdgeData;
    darkMode: boolean;
    onDataChange: (data: Partial<WaldiezEdgeData>) => void;
};
