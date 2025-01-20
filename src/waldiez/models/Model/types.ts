import type { Node } from "@xyflow/react";

export type WaldiezModelAPIType =
    | "openai"
    | "azure"
    | "google"
    | "anthropic"
    | "mistral"
    | "groq"
    | "together"
    | "nim"
    | "other";

export type WaldiezModelPrice = {
    promptPricePer1k: number | null;
    completionTokenPricePer1k: number | null;
};

export type WaldiezModelDataCommon = {
    description: string;
    baseUrl: string | null;
    apiKey: string | null;
    apiType: WaldiezModelAPIType;
    apiVersion: string | null;
    temperature: number | null;
    topP: number | null;
    maxTokens: number | null;
    defaultHeaders: { [key: string]: string };
    price: WaldiezModelPrice;
    requirements: string[];
    tags: string[];
    createdAt: string;
    updatedAt: string;
};

export type WaldiezNodeModelData = WaldiezModelDataCommon & {
    label: string;
};

export type WaldiezNodeModel = Node<WaldiezNodeModelData, "model">;
