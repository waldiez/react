/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
export * from "@waldiez/containers/sidebar/modals/editFlowModal/tabs/types";
export type EditFlowModalData = {
    name: string;
    description: string;
    tags: string[];
    requirements: string[];
    isAsync: boolean;
};

export type EditFlowModalProps = {
    flowId: string;
    isOpen: boolean;
    onClose: () => void;
};
