import { WaldiezRageUserRetrieveConfig } from '@waldiez/models/types/agents/ragUser';

export const defaultRetrieveConfig: WaldiezRageUserRetrieveConfig = {
  task: 'default',
  vectorDb: 'chroma',
  dbConfig: {
    model: 'all-MiniLM-L6-v2',
    useMemory: false,
    useLocalStorage: false,
    localStoragePath: null,
    connectionUrl: null
  },
  docsPath: [],
  newDocs: true,
  model: null,
  chunkTokenSize: null,
  contextMaxTokens: null,
  chunkMode: 'multi_lines',
  mustBreakAtEmptyLine: true,
  useCustomEmbedding: false,
  embeddingFunction: null,
  customizedPrompt: null,
  customizedAnswerPrefix: null,
  updateContext: true,
  collectionName: 'autogen-docs',
  getOrCreate: true,
  overwrite: false,
  useCustomTokenCount: false,
  customTokenCountFunction: null,
  useCustomTextSplit: false,
  customTextSplitFunction: null,
  customTextTypes: [],
  recursive: true,
  distanceThreshold: -1,
  n_results: null
};

export class RetrieveConfigData {
  data: WaldiezRageUserRetrieveConfig;
  constructor(data: WaldiezRageUserRetrieveConfig = defaultRetrieveConfig) {
    this.data = data;
  }
  static fromJSON(data: any): RetrieveConfigData {
    const jsonData = { ...data } as { [key: string]: any };
    const json = {
      task: RetrieveConfigData.getTask(jsonData),
      vectorDb: RetrieveConfigData.getVectorDb(jsonData),
      dbConfig: RetrieveConfigData.getDbConfig(jsonData),
      docsPath: RetrieveConfigData.getDocsPath(jsonData),
      newDocs: RetrieveConfigData.getNewDocs(jsonData),
      model: RetrieveConfigData.getModel(jsonData),
      chunkTokenSize: RetrieveConfigData.getChunkTokenSize(jsonData),
      contextMaxTokens: RetrieveConfigData.getContextMaxTokens(jsonData),
      chunkMode: RetrieveConfigData.getChunkMode(jsonData),
      mustBreakAtEmptyLine: RetrieveConfigData.getMustBreakAtEmptyLine(jsonData),
      useCustomEmbedding: RetrieveConfigData.getUseCustomEmbedding(jsonData),
      embeddingFunction: RetrieveConfigData.getEmbeddingFunction(jsonData),
      customizedPrompt: RetrieveConfigData.getCustomizedPrompt(jsonData),
      customizedAnswerPrefix: RetrieveConfigData.getCustomizedAnswerPrefix(jsonData),
      updateContext: RetrieveConfigData.getUpdateContext(jsonData),
      collectionName: RetrieveConfigData.getCollectionName(jsonData),
      getOrCreate: RetrieveConfigData.getGetOrCreate(jsonData),
      overwrite: RetrieveConfigData.getOverwrite(jsonData),
      useCustomTokenCount: RetrieveConfigData.getUseCustomTokenCount(jsonData),
      customTokenCountFunction: RetrieveConfigData.getCustomTokenCountFunction(jsonData),
      useCustomTextSplit: RetrieveConfigData.getUseCustomTextSplit(jsonData),
      customTextSplitFunction: RetrieveConfigData.getCustomTextSplitFunction(jsonData),
      customTextTypes: RetrieveConfigData.getCustomTextTypes(jsonData),
      recursive: RetrieveConfigData.getRecursive(jsonData),
      distanceThreshold: RetrieveConfigData.getDistanceThreshold(jsonData),
      n_results: RetrieveConfigData.getNResults(jsonData)
    };
    return new RetrieveConfigData(json);
  }
  private static getTask(json: { [key: string]: any }) {
    let task: 'code' | 'qa' | 'default' = 'default';
    if ('task' in json && typeof json.task === 'string' && ['code', 'qa', 'default'].includes(json.task)) {
      task = json.task as 'code' | 'qa' | 'default';
    }
    return task;
  }
  private static getVectorDb(json: { [key: string]: any }) {
    let vectorDb: 'chroma' | 'pgvector' | 'mongodb' | 'qdrant' = 'chroma';
    if (
      'vectorDb' in json &&
      typeof json.vectorDb === 'string' &&
      ['chroma', 'pgvector', 'mongodb', 'qdrant'].includes(json.vectorDb)
    ) {
      vectorDb = json.vectorDb as 'chroma' | 'pgvector' | 'mongodb' | 'qdrant';
    }
    return vectorDb;
  }
  private static getDbConfigModel(json: { [key: string]: any }) {
    let model = 'all-MiniLM-L6-v2';
    if ('model' in json && typeof json.model === 'string' && json.model.length > 0) {
      model = json.model;
    }
    return model;
  }
  private static getDbConfigUseMemory(json: { [key: string]: any }) {
    let useMemory = false;
    if ('useMemory' in json && typeof json.useMemory === 'boolean') {
      useMemory = json.useMemory;
    }
    return useMemory;
  }
  private static getDbConfigUseLocalStorage(json: { [key: string]: any }) {
    let useLocalStorage = false;
    if ('useLocalStorage' in json && typeof json.useLocalStorage === 'boolean') {
      useLocalStorage = json.useLocalStorage;
    }
    return useLocalStorage;
  }
  private static getDbConfigLocalStoragePath(json: { [key: string]: any }) {
    let localStoragePath: string | null = null;
    if (
      'localStoragePath' in json &&
      typeof json.localStoragePath === 'string' &&
      json.localStoragePath.length > 0
    ) {
      localStoragePath = json.localStoragePath;
    }
    return localStoragePath;
  }
  private static getDbConfigConnectionUrl(json: { [key: string]: any }) {
    let connectionUrl: string | null = null;
    if ('connectionUrl' in json && typeof json.connectionUrl === 'string' && json.connectionUrl.length > 0) {
      connectionUrl = json.connectionUrl;
    }
    return connectionUrl;
  }
  private static getDbConfig(json: { [key: string]: any }) {
    let dbConfig = {
      model: 'all-MiniLM-L6-v2',
      useMemory: false,
      useLocalStorage: false,
      localStoragePath: null as string | null,
      connectionUrl: null as string | null
    };
    if ('dbConfig' in json && typeof json.dbConfig === 'object') {
      dbConfig = {
        model: RetrieveConfigData.getDbConfigModel(json.dbConfig),
        useMemory: RetrieveConfigData.getDbConfigUseMemory(json.dbConfig),
        useLocalStorage: RetrieveConfigData.getDbConfigUseLocalStorage(json.dbConfig),
        localStoragePath: RetrieveConfigData.getDbConfigLocalStoragePath(json.dbConfig),
        connectionUrl: RetrieveConfigData.getDbConfigConnectionUrl(json.dbConfig)
      };
    }
    return dbConfig;
  }
  private static getDocsPath(json: { [key: string]: any }) {
    let docsPath: string[] = [];
    if ('docsPath' in json && Array.isArray(json.docsPath) && json.docsPath.length > 0) {
      docsPath = json.docsPath.filter((d: any) => typeof d === 'string' && d.length > 0) as string[];
    }
    return docsPath;
  }
  private static getNewDocs(json: { [key: string]: any }) {
    let newDocs = true;
    if ('newDocs' in json && typeof json.newDocs === 'boolean') {
      newDocs = json.newDocs;
    }
    return newDocs;
  }
  private static getModel(json: { [key: string]: any }) {
    let model: string | null = null;
    if ('model' in json && typeof json.model === 'string') {
      model = json.model;
    }
    return model;
  }
  private static getChunkTokenSize(json: { [key: string]: any }) {
    let chunkTokenSize: number | null = null;
    if ('chunkTokenSize' in json && typeof json.chunkTokenSize === 'number') {
      chunkTokenSize = json.chunkTokenSize;
    }
    return chunkTokenSize;
  }
  private static getContextMaxTokens(json: { [key: string]: any }) {
    let contextMaxTokens: number | null = null;
    if ('contextMaxTokens' in json && typeof json.contextMaxTokens === 'number') {
      contextMaxTokens = json.contextMaxTokens;
    }
    return contextMaxTokens;
  }
  private static getChunkMode(json: { [key: string]: any }) {
    let chunkMode: 'multi_lines' | 'one_line' = 'multi_lines';
    if (
      'chunkMode' in json &&
      typeof json.chunkMode === 'string' &&
      ['multi_lines', 'one_line'].includes(json.chunkMode)
    ) {
      chunkMode = json.chunkMode as 'multi_lines' | 'one_line';
    }
    return chunkMode;
  }
  private static getMustBreakAtEmptyLine(json: { [key: string]: any }) {
    let mustBreakAtEmptyLine = true;
    if ('mustBreakAtEmptyLine' in json && typeof json.mustBreakAtEmptyLine === 'boolean') {
      mustBreakAtEmptyLine = json.mustBreakAtEmptyLine;
    }
    return mustBreakAtEmptyLine;
  }
  private static getUseCustomEmbedding(json: { [key: string]: any }) {
    let useCustomEmbedding = false;
    if ('useCustomEmbedding' in json && typeof json.useCustomEmbedding === 'boolean') {
      useCustomEmbedding = json.useCustomEmbedding;
    }
    return useCustomEmbedding;
  }
  private static getEmbeddingFunction(json: { [key: string]: any }) {
    let embeddingFunction: string | null = null;
    if ('embeddingFunction' in json && typeof json.embeddingFunction === 'string') {
      embeddingFunction = json.embeddingFunction;
    }
    return embeddingFunction;
  }
  private static getCustomizedPrompt(json: { [key: string]: any }) {
    let customizedPrompt: string | null = null;
    if ('customizedPrompt' in json && typeof json.customizedPrompt === 'string') {
      customizedPrompt = json.customizedPrompt;
    }
    return customizedPrompt;
  }
  private static getCustomizedAnswerPrefix(json: { [key: string]: any }) {
    let customizedAnswerPrefix: string | null = null;
    if ('customizedAnswerPrefix' in json && typeof json.customizedAnswerPrefix === 'string') {
      customizedAnswerPrefix = json.customizedAnswerPrefix;
    }
    return customizedAnswerPrefix;
  }
  private static getUpdateContext(json: { [key: string]: any }) {
    let updateContext = true;
    if ('updateContext' in json && typeof json.updateContext === 'boolean') {
      updateContext = json.updateContext;
    }
    return updateContext;
  }
  private static getCollectionName(json: { [key: string]: any }) {
    let collectionName: string | null = 'autogen-docs';
    if ('collectionName' in json && typeof json.collectionName === 'string') {
      collectionName = json.collectionName;
    }
    return collectionName;
  }
  private static getGetOrCreate(json: { [key: string]: any }) {
    let getOrCreate = true;
    if ('getOrCreate' in json && typeof json.getOrCreate === 'boolean') {
      getOrCreate = json.getOrCreate;
    }
    return getOrCreate;
  }
  private static getOverwrite(json: { [key: string]: any }) {
    let overwrite = false;
    if ('overwrite' in json && typeof json.overwrite === 'boolean') {
      overwrite = json.overwrite;
    }
    return overwrite;
  }
  private static getUseCustomTokenCount(json: { [key: string]: any }) {
    let useCustomTokenCount = false;
    if ('useCustomTokenCount' in json && typeof json.useCustomTokenCount === 'boolean') {
      useCustomTokenCount = json.useCustomTokenCount;
    }
    return useCustomTokenCount;
  }
  private static getCustomTokenCountFunction(json: { [key: string]: any }) {
    let customTokenCountFunction: string | null = null;
    if ('customTokenCountFunction' in json && typeof json.customTokenCountFunction === 'string') {
      customTokenCountFunction = json.customTokenCountFunction;
    }
    return customTokenCountFunction;
  }
  private static getUseCustomTextSplit(json: { [key: string]: any }) {
    let useCustomTextSplit = false;
    if ('useCustomTextSplit' in json && typeof json.useCustomTextSplit === 'boolean') {
      useCustomTextSplit = json.useCustomTextSplit;
    }
    return useCustomTextSplit;
  }
  private static getCustomTextSplitFunction(json: { [key: string]: any }) {
    let customTextSplitFunction: string | null = null;
    if ('customTextSplitFunction' in json && typeof json.customTextSplitFunction === 'string') {
      customTextSplitFunction = json.customTextSplitFunction;
    }
    return customTextSplitFunction;
  }
  private static getCustomTextTypes(json: { [key: string]: any }) {
    let customTextTypes: string[] = [];
    if ('customTextTypes' in json && Array.isArray(json.customTextTypes) && json.customTextTypes.length > 0) {
      customTextTypes = json.customTextTypes.filter((d: any) => typeof d === 'string' && d.length > 0);
    }
    return customTextTypes;
  }
  private static getRecursive(json: { [key: string]: any }) {
    let recursive = true;
    if ('recursive' in json && typeof json.recursive === 'boolean') {
      recursive = json.recursive;
    }
    return recursive;
  }
  private static getDistanceThreshold(json: { [key: string]: any }) {
    let distanceThreshold = -1;
    if ('distanceThreshold' in json && typeof json.distanceThreshold === 'number') {
      distanceThreshold = json.distanceThreshold;
    }
    return distanceThreshold;
  }
  private static getNResults(json: { [key: string]: any }) {
    let nResults: number | null = null;
    if ('n_results' in json && typeof json.n_results === 'number') {
      nResults = json.n_results;
    }
    return nResults;
  }
}
