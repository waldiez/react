import { WaldieSourceAgentCommonData } from '@waldiez/models/agents/common';
import { WaldieWaldieGroupManagerSpeakersData } from '@waldiez/models/agents/manager/speakers';
import {
  IWaldieSourceAgentCommonData,
  IWaldieSourceGroupManagerData,
  WaldieAgentCodeExecutionConfig,
  WaldieAgentHumanInputMode,
  WaldieAgentLinkedSkill,
  WaldieAgentNodeType,
  WaldieAgentTeachability,
  WaldieAgentTerminationMessageCheck,
  WaldieWaldieGroupManagerSpeakers
} from '@waldiez/models/types/';

export class WaldieSourceGroupManagerData
  extends WaldieSourceAgentCommonData
  implements IWaldieSourceGroupManagerData
{
  agentType: WaldieAgentNodeType;
  name: string;
  systemMessage: string | null;
  humanInputMode: WaldieAgentHumanInputMode;
  description: string;
  maxTokens: number | null;
  codeExecutionConfig: WaldieAgentCodeExecutionConfig;
  agentDefaultAutoReply: string | null;
  maxConsecutiveAutoReply: number | null;
  termination: WaldieAgentTerminationMessageCheck;
  teachability: WaldieAgentTeachability;
  modelIds: string[];
  skills: WaldieAgentLinkedSkill[];
  tags: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
  // manager specific fields
  maxRound: number | null;
  adminName: string | null;
  speakers: WaldieWaldieGroupManagerSpeakers;
  enableClearHistory?: boolean;
  sendIntroductions?: boolean;

  /* eslint-disable max-statements,complexity */
  constructor(
    name: string = 'Manager',
    systemMessage: string | null = null,
    humanInputMode: WaldieAgentHumanInputMode = 'NEVER',
    description: string = 'A group manager agent',
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
    maxRound: number | null = null,
    adminName: string | null = null,
    speakers: WaldieWaldieGroupManagerSpeakers = {
      selectionMethod: 'auto',
      selectionCustomMethod: '',
      maxRetriesForSelecting: null,
      selectionMode: 'repeat',
      allowRepeat: true,
      allowedOrDisallowedTransitions: {},
      transitionsType: 'allowed'
    },
    enableClearHistory: boolean | undefined = undefined,
    sendIntroductions: boolean | undefined = undefined
  ) {
    super(
      name,
      'manager',
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
    this.name = name;
    this.systemMessage = systemMessage;
    this.humanInputMode = humanInputMode;
    this.description = description;
    this.maxTokens = maxTokens;
    this.codeExecutionConfig = codeExecutionConfig;
    this.agentDefaultAutoReply = agentDefaultAutoReply;
    this.maxConsecutiveAutoReply = maxConsecutiveAutoReply;
    this.termination = termination;
    this.teachability = teachability;
    this.modelIds = modelIds;
    this.skills = skills;
    this.tags = tags;
    this.requirements = requirements;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.maxRound = maxRound;
    this.adminName = adminName;
    this.speakers = speakers;
    this.enableClearHistory = enableClearHistory;
    this.sendIntroductions = sendIntroductions;
    this.agentType = 'manager';
  }
  static getSpeakers = (json: any): WaldieWaldieGroupManagerSpeakers => {
    const speakersData = WaldieWaldieGroupManagerSpeakersData.fromJSON(json);
    return speakersData.data;
  };
  static getMaxRound = (json: any): number | null => {
    if ('maxRound' in json && typeof json.maxRound === 'number') {
      return json.maxRound;
    }
    return null;
  };
  static getAdminName = (json: any): string | null => {
    if ('adminName' in json && typeof json.adminName === 'string') {
      return json.adminName;
    }
    return null;
  };
  static getEnableClearHistory = (json: any): boolean | undefined => {
    if ('enableClearHistory' in json && typeof json.enableClearHistory === 'boolean') {
      return json.enableClearHistory;
    }
    return undefined;
  };
  static getSendIntroductions = (json: any): boolean | undefined => {
    if ('sendIntroductions' in json && typeof json.sendIntroductions === 'boolean') {
      return json.sendIntroductions;
    }
    return undefined;
  };
  static getAgentNameFromJSON = (
    json: any,
    name: string | null,
    inherited: IWaldieSourceAgentCommonData
  ): string => {
    let agentName: string = name ?? inherited.name;
    if ('name' in json && typeof json.name === 'string') {
      agentName = json.name;
    } else if ('label' in json && typeof json.label === 'string') {
      agentName = json.label;
    }
    return agentName;
  };
  static fromJSON = (json: unknown, name: string | null = null): IWaldieSourceGroupManagerData => {
    if (!json || typeof json !== 'object') {
      return new WaldieSourceGroupManagerData();
    }
    const inherited = WaldieSourceAgentCommonData.fromJSON(json, 'manager', name ?? 'Manager');
    const speakers = WaldieSourceGroupManagerData.getSpeakers(json);
    const maxRound = WaldieSourceGroupManagerData.getMaxRound(json);
    const adminName = WaldieSourceGroupManagerData.getAdminName(json);
    const enableClearHistory = WaldieSourceGroupManagerData.getEnableClearHistory(json);
    const sendIntroductions = WaldieSourceGroupManagerData.getSendIntroductions(json);
    const agentName = WaldieSourceGroupManagerData.getAgentNameFromJSON(json, name, inherited);
    return new WaldieSourceGroupManagerData(
      agentName,
      inherited.systemMessage,
      inherited.humanInputMode,
      inherited.description,
      inherited.maxTokens,
      inherited.codeExecutionConfig,
      inherited.agentDefaultAutoReply,
      inherited.maxConsecutiveAutoReply,
      inherited.termination,
      inherited.teachability,
      inherited.modelIds,
      inherited.skills,
      inherited.tags,
      inherited.requirements,
      inherited.createdAt,
      inherited.updatedAt,
      maxRound,
      adminName,
      speakers,
      enableClearHistory,
      sendIntroductions
    );
  };
}
