import { nanoid } from 'nanoid';

import { WaldiezSourceAgentCommonData } from '@waldiez/models/agents/common';
import { WaldiezSourceRagUserData } from '@waldiez/models/agents/ragUser/data';
import {
  IWaldiezSourceRagUser,
  IWaldiezSourceRagUserData,
  WaldiezNodeRagUser,
  WaldiezNodeRagUserData
} from '@waldiez/models/types/';

export class WaldiezSourceRagUser extends WaldiezSourceAgentCommonData implements IWaldiezSourceRagUser {
  id: string;
  data: IWaldiezSourceRagUserData;
  rest: { [key: string]: unknown };

  constructor(id: string, data: IWaldiezSourceRagUserData, rest: { [key: string]: unknown } = {}) {
    super(
      data.name,
      'rag_user',
      data.systemMessage,
      data.humanInputMode,
      data.description,
      data.codeExecutionConfig,
      data.agentDefaultAutoReply,
      data.maxConsecutiveAutoReply,
      data.termination,
      data.teachability,
      data.modelIds,
      data.skills,
      data.tags,
      data.requirements,
      data.createdAt,
      data.updatedAt
    );
    this.id = id;
    this.data = data;
    this.rest = rest;
    this.agentType = 'rag_user';
  }

  asNode: (position?: { x: number; y: number }) => WaldiezNodeRagUser = position => {
    // if position is provided, use it
    // otherwise check if self.rest has position
    let pos = { x: 20, y: 20 };
    if (position) {
      pos = position;
    } else if ('position' in this.rest && this.rest.position) {
      if (typeof this.rest.position === 'object' && 'x' in this.rest.position && 'y' in this.rest.position) {
        pos = this.rest.position as { x: number; y: number };
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
      agentType: 'rag_user',
      data: nodeData as WaldiezNodeRagUserData,
      position: pos,
      ...this.rest
    } as WaldiezNodeRagUser;
  };
  static fromJSON = (json: unknown, name: string | null = null): WaldiezSourceRagUser => {
    let jsonObject = json as Record<string, unknown>;
    if (!json || typeof json !== 'object') {
      jsonObject = {};
    }
    let id = `wm-${nanoid()}`;
    if ('id' in jsonObject && typeof jsonObject.id === 'string') {
      id = jsonObject.id;
    }
    const data = WaldiezSourceRagUserData.fromJSON(jsonObject.data ?? jsonObject, name);
    return new WaldiezSourceRagUser(id, data);
  };
}
