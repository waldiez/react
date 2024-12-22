import { Node, XYPosition } from "@xyflow/react";

import { WaldiezAgentCommonData, WaldiezAgentNestedChat } from "@waldiez/models/types/agents/agent";
import { IWaldiezSourceNode } from "@waldiez/models/types/base";

export type WaldiezVectorDbConfig = {
    model: string;
    useMemory: boolean;
    useLocalStorage: boolean;
    localStoragePath: string | null;
    connectionUrl: string | null;
};

export type WaldiezRageUserRetrieveConfig = {
    task: "code" | "qa" | "default";
    // vectorDb?: string;
    vectorDb: "chroma" | "pgvector" | "mongodb" | "qdrant";
    dbConfig: WaldiezVectorDbConfig;
    docsPath: string[];
    newDocs: boolean;
    model: string | null;
    chunkTokenSize: number | null;
    contextMaxTokens: number | null;
    chunkMode: "multi_lines" | "one_line";
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

export type WaldiezAgentRagUserData = WaldiezAgentCommonData & {
    nestedChats: WaldiezAgentNestedChat[];
    retrieveConfig: WaldiezRageUserRetrieveConfig;
};

export type WaldiezNodeRagUserData = WaldiezAgentRagUserData & {
    label: string;
    agentType: "rag_user";
};

export type WaldiezNodeRagUser = Node<WaldiezNodeRagUserData, "agent">;

export interface IWaldiezSourceRagUserData extends WaldiezAgentRagUserData {
    name: string;
}

export interface IWaldiezSourceRagUser extends IWaldiezSourceNode {
    data: IWaldiezSourceRagUserData;
    asNode: (position?: XYPosition) => WaldiezNodeRagUser;
}
