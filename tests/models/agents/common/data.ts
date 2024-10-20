export const commonDataJson = {
  name: 'Agent',
  systemMessage: null,
  humanInputMode: 'ALWAYS',
  description: 'An agent',
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
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
