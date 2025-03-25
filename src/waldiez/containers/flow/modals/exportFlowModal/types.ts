/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */

export type ExportFlowModalProps = {
    flowId: string;
    isOpen: boolean;
    onExport: (e: React.MouseEvent<HTMLElement, MouseEvent>) => Promise<void>;
    onClose: () => void;
};
