import { Node, XYPosition } from '@xyflow/react';

import { nanoid } from 'nanoid';

import { WaldiezSourceAgentCommonData } from '@waldiez/models/agents/common';
import {
  IWaldiezSourceUserProxyOrAssistant,
  IWaldiezSourceUserProxyOrAssistantData,
  WaldiezAgentCodeExecutionConfig,
  WaldiezAgentHumanInputMode,
  WaldiezAgentLinkedSkill,
  WaldiezAgentNestedChat,
  WaldiezAgentNodeType,
  WaldiezAgentTeachability,
  WaldiezAgentTerminationMessageCheck,
  WaldiezNodeUserProxyOrAssistant,
  WaldiezNodeUserProxyOrAssistantData
} from '@waldiez/models/types';

export class WaldiezSourceUserProxyOrAssistant implements IWaldiezSourceUserProxyOrAssistant {
  id: string;
  data: IWaldiezSourceUserProxyOrAssistantData;
  rest: { [key: string]: unknown };
  agentType: 'user' | 'assistant';

  constructor(
    id: string,
    data: IWaldiezSourceUserProxyOrAssistantData,
    rest: { [key: string]: unknown } = {}
  ) {
    this.id = id;
    this.data = data;
    this.rest = rest;
    this.agentType = data.agentType;
  }

  asNode(position?: XYPosition): WaldiezNodeUserProxyOrAssistant {
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
    const agentData = {
      ...this.data,
      label: this.data.name
    } as { [key: string]: unknown };
    delete agentData.name;
    const data = agentData as WaldiezNodeUserProxyOrAssistantData;
    return {
      id: this.id,
      type: 'agent' as const,
      data: data,
      position: pos,
      ...this.rest
    } as Node<WaldiezNodeUserProxyOrAssistantData, 'agent'>;
  }
  static getId = (json: Record<string, unknown>): string => {
    let id = `wa-${nanoid()}`;
    if ('id' in json && typeof json.id === 'string') {
      id = json.id;
      delete json.id;
    }
    return id;
  };
  static getAgentName = (name: string | null, json: Record<string, unknown>): string | null => {
    let agentName = null;
    if (name && typeof name === 'string') {
      agentName = name;
    } else if ('name' in json && typeof json.name === 'string') {
      agentName = json.name;
    } else if ('label' in json && typeof json.label === 'string') {
      agentName = json.label;
    }
    return agentName;
  };
  static getAgentType = (
    json: Record<string, unknown>,
    fallback: WaldiezAgentNodeType
  ): 'user' | 'assistant' => {
    let agentType = fallback;
    if (
      'agentType' in json &&
      typeof json.agentType === 'string' &&
      ['user', 'assistant'].includes(json.agentType)
    ) {
      agentType = json.agentType as 'user' | 'assistant';
    }
    return agentType as 'user' | 'assistant';
  };
  static getAgentDescription = (agentType: 'user' | 'assistant', json: Record<string, unknown>): string => {
    const fallback = `A ${agentType === 'user' ? '' : 'n'} agent`;
    let description = fallback;
    if ('description' in json && typeof json.description === 'string') {
      description = json.description;
    }
    return description;
  };
  static fromJSON = (
    json: unknown,
    agentType: WaldiezAgentNodeType,
    name: string | null = null
  ): WaldiezSourceUserProxyOrAssistant => {
    if (!json || typeof json !== 'object') {
      return new WaldiezSourceUserProxyOrAssistant(
        'wa-' + nanoid(),
        new WaldiezSourceUserProxyOrAssistantData(name ?? 'Agent', agentType as 'user' | 'assistant')
      );
    }
    const jsonObject = json as Record<string, unknown>;
    const rest = { ...jsonObject };
    const id = WaldiezSourceUserProxyOrAssistant.getId(rest);
    const agentNodeType = WaldiezSourceUserProxyOrAssistant.getAgentType(jsonObject, agentType);
    const agentName = WaldiezSourceUserProxyOrAssistant.getAgentName(name, jsonObject);
    const agentDescription = WaldiezSourceUserProxyOrAssistant.getAgentDescription(agentNodeType, jsonObject);
    let data: IWaldiezSourceUserProxyOrAssistantData;
    if ('data' in jsonObject && typeof jsonObject.data === 'object' && jsonObject.data) {
      delete rest.data;
      const jsonObjectData = jsonObject.data as Record<string, unknown>;
      if (!('description' in jsonObjectData)) {
        jsonObjectData.description = agentDescription;
      }
      data = WaldiezSourceUserProxyOrAssistantData.fromJSON(jsonObjectData, agentNodeType, agentName);
    } else {
      if (!('description' in jsonObject)) {
        jsonObject.description = agentDescription;
      }
      data = WaldiezSourceUserProxyOrAssistantData.fromJSON(jsonObject, agentNodeType, agentName);
    }
    return new WaldiezSourceUserProxyOrAssistant(id, data, rest);
  };
}

export class WaldiezSourceUserProxyOrAssistantData
  extends WaldiezSourceAgentCommonData
  implements IWaldiezSourceUserProxyOrAssistantData
{
  agentType: 'user' | 'assistant';
  nestedChats: {
    triggeredBy: string[];
    messages: { id: string; isReply: boolean }[];
  }[];

  constructor(
    name: string = 'Agent',
    agentType: 'user' | 'assistant' = 'user',
    systemMessage: string | null = null,
    humanInputMode: WaldiezAgentHumanInputMode = 'NEVER',
    description: string = "The agent's description",
    codeExecutionConfig: WaldiezAgentCodeExecutionConfig = false,
    agentDefaultAutoReply: string | null = null,
    maxConsecutiveAutoReply: number | null = null,
    termination: WaldiezAgentTerminationMessageCheck = {
      type: 'none',
      keywords: [],
      criterion: null,
      methodContent: null
    },
    teachability: WaldiezAgentTeachability = {
      enabled: false,
      verbosity: 0,
      resetDb: false,
      recallThreshold: 0,
      maxMumRetrievals: 0
    },
    modelIds: string[] = [],
    skills: WaldiezAgentLinkedSkill[] = [],
    tags: string[] = [],
    requirements: string[] = [],
    createdAt: string = new Date().toISOString(),
    updatedAt: string = new Date().toISOString(),
    parentId: string | null = null,
    nestedChats: WaldiezAgentNestedChat[] = []
  ) {
    super(
      name,
      agentType,
      systemMessage,
      humanInputMode,
      description,
      codeExecutionConfig,
      agentDefaultAutoReply,
      maxConsecutiveAutoReply,
      termination,
      teachability,
      modelIds,
      skills,
      tags,
      requirements,
      createdAt,
      updatedAt,
      parentId
    );
    this.nestedChats = nestedChats;
    this.agentType = agentType;
  }
  static loadNestedChats = (nestedChats: any[]): WaldiezAgentNestedChat[] => {
    // old version: [{ triggeredBy: [{id: string, isReply: boolean}], messages: [{ id: string, isReply: boolean }] }]
    // new version: [{ triggeredBy: string[], messages: [{ id: string, isReply: boolean }] }]
    // in the old version, the id is the id of the chat (not the agent :( )
    // in the new version, the id is the id of the agent (that can trigger the nested chat)
    // we need the new version here (and maybe handle the compatibility in a previous step)
    const chats: WaldiezAgentNestedChat[] = [];
    for (const chat of nestedChats) {
      let triggeredBy = [];
      if ('triggeredBy' in chat && Array.isArray(chat.triggeredBy)) {
        triggeredBy = chat.triggeredBy.filter((trigger: any) => {
          return typeof trigger === 'string';
        });
      }
      let messages = [];
      if ('messages' in chat && Array.isArray(chat.messages)) {
        messages = chat.messages.filter((message: any) => {
          return (
            typeof message === 'object' &&
            'id' in message &&
            typeof message.id === 'string' &&
            'isReply' in message &&
            typeof message.isReply === 'boolean'
          );
        });
      }
      chats.push({ triggeredBy, messages });
    }
    return chats;
  };
  static fromJSON = (
    data: unknown,
    agentType: WaldiezAgentNodeType,
    name: string | null = null
  ): IWaldiezSourceUserProxyOrAssistantData => {
    if (!data || typeof data !== 'object') {
      return new WaldiezSourceUserProxyOrAssistantData(name ?? 'Agent', agentType as 'user' | 'assistant');
    }
    const commonData = WaldiezSourceAgentCommonData.fromJSON(data, agentType, name);
    let nestedChats: WaldiezAgentNestedChat[] = [];
    if ('nestedChats' in data && Array.isArray(data.nestedChats)) {
      nestedChats = WaldiezSourceUserProxyOrAssistantData.loadNestedChats(data.nestedChats);
    }
    return new WaldiezSourceUserProxyOrAssistantData(
      commonData.name,
      commonData.agentType as 'user' | 'assistant',
      commonData.systemMessage,
      commonData.humanInputMode,
      commonData.description,
      commonData.codeExecutionConfig,
      commonData.agentDefaultAutoReply,
      commonData.maxConsecutiveAutoReply,
      commonData.termination,
      commonData.teachability,
      commonData.modelIds,
      commonData.skills,
      commonData.tags,
      commonData.requirements,
      commonData.createdAt,
      commonData.updatedAt,
      commonData.parentId,
      nestedChats
    );
  };
}
