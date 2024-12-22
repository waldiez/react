import { WaldiezAgentNodeData, WaldiezModelNode } from "@waldiez/models";

export type WaldiezAgentModelsProps = {
    id: string;
    data: WaldiezAgentNodeData;
    models: WaldiezModelNode[];
    onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
};
