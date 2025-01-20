import { WaldiezEdgeData } from "@waldiez/models";

export type WaldiezEdgeMessageTabProps = {
    edgeId: string;
    data: WaldiezEdgeData;
    darkMode: boolean;
    skipCarryoverOption?: boolean;
    skipRagOption: boolean;
    onDataChange: (data: Partial<WaldiezEdgeData>) => void;
};
