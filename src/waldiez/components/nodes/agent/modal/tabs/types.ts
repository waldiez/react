import { WaldiezAgentNodeData } from "@waldiez/models";

export type WaldiezNodeAgentModalTabsProps = {
    id: string;
    flowId: string;
    isModalOpen: boolean;
    isDarkMode: boolean;
    data: WaldiezAgentNodeData;
    filesToUpload: File[];
    onFilesToUploadChange: (files: File[]) => void;
    onDataChange: (data: Partial<WaldiezAgentNodeData>) => void;
    onAgentTypeChange: (agentType: "rag_user" | "user") => void;
};
