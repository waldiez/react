import { createdAt, ragUserJson, updatedAt } from './data';
import { expectTypeOf } from 'vitest';

import { WaldieSourceRagUser } from '@waldiez/models/agents/ragUser';
import { WaldieSourceRagUserData } from '@waldiez/models/agents/ragUser/data';
import { defaultRetrieveConfig } from '@waldiez/models/agents/ragUser/retrieveConfig';
import { WaldieNodeRagUser, WaldieNodeRagUserData } from '@waldiez/models/types/agents/waldieRagUserAgent';

describe('WaldieSourceRagUser', () => {
  const waldieSourceRagUserData: WaldieSourceRagUserData = {
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

  const ragUser = new WaldieSourceRagUser('rag-user-id', waldieSourceRagUserData);
  const ragUserNode = ragUser.asNode();

  it('should create a new Rag User', () => {
    expectTypeOf(ragUser).toEqualTypeOf<WaldieSourceRagUser>();
  });

  it('should have the correct agentType', () => {
    expect(ragUser.data.agentType).toBe('rag_user');
  });

  it('should have node data of type WaldieSourceRagUserData', () => {
    expectTypeOf(ragUserNode.data).toEqualTypeOf<WaldieNodeRagUserData>();
  });

  it('should create a new Rag User node', () => {
    expectTypeOf(ragUserNode).toEqualTypeOf<WaldieNodeRagUser>();
  });

  it('should have the correct node id', () => {
    expect(ragUserNode.id).toBe('rag-user-id');
  });

  it('should import a rag user from json', () => {
    const ragUserFromJSON = WaldieSourceRagUser.fromJSON(ragUserJson);
    expect(ragUserFromJSON.data).toEqual(ragUserJson);
  });

  it('should import a rag user from json with default retrieveConfig', () => {
    let jsonWithRetrieveConfig = {
      ...ragUserJson,
      retrieveConfig: { invalid: 'config' }
    } as any;
    let ragUserFromJSON = WaldieSourceRagUser.fromJSON(jsonWithRetrieveConfig);
    expect(ragUserFromJSON.data.retrieveConfig).toEqual(defaultRetrieveConfig);
    jsonWithRetrieveConfig = {
      ...ragUserJson,
      retrieveConfig: undefined
    } as any;
    ragUserFromJSON = WaldieSourceRagUser.fromJSON(jsonWithRetrieveConfig);
    expect(ragUserFromJSON.data.retrieveConfig).toEqual(defaultRetrieveConfig);
  });
  it('should import a rag user from json with partial retrieveConfig', () => {
    let jsonWithRetrieveConfig = {
      ...ragUserJson,
      retrieveConfig: {
        dbConfig: {
          model: 'all-MiniLM-L6-v2',
          useMemory: false,
          useLocalStorage: false,
          localStoragePath: null,
          connectionUrl: null
        }
      }
    } as any;
    let ragUserFromJSON = WaldieSourceRagUser.fromJSON(jsonWithRetrieveConfig);
    jsonWithRetrieveConfig = {
      ...ragUserJson,
      retrieveConfig: {
        n_results: 4,
        customTextTypes: ['text'],
        customTextSplitFunction: 'splitText',
        customTokenCountFunction: 'countTokens',
        embeddingFunction: 'embedText',
        customizedAnswerPrefix: 'Answer:',
        customizedPrompt: 'Prompt:',
        contextMaxTokens: 100,
        chunkTokenSize: 50,
        model: 'modelName',
        docsPath: ['path1', 'path2'],
        dbConfig: {
          connectionUrl: 'url',
          localStoragePath: 'path'
        }
      }
    } as any;
    ragUserFromJSON = WaldieSourceRagUser.fromJSON(jsonWithRetrieveConfig);
    expect(ragUserFromJSON.data.retrieveConfig).toEqual({
      ...defaultRetrieveConfig,
      n_results: 4,
      customTextTypes: ['text'],
      customTextSplitFunction: 'splitText',
      customTokenCountFunction: 'countTokens',
      embeddingFunction: 'embedText',
      customizedAnswerPrefix: 'Answer:',
      customizedPrompt: 'Prompt:',
      contextMaxTokens: 100,
      chunkTokenSize: 50,
      model: 'modelName',
      docsPath: ['path1', 'path2'],
      dbConfig: {
        ...defaultRetrieveConfig.dbConfig,
        connectionUrl: 'url',
        localStoragePath: 'path'
      }
    });
  });
  it('should create new rag user data', () => {
    const ragUserData = new WaldieSourceRagUserData();
    expect(ragUserData).toBeInstanceOf(WaldieSourceRagUserData);
  });

  it('should import rag user data from json', () => {
    const ragUserData = WaldieSourceRagUserData.fromJSON(ragUserJson);
    expect(ragUserData).toEqual(waldieSourceRagUserData);
  });

  it('should create a rag user with default values', () => {
    const importedAgent = WaldieSourceRagUser.fromJSON(null);
    expect(importedAgent).toBeInstanceOf(WaldieSourceRagUser);
  });

  it('should create rag user data with default values', () => {
    const ragUserData = WaldieSourceRagUserData.fromJSON(null);
    expect(ragUserData).toBeInstanceOf(WaldieSourceRagUserData);
  });

  it('should create a rag user with id in json', () => {
    const jsonWithId = {
      ...ragUserJson,
      id: 'rag-user-id'
    };
    const ragUserFromJSON = WaldieSourceRagUser.fromJSON(jsonWithId);
    expect(ragUserFromJSON.id).toBe('rag-user-id');
  });

  it('should create a rag user node with position in args', () => {
    const ragUserWithPosition = ragUser.asNode({ x: 10, y: 10 });
    expect(ragUserWithPosition.position).toEqual({ x: 10, y: 10 });
  });

  it('should create a rag user node with position in json', () => {
    const ragUserWithPosition = new WaldieSourceRagUser('rag-user-id', waldieSourceRagUserData, {
      position: { x: 10, y: 10 }
    }).asNode();
    expect(ragUserWithPosition.position).toEqual({ x: 10, y: 10 });
  });
});
