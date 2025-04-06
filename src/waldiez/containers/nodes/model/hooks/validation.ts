/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
/*
| **Provider**   | **List Models Endpoint**                         | **Get Specific Model Endpoint**             | **Auth Header**             | **Documentation Link**                                                                 |
|----------------|--------------------------------------------------|---------------------------------------------|-----------------------------|----------------------------------------------------------------------------------------|
| **OpenAI**     | `/v1/models`                                     | `/v1/models/{model}`                        | `Authorization: Bearer`     | [OpenAI Models](https://platform.openai.com/docs/api-reference/models/list)            |
| **Azure**      | `/openai/deployments?api-version={version}`      | N/A (uses deployment name)                  | `api-key`                   | [Azure OpenAI](https://learn.microsoft.com/en-us/azure/ai-services/openai/)            |
| **DeepSeek**   | `/v1/models`                                     | `/v1/models/{model}` (assumed)              | `Authorization: Bearer`     | [DeepSeek Docs](https://docs.deepseek.com/)                                            |
| **Google**     | `/v1beta/models`                                 | `/v1beta/models/{model}`                    | `Authorization: Bearer`     | [Google PaLM](https://developers.generativeai.google/api/rest/v1beta/models)           |
| **Anthropic**  | `/v1/models`                                     | `/v1/models/{model}`                        | `Authorization: Bearer`     | [Anthropic API](https://docs.anthropic.com/)                                           |
| **Cohere**     | `/v1/models`                                     | `/v1/models/{model}`                        | `Authorization: Bearer`     | [Cohere List](https://docs.cohere.com/v2/reference/list-models), [Get](https://docs.cohere.com/v2/reference/get-model) |
| **Mistral**    | `/v1/models`                                     | `/v1/models/{model}`                        | `Authorization: Bearer`     | [Mistral API](https://docs.mistral.ai/)                                                |
| **Groq**       | `/openai/v1/models`                              | `/openai/v1/models/{model}`                 | `Authorization: Bearer`     | [Groq API](https://docs.groq.com/)                                                     |
| **Together**   | `/v1/models`                                     | `/v1/models/{model}`                        | `Authorization: Bearer`     | [Together API](https://docs.together.xyz/)                                             |
| **NIM (NVIDIA)** | `/v1/models`                                   | `/v1/models/{model}`                        | `Authorization: Bearer`     | [NVIDIA NIM](https://docs.nvidia.com/)                                                 |
| **Other**      | `/v1/models` (if OpenAI-compatible)              | `/v1/models/{model}` (if OpenAI-compatible) | `Authorization: Bearer`     | Depends on implementation                                                              |
"""
*/
import { WaldiezModelAPIType, WaldiezNodeModelData } from "@waldiez/models";

type ValidationResult = {
    success: boolean;
    message?: string;
};

const modelListPaths: Record<WaldiezModelAPIType, string> = {
    openai: "/v1/models",
    azure: "/openai/deployments",
    deepseek: "/v1/models",
    google: "/v1beta/models",
    anthropic: "/v1/models",
    cohere: "/v1/models",
    mistral: "/v1/models",
    groq: "/openai/v1/models",
    together: "/v1/models",
    nim: "/v1/models",
    other: "/v1/models",
};
const supportsDirectLookup: WaldiezModelAPIType[] = [
    "openai",
    "google",
    "groq",
    "together",
    "anthropic",
    "cohere",
    "deepseek",
    "mistral",
    "nim",
];
export async function validateModel(model: WaldiezNodeModelData): Promise<ValidationResult> {
    const validationError = validateModelInputs(model);
    if (validationError) {
        return validationError;
    }

    const { url, headers } = buildRequestConfig(model);

    if (model.apiType === "azure") {
        return validateAzureModel(url, headers, model.label.trim());
    }

    if (supportsDirectLookup.includes(model.apiType)) {
        return validateDirectModel(url, headers, model.label.trim());
    }

    return validateFallbackModel(url, headers, model.label.trim());
}

function validateModelInputs(model: WaldiezNodeModelData): ValidationResult | null {
    if (!model.baseUrl) {
        return { success: false, message: "Missing baseUrl" };
    }
    if (!model.apiKey) {
        return { success: false, message: "Missing API key" };
    }
    if (!model.label.trim()) {
        return { success: false, message: "Missing model name" };
    }
    if (model.apiType === "azure" && !model.apiVersion) {
        return { success: false, message: "Missing Azure API version" };
    }
    return null;
}

function buildRequestConfig(model: WaldiezNodeModelData) {
    const base = model.baseUrl!.replace(/\/$/, "");
    let url = base + modelListPaths[model.apiType];
    const headers: Record<string, string> = { ...model.defaultHeaders };

    if (model.apiType === "azure") {
        url += `?api-version=${model.apiVersion}`;
        headers["api-key"] = model.apiKey!;
    } else {
        headers["Authorization"] = `Bearer ${model.apiKey}`;
    }

    return { url, headers };
}

async function validateAzureModel(
    url: string,
    headers: Record<string, string>,
    modelName: string,
): Promise<ValidationResult> {
    const res = await fetchWithTimeout(url, { method: "GET", headers });
    /* v8 ignore next 3 */
    if (!res.ok) {
        return parseErrorResponse(res, "Azure API error");
    }

    const data = await res.json();
    const found = Array.isArray(data.data) && data.data.some((d: any) => d.id === modelName);
    return found ? { success: true } : { success: false, message: `Deployment "${modelName}" not found` };
}

async function validateDirectModel(
    url: string,
    headers: Record<string, string>,
    modelName: string,
): Promise<ValidationResult> {
    const modelUrl = `${url}/${encodeURIComponent(modelName)}`;
    const res = await fetchWithTimeout(modelUrl, { headers });
    if (res.ok) {
        return { success: true };
    }

    return parseErrorResponse(res, "Model fetch failed");
}

async function validateFallbackModel(
    url: string,
    headers: Record<string, string>,
    modelName: string,
): Promise<ValidationResult> {
    const res = await fetchWithTimeout(url, { method: "GET", headers });
    /* v8 ignore next 3 */
    if (!res.ok) {
        return parseErrorResponse(res, "API error");
    }

    const data = await res.json();
    const found = Array.isArray(data.data) && data.data.some((d: any) => d.id === modelName);
    return found ? { success: true } : { success: false, message: `Model "${modelName}" not found` };
}

async function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    try {
        return await fetch(url, { ...options, signal: controller.signal });
    } finally {
        clearTimeout(timeout);
    }
}

async function parseErrorResponse(res: Response, defaultMessage: string): Promise<ValidationResult> {
    const errorBody = await res.json().catch(() => ({}));
    const errorMessage = errorBody?.error?.message || res.statusText || defaultMessage;
    return { success: false, message: errorMessage };
}
