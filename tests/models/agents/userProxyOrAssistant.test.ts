import { agentJson, createdAt, updatedAt } from './data';
import { expectTypeOf } from 'vitest';

import { WaldieNodeUserProxyOrAssistant } from '@waldiez/models';
import {
  WaldieSourceUserProxyOrAssistant,
  WaldieSourceUserProxyOrAssistantData
} from '@waldiez/models/agents/common/userProxyOrAssistant';

describe('WaldieSourceUserProxyOrAssistant', () => {
  const agentData: WaldieSourceUserProxyOrAssistantData = {
    name: 'Agent',
    agentType: 'assistant',
    systemMessage: null,
    humanInputMode: 'NEVER',
    description: "The agent's description",
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
    modelIds: [],
    skills: [],
    tags: [],
    requirements: [],
    createdAt,
    updatedAt
  };

  const agent = new WaldieSourceUserProxyOrAssistant('agent-id', agentData);

  const agentNode = agent.asNode();

  it('should create an instance of WaldieSourceUserProxyOrAssistant', () => {
    expect(agent).toBeInstanceOf(WaldieSourceUserProxyOrAssistant);
  });

  it('should create an instance of Node', () => {
    expect(agentNode).toHaveProperty('id');
    expect(agentNode).toHaveProperty('data');
    expectTypeOf(agentNode).toEqualTypeOf<WaldieNodeUserProxyOrAssistant>();
  });

  it('should have the correct agentType', () => {
    expect(agent.agentType).toBe('assistant');
    expect(agentNode.data.agentType).toBe('assistant');
  });

  it('should create a node with position in arguments', () => {
    const agentNode = agent.asNode({ x: 0, y: 0 });
    expect(agentNode).toHaveProperty('position');
    expect(agentNode.position).toEqual({ x: 0, y: 0 });
  });

  it('should create a node with position in json', () => {
    const jsonWithPosition = {
      ...agentJson,
      position: { x: 2, y: 3 }
    };
    const agent = WaldieSourceUserProxyOrAssistant.fromJSON(jsonWithPosition, 'assistant');
    const agentNode = agent.asNode();
    expect(agentNode).toHaveProperty('position');
    expect(agentNode.position).toEqual({ x: 2, y: 3 });
  });

  it('should have the correct name', () => {
    expect(agent.data.name).toBe('Agent');
  });

  it('should import an agent from JSON', () => {
    const agent = WaldieSourceUserProxyOrAssistant.fromJSON(agentJson, 'assistant');
    expect(agent).toBeInstanceOf(WaldieSourceUserProxyOrAssistant);
    expect(agent.data.name).toBe('Agent');
    expect(agent.data.agentType).toBe('assistant');
    expect(agent.data.createdAt).toBe(createdAt);
    expect(agent.data.maxTokens).toBeNull();
  });

  it('should import an agent wih not a json', () => {
    const agent = WaldieSourceUserProxyOrAssistant.fromJSON(null, 'assistant');
    expectTypeOf(agent).toEqualTypeOf<WaldieSourceUserProxyOrAssistant>();
  });

  it('should import an agent from JSON with a defined name', () => {
    const agent = WaldieSourceUserProxyOrAssistant.fromJSON(agentJson, 'assistant', "Agent's name");
    expect(agent.data.name).toBe("Agent's name");
  });

  it('should import an agent from JSON with label instead of name', () => {
    const jsonWithLabel = {
      ...agentJson,
      label: 'Agent label'
    } as any;
    delete jsonWithLabel.name;
    const agent = WaldieSourceUserProxyOrAssistant.fromJSON(jsonWithLabel, 'assistant');
    expect(agent.data.name).toBe('Agent label');
  });

  it('should import an agent from JSON with data', () => {
    const agent = WaldieSourceUserProxyOrAssistant.fromJSON({ data: agentJson }, 'assistant');
    expect(agent.data).toEqual(agentJson);
  });

  it('should import an agent from JSON with data key in json', () => {
    const agent = WaldieSourceUserProxyOrAssistant.fromJSON({ data: agentJson }, 'assistant');
    expectTypeOf(agent).toEqualTypeOf<WaldieSourceUserProxyOrAssistant>();
  });

  it('should import agent data from JSON', () => {
    const agentData = WaldieSourceUserProxyOrAssistantData.fromJSON(agentJson, 'assistant');
    expect(agentData).toEqual(agentJson);
  });

  it('should import agent data with not a json', () => {
    const agentData = WaldieSourceUserProxyOrAssistantData.fromJSON(null, 'assistant');
    expectTypeOf(agentData).toEqualTypeOf<WaldieSourceUserProxyOrAssistantData>();
  });

  it('should import agent data from JSON with nested chats', () => {
    const agentJsonWithNestedChats = {
      ...agentJson,
      nestedChats: [
        {
          triggeredBy: [{ id: 'triggered-by-id', isReply: false }],
          messages: [{ id: 'message-id', isReply: false }]
        }
      ]
    };
    const agentData = WaldieSourceUserProxyOrAssistantData.fromJSON(agentJsonWithNestedChats, 'assistant');
    expect(agentData).toEqual(agentJsonWithNestedChats);
  });
});
