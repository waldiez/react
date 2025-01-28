/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { useState } from "react";

import { SingleValue } from "@waldiez/components";
import { WaldiezNodeModelModalBasicTabProps } from "@waldiez/containers/nodes/model/modal/tabs/types";
import { WaldiezModelAPIType } from "@waldiez/models";
import { LOGOS } from "@waldiez/theme";

export const useModelModalBasicTab = (props: WaldiezNodeModelModalBasicTabProps) => {
    const { data, onDataChange, onLogoChange } = props;
    const [apiKeyVisible, setApiKeyVisible] = useState(false);
    const { apiType } = data;
    const getApiTypeLabel = (text: WaldiezModelAPIType) => {
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

    const getBaseUrl = (apiType: WaldiezModelAPIType) => {
        return baseUrlsMapping[apiType];
    };

    const isBaseUrlEditable = (apiType: WaldiezModelAPIType) => {
        return ["other", "azure"].includes(apiType);
    };
    const apiTypeOptions: { label: string; value: WaldiezModelAPIType }[] = [
        { label: "OpenAI", value: "openai" },
        { label: "Azure", value: "azure" },
        { label: "Gemini", value: "google" },
        { label: "Claude", value: "anthropic" },
        { label: "DeepSeek", value: "deepseek" },
        { label: "Mistral", value: "mistral" },
        { label: "Groq", value: "groq" },
        { label: "Together", value: "together" },
        { label: "NIM", value: "nim" },
        { label: "Other", value: "other" },
    ];

    const apiKeyEnvs = {
        openai: "OPENAI_API_KEY",
        azure: "AZURE_API_KEY",
        deepseek: "DEEPSEEK_API_KEY",
        google: "GOOGLE_GEMINI_API_KEY",
        anthropic: "ANTHROPIC_API_KEY",
        mistral: "MISTRAL_API_KEY",
        groq: "GROQ_API_KEY",
        together: "TOGETHER_API_KEY",
        nim: "NIM_API_KEY",
        other: "OPENAI_API_KEY",
    };
    const baseUrlsMapping: Record<WaldiezModelAPIType, string> = {
        openai: "https://api.openai.com/v1",
        google: "https://generativelanguage.googleapis.com/v1beta",
        anthropic: "https://api.anthropic.com/v1",
        deepseek: "https://api.deepseek.com/v1",
        mistral: "https://api.mistral.ai/v1",
        groq: "https://api.groq.com/openai/v1",
        together: "https://api.together.xyz/v1",
        nim: "https://integrate.api.nvidia.com/v1",
        azure: "",
        other: "",
    };
    const onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onDataChange({ label: e.target.value });
    };
    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onDataChange({ description: e.target.value });
    };
    const onApiTypeChange = (option: SingleValue<{ label: string; value: WaldiezModelAPIType }>) => {
        if (option) {
            onDataChange({ apiType: option.value });
            onLogoChange(LOGOS[option.value]);
        }
    };
    const onApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onDataChange({ apiKey: e.target.value });
    };
    const onBaseUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onDataChange({ baseUrl: e.target.value });
    };
    const onApiKeyVisibleChange = () => {
        setApiKeyVisible(!apiKeyVisible);
    };
    const apiKeyEnv = apiKeyEnvs[apiType];
    const apiKeyInfo = `API key to use if ${apiKeyEnv} environment variable is not set`;
    const apiTypeLabel = getApiTypeLabel(apiType);
    const readOnlyBaseUrl = getBaseUrl(apiType);
    const urlIsEditable = isBaseUrlEditable(apiType);
    return {
        apiTypeOptions,
        apiKeyVisible,
        apiKeyEnv,
        apiKeyInfo,
        apiTypeLabel,
        readOnlyBaseUrl,
        urlIsEditable,
        onLabelChange,
        onDescriptionChange,
        onApiTypeChange,
        onApiKeyChange,
        onBaseUrlChange,
        onApiKeyVisibleChange,
    };
};
