import { Edge, Node, ReactFlowJsonObject, Viewport } from "@xyflow/react";

export type * from "@waldiez/models";
export type * from "@waldiez/store";

export type WaldiezFlowProps = ReactFlowJsonObject & {
    flowId: string;
    isAsync?: boolean;
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
    onUpload?: ((files: File[]) => Promise<string[]>) | null;
    onChange?: ((flow: string) => void) | null;
    onRun?: ((flow: string) => void) | null;
    onUserInput?: ((input: string) => void) | null;
    onConvert?: ((flow: string, to: "py" | "ipynb") => void) | null;
    onSave?: ((flow: string) => void) | null;
};
