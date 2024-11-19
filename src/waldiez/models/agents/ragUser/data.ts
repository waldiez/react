import { WaldiezSourceAgentCommonData } from '@waldiez/models/agents/common';
import { WaldiezSourceUserProxyOrAssistantData } from '@waldiez/models/agents/common/userProxyOrAssistant';
import { RetrieveConfigData, defaultRetrieveConfig } from '@waldiez/models/agents/ragUser/retrieveConfig';
import {
  IWaldiezSourceRagUserData,
  WaldiezAgentCodeExecutionConfig,
  WaldiezAgentHumanInputMode,
  WaldiezAgentLinkedSkill,
  WaldiezAgentNestedChat,
  WaldiezAgentNodeType,
  WaldiezAgentTeachability,
  WaldiezAgentTerminationMessageCheck,
  WaldiezRageUserRetrieveConfig
} from '@waldiez/models/types';

export class WaldiezSourceRagUserData
  extends WaldiezSourceAgentCommonData
  implements IWaldiezSourceRagUserData
{
  agentType: WaldiezAgentNodeType;
  name: string;
  systemMessage: string | null;
  humanInputMode: WaldiezAgentHumanInputMode;
  description: string;
  codeExecutionConfig: WaldiezAgentCodeExecutionConfig;
  agentDefaultAutoReply: string | null;
  maxConsecutiveAutoReply: number | null;
  termination: WaldiezAgentTerminationMessageCheck;
  teachability: WaldiezAgentTeachability;
  modelIds: string[];
  skills: WaldiezAgentLinkedSkill[];
  tags: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
  parentId: string | null;
  nestedChats: WaldiezAgentNestedChat[];
  retrieveConfig: WaldiezRageUserRetrieveConfig;

  constructor(
    name: string = 'RAG User',
    systemMessage: string | null = null,
    humanInputMode: WaldiezAgentHumanInputMode = 'ALWAYS',
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
    tags: string[] = [],
    requirements: string[] = [],
    skills: WaldiezAgentLinkedSkill[] = [],
    createdAt: string = new Date().toISOString(),
    updatedAt: string = new Date().toISOString(),
    parentId: string | null = null,
    nestedChats: WaldiezAgentNestedChat[] = [],
    retrieveConfig: WaldiezRageUserRetrieveConfig = defaultRetrieveConfig
  ) {
    super(
      name,
      'rag_user',
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
    this.name = name;
    this.systemMessage = systemMessage;
    this.humanInputMode = humanInputMode;
    this.description = description;
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
    this.parentId = parentId;
  }

  static fromJSON = (json: unknown, name: string | null = null): WaldiezSourceRagUserData => {
    if (!json || typeof json !== 'object') {
      return new WaldiezSourceRagUserData(name ?? 'Agent');
    }
    const userProxyData = WaldiezSourceUserProxyOrAssistantData.fromJSON(json, 'rag_user', name);
    let retrieveConfig = defaultRetrieveConfig;
    if ('retrieveConfig' in json && typeof json.retrieveConfig === 'object') {
      retrieveConfig = RetrieveConfigData.fromJSON(json.retrieveConfig as WaldiezRageUserRetrieveConfig).data;
    }
    return {
      ...userProxyData,
      retrieveConfig
    } as WaldiezSourceRagUserData;
  };
}
