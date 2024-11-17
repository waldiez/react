import { agentJson, createdAt, updatedAt } from './data';
import { expectTypeOf } from 'vitest';

import { WaldiezNodeUserProxyOrAssistant } from '@waldiez/models';
import {
  WaldiezSourceUserProxyOrAssistant,
  WaldiezSourceUserProxyOrAssistantData
} from '@waldiez/models/agents/common/userProxyOrAssistant';

describe('WaldiezSourceUserProxyOrAssistant', () => {
  const agentData: WaldiezSourceUserProxyOrAssistantData = {
    name: 'Agent',
    agentType: 'assistant',
    systemMessage: null,
    humanInputMode: 'NEVER',
    description: "The agent's description",
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
    updatedAt,
    parentId: null
  };

  const agent = new WaldiezSourceUserProxyOrAssistant('agent-id', agentData);

  const agentNode = agent.asNode();

  it('should create an instance of WaldiezSourceUserProxyOrAssistant', () => {
    expect(agent).toBeInstanceOf(WaldiezSourceUserProxyOrAssistant);
  });

  it('should create an instance of Node', () => {
    expect(agentNode).toHaveProperty('id');
    expect(agentNode).toHaveProperty('data');
    expectTypeOf(agentNode).toEqualTypeOf<WaldiezNodeUserProxyOrAssistant>();
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
    const agent = WaldiezSourceUserProxyOrAssistant.fromJSON(jsonWithPosition, 'assistant');
    const agentNode = agent.asNode();
    expect(agentNode).toHaveProperty('position');
    expect(agentNode.position).toEqual({ x: 2, y: 3 });
  });

  it('should have the correct name', () => {
    expect(agent.data.name).toBe('Agent');
  });

  it('should import an agent from JSON', () => {
    const agent = WaldiezSourceUserProxyOrAssistant.fromJSON(agentJson, 'assistant');
    expect(agent).toBeInstanceOf(WaldiezSourceUserProxyOrAssistant);
    expect(agent.data.name).toBe(agentJson.name);
    expect(agent.data.agentType).toBe('assistant');
    expect(agent.data.createdAt).toBe(createdAt);
  });

  it('should import an agent wih not a json', () => {
    const agent = WaldiezSourceUserProxyOrAssistant.fromJSON(null, 'assistant');
    expectTypeOf(agent).toEqualTypeOf<WaldiezSourceUserProxyOrAssistant>();
  });

  it('should import an agent from JSON with a defined name', () => {
    const agent = WaldiezSourceUserProxyOrAssistant.fromJSON(agentJson, 'assistant', "Agent's name");
    expect(agent.data.name).toBe("Agent's name");
  });

  it('should import an agent from JSON with label instead of name', () => {
    const jsonWithLabel = {
      ...agentJson,
      label: 'Agent label'
    } as any;
    delete jsonWithLabel.name;
    const agent = WaldiezSourceUserProxyOrAssistant.fromJSON(jsonWithLabel, 'assistant');
    expect(agent.data.name).toBe('Agent label');
  });

  it('should import an agent from JSON with data', () => {
    const agent = WaldiezSourceUserProxyOrAssistant.fromJSON({ data: agentJson }, 'assistant');
    expect(agent.data).toEqual(agentJson);
  });

  it('should import an agent from JSON with data key in json', () => {
    const agent = WaldiezSourceUserProxyOrAssistant.fromJSON({ data: agentJson }, 'assistant');
    expectTypeOf(agent).toEqualTypeOf<WaldiezSourceUserProxyOrAssistant>();
  });

  it('should import agent data from JSON', () => {
    const agentData = WaldiezSourceUserProxyOrAssistantData.fromJSON(agentJson, 'assistant');
    expect(agentData).toEqual(agentJson);
  });

  it('should import agent data with not a json', () => {
    const agentData = WaldiezSourceUserProxyOrAssistantData.fromJSON(null, 'assistant');
    expectTypeOf(agentData).toEqualTypeOf<WaldiezSourceUserProxyOrAssistantData>();
  });

  it('should import agent data from JSON with nested chats', () => {
    const agentJsonWithNestedChats = {
      ...agentJson,
      nestedChats: [
        {
          triggeredBy: ['triggered-by-id'],
          messages: [{ id: 'message-id', isReply: false }]
        }
      ]
    };
    const agentData = WaldiezSourceUserProxyOrAssistantData.fromJSON(agentJsonWithNestedChats, 'assistant');
    expect(agentData).toEqual(agentJsonWithNestedChats);
  });
});
