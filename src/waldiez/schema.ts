import { WaldiezFlowData as FlowData, WaldiezFlow } from "@waldiez/models";

export type WaldiezFlowData = Omit<FlowData, "nodes" | "edges" | "viewport"> & {
    nodes: object[];
    edges: object[];
    viewport?: object;
};

export type WaldiezFlowSchema = Omit<WaldiezFlow, "data"> & {
    data: WaldiezFlowData;
};
