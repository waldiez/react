/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { WaldiezNodeAgentData } from "@waldiez/models";
import { useWaldiez } from "@waldiez/store";

export const useWaldiezNodeAgentFooter = (props: {
    id: string;
    data: WaldiezNodeAgentData;
    isModalOpen: boolean;
}) => {
    const { id, isModalOpen } = props;
    const deleteAgent = useWaldiez(s => s.deleteAgent);
    const cloneAgent = useWaldiez(s => s.cloneAgent);
    const onFlowChanged = useWaldiez(s => s.onFlowChanged);
    const onDelete = () => {
        if (!isModalOpen) {
            deleteAgent(id);
            onFlowChanged();
        }
    };
    const onClone = () => {
        if (!isModalOpen) {
            cloneAgent(id);
            onFlowChanged();
        }
    };
    return {
        onDelete,
        onClone,
    };
};
