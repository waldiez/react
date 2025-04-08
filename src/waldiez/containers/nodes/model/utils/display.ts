/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { WaldiezModelAPIType } from "@waldiez/models";

// TODO: add messages here for validation responses

export const getApiTypeLabel = (text: WaldiezModelAPIType) => {
    if (text === "anthropic") {
        return "Claude";
    }
    if (text === "deepseek") {
        return "DeepSeek";
    }
    if (text === "google") {
        return "Gemini";
    }
    if (text === "openai") {
        return "OpenAI";
    }
    if (text === "nim") {
        return "NIM";
    }
    return text[0].toUpperCase() + text.slice(1);
};
export const apiTypeOptions: { label: string; value: WaldiezModelAPIType }[] = [
    { label: "OpenAI", value: "openai" },
    { label: "Azure", value: "azure" },
    { label: "Gemini", value: "google" },
    { label: "Claude", value: "anthropic" },
    { label: "Cohere", value: "cohere" },
    { label: "DeepSeek", value: "deepseek" },
    { label: "Mistral", value: "mistral" },
    { label: "Groq", value: "groq" },
    { label: "Together", value: "together" },
    { label: "NIM", value: "nim" },
    { label: "Other", value: "other" },
];
