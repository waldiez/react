/**
 * Skill data.
 * @param content - The content of the skill
 * @param secrets - The secrets (environment variables) of the skill
 */
export class WaldiezSkillData {
    content: string;
    secrets: { [key: string]: string };
    constructor(
        props: {
            content: string;
            secrets: { [key: string]: string };
        } = {
            content: DEFAULT_SKILL_CONTENT,
            secrets: {},
        },
    ) {
        const { content, secrets } = props;
        this.content = content;
        this.secrets = secrets;
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
