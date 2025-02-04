/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { Edge, Node, ReactFlowJsonObject, Viewport } from "@xyflow/react";

export type * from "@waldiez/models";
export type * from "@waldiez/store";

export type WaldiezFlowProps = ReactFlowJsonObject & {
    flowId: string;
    isAsync?: boolean;
    cacheSeed?: number | null;
    storageId: string;
    name: string;
    description: string;
    tags: string[];
    requirements: string[];
    viewport?: Viewport;
    createdAt?: string;
    updatedAt?: string;
};
export type WaldiezProps = WaldiezFlowProps & {
    nodes: Node[];
    edges: Edge[];
    viewport?: Viewport;
    monacoVsPath?: string | null;
    inputPrompt?: {
        previousMessages: string[];
        prompt: string;
    } | null;
    readOnly?: boolean | null;
    skipImport?: boolean | null;
    skipExport?: boolean | null;
    onUpload?: ((files: File[]) => Promise<string[]>) | null;
    onChange?: ((flow: string) => void) | null;
    onRun?: ((flow: string) => void) | null;
    onUserInput?: ((input: string) => void) | null;
    onConvert?: ((flow: string, to: "py" | "ipynb") => void) | null;
    onSave?: ((flow: string) => void) | null;
};
