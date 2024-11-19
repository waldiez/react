import { TeachabilityData } from '@waldiez/models/agents/common/teachability';
import { TerminationData } from '@waldiez/models/agents/common/termination';
import {
  IWaldiezSourceAgentCommonData,
  WaldiezAgentCodeExecutionConfig,
  WaldiezAgentHumanInputMode,
  WaldiezAgentLinkedSkill,
  WaldiezAgentNodeType,
  WaldiezAgentTeachability,
  WaldiezAgentTerminationMessageCheck
} from '@waldiez/models/types';

export class WaldiezSourceAgentCommonData implements IWaldiezSourceAgentCommonData {
  name: string;
  agentType: WaldiezAgentNodeType;
  systemMessage: string | null;
  humanInputMode: WaldiezAgentHumanInputMode;
  description: string;
  codeExecutionConfig: WaldiezAgentCodeExecutionConfig;
  agentDefaultAutoReply: string | null;
  maxConsecutiveAutoReply: number | null;
  termination: WaldiezAgentTerminationMessageCheck;
  teachability: WaldiezAgentTeachability;
  // links
  modelIds: string[];
  skills: WaldiezAgentLinkedSkill[];
  tags: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
  parentId: string | null;
  constructor(
    name: string = 'Agent',
    agentType: WaldiezAgentNodeType = 'user',
    systemMessage: string | null = null,
    humanInputMode: WaldiezAgentHumanInputMode = 'ALWAYS',
    description: string = 'An agent',
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
    parentId: string | null = null
  ) {
    this.name = name;
    this.agentType = agentType;
    this.systemMessage = systemMessage;
    this.humanInputMode = humanInputMode;
    this.description = description;
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
    this.parentId = parentId;
  }
  static fromJSON = (
    json: unknown,
    agentType: WaldiezAgentNodeType,
    name: string | null = null
  ): IWaldiezSourceAgentCommonData => {
    if (!json || typeof json !== 'object') {
      return new WaldiezSourceAgentCommonData(name ?? 'Agent', agentType);
    }
    const data = json as Record<string, unknown>;
    const systemMessage = WaldiezSourceAgentCommonData.getSystemMessage(data);
    const humanInputMode = WaldiezSourceAgentCommonData.getHumanInputMode(data);
    const description = WaldiezSourceAgentCommonData.getDescription(data);
    const codeExecutionConfig = WaldiezSourceAgentCommonData.getCodeExecutionConfig(data);
    const agentDefaultAutoReply = WaldiezSourceAgentCommonData.getAgentDefaultAutoReply(data);
    const maxConsecutiveAutoReply = WaldiezSourceAgentCommonData.getMaximumConsecutiveAutoReply(data);
    const termination = WaldiezSourceAgentCommonData.getTermination(data);
    const teachability = WaldiezSourceAgentCommonData.getTeachability(data);
    const modelIds = WaldiezSourceAgentCommonData.getModelIds(data);
    const skills = WaldiezSourceAgentCommonData.getSkills(data);
    const agentName = WaldiezSourceAgentCommonData.getAgentName(data, name);
    const tags = WaldiezSourceAgentCommonData.getTags(data);
    const requirements = WaldiezSourceAgentCommonData.getRequirements(data);
    const createdAt = WaldiezSourceAgentCommonData.getCreatedAt(data);
    const updatedAt = WaldiezSourceAgentCommonData.getUpdatedAt(data);
    const parentId = WaldiezSourceAgentCommonData.getParentId(data);
    return new WaldiezSourceAgentCommonData(
      agentName,
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
  };
  private static getSystemMessage = (data: Record<string, unknown>): string | null => {
    if ('systemMessage' in data && typeof data.systemMessage === 'string') {
      return data.systemMessage;
    }
    return null;
  };
  private static getHumanInputMode = (data: Record<string, unknown>): WaldiezAgentHumanInputMode => {
    if (
      'humanInputMode' in data &&
      typeof data.humanInputMode === 'string' &&
      ['ALWAYS', 'NEVER', 'TERMINATE'].includes(data.humanInputMode)
    ) {
      return data.humanInputMode as WaldiezAgentHumanInputMode;
    }
    return 'ALWAYS';
  };
  private static getDescription = (data: Record<string, unknown>): string => {
    if ('description' in data && typeof data.description === 'string') {
      return data.description;
    }
    return 'An agent';
  };
  private static getCodeExecutionConfig = (
    data: Record<string, unknown>
  ): WaldiezAgentCodeExecutionConfig => {
    if (
      'codeExecutionConfig' in data &&
      typeof data.codeExecutionConfig === 'object' &&
      data.codeExecutionConfig
    ) {
      return data.codeExecutionConfig as WaldiezAgentCodeExecutionConfig;
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
  private static getTermination = (data: Record<string, unknown>): WaldiezAgentTerminationMessageCheck => {
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
  private static getTeachability = (data: Record<string, unknown>): WaldiezAgentTeachability => {
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
  private static getSkills = (data: Record<string, unknown>): WaldiezAgentLinkedSkill[] => {
    let skills: WaldiezAgentLinkedSkill[] = [];
    if ('skills' in data && Array.isArray(data.skills)) {
      skills = data.skills.filter(
        s =>
          typeof s === 'object' &&
          s &&
          'id' in s &&
          'executorId' in s &&
          typeof s.id === 'string' &&
          typeof s.executorId === 'string'
      ) as WaldiezAgentLinkedSkill[];
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
  private static getParentId = (data: Record<string, unknown>): string | null => {
    if ('parentId' in data && typeof data.parentId === 'string') {
      return data.parentId;
    }
    return null;
  };
}
