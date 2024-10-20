import { defaultRetrieveConfig } from '@waldiez/models/agents/ragUser/retrieveConfig';

export const createdAt = new Date().toISOString();
export const updatedAt = new Date().toISOString();

export const assistantJson = {
  name: 'Assistant',
  nestedChats: [],
  agentType: 'assistant',
  systemMessage: null,
  humanInputMode: 'NEVER',
  description: 'An assistant agent',
  maxTokens: null,
  codeExecutionConfig: false,
  agentDefaultAutoReply: null,
  maxConsecutiveAutoReply: null,
  termination: {
    type: 'none',
    keywords: [],
    criterion: null,
    methodContent: null
  },
  teachability: {
    enabled: false,
    verbosity: 0,
    resetDb: false,
    recallThreshold: 0,
    maxMumRetrievals: 0
  },
  modelIds: [],
  skills: [],
  tags: [],
  requirements: [],
  createdAt,
  updatedAt
};
export const groupManagerJson = {
  name: 'Group Manager',
  agentType: 'manager',
  systemMessage: null,
  humanInputMode: 'ALWAYS',
  description: 'A group manager agent',
  maxTokens: null,
  codeExecutionConfig: false,
  agentDefaultAutoReply: null,
  maxConsecutiveAutoReply: null,
  termination: {
    type: 'none',
    keywords: [],
    criterion: null,
    methodContent: null
  },
  teachability: {
    enabled: false,
    verbosity: 0,
    resetDb: false,
    recallThreshold: 0,
    maxMumRetrievals: 0
  },
  maxRound: 0,
  adminName: 'Admin',
  enableClearHistory: false,
  sendIntroductions: false,
  speakers: {
    selectionMethod: 'auto',
    selectionCustomMethod: '',
    selectionMode: 'transition',
    transitionsType: 'allowed',
    allowRepeat: true,
    maxRetriesForSelecting: 2,
    allowedOrDisallowedTransitions: {
      agent1: ['agent2', 'agent3'],
      agent2: ['agent1', 'agent3'],
      agent3: ['agent1', 'agent2']
    }
  },
  modelIds: [],
  skills: [],
  tags: [],
  requirements: [],
  createdAt,
  updatedAt
};

export const ragUserJson = {
  name: 'Rag User',
  agentType: 'rag_user',
  systemMessage: null,
  humanInputMode: 'ALWAYS',
  description: 'A rag user agent',
  maxTokens: null,
  codeExecutionConfig: false,
  agentDefaultAutoReply: null,
  maxConsecutiveAutoReply: null,
  termination: {
    type: 'none',
    keywords: [],
    criterion: null,
    methodContent: null
  },
  teachability: {
    enabled: false,
    verbosity: 0,
    resetDb: false,
    recallThreshold: 0,
    maxMumRetrievals: 0
  },
  nestedChats: [],
  retrieveConfig: defaultRetrieveConfig,
  modelIds: [],
  skills: [],
  tags: [],
  requirements: [],
  createdAt,
  updatedAt
};
export const userProxyJson = {
  name: 'User',
  nestedChats: [],
  agentType: 'user',
  systemMessage: null,
  humanInputMode: 'ALWAYS',
  description: 'A user proxy agent',
  maxTokens: null,
  codeExecutionConfig: false,
  agentDefaultAutoReply: null,
  maxConsecutiveAutoReply: null,
  termination: {
    type: 'none',
    keywords: [],
    criterion: null,
    methodContent: null
  },
  teachability: {
    enabled: false,
    verbosity: 0,
    resetDb: false,
    recallThreshold: 0,
    maxMumRetrievals: 0
  },
  modelIds: [],
  skills: [],
  tags: [],
  requirements: [],
  createdAt,
  updatedAt
};
export const agentJson = {
  name: 'Agent',
  agentType: 'assistant',
  systemMessage: null,
  humanInputMode: 'NEVER',
  description: "The agent's description",
  maxTokens: null,
  codeExecutionConfig: false,
  agentDefaultAutoReply: null,
  maxConsecutiveAutoReply: null,
  termination: {
    type: 'none',
    keywords: [],
    criterion: null,
    methodContent: null
  },
  teachability: {
    enabled: false,
    verbosity: 0,
    resetDb: false,
    recallThreshold: 0,
    maxMumRetrievals: 0
  },
  nestedChats: [],
  modelIds: [],
  skills: [],
  tags: [],
  requirements: [],
  createdAt,
  updatedAt
};
