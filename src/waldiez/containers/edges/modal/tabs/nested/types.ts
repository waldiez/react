import { WaldiezEdgeData } from "@waldiez/models";

export type WaldiezEdgeNestedTabProps = {
    flowId: string;
    edgeId: string;
    darkMode: boolean;
    data: WaldiezEdgeData;
    onDataChange: (data: Partial<WaldiezEdgeData>) => void;
};
