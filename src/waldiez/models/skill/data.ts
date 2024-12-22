import { IWaldiezSourceSkillData } from "@waldiez/models/types";

export class WaldiezSourceSkillData implements IWaldiezSourceSkillData {
    name: string;
    content: string;
    description: string;
    secrets: { [key: string]: string };
    tags: string[];
    requirements: string[];
    createdAt: string;
    updatedAt: string;

    constructor(
        name: string = "new_skill",
        content: string = DEFAULT_SKILL_CONTENT,
        description: string = "A new skill",
        secrets: { [key: string]: string } = {},
        tags: string[] = [],
        requirements: string[] = [],
        createdAt: string = new Date().toISOString(),
        updatedAt: string = new Date().toISOString(),
    ) {
        this.name = name;
        this.content = content;
        this.description = description;
        this.secrets = secrets;
        this.tags = tags;
        this.requirements = requirements;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    static fromJSON(
        json: unknown,
        name: string,
        description: string,
        tags: string[],
        requirements: string[],
        createdAt: string = new Date().toISOString(),
        updatedAt: string = new Date().toISOString(),
    ): WaldiezSourceSkillData {
        if (!json || typeof json !== "object" || !json) {
            return new WaldiezSourceSkillData();
        }
        const data = json as Record<string, unknown>;
        const content = WaldiezSourceSkillData.getContent(data);
        const secrets = WaldiezSourceSkillData.getSecrets(data);
        return new WaldiezSourceSkillData(
            name,
            content,
            description,
            secrets,
            tags,
            requirements,
            createdAt,
            updatedAt,
        );
    }
    static getContent(json: Record<string, unknown>): string {
        let content = DEFAULT_SKILL_CONTENT;
        if ("content" in json && typeof json.content === "string") {
            content = json.content;
        }
        return content;
    }
    static getSecrets(json: Record<string, unknown>): {
        [key: string]: string;
    } {
        let secrets: { [key: string]: string } = {};
        if ("secrets" in json && typeof json.secrets === "object") {
            if (json.secrets !== null) {
                secrets = Object.entries(json.secrets).reduce(
                    (acc, [key, value]) => {
                        acc[key] = value.toString();
                        return acc;
                    },
                    {} as { [key: string]: string },
                );
            }
        }
        return secrets;
    }
}

export const DEFAULT_SKILL_CONTENT = `# filename: {new_skill}.py
"""Replace this with your code.

make sure a function with the same name
as the skill is defined in the code.
"""


def new_skill() -> None:
    """Skill entry point."""
    ...
`;
