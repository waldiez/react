import { XYPosition } from '@xyflow/react';

import { nanoid } from 'nanoid';

import { WaldieSourceGroupManagerData } from '@waldiez/models/agents/manager/data';
import {
  IWaldieSourceGroupManager,
  IWaldieSourceGroupManagerData,
  WaldieNodeGroupManager,
  WaldieNodeGroupManagerData
} from '@waldiez/models/types/';

export class WaldieSourceGroupManager implements IWaldieSourceGroupManager {
  id: string;
  data: IWaldieSourceGroupManagerData;
  rest: { [key: string]: unknown };

  constructor(id: string, data: IWaldieSourceGroupManagerData, rest: { [key: string]: unknown } = {}) {
    this.id = id;
    this.data = data;
    this.rest = rest;
  }

  asNode: (position?: XYPosition) => WaldieNodeGroupManager = position => {
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
      data: nodeData as WaldieNodeGroupManagerData,
      position: pos,
      ...this.rest
    };
  };
  static fromJSON = (json: unknown): WaldieSourceGroupManager => {
    let jsonObject = json as Record<string, unknown>;
    if (!json || typeof json !== 'object') {
      jsonObject = {};
    }
    // const jsonObject = json as Record<string, unknown>;
    let id = `wm-${nanoid()}`;
    if ('id' in jsonObject && typeof jsonObject.id === 'string') {
      id = jsonObject.id;
    }
    const data = WaldieSourceGroupManagerData.fromJSON(jsonObject.data ?? jsonObject, 'manager');
    return new WaldieSourceGroupManager(id, data);
  };
}
