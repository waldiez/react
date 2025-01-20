import { WaldiezNodeAgentData } from "@waldiez/models";

export type WaldiezNodeAgentModalTabsProps = {
    id: string;
    flowId: string;
    isModalOpen: boolean;
    isDarkMode: boolean;
    data: WaldiezNodeAgentData;
    filesToUpload: File[];
    onFilesToUploadChange: (files: File[]) => void;
    onDataChange: (data: Partial<WaldiezNodeAgentData>, markDirty?: boolean) => void;
    onAgentTypeChange: (agentType: "rag_user" | "user") => void;
};
