import { skillJson } from './data';
import { expectTypeOf } from 'vitest';

import { WaldiezSourceSkill, WaldiezSourceSkillData } from '@waldiez/models/skill';
import { WaldiezSkillNode, WaldiezSkillNodeData } from '@waldiez/models/types/waldiezSkill';

describe('WaldiezSourceSkill', () => {
  const skillData: WaldiezSourceSkillData = {
    name: 'test skill',
    content: 'test content',
    description: 'test description',
    secrets: {},
    tags: [],
    requirements: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const skill = new WaldiezSourceSkill('test-id', skillData);
  const skillNode = skill.asNode();
  it('should create a new skill', () => {
    expect(skill).toBeInstanceOf(WaldiezSourceSkill);
  });

  it('should have the correct data', () => {
    expect(skill.data).toEqual(skillData);
  });

  it('should create a new skill node', () => {
    expectTypeOf(skillNode).toEqualTypeOf<WaldiezSkillNode>();
  });

  it('should have data of type WaldiezSkillNodeData', () => {
    expectTypeOf(skillNode.data).toEqualTypeOf<WaldiezSkillNodeData>();
  });

  it('should have the correct node id', () => {
    expect(skillNode.id).toEqual('test-id');
  });

  it('should have the correct node type', () => {
    expect(skillNode.type).toEqual('skill');
  });

  it('should have the correct label', () => {
    expect(skillNode.data.label).toEqual(skillData.name);
  });

  it('should import a skill from json', () => {
    const importedSkill = WaldiezSourceSkill.fromJSON(skillJson);
    expect(importedSkill).toBeInstanceOf(WaldiezSourceSkill);
    expect(importedSkill.data.name).toEqual(skillData.name);
    expect(importedSkill.data.secrets).toEqual({
      secretKey: 'secretValue'
    });
    const skillNode = importedSkill.asNode();
    expect(skillNode.id).toEqual('test-id');
    expect(skillNode.position).toEqual({ x: 0, y: 0 });
  });

  it('should import a skill from json using label instead of name', () => {
    const skillJsonWithLabel = {
      ...skillJson,
      label: 'label of test skill'
    } as any;
    delete skillJsonWithLabel.name;
    const importedSkill = WaldiezSourceSkill.fromJSON(skillJsonWithLabel);
    expect(importedSkill.data.name).toEqual('label of test skill');
  });

  it('should create a skill from json overriding position', () => {
    const importedSkillNode = WaldiezSourceSkill.fromJSON({
      ...skillJson
    }).asNode({ x: 1, y: 1 });
    expect(importedSkillNode.position).toEqual({ x: 1, y: 1 });
  });

  it('should create a new skill with default values', () => {
    const skill = WaldiezSourceSkill.fromJSON(null);
    expect(skill).toBeInstanceOf(WaldiezSourceSkill);
  });

  it('should create new skill data with default values', () => {
    const skillData = WaldiezSourceSkillData.fromJSON(null, '', '', [], []);
    expect(skillData).toBeInstanceOf(WaldiezSourceSkillData);
    const skill = new WaldiezSourceSkill('test-id', skillData);
    expect(skill).toBeInstanceOf(WaldiezSourceSkill);
    expect(skill.data).toEqual(skillData);
  });
});
