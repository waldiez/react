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
    const agentName = WaldiezSourceUserProxyOrAssistant.getAgentName(agentNodeType, name, jsonObject);
    let data: IWaldiezSourceUserProxyOrAssistantData;
    if ('data' in jsonObject && typeof jsonObject.data === 'object') {
      delete rest.data;
      data = WaldiezSourceUserProxyOrAssistantData.fromJSON(
        jsonObject.data as Record<string, unknown>,
        agentNodeType,
        name
      );
    } else {
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
    triggeredBy: { id: string; isReply: boolean }[];
    messages: { id: string; isReply: boolean }[];
  }[];

  constructor(
    name: string = 'Agent',
    agentType: 'user' | 'assistant' = 'user',
    systemMessage: string | null = null,
    humanInputMode: WaldiezAgentHumanInputMode = 'NEVER',
    description: string = "The agent's description",
    maxTokens: number | null = null,
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
    nestedChats: WaldiezAgentNestedChat[] = []
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
    agentType: WaldiezAgentNodeType,
    name: string | null = null
  ): IWaldiezSourceUserProxyOrAssistantData => {
    if (!data || typeof data !== 'object') {
      return new WaldiezSourceUserProxyOrAssistantData(name ?? 'Agent', agentType as 'user' | 'assistant');
    }
    const commonData = WaldiezSourceAgentCommonData.fromJSON(data, agentType, name);
    let nestedChats: WaldiezAgentNestedChat[] = [];
    if ('nestedChats' in data && Array.isArray(data.nestedChats)) {
      nestedChats = data.nestedChats.filter(
        nc =>
          typeof nc === 'object' &&
          nc &&
          'triggeredBy' in nc &&
          Array.isArray(nc.triggeredBy) &&
          'messages' in nc &&
          Array.isArray(nc.messages)
      ) as WaldiezAgentNestedChat[];
    }
    return new WaldiezSourceUserProxyOrAssistantData(
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
