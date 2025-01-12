import { WaldiezAgentNode, WaldiezAgentNodeData } from "@waldiez/models";

export type WaldiezAgentGroupProps = {
    id: string;
    data: WaldiezAgentNodeData;
    agents: WaldiezAgentNode[];
    onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
};
