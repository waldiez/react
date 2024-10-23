import { createdAt, updatedAt, userProxyJson } from './data';
import { expectTypeOf } from 'vitest';

import { WaldiezSourceUserProxy } from '@waldiez/models/agents/userProxy';
import { WaldiezSourceUserProxyData } from '@waldiez/models/agents/userProxy/data';
import {
  WaldiezNodeUserProxy,
  WaldiezNodeUserProxyData
} from '@waldiez/models/types/agents/userProxyOrAssistant';

describe('WaldiezSourceUserProxy', () => {
  const waldieSourceUserProxyData: WaldiezSourceUserProxyData = {
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

  const userProxy = new WaldiezSourceUserProxy('test-id', waldieSourceUserProxyData);
  const userProxyNode = userProxy.asNode();

  it('should create a new User Proxy', () => {
    expectTypeOf(userProxyNode).toEqualTypeOf<WaldiezNodeUserProxy>();
  });

  it('should have the correct agentType', () => {
    expect(userProxyNode.data.agentType).toBe('user');
  });

  it('should have node data of type WaldiezNodeUserProxyData', () => {
    expectTypeOf(userProxyNode.data).toEqualTypeOf<WaldiezNodeUserProxyData>();
  });

  it('should create a new User Proxy node', () => {
    expect(userProxy).toBeInstanceOf(WaldiezSourceUserProxy);
  });

  it('should have the correct node id', () => {
    expect(userProxyNode.id).toBe('test-id');
  });

  it('should import a user proxy from json', () => {
    const userProxyFromJSON = WaldiezSourceUserProxy.fromJSON(userProxyJson, 'user');
    expect(userProxyFromJSON.data).toEqual(userProxyJson);
  });

  it('should create new user proxy data', () => {
    const userProxyData = new WaldiezSourceUserProxyData();
    expect(userProxyData).toBeInstanceOf(WaldiezSourceUserProxyData);
  });

  it('should import user proxy data from json', () => {
    const userProxyData = WaldiezSourceUserProxyData.fromJSON(userProxyJson, 'user');
    expect(userProxyData).toEqual(waldieSourceUserProxyData);
  });
});
