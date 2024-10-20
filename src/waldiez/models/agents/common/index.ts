import { TeachabilityData } from '@waldiez/models/agents/common/teachability';
import { TerminationData } from '@waldiez/models/agents/common/termination';
import {
  IWaldieSourceAgentCommonData,
  WaldieAgentCodeExecutionConfig,
  WaldieAgentHumanInputMode,
  WaldieAgentLinkedSkill,
  WaldieAgentNodeType,
  WaldieAgentTeachability,
  WaldieAgentTerminationMessageCheck
} from '@waldiez/models/types';

export class WaldieSourceAgentCommonData implements IWaldieSourceAgentCommonData {
  name: string;
  agentType: WaldieAgentNodeType;
  systemMessage: string | null;
  humanInputMode: WaldieAgentHumanInputMode;
  description: string;
  maxTokens: number | null;
  codeExecutionConfig: WaldieAgentCodeExecutionConfig;
  agentDefaultAutoReply: string | null;
  maxConsecutiveAutoReply: number | null;
  termination: WaldieAgentTerminationMessageCheck;
  teachability: WaldieAgentTeachability;
  // links
  modelIds: string[];
  skills: WaldieAgentLinkedSkill[];
  tags: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
  constructor(
    name: string = 'Agent',
    agentType: WaldieAgentNodeType = 'user',
    systemMessage: string | null = null,
    humanInputMode: WaldieAgentHumanInputMode = 'ALWAYS',
    description: string = 'An agent',
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
    updatedAt: string = new Date().toISOString()
  ) {
    this.name = name;
    this.agentType = agentType;
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
    this.agentType = agentType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
  static fromJSON = (
    json: unknown,
    agentType: WaldieAgentNodeType,
    name: string | null = null
  ): IWaldieSourceAgentCommonData => {
    if (!json || typeof json !== 'object') {
      return new WaldieSourceAgentCommonData(name ?? 'Agent', agentType);
    }
    const data = json as Record<string, unknown>;
    const systemMessage = WaldieSourceAgentCommonData.getSystemMessage(data);
    const humanInputMode = WaldieSourceAgentCommonData.getHumanInputMode(data);
    const description = WaldieSourceAgentCommonData.getDescription(data);
    const maxTokens = WaldieSourceAgentCommonData.getMaxTokens(data);
    const codeExecutionConfig = WaldieSourceAgentCommonData.getCodeExecutionConfig(data);
    const agentDefaultAutoReply = WaldieSourceAgentCommonData.getAgentDefaultAutoReply(data);
    const maxConsecutiveAutoReply = WaldieSourceAgentCommonData.getMaximumConsecutiveAutoReply(data);
    const termination = WaldieSourceAgentCommonData.getTermination(data);
    const teachability = WaldieSourceAgentCommonData.getTeachability(data);
    const modelIds = WaldieSourceAgentCommonData.getModelIds(data);
    const skills = WaldieSourceAgentCommonData.getSkills(data);
    const agentName = WaldieSourceAgentCommonData.getAgentName(data, name);
    const tags = WaldieSourceAgentCommonData.getTags(data);
    const requirements = WaldieSourceAgentCommonData.getRequirements(data);
    const createdAt = WaldieSourceAgentCommonData.getCreatedAt(data);
    const updatedAt = WaldieSourceAgentCommonData.getUpdatedAt(data);
    return new WaldieSourceAgentCommonData(
      agentName,
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
  };
  private static getSystemMessage = (data: Record<string, unknown>): string | null => {
    if ('systemMessage' in data && typeof data.systemMessage === 'string') {
      return data.systemMessage;
    }
    return null;
  };
  private static getHumanInputMode = (data: Record<string, unknown>): WaldieAgentHumanInputMode => {
    if (
      'humanInputMode' in data &&
      typeof data.humanInputMode === 'string' &&
      ['ALWAYS', 'NEVER', 'TERMINATE'].includes(data.humanInputMode)
    ) {
      return data.humanInputMode as WaldieAgentHumanInputMode;
    }
    return 'ALWAYS';
  };
  private static getDescription = (data: Record<string, unknown>): string => {
    if ('description' in data && typeof data.description === 'string') {
      return data.description;
    }
    return 'An agent';
  };
  private static getMaxTokens = (data: Record<string, unknown>): number | null => {
    if ('maxTokens' in data && typeof data.maxTokens === 'number') {
      return data.maxTokens;
    }
    return null;
  };
  private static getCodeExecutionConfig = (data: Record<string, unknown>): WaldieAgentCodeExecutionConfig => {
    if (
      'codeExecutionConfig' in data &&
      typeof data.codeExecutionConfig === 'object' &&
      data.codeExecutionConfig
    ) {
      return data.codeExecutionConfig as WaldieAgentCodeExecutionConfig;
    }
    return false;
  };
  private static getAgentDefaultAutoReply = (data: Record<string, unknown>): string | null => {
    if ('agentDefaultAutoReply' in data && typeof data.agentDefaultAutoReply === 'string') {
      return data.agentDefaultAutoReply;
    }
    return null;
  };
  private static getMaximumConsecutiveAutoReply = (data: Record<string, unknown>): number | null => {
    if ('maxConsecutiveAutoReply' in data && typeof data.maxConsecutiveAutoReply === 'number') {
      return data.maxConsecutiveAutoReply;
    }
    return null;
  };
  private static getTermination = (data: Record<string, unknown>): WaldieAgentTerminationMessageCheck => {
    if ('termination' in data && typeof data.termination === 'object' && data.termination) {
      return TerminationData.fromJSON(data.termination as Record<string, unknown>).data;
    }
    return {
      type: 'none',
      keywords: [],
      criterion: null,
      methodContent: null
    };
  };
  private static getTeachability = (data: Record<string, unknown>): WaldieAgentTeachability => {
    if ('teachability' in data && typeof data.teachability === 'object' && data.teachability) {
      return TeachabilityData.fromJSON(data.teachability as Record<string, unknown>).data;
    }
    return {
      enabled: false,
      verbosity: 0,
      resetDb: false,
      recallThreshold: 0,
      maxMumRetrievals: 0
    };
  };
  private static getModelIds = (data: Record<string, unknown>): string[] => {
    let modelIds: string[] = [];
    if ('modelIds' in data && Array.isArray(data.modelIds)) {
      modelIds = data.modelIds.filter(m => typeof m === 'string') as string[];
    }
    return modelIds;
  };
  private static getSkills = (data: Record<string, unknown>): WaldieAgentLinkedSkill[] => {
    let skills: WaldieAgentLinkedSkill[] = [];
    if ('skills' in data && Array.isArray(data.skills)) {
      skills = data.skills.filter(
        s =>
          typeof s === 'object' &&
          s &&
          'id' in s &&
          'executorId' in s &&
          typeof s.id === 'string' &&
          typeof s.executorId === 'string'
      ) as WaldieAgentLinkedSkill[];
    }
    return skills;
  };
  private static getAgentName = (data: Record<string, unknown>, name: string | null): string => {
    if (name && typeof name === 'string') {
      return name;
    }
    if ('name' in data && typeof data.name === 'string') {
      return data.name;
    }
    if ('label' in data && typeof data.label === 'string') {
      return data.label;
    }
    return 'Agent';
  };
  private static getTags = (data: Record<string, unknown>): string[] => {
    let tags: string[] = [];
    if ('tags' in data && Array.isArray(data.tags)) {
      tags = data.tags.filter(t => typeof t === 'string') as string[];
    }
    return tags;
  };
  private static getRequirements = (data: Record<string, unknown>): string[] => {
    let requirements: string[] = [];
    if ('requirements' in data && Array.isArray(data.requirements)) {
      requirements = data.requirements.filter(r => typeof r === 'string') as string[];
    }
    return requirements;
  };
  private static getCreatedAt = (data: Record<string, unknown>): string => {
    let createdAt = new Date().toISOString();
    if ('createdAt' in data && typeof data.createdAt === 'string') {
      createdAt = data.createdAt;
    }
    return createdAt;
  };
  private static getUpdatedAt = (data: Record<string, unknown>): string => {
    let updatedAt = new Date().toISOString();
    if ('updatedAt' in data && typeof data.updatedAt === 'string') {
      updatedAt = data.updatedAt;
    }
    return updatedAt;
  };
}
