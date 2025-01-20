import { WaldiezNodeAgentData } from "@waldiez/models";

export type WaldiezAgentBasicProps = {
    id: string;
    data: WaldiezNodeAgentData;
    onDataChange: (data: Partial<WaldiezNodeAgentData>) => void;
    onAgentTypeChange: (agentType: "user" | "rag_user") => void;
};
