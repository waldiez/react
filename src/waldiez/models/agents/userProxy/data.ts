import { WaldieSourceUserProxyOrAssistantData } from '@waldiez/models/agents/common/userProxyOrAssistant';
import {
  IWaldieSourceUserProxyData,
  WaldieAgentCodeExecutionConfig,
  WaldieAgentHumanInputMode,
  WaldieAgentLinkedSkill,
  WaldieAgentNestedChat,
  WaldieAgentNodeType,
  WaldieAgentTeachability,
  WaldieAgentTerminationMessageCheck
} from '@waldiez/models/types';

export class WaldieSourceUserProxyData
  extends WaldieSourceUserProxyOrAssistantData
  implements IWaldieSourceUserProxyData
{
  agentType: 'user' | 'assistant';

  constructor(
    name: string = 'User',
    systemMessage: string | null = null,
    humanInputMode: WaldieAgentHumanInputMode = 'ALWAYS',
    description: string = 'A user proxy agent',
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
    nestedChats: WaldieAgentNestedChat[] = [],
    tags: string[] = [],
    requirements: string[] = [],
    createdAt: string = new Date().toISOString(),
    updatedAt: string = new Date().toISOString()
  ) {
    super(
      name,
      'user',
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
      updatedAt,
      nestedChats
    );
    this.agentType = 'user';
  }

  static fromJSON = (
    json: unknown,
    _agentType: WaldieAgentNodeType,
    name: string | null = null
  ): WaldieSourceUserProxyData => {
    const data = WaldieSourceUserProxyOrAssistantData.fromJSON(json, 'user', name);
    return new WaldieSourceUserProxyData(
      data.name,
      data.systemMessage,
      data.humanInputMode,
      data.description,
      data.maxTokens,
      data.codeExecutionConfig,
      data.agentDefaultAutoReply,
      data.maxConsecutiveAutoReply,
      data.termination,
      data.teachability,
      data.modelIds,
      data.skills,
      data.nestedChats,
      data.tags,
      data.requirements,
      data.createdAt,
      data.updatedAt
    );
  };
}
