import { nanoid } from 'nanoid';

import { WaldieSkillNode, WaldieSourceSkill, WaldieSourceSkillData } from '@waldiez/models';
import { getNodeMeta } from '@waldiez/store/importing/common';

export const importSkill: (data: any, skillId: string) => WaldieSkillNode = (data, skillId) => {
  let id = 'ws-' + nanoid();
  if (skillId && typeof skillId === 'string') {
    id = skillId;
  }
  if (!data || typeof data !== 'object') {
    const emptySkillData = new WaldieSourceSkillData();
    return new WaldieSourceSkill(id, emptySkillData).asNode();
  }
  const { name, description, tags, requirements, createdAt, updatedAt } = getNodeMeta(data, 'skill');
  let skillData = data;
  if ('data' in data && typeof data.data === 'object') {
    skillData = data.data;
  }
  const importedSkillData = WaldieSourceSkillData.fromJSON(
    skillData,
    name,
    description,
    tags,
    requirements,
    createdAt,
    updatedAt
  );
  delete data.data;
  return {
    id,
    ...data,
    type: 'skill',
    data: { ...importedSkillData, label: importedSkillData.name }
  };
};
