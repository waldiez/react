import type { Node } from "@xyflow/react";

export type WaldiezSkillDataCommon = {
    content: string;
    description: string;
    secrets: { [key: string]: string };
    requirements: string[];
    tags: string[];
    createdAt: string;
    updatedAt: string;
};

export type WaldiezNodeSkillData = WaldiezSkillDataCommon & {
    label: string;
};

export type WaldiezNodeSkill = Node<WaldiezNodeSkillData, "skill">;
