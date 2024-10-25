// base agent class (to be inherited by all other agents (user|assistant|manager))
export type WaldiezAgentHumanInputMode = 'ALWAYS' | 'NEVER' | 'TERMINATE';
export type WaldiezAgentCodeExecutionConfigDict = {
  workDir?: string;
  useDocker?: string | string[] | boolean;
  timeout?: number;
  lastNMessages?: number | 'auto';
  functions?: string[];
};
export type WaldiezAgentCodeExecutionConfig = WaldiezAgentCodeExecutionConfigDict | false;

export type WaldiezAgentTypeTerminationTypeOption = 'none' | 'keyword' | 'method';
export type WaldiezAgentTerminationCriterionOption = 'found' | 'ending' | 'exact';
export type WaldiezAgentNestedChat = {
  triggeredBy: { id: string; isReply: boolean }[];
  messages: { id: string; isReply: boolean }[];
};
export type WaldiezAgentTerminationMessageCheck = {
  type: WaldiezAgentTypeTerminationTypeOption;
  keywords: string[];
  criterion: WaldiezAgentTerminationCriterionOption | null;
  methodContent: string | null;
};
export type WaldiezAgentLinkedSkill = {
  id: string;
  executorId: string;
};
export type WaldiezAgentTeachability = {
  enabled: boolean;
  verbosity: 0 | 1 | 2 | 3;
  resetDb: boolean;
  recallThreshold: number;
  maxMumRetrievals: number;
};

// agent node: user | assistant | manager
export type WaldiezAgentNodeType = 'user' | 'assistant' | 'manager' | 'rag_user';

export type WaldiezAgentCommonData = {
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
  // meta
  tags: string[];
  requirements: string[];
  createdAt: string;
  updatedAt: string;
};

export interface IWaldiezSourceAgentCommonData extends WaldiezAgentCommonData {
  name: string;
}
