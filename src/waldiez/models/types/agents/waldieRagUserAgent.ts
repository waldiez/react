import { Node, XYPosition } from '@xyflow/react';

import { WaldieAgentCommonData, WaldieAgentNestedChat } from '@waldiez/models/types/agents/waldieAgent';
import { IWaldieSourceNode } from '@waldiez/models/types/base';

export type WaldieVectorDbConfig = {
  model: string;
  useMemory: boolean;
  useLocalStorage: boolean;
  localStoragePath: string | null;
  connectionUrl: string | null;
};

export type WaldieRageUserRetrieveConfig = {
  task: 'code' | 'qa' | 'default';
  // vectorDb?: string;
  vectorDb: 'chroma' | 'pgvector' | 'mongodb' | 'qdrant';
  dbConfig: WaldieVectorDbConfig;
  docsPath: string[];
  newDocs: boolean;
  model: string | null;
  chunkTokenSize: number | null;
  contextMaxTokens: number | null;
  chunkMode: 'multi_lines' | 'one_line';
  mustBreakAtEmptyLine: boolean;
  useCustomEmbedding: boolean;
  embeddingFunction: string | null;
  customizedPrompt: string | null;
  customizedAnswerPrefix: string | null;
  updateContext: boolean;
  collectionName: string | null;
  getOrCreate: boolean;
  overwrite: boolean;
  useCustomTokenCount: boolean;
  customTokenCountFunction: string | null;
  useCustomTextSplit: boolean;
  customTextSplitFunction: string | null;
  customTextTypes: string[];
  recursive: boolean;
  distanceThreshold: number | null;
  // to be used in a message where the user is the sender
  n_results: number | null;
};

export type WaldieAgentRagUserData = WaldieAgentCommonData & {
  nestedChats: WaldieAgentNestedChat[];
  retrieveConfig: WaldieRageUserRetrieveConfig;
};

export type WaldieNodeRagUserData = WaldieAgentRagUserData & {
  label: string;
  agentType: 'rag_user';
};

export type WaldieNodeRagUser = Node<WaldieNodeRagUserData, 'agent'>;

export interface IWaldieSourceRagUserData extends WaldieAgentRagUserData {
  name: string;
}

export interface IWaldieSourceRagUser extends IWaldieSourceNode {
  data: IWaldieSourceRagUserData;
  asNode: (position?: XYPosition) => WaldieNodeRagUser;
}
