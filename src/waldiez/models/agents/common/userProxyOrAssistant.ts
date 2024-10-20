import { Node, XYPosition } from '@xyflow/react';

import { nanoid } from 'nanoid';

import { WaldieSourceAgentCommonData } from '@waldiez/models/agents/common';
import {
  IWaldieSourceUserProxyOrAssistant,
  IWaldieSourceUserProxyOrAssistantData,
  WaldieAgentCodeExecutionConfig,
  WaldieAgentHumanInputMode,
  WaldieAgentLinkedSkill,
  WaldieAgentNestedChat,
  WaldieAgentNodeType,
  WaldieAgentTeachability,
  WaldieAgentTerminationMessageCheck,
  WaldieNodeUserProxyOrAssistant,
  WaldieNodeUserProxyOrAssistantData
} from '@waldiez/models/types';

export class WaldieSourceUserProxyOrAssistant implements IWaldieSourceUserProxyOrAssistant {
  id: string;
  data: IWaldieSourceUserProxyOrAssistantData;
  rest: { [key: string]: unknown };
  agentType: 'user' | 'assistant';

  constructor(
    id: string,
    data: IWaldieSourceUserProxyOrAssistantData,
    rest: { [key: string]: unknown } = {}
  ) {
    this.id = id;
    this.data = data;
    this.rest = rest;
    this.agentType = data.agentType;
  }

  asNode(position?: XYPosition): WaldieNodeUserProxyOrAssistant {
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
    const data = agentData as WaldieNodeUserProxyOrAssistantData;
    return {
      id: this.id,
      type: 'agent' as const,
      data: data,
      position: pos,
      ...this.rest
    } as Node<WaldieNodeUserProxyOrAssistantData, 'agent'>;
  }
  static getId = (json: Record<string, unknown>): string => {
    let id = `wa-${nanoid()}`;
    if ('id' in json && typeof json.id === 'string') {
      id = json.id;
      delete json.id;
    }
    return id;
  };
  static getAgentName = (
    agentType: 'user' | 'assistant',
    name: string | null,
    json: Record<string, unknown>
  ): string => {
    let agentName = `${agentType.charAt(0).toUpperCase()}${agentType.slice(1)}`;
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
    fallback: WaldieAgentNodeType
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
  static fromJSON = (
    json: unknown,
    agentType: WaldieAgentNodeType,
    name: string | null = null
  ): WaldieSourceUserProxyOrAssistant => {
    if (!json || typeof json !== 'object') {
      return new WaldieSourceUserProxyOrAssistant(
        'wa-' + nanoid(),
        new WaldieSourceUserProxyOrAssistantData(name ?? 'Agent', agentType as 'user' | 'assistant')
      );
    }
    const jsonObject = json as Record<string, unknown>;
    const rest = { ...jsonObject };
    const id = WaldieSourceUserProxyOrAssistant.getId(rest);
    const agentNodeType = WaldieSourceUserProxyOrAssistant.getAgentType(jsonObject, agentType);
    const agentName = WaldieSourceUserProxyOrAssistant.getAgentName(agentNodeType, name, jsonObject);
    let data: IWaldieSourceUserProxyOrAssistantData;
    if ('data' in jsonObject && typeof jsonObject.data === 'object') {
      delete rest.data;
      data = WaldieSourceUserProxyOrAssistantData.fromJSON(
        jsonObject.data as Record<string, unknown>,
        agentNodeType,
        name
      );
    } else {
      data = WaldieSourceUserProxyOrAssistantData.fromJSON(jsonObject, agentNodeType, agentName);
    }
    return new WaldieSourceUserProxyOrAssistant(id, data, rest);
  };
}

export class WaldieSourceUserProxyOrAssistantData
  extends WaldieSourceAgentCommonData
  implements IWaldieSourceUserProxyOrAssistantData
{
  agentType: 'user' | 'assistant';
  nestedChats: {
    triggeredBy: { id: string; isReply: boolean }[];
    messages: { id: string; isReply: boolean }[];
  }[];

  constructor(
    name: string = 'Agent',
    agentType: 'user' | 'assistant' = 'user',
    systemMessage: string | null = null,
    humanInputMode: WaldieAgentHumanInputMode = 'NEVER',
    description: string = "The agent's description",
    maxTokens: number | null = null,
    codeExecutionConfig: WaldieAgentCodeExecutionConfig = false,
    agentDefaultAutoReply: string | null = null,
    maxConsecutiveAutoReply: number | null = null,
    termination: WaldieAgentTerminationMessageCheck = {
      type: 'none',
      keywords: [],
      criterion: null,
      methodContent: null
    },
    teachability: WaldieAgentTeachability = {
      enabled: false,
      verbosity: 0,
      resetDb: false,
      recallThreshold: 0,
      maxMumRetrievals: 0
    },
    modelIds: string[] = [],
    skills: WaldieAgentLinkedSkill[] = [],
    tags: string[] = [],
    requirements: string[] = [],
    createdAt: string = new Date().toISOString(),
    updatedAt: string = new Date().toISOString(),
    nestedChats: WaldieAgentNestedChat[] = []
  ) {
    super(
      name,
      agentType,
      systemMessage,
      humanInputMode,
      description,
      maxTokens,
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
      updatedAt
    );
    this.nestedChats = nestedChats;
    this.agentType = agentType;
  }
  static fromJSON = (
    data: unknown,
    agentType: WaldieAgentNodeType,
    name: string | null = null
  ): IWaldieSourceUserProxyOrAssistantData => {
    if (!data || typeof data !== 'object') {
      return new WaldieSourceUserProxyOrAssistantData(name ?? 'Agent', agentType as 'user' | 'assistant');
    }
    const commonData = WaldieSourceAgentCommonData.fromJSON(data, agentType, name);
    let nestedChats: WaldieAgentNestedChat[] = [];
    if ('nestedChats' in data && Array.isArray(data.nestedChats)) {
      nestedChats = data.nestedChats.filter(
        nc =>
          typeof nc === 'object' &&
          nc &&
          'triggeredBy' in nc &&
          Array.isArray(nc.triggeredBy) &&
          'messages' in nc &&
          Array.isArray(nc.messages)
      ) as WaldieAgentNestedChat[];
    }
    return new WaldieSourceUserProxyOrAssistantData(
      commonData.name,
      commonData.agentType as 'user' | 'assistant',
      commonData.systemMessage,
      commonData.humanInputMode,
      commonData.description,
      commonData.maxTokens,
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
      nestedChats
    );
  };
}
