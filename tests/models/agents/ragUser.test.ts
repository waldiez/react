import { createdAt, ragUserJson, updatedAt } from './data';
import { expectTypeOf } from 'vitest';

import { WaldiezSourceRagUser } from '@waldiez/models/agents/ragUser';
import { WaldiezSourceRagUserData } from '@waldiez/models/agents/ragUser/data';
import { defaultRetrieveConfig } from '@waldiez/models/agents/ragUser/retrieveConfig';
import { WaldiezNodeRagUser, WaldiezNodeRagUserData } from '@waldiez/models/types/agents/ragUser';

describe('WaldiezSourceRagUser', () => {
  const waldieSourceRagUserData: WaldiezSourceRagUserData = {
    name: 'Rag User',
    agentType: 'rag_user',
    systemMessage: null,
    humanInputMode: 'ALWAYS',
    description: 'A rag user agent',
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

  const ragUser = new WaldiezSourceRagUser('rag-user-id', waldieSourceRagUserData);
  const ragUserNode = ragUser.asNode();

  it('should create a new Rag User', () => {
    expectTypeOf(ragUser).toEqualTypeOf<WaldiezSourceRagUser>();
  });

  it('should have the correct agentType', () => {
    expect(ragUser.data.agentType).toBe('rag_user');
  });

  it('should have node data of type WaldiezSourceRagUserData', () => {
    expectTypeOf(ragUserNode.data).toEqualTypeOf<WaldiezNodeRagUserData>();
  });

  it('should create a new Rag User node', () => {
    expectTypeOf(ragUserNode).toEqualTypeOf<WaldiezNodeRagUser>();
  });

  it('should have the correct node id', () => {
    expect(ragUserNode.id).toBe('rag-user-id');
  });

  it('should import a rag user from json', () => {
    const ragUserFromJSON = WaldiezSourceRagUser.fromJSON(ragUserJson);
    expect(ragUserFromJSON.data).toEqual(ragUserJson);
  });

  it('should import a rag user from json with default retrieveConfig', () => {
    let jsonWithRetrieveConfig = {
      ...ragUserJson,
      retrieveConfig: { invalid: 'config' }
    } as any;
    let ragUserFromJSON = WaldiezSourceRagUser.fromJSON(jsonWithRetrieveConfig);
    expect(ragUserFromJSON.data.retrieveConfig).toEqual(defaultRetrieveConfig);
    jsonWithRetrieveConfig = {
      ...ragUserJson,
      retrieveConfig: undefined
    } as any;
    ragUserFromJSON = WaldiezSourceRagUser.fromJSON(jsonWithRetrieveConfig);
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
    let ragUserFromJSON = WaldiezSourceRagUser.fromJSON(jsonWithRetrieveConfig);
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
    ragUserFromJSON = WaldiezSourceRagUser.fromJSON(jsonWithRetrieveConfig);
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
    const ragUserData = new WaldiezSourceRagUserData();
    expect(ragUserData).toBeInstanceOf(WaldiezSourceRagUserData);
  });

  it('should import rag user data from json', () => {
    const ragUserData = WaldiezSourceRagUserData.fromJSON(ragUserJson);
    expect(ragUserData).toEqual(waldieSourceRagUserData);
  });

  it('should create a rag user with default values', () => {
    const importedAgent = WaldiezSourceRagUser.fromJSON(null);
    expect(importedAgent).toBeInstanceOf(WaldiezSourceRagUser);
  });

  it('should create rag user data with default values', () => {
    const ragUserData = WaldiezSourceRagUserData.fromJSON(null);
    expect(ragUserData).toBeInstanceOf(WaldiezSourceRagUserData);
  });

  it('should create a rag user with id in json', () => {
    const jsonWithId = {
      ...ragUserJson,
      id: 'rag-user-id'
    };
    const ragUserFromJSON = WaldiezSourceRagUser.fromJSON(jsonWithId);
    expect(ragUserFromJSON.id).toBe('rag-user-id');
  });

  it('should create a rag user node with position in args', () => {
    const ragUserWithPosition = ragUser.asNode({ x: 10, y: 10 });
    expect(ragUserWithPosition.position).toEqual({ x: 10, y: 10 });
  });

  it('should create a rag user node with position in json', () => {
    const ragUserWithPosition = new WaldiezSourceRagUser('rag-user-id', waldieSourceRagUserData, {
      position: { x: 10, y: 10 }
    }).asNode();
    expect(ragUserWithPosition.position).toEqual({ x: 10, y: 10 });
  });
});
