import { WaldieSourceUserProxyOrAssistantData } from '@waldiez/models/agents/common/userProxyOrAssistant';
import {
  IWaldieSourceAssistantData,
  WaldieAgentCodeExecutionConfig,
  WaldieAgentHumanInputMode,
  WaldieAgentLinkedSkill,
  WaldieAgentNestedChat,
  WaldieAgentNodeType,
  WaldieAgentTeachability,
  WaldieAgentTerminationMessageCheck
} from '@waldiez/models/types';

export class WaldieSourceAssistantData
  extends WaldieSourceUserProxyOrAssistantData
  implements IWaldieSourceAssistantData
{
  agentType: 'user' | 'assistant';

  constructor(
    name: string = 'Assistant',
    systemMessage: string | null = null,
    humanInputMode: WaldieAgentHumanInputMode = 'NEVER',
    description: string = 'An assistant agent',
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
      'assistant',
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
    this.agentType = 'assistant';
  }

  static fromJSON = (
    json: unknown,
    _agentType: WaldieAgentNodeType,
    name: string | null = null
  ): WaldieSourceAssistantData => {
    const data = WaldieSourceUserProxyOrAssistantData.fromJSON(json, 'assistant', name);
    return new WaldieSourceAssistantData(
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
      data.tags,
      data.requirements,
      data.createdAt,
      data.updatedAt,
      data.nestedChats
    );
  };
}
