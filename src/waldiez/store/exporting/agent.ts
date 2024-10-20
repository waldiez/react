import {
  WaldieAgentNode,
  WaldieNodeGroupManager,
  WaldieNodeRagUser,
  defaultRetrieveConfig
} from '@waldiez/models';

export const exportAgent = (agent: WaldieAgentNode, skipLinks: boolean = false) => {
  const agentData = { ...agent.data } as { [key: string]: unknown };
  const createdAt = agentData.createdAt ?? new Date().toISOString();
  const updatedAt = agentData.updatedAt ?? new Date().toISOString();
  const name = agentData.label ?? 'Agent';
  const description = agentData.description ?? 'Agent Description';
  const tags = agentData.tags ?? [];
  const requirements = agentData.requirements ?? [];
  const data = exportAgentData(agent, skipLinks);
  const agentType = agentData.agentType ?? 'user';
  const json = {
    id: agent.id,
    type: 'agent',
    agentType,
    name,
    description,
    tags,
    requirements,
    createdAt,
    updatedAt,
    data
  };
  return json;
};

const exportAgentNestedChats = (agent: WaldieAgentNode, skipLinks: boolean) => {
  if (!skipLinks && agent.data.agentType !== 'manager') {
    const nestedChats = agent.data.nestedChats.map(nestedChat => {
      return {
        triggeredBy: nestedChat.triggeredBy.map(triggeredBy => {
          return {
            id: triggeredBy.id,
            isReply: triggeredBy.isReply
          };
        }),
        messages: nestedChat.messages.map(message => {
          return {
            id: message.id,
            isReply: message.isReply
          };
        })
      };
    });
    return nestedChats;
  }
  return [];
};

const exportManagerData = (agent: WaldieNodeGroupManager, skipLinks: boolean) => {
  const maxRound = agent.data.maxRound ?? null;
  const adminName = agent.data.adminName ?? null;
  const enableClearHistory = agent.data.enableClearHistory ?? false;
  const sendIntroductions = agent.data.sendIntroductions ?? false;
  const agentSpeakers = agent.data.speakers as {
    selectionMethod?: string;
    selectionCustomMethod?: string;
    maxRetriesForSelecting?: number | null;
    selectionMode?: string;
    allowRepeat?: boolean | string[];
    allowedOrDisallowedTransitions?: { [key: string]: string[] };
    transitionsType?: string;
  };
  const speakers = {
    selectionMethod: agentSpeakers.selectionMethod ?? 'auto',
    selectionCustomMethod: agentSpeakers.selectionCustomMethod ?? '',
    maxRetriesForSelecting: agentSpeakers.maxRetriesForSelecting ?? null,
    selectionMode: agentSpeakers.selectionMode ?? 'repeat',
    allowRepeat: agentSpeakers.allowRepeat ?? true,
    allowedOrDisallowedTransitions: agentSpeakers.allowedOrDisallowedTransitions ?? {},
    transitionsType: agentSpeakers.transitionsType ?? 'allowed'
  };
  if (skipLinks) {
    speakers.allowRepeat = false;
    speakers.allowedOrDisallowedTransitions = {};
  }
  return {
    maxRound,
    adminName,
    enableClearHistory,
    sendIntroductions,
    speakers
  };
};

/* eslint-disable max-statements */
export const exportAgentData = (agent: WaldieAgentNode, skipLinks: boolean) => {
  const data = {
    systemMessage: agent.data.systemMessage,
    humanInputMode: agent.data.humanInputMode,
    maxTokens: agent.data.maxTokens,
    codeExecutionConfig: agent.data.codeExecutionConfig,
    agentDefaultAutoReply: agent.data.agentDefaultAutoReply,
    maxConsecutiveAutoReply: agent.data.maxConsecutiveAutoReply,
    termination: agent.data.termination,
    teachability: agent.data.teachability,
    modelIds: agent.data.modelIds,
    skills: agent.data.skills
  } as { [key: string]: unknown };
  if (skipLinks) {
    data.modelIds = [];
    data.skills = [];
    if (agent.data.codeExecutionConfig) {
      (data.codeExecutionConfig as { [key: string]: unknown }).functions = [];
    }
  }
  data.nestedChats = exportAgentNestedChats(agent, skipLinks);
  if (agent.data.agentType === 'manager') {
    const managerData = exportManagerData(agent as WaldieNodeGroupManager, skipLinks);
    data.maxRound = managerData.maxRound;
    data.adminName = managerData.adminName;
    data.enableClearHistory = managerData.enableClearHistory;
    data.sendIntroductions = managerData.sendIntroductions;
    data.speakers = managerData.speakers;
  }
  if (agent.data.agentType === 'rag_user') {
    const ragUserData = exportRagUserData(agent as WaldieNodeRagUser, skipLinks);
    data.retrieveConfig = ragUserData;
  }
  return data;
};
/* eslint-disable complexity */
const exportRagUserData = (agent: WaldieNodeRagUser, skipLinks: boolean) => {
  const retrieveConfig = agent.data.retrieveConfig as {
    task?: string;
    vectorDb?: string;
    dbConfig?: {
      model?: string;
      useMemory?: boolean;
      useLocalStorage?: boolean;
      localStoragePath?: string | null;
      connectionUrl?: string | null;
    };
    docsPath?: string[];
    newDocs?: boolean;
    model?: string | null;
    chunkTokenSize?: number | null;
    contextMaxTokens?: number | null;
    chunkMode?: string;
    mustBreakAtEmptyLine?: boolean;
    useCustomEmbedding?: boolean;
    embeddingFunction?: string | null;
    customizedPrompt?: string | null;
    customizedAnswerPrefix?: string | null;
    updateContext?: boolean;
    collectionName?: string | null;
    getOrCreate?: boolean;
    overwrite?: boolean;
    useCustomTokenCount?: boolean;
    customTokenCountFunction?: string | null;
    useCustomTextSplit?: boolean;
    customTextSplitFunction?: string | null;
    customTextTypes?: string[];
    recursive?: boolean;
    distanceThreshold?: number | null;
    n_results?: number | null;
  };
  return {
    task: retrieveConfig.task ?? defaultRetrieveConfig.task,
    vectorDb: retrieveConfig.vectorDb ?? defaultRetrieveConfig.vectorDb,
    dbConfig: {
      model: retrieveConfig.dbConfig?.model ?? defaultRetrieveConfig.dbConfig.model,
      useMemory: retrieveConfig.dbConfig?.useMemory ?? defaultRetrieveConfig.dbConfig.useMemory,
      useLocalStorage:
        retrieveConfig.dbConfig?.useLocalStorage ?? defaultRetrieveConfig.dbConfig.useLocalStorage,
      localStoragePath:
        retrieveConfig.dbConfig?.localStoragePath ?? defaultRetrieveConfig.dbConfig.localStoragePath,
      connectionUrl: retrieveConfig.dbConfig?.connectionUrl ?? defaultRetrieveConfig.dbConfig.connectionUrl
    },
    docsPath: skipLinks ? [] : (retrieveConfig.docsPath ?? defaultRetrieveConfig.docsPath),
    newDocs: retrieveConfig.newDocs ?? defaultRetrieveConfig.newDocs,
    model: skipLinks ? null : (retrieveConfig.model ?? defaultRetrieveConfig.model),
    chunkTokenSize: retrieveConfig.chunkTokenSize ?? defaultRetrieveConfig.chunkTokenSize,
    contextMaxTokens: retrieveConfig.contextMaxTokens ?? defaultRetrieveConfig.contextMaxTokens,
    chunkMode: retrieveConfig.chunkMode ?? defaultRetrieveConfig.chunkMode,
    mustBreakAtEmptyLine: retrieveConfig.mustBreakAtEmptyLine ?? defaultRetrieveConfig.mustBreakAtEmptyLine,
    useCustomEmbedding: retrieveConfig.useCustomEmbedding ?? defaultRetrieveConfig.useCustomEmbedding,
    embeddingFunction: retrieveConfig.embeddingFunction ?? defaultRetrieveConfig.embeddingFunction,
    customizedPrompt: retrieveConfig.customizedPrompt ?? defaultRetrieveConfig.customizedPrompt,
    customizedAnswerPrefix:
      retrieveConfig.customizedAnswerPrefix ?? defaultRetrieveConfig.customizedAnswerPrefix,
    updateContext: retrieveConfig.updateContext ?? defaultRetrieveConfig.updateContext,
    collectionName: retrieveConfig.collectionName ?? defaultRetrieveConfig.collectionName,
    getOrCreate: retrieveConfig.getOrCreate ?? defaultRetrieveConfig.getOrCreate,
    overwrite: retrieveConfig.overwrite ?? defaultRetrieveConfig.overwrite,
    useCustomTokenCount: retrieveConfig.useCustomTokenCount ?? defaultRetrieveConfig.useCustomTokenCount,
    customTokenCountFunction: retrieveConfig.customTokenCountFunction ?? null,
    useCustomTextSplit: retrieveConfig.useCustomTextSplit ?? false,
    customTextSplitFunction: retrieveConfig.customTextSplitFunction ?? null,
    customTextTypes: retrieveConfig.customTextTypes ?? [],
    recursive: retrieveConfig.recursive ?? true,
    distanceThreshold: retrieveConfig.distanceThreshold ?? -1,
    n_results: retrieveConfig.n_results ?? null
  };
};
