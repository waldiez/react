/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
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
