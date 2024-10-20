import { createdAt, updatedAt, userProxyJson } from './data';
import { expectTypeOf } from 'vitest';

import { WaldieSourceUserProxy } from '@waldiez/models/agents/userProxy';
import { WaldieSourceUserProxyData } from '@waldiez/models/agents/userProxy/data';
import {
  WaldieNodeUserProxy,
  WaldieNodeUserProxyData
} from '@waldiez/models/types/agents/waldieUserProxyOrAssistantAgent';

describe('WaldieSourceUserProxy', () => {
  const waldieSourceUserProxyData: WaldieSourceUserProxyData = {
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

  const userProxy = new WaldieSourceUserProxy('test-id', waldieSourceUserProxyData);
  const userProxyNode = userProxy.asNode();

  it('should create a new User Proxy', () => {
    expectTypeOf(userProxyNode).toEqualTypeOf<WaldieNodeUserProxy>();
  });

  it('should have the correct agentType', () => {
    expect(userProxyNode.data.agentType).toBe('user');
  });

  it('should have node data of type WaldieNodeUserProxyData', () => {
    expectTypeOf(userProxyNode.data).toEqualTypeOf<WaldieNodeUserProxyData>();
  });

  it('should create a new User Proxy node', () => {
    expect(userProxy).toBeInstanceOf(WaldieSourceUserProxy);
  });

  it('should have the correct node id', () => {
    expect(userProxyNode.id).toBe('test-id');
  });

  it('should import a user proxy from json', () => {
    const userProxyFromJSON = WaldieSourceUserProxy.fromJSON(userProxyJson, 'user');
    expect(userProxyFromJSON.data).toEqual(userProxyJson);
  });

  it('should create new user proxy data', () => {
    const userProxyData = new WaldieSourceUserProxyData();
    expect(userProxyData).toBeInstanceOf(WaldieSourceUserProxyData);
  });

  it('should import user proxy data from json', () => {
    const userProxyData = WaldieSourceUserProxyData.fromJSON(userProxyJson, 'user');
    expect(userProxyData).toEqual(waldieSourceUserProxyData);
  });
});
