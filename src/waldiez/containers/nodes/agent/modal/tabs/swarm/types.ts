import {
    WaldiezEdge,
    WaldiezNodeAgent,
    WaldiezNodeAgentData,
    WaldiezNodeAgentSwarmData,
    WaldiezNodeSkill,
} from "@waldiez/models";

export type WaldiezAgentSwarmFunctionsProps = {
    id: string;
    data: WaldiezNodeAgentSwarmData;
    skills: WaldiezNodeSkill[];
    onDataChange: (partialData: Partial<WaldiezNodeAgentData>) => void;
};

export type WaldiezAgentSwarmNestedChatsProps = {
    id: string;
    data: WaldiezNodeAgentSwarmData;
    agents: WaldiezNodeAgent[];
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
    onDataChange: (partialData: Partial<WaldiezNodeAgentSwarmData>, markDirty?: boolean) => void;
};

export type WaldiezAgentSwarmUpdateStateProps = {
    id: string;
    data: WaldiezNodeAgentSwarmData;
    darkMode: boolean;
    onDataChange: (partialData: Partial<WaldiezNodeAgentData>) => void;
};

export type WaldiezAgentSwarmAfterWorkProps = {
    id: string;
    data: WaldiezNodeAgentSwarmData;
    darkMode: boolean;
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
    onDataChange: (partialData: Partial<WaldiezNodeAgentData>) => void;
};
