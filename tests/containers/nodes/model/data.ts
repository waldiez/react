import { WaldiezModelAPIType } from "@waldiez/models";

export const createdAt = new Date().toISOString();
export const updatedAt = new Date().toISOString();
export const flowId = "wf-1";
export const modelId = "wm-1";
export const apiType = "other" as WaldiezModelAPIType;
export const modelData = {
    name: "test model",
    description: "test model description",
    baseUrl: "http://localhost:3000",
    apiType: apiType,
    apiKey: "test-api-key",
    apiVersion: "v1",
    temperature: 0.1,
    topP: 0.2,
    maxTokens: 200,
    defaultHeaders: {
        "header-1": "value-1",
    },
    price: {
        promptPricePer1k: 0.05,
        completionTokenPricePer1k: 0.1,
    },
    tags: [],
    requirements: [],
    createdAt,
    updatedAt,
};
