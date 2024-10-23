import { WaldiezSkillNode } from '@waldiez/models';

export const exportSkill = (skill: WaldiezSkillNode, replaceSecrets: boolean = true) => {
  const secrets = { ...skill.data.secrets };
  if (replaceSecrets) {
    for (const key in secrets) {
      if (typeof secrets[key] === 'string') {
        secrets[key] = 'REPLACE_ME';
      }
    }
  }
  return {
    id: skill.id,
    type: 'skill',
    name: skill.data.label,
    description: skill.data.description,
    tags: skill.data.tags,
    requirements: skill.data.requirements,
    createdAt: skill.data.createdAt,
    updatedAt: skill.data.updatedAt,
    data: {
      content: skill.data.content,
      secrets
    }
  };
};
