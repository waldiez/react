import { XYPosition } from '@xyflow/react';

import { nanoid } from 'nanoid';

import { WaldieSourceModelData } from '@waldiez/models/model/data';
import {
  IWaldieSourceModel,
  IWaldieSourceModelData,
  WaldieModelNode,
  WaldieModelNodeData
} from '@waldiez/models/types';

export class WaldieSourceModel implements IWaldieSourceModel {
  id: string;
  data: IWaldieSourceModelData;
  rest: { [key: string]: unknown } = {};

  constructor(id: string, data: IWaldieSourceModelData, rest: { [key: string]: unknown } = {}) {
    this.id = id;
    this.data = data;
    this.rest = rest;
  }

  asNode = (position?: XYPosition): WaldieModelNode => {
    // if position is provided, use it
    // otherwise check if self.rest has position
    let pos = { x: 20, y: 20 };
    if (position) {
      pos = position;
    } else if ('position' in this.rest && this.rest.position) {
      if (typeof this.rest.position === 'object' && 'x' in this.rest.position && 'y' in this.rest.position) {
        pos = this.rest.position as XYPosition;
      }
    }
    const nodeData = {
      ...this.data
    } as { [key: string]: unknown };
    delete nodeData.name;
    nodeData.label = this.data.name;
    if ('position' in this.rest) {
      delete this.rest.position;
    }
    return {
      id: this.id,
      type: 'model',
      data: nodeData as WaldieModelNodeData,
      position: pos,
      ...this.rest
    };
  };

  static fromJSON = (json: unknown): WaldieSourceModel => {
    if (!json || typeof json !== 'object') {
      return new WaldieSourceModel('wm-' + nanoid(), new WaldieSourceModelData());
    }
    const jsonObject = json as Record<string, unknown>;
    const id = WaldieSourceModel.getId(jsonObject);
    const name = WaldieSourceModel.getName(jsonObject);
    const description = WaldieSourceModel.getDescription(jsonObject);
    const tags = WaldieSourceModel.getTags(jsonObject);
    const requirements = WaldieSourceModel.getRequirements(jsonObject);
    const modelName = WaldieSourceModel.getModelName(name, jsonObject);
    const createdAt = WaldieSourceModel.getCreatedAt(jsonObject);
    const updatedAt = WaldieSourceModel.getUpdatedAt(jsonObject);
    const rest = WaldieSourceModel.getRest(jsonObject);
    const data = (jsonObject.data ?? {}) as Record<string, unknown>;
    const modelData = WaldieSourceModelData.fromJSON(
      data,
      modelName,
      description,
      tags,
      requirements,
      createdAt,
      updatedAt
    );
    return new WaldieSourceModel(id, modelData, rest);
  };

  private static getId(json: Record<string, unknown>): string {
    let id = `wm-${nanoid()}`;
    if ('id' in json && typeof json.id === 'string') {
      id = json.id;
    }
    return id;
  }
  private static getName(json: Record<string, unknown>): string | null {
    let name: string | null = null;
    if ('name' in json && typeof json.name === 'string') {
      name = json.name;
    } else if ('label' in json && typeof json.label === 'string') {
      name = json.label;
    }
    return name;
  }
  private static getDescription(json: Record<string, unknown>): string {
    let description = 'A new model';
    if ('description' in json && typeof json.description === 'string') {
      description = json.description;
    }
    return description;
  }
  private static getTags(json: Record<string, unknown>): string[] {
    let tags: string[] = [];
    if ('tags' in json && Array.isArray(json.tags)) {
      tags = json.tags as string[];
    }
    return tags;
  }
  private static getRequirements(json: Record<string, unknown>): string[] {
    let requirements: string[] = [];
    if ('requirements' in json && Array.isArray(json.requirements)) {
      requirements = json.requirements as string[];
    }
    return requirements;
  }
  private static getModelName(name: string | null, json: Record<string, unknown>): string {
    let modelName = name ?? 'Model';
    if ('name' in json && typeof json.name === 'string') {
      modelName = json.name;
    }
    return modelName;
  }
  private static getCreatedAt(json: Record<string, unknown>): string {
    let createdAt = new Date().toISOString();
    if ('createdAt' in json && typeof json.createdAt === 'string') {
      createdAt = json.createdAt;
    }
    return createdAt;
  }
  private static getUpdatedAt(json: Record<string, unknown>): string {
    let updatedAt = new Date().toISOString();
    if ('updatedAt' in json && typeof json.updatedAt === 'string') {
      updatedAt = json.updatedAt;
    }
    return updatedAt;
  }
  private static getRest(json: Record<string, unknown>): {
    [key: string]: unknown;
  } {
    let rest: { [key: string]: unknown } = {};
    // the rest of the keys in the json object
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
