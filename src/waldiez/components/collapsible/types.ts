/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { ReactNode } from "react";

export type CollapsibleProps = {
    title: string;
    children: ReactNode;
    expanded?: boolean;
    dataTestId?: string;
};
export type CollapsibleViewProps = {
    title: string;
    children: ReactNode;
    isOpen: boolean;
    dataTestId?: string;
    onToggle: () => void;
};
