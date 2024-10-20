import { WaldieSourceAgentCommonData } from '@waldiez/models/agents/common';
import { WaldieSourceUserProxyOrAssistantData } from '@waldiez/models/agents/common/userProxyOrAssistant';
import { RetrieveConfigData, defaultRetrieveConfig } from '@waldiez/models/agents/ragUser/retrieveConfig';
import {
  IWaldieSourceRagUserData,
  WaldieAgentCodeExecutionConfig,
  WaldieAgentHumanInputMode,
  WaldieAgentLinkedSkill,
  WaldieAgentNestedChat,
  WaldieAgentNodeType,
  WaldieAgentTeachability,
  WaldieAgentTerminationMessageCheck,
  WaldieRageUserRetrieveConfig
} from '@waldiez/models/types';

export class WaldieSourceRagUserData extends WaldieSourceAgentCommonData implements IWaldieSourceRagUserData {
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
  nestedChats: WaldieAgentNestedChat[];
  retrieveConfig: WaldieRageUserRetrieveConfig;

  constructor(
    name: string = 'RAG User',
    systemMessage: string | null = null,
    humanInputMode: WaldieAgentHumanInputMode = 'ALWAYS',
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
    tags: string[] = [],
    requirements: string[] = [],
    skills: WaldieAgentLinkedSkill[] = [],
    createdAt: string = new Date().toISOString(),
    updatedAt: string = new Date().toISOString(),
    nestedChats: WaldieAgentNestedChat[] = [],
    retrieveConfig: WaldieRageUserRetrieveConfig = defaultRetrieveConfig
  ) {
    super(
      name,
      'rag_user',
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
    this.nestedChats = nestedChats;
    this.agentType = 'rag_user';
    this.modelIds = modelIds;
    this.skills = skills;
    this.tags = tags;
    this.requirements = requirements;
    this.retrieveConfig = retrieveConfig;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromJSON = (json: unknown, name: string | null = null): WaldieSourceRagUserData => {
    if (!json || typeof json !== 'object') {
      return new WaldieSourceRagUserData(name ?? 'Agent');
    }
    const userProxyData = WaldieSourceUserProxyOrAssistantData.fromJSON(json, 'rag_user', name);
    let retrieveConfig = defaultRetrieveConfig;
    if ('retrieveConfig' in json && typeof json.retrieveConfig === 'object') {
      retrieveConfig = RetrieveConfigData.fromJSON(json.retrieveConfig as WaldieRageUserRetrieveConfig).data;
    }
    return {
      ...userProxyData,
      retrieveConfig
    } as WaldieSourceRagUserData;
  };
}
