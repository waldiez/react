import { nanoid } from 'nanoid';

import { WaldiezSourceEdgeData } from '@waldiez/models/edge/data';
import {
  IWaldiezSourceEdge,
  IWaldiezSourceEdgeData,
  WaldiezEdge,
  WaldiezEdgeData,
  WaldiezEdgeDataCommon
} from '@waldiez/models/types';

export class WaldiezSourceEdge implements IWaldiezSourceEdge {
  id: string;
  data: IWaldiezSourceEdgeData;
  source: string;
  target: string;
  rest: { [key: string]: unknown };

  constructor(edgeData: {
    id: string;
    source: string;
    target: string;
    data: WaldiezEdgeData | IWaldiezSourceEdgeData | WaldiezEdgeDataCommon;
    rest: { [key: string]: unknown };
  }) {
    const { id, source, target, data, rest } = edgeData;
    this.id = id;
    let name = 'New connection';
    if ('name' in data && typeof data.name === 'string') {
      name = data.name;
    } else if ('label' in data && typeof data.label === 'string') {
      name = data.label;
    }
    this.data = {
      source,
      target,
      description: data.description,
      position: data.position,
      order: data.order,
      clearHistory: data.clearHistory,
      message: data.message,
      nestedChat: data.nestedChat,
      summary: data.summary,
      maxTurns: data.maxTurns,
      name
    };
    this.source = source;
    this.target = target;
    this.rest = rest;
  }

  asEdge(): WaldiezEdge {
    const data = {
      label: this.data.name,
      description: this.data.description,
      position: this.data.position,
      order: this.data.order,
      clearHistory: this.data.clearHistory,
      message: this.data.message,
      nestedChat: this.data.nestedChat,
      summary: this.data.summary,
      maxTurns: this.data.maxTurns
    } as WaldiezEdgeData;
    return {
      id: this.id,
      source: this.source,
      target: this.target,
      data,
      ...this.rest
    };
  }
  private static getId(data: Record<string, unknown>): string {
    let id = `we-${nanoid()}`;
    if ('id' in data && typeof data.id === 'string') {
      id = data.id;
    }
    return id;
  }
  private static getSource(data: Record<string, unknown>, json: any): string {
    let source = 'source';
    // either  in json.data.source or in json.source
    if ('source' in json && typeof json.source === 'string') {
      source = json.source;
    } else if ('source' in data && typeof data.source === 'string') {
      source = data.source;
    }
    return source;
  }
  private static getTarget(data: Record<string, unknown>, json: any): string {
    let target = 'target';
    // either  in json.data.target or in json.target
    if ('target' in json && typeof json.target === 'string') {
      target = json.target;
    } else if ('target' in data && typeof data.target === 'string') {
      target = data.target;
    }
    return target;
  }
  private static getEdgeData(json: Record<string, unknown>): Record<string, unknown> {
    let edgeData: Record<string, unknown> = {};
    if ('data' in json && typeof json.data === 'object' && json.data) {
      edgeData = json.data as Record<string, unknown>;
    }
    return edgeData;
  }
  static fromJSON(json: unknown, position: number | null = null): WaldiezSourceEdge {
    if (!json || typeof json !== 'object') {
      return new WaldiezSourceEdge({
        id: `we-${nanoid()}`,
        source: 'source',
        target: 'target',
        data: new WaldiezSourceEdgeData(),
        rest: {}
      });
    }
    const jsonObject = json as Record<string, unknown>;
    const id = WaldiezSourceEdge.getId(jsonObject);
    const edgeData = WaldiezSourceEdge.getEdgeData(jsonObject);
    const source = WaldiezSourceEdge.getSource(edgeData, jsonObject);
    const target = WaldiezSourceEdge.getTarget(edgeData, jsonObject);
    const data = WaldiezSourceEdgeData.fromJSON(edgeData, position);
    const rest: { [key: string]: unknown } = {};
    // gather the remaining keys
    for (const key in jsonObject) {
      if (key !== 'id' && key !== 'data' && key !== 'source' && key !== 'target') {
        rest[key] = jsonObject[key];
      }
    }
    return new WaldiezSourceEdge({ id, source, target, data, rest });
  }
}
