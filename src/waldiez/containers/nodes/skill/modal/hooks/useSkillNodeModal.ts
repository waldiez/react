/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { WaldiezNodeSkillModalProps } from "@waldiez/containers/nodes/skill/modal/types";

export const useSkillNodeModal = (props: WaldiezNodeSkillModalProps) => {
    const { data, onDataChange } = props;
    const onUpdateSecrets = (secrets: { [key: string]: string }) => {
        onDataChange({ secrets });
    };
    const onDeleteSecret = (key: string) => {
        const secrets = { ...data.secrets };
        if (Object.keys(secrets).includes(key)) {
            delete secrets[key];
        }
        onDataChange({ secrets });
    };
    const onAddSecret = (key: string, value: string) => {
        const secrets = { ...data.secrets };
        secrets[key] = value;
        onDataChange({ secrets });
    };
    const onSkillContentChange = (value: string | undefined) => {
        if (value) {
            onDataChange({ content: value });
        }
    };
    const onSkillLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onDataChange({ label: e.target.value });
    };
    const onSkillDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onDataChange({ description: e.target.value });
    };
    return {
        onUpdateSecrets,
        onDeleteSecret,
        onAddSecret,
        onSkillContentChange,
        onSkillLabelChange,
        onSkillDescriptionChange,
    };
};
