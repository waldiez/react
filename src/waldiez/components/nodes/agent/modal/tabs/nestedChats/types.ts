import {
    WaldiezAgentNode,
    WaldiezAgentNodeData,
    WaldiezEdge,
    WaldiezNodeUserOrAssistantData,
} from "@waldiez/models";

export type WaldiezAgentNestedChatsProps = {
    id: string;
    data: WaldiezNodeUserOrAssistantData;
    onDataChange: (partialData: Partial<WaldiezAgentNodeData>) => void;
    agentConnections: {
        source: {
            nodes: WaldiezAgentNode[];
            edges: WaldiezEdge[];
        };
        target: {
            nodes: WaldiezAgentNode[];
            edges: WaldiezEdge[];
        };
    };
};
