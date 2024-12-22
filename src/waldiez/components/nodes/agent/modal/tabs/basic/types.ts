import { WaldiezAgentNodeData } from "@waldiez/models";

export type WaldiezAgentBasicProps = {
    id: string;
    data: WaldiezAgentNodeData;
    onDataChange: (data: Partial<WaldiezAgentNodeData>) => void;
    onAgentTypeChange: (agentType: "user" | "rag_user") => void;
};
