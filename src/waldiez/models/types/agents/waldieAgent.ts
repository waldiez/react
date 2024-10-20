// base agent class (to be inherited by all other agents (user|assistant|manager))
export type WaldieAgentHumanInputMode = 'ALWAYS' | 'NEVER' | 'TERMINATE';
export type WaldieAgentCodeExecutionConfigDict = {
  workDir?: string;
  useDocker?: string | string[] | boolean;
  timeout?: number;
  lastNMessages?: number | 'auto';
  functions?: string[];
};
export type WaldieAgentCodeExecutionConfig = WaldieAgentCodeExecutionConfigDict | false;

export type WaldieAgentTypeTerminationTypeOption = 'none' | 'keyword' | 'method';
export type WaldieAgentTerminationCriterionOption = 'found' | 'ending' | 'exact';
export type WaldieAgentNestedChat = {
  triggeredBy: { id: string; isReply: boolean }[];
  messages: { id: string; isReply: boolean }[];
};
export type WaldieAgentTerminationMessageCheck = {
  type: WaldieAgentTypeTerminationTypeOption;
  keywords: string[];
  criterion: WaldieAgentTerminationCriterionOption | null;
  methodContent: string | null;
};
export type WaldieAgentLinkedSkill = {
  id: string;
  executorId: string;
};
export type WaldieAgentTeachability = {
  enabled: boolean;
  verbosity: 0 | 1 | 2 | 3;
  resetDb: boolean;
  recallThreshold: number;
  maxMumRetrievals: number;
};

// agent node: user | assistant | manager
export type WaldieAgentNodeType = 'user' | 'assistant' | 'manager' | 'rag_user';

export type WaldieAgentCommonData = {
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
  // meta
  tags: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
};

export interface IWaldieSourceAgentCommonData extends WaldieAgentCommonData {
  name: string;
}
