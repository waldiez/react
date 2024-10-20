import { XYPosition } from '@xyflow/react';

import { nanoid } from 'nanoid';

import { WaldieSourceSkillData } from '@waldiez/models/skill/data';
import {
  IWaldieSourceSkill,
  IWaldieSourceSkillData,
  WaldieSkillNode,
  WaldieSkillNodeData
} from '@waldiez/models/types';

export class WaldieSourceSkill implements IWaldieSourceSkill {
  id: string;
  data: IWaldieSourceSkillData;
  rest: { [key: string]: unknown } = {};

  constructor(id: string, data: IWaldieSourceSkillData, rest: { [key: string]: unknown } = {}) {
    this.id = id;
    this.data = data;
    this.rest = rest;
  }

  asNode = (position?: XYPosition): WaldieSkillNode => {
    // if position is provided, use it
    // otherwise check if self.rest has position
    let nodePosition = { x: 20, y: 20 };
    if (position) {
      nodePosition = position;
    } else if ('position' in this.rest && this.rest.position) {
      if (typeof this.rest.position === 'object' && 'x' in this.rest.position && 'y' in this.rest.position) {
        nodePosition = this.rest.position as XYPosition;
      }
    }
    const nodeData = {
      ...this.data
    } as { [key: string]: unknown };
    nodeData.label = this.data.name;
    const data = nodeData as WaldieSkillNodeData;
    if ('position' in this.rest) {
      delete this.rest.position;
    }
    return {
      id: this.id,
      type: 'skill',
      data,
      position: nodePosition,
      ...this.rest
    };
  };

  static fromJSON(json: unknown): WaldieSourceSkill {
    if (!json || typeof json !== 'object') {
      return new WaldieSourceSkill('ws-' + nanoid(), new WaldieSourceSkillData());
    }
    const jsonObject = json as Record<string, unknown>;
    const id = WaldieSourceSkill.getId(jsonObject);
    const data = jsonObject.data as Record<string, unknown>;
    const name = WaldieSourceSkill.getName(jsonObject);
    const description = WaldieSourceSkill.getDescription(jsonObject);
    const tags = WaldieSourceSkill.getTags(jsonObject);
    const requirements = WaldieSourceSkill.getRequirements(jsonObject);
    const createdAt = WaldieSourceSkill.getCreatedAt(jsonObject);
    const updatedAt = WaldieSourceSkill.getUpdatedAt(jsonObject);
    const rest = WaldieSourceSkill.getRest(jsonObject);
    const skillData = WaldieSourceSkillData.fromJSON(
      data,
      name,
      description,
      tags,
      requirements,
      createdAt,
      updatedAt
    );
    return new WaldieSourceSkill(id, skillData, rest);
  }
  static getId(json: Record<string, unknown>): string {
    let id = `ws-${nanoid()}`;
    if ('id' in json && typeof json.id === 'string') {
      id = json.id;
    }
    return id;
  }
  static getName(json: Record<string, unknown>): string {
    let name = 'new_skill';
    if ('name' in json && typeof json.name === 'string') {
      name = json.name;
    } else if ('label' in json && typeof json.label === 'string') {
      name = json.label;
    }
    return name;
  }
  static getDescription(json: Record<string, unknown>): string {
    let description = 'A new skill';
    if ('description' in json && typeof json.description === 'string') {
      description = json.description;
    }
    return description;
  }
  static getTags(json: Record<string, unknown>): string[] {
    let tags: string[] = [];
    if ('tags' in json && Array.isArray(json.tags)) {
      tags = json.tags.filter(tag => typeof tag === 'string');
    }
    return tags;
  }
  static getRequirements(json: Record<string, unknown>): string[] {
    let requirements: string[] = [];
    if ('requirements' in json && Array.isArray(json.requirements)) {
      requirements = json.requirements.filter(requirement => typeof requirement === 'string');
    }
    return requirements;
  }
  static getCreatedAt(json: Record<string, unknown>): string {
    let createdAt = new Date().toISOString();
    if ('createdAt' in json && typeof json.createdAt === 'string') {
      createdAt = json.createdAt;
    }
    return createdAt;
  }
  static getUpdatedAt(json: Record<string, unknown>): string {
    let updatedAt = new Date().toISOString();
    if ('updatedAt' in json && typeof json.updatedAt === 'string') {
      updatedAt = json.updatedAt;
    }
    return updatedAt;
  }
  static getRest(json: Record<string, unknown>): { [key: string]: unknown } {
    let rest: { [key: string]: unknown } = {};
    rest = Object.entries(json).reduce(
      (acc, [key, value]) => {
        if (key !== 'id' && key !== 'data') {
          acc[key] = value;
        }
        return acc;
      },
      {} as { [key: string]: unknown }
    );
    return rest;
  }
}
