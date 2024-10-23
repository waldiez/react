import { XYPosition } from '@xyflow/react';

import { nanoid } from 'nanoid';

import { WaldiezSourceGroupManagerData } from '@waldiez/models/agents/manager/data';
import {
  IWaldiezSourceGroupManager,
  IWaldiezSourceGroupManagerData,
  WaldiezNodeGroupManager,
  WaldiezNodeGroupManagerData
} from '@waldiez/models/types/';

export class WaldiezSourceGroupManager implements IWaldiezSourceGroupManager {
  id: string;
  data: IWaldiezSourceGroupManagerData;
  rest: { [key: string]: unknown };

  constructor(id: string, data: IWaldiezSourceGroupManagerData, rest: { [key: string]: unknown } = {}) {
    this.id = id;
    this.data = data;
    this.rest = rest;
  }

  asNode: (position?: XYPosition) => WaldiezNodeGroupManager = position => {
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
    nodeData.label = this.data.name;
    delete nodeData.name;
    return {
      id: this.id,
      type: 'agent',
      data: nodeData as WaldiezNodeGroupManagerData,
      position: pos,
      ...this.rest
    };
  };
  static fromJSON = (json: unknown): WaldiezSourceGroupManager => {
    let jsonObject = json as Record<string, unknown>;
    if (!json || typeof json !== 'object') {
      jsonObject = {};
    }
    // const jsonObject = json as Record<string, unknown>;
    let id = `wm-${nanoid()}`;
    if ('id' in jsonObject && typeof jsonObject.id === 'string') {
      id = jsonObject.id;
    }
    const data = WaldiezSourceGroupManagerData.fromJSON(jsonObject.data ?? jsonObject, 'manager');
    return new WaldiezSourceGroupManager(id, data);
  };
}
