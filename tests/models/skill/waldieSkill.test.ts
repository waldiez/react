import { skillJson } from './data';
import { expectTypeOf } from 'vitest';

import { WaldieSourceSkill, WaldieSourceSkillData } from '@waldiez/models/skill';
import { WaldieSkillNode, WaldieSkillNodeData } from '@waldiez/models/types/waldieSkill';

describe('WaldieSourceSkill', () => {
  const skillData: WaldieSourceSkillData = {
    name: 'test skill',
    content: 'test content',
    description: 'test description',
    secrets: {},
    tags: [],
    requirements: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const skill = new WaldieSourceSkill('test-id', skillData);
  const skillNode = skill.asNode();
  it('should create a new skill', () => {
    expect(skill).toBeInstanceOf(WaldieSourceSkill);
  });

  it('should have the correct data', () => {
    expect(skill.data).toEqual(skillData);
  });

  it('should create a new skill node', () => {
    expectTypeOf(skillNode).toEqualTypeOf<WaldieSkillNode>();
  });

  it('should have data of type WaldieSkillNodeData', () => {
    expectTypeOf(skillNode.data).toEqualTypeOf<WaldieSkillNodeData>();
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
    const importedSkill = WaldieSourceSkill.fromJSON(skillJson);
    expect(importedSkill).toBeInstanceOf(WaldieSourceSkill);
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
    const importedSkill = WaldieSourceSkill.fromJSON(skillJsonWithLabel);
    expect(importedSkill.data.name).toEqual('label of test skill');
  });

  it('should create a skill from json overriding position', () => {
    const importedSkillNode = WaldieSourceSkill.fromJSON({
      ...skillJson
    }).asNode({ x: 1, y: 1 });
    expect(importedSkillNode.position).toEqual({ x: 1, y: 1 });
  });

  it('should create a new skill with default values', () => {
    const skill = WaldieSourceSkill.fromJSON(null);
    expect(skill).toBeInstanceOf(WaldieSourceSkill);
  });

  it('should create new skill data with default values', () => {
    const skillData = WaldieSourceSkillData.fromJSON(null, '', '', [], []);
    expect(skillData).toBeInstanceOf(WaldieSourceSkillData);
    const skill = new WaldieSourceSkill('test-id', skillData);
    expect(skill).toBeInstanceOf(WaldieSourceSkill);
    expect(skill.data).toEqual(skillData);
  });
});
