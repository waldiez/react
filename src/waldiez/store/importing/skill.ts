import { WaldiezSkillNode, WaldiezSourceSkill, WaldiezSourceSkillData } from '@waldiez/models';
import { getNodeMeta } from '@waldiez/store/importing/common';
import { getId } from '@waldiez/utils';

export const importSkill: (data: any, skillId: string) => WaldiezSkillNode = (data, skillId) => {
  let id = 'ws-' + getId();
  if (skillId && typeof skillId === 'string') {
    id = skillId;
  }
  if (!data || typeof data !== 'object') {
    const emptySkillData = new WaldiezSourceSkillData();
    return new WaldiezSourceSkill(id, emptySkillData).asNode();
  }
  const { name, description, tags, requirements, createdAt, updatedAt } = getNodeMeta(data, 'skill');
  let skillData = data;
  if ('data' in data && typeof data.data === 'object') {
    skillData = data.data;
  }
  const importedSkillData = WaldiezSourceSkillData.fromJSON(
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
