import { WaldiezEdge, WaldiezNodeAgent, WaldiezNodeAgentData } from "@waldiez/models";

export type WaldiezAgentNestedChatsProps = {
    id: string;
    data: WaldiezNodeAgentData;
    onDataChange: (partialData: Partial<WaldiezNodeAgentData>) => void;
    agentConnections: {
        source: {
            nodes: WaldiezNodeAgent[];
            edges: WaldiezEdge[];
        };
        target: {
            nodes: WaldiezNodeAgent[];
            edges: WaldiezEdge[];
        };
    };
};
