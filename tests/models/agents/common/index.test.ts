import { commonDataJson } from './data';

import { WaldiezSourceAgentCommonData } from '@waldiez/models/agents/common';

describe('WaldiezSourceAgentCommonData', () => {
  const waldieAgentCommonData: WaldiezSourceAgentCommonData = new WaldiezSourceAgentCommonData();
  it('should have the correct default values', () => {
    expect(waldieAgentCommonData.name).toEqual('Agent');
    expect(waldieAgentCommonData.systemMessage).toBeNull();
    expect(waldieAgentCommonData.humanInputMode).toEqual('ALWAYS');
    expect(waldieAgentCommonData.description).toEqual('An agent');
    expect(waldieAgentCommonData.maxTokens).toBeNull();
    expect(waldieAgentCommonData.codeExecutionConfig).toBeFalsy();
    expect(waldieAgentCommonData.agentDefaultAutoReply).toBeNull();
    expect(waldieAgentCommonData.maxConsecutiveAutoReply).toBeNull();
    expect(waldieAgentCommonData.termination).toEqual({
      type: 'none',
      keywords: [],
      criterion: null,
      methodContent: null
    });
    expect(waldieAgentCommonData.teachability).toEqual({
      enabled: false,
      verbosity: 0,
      resetDb: false,
      recallThreshold: 0,
      maxMumRetrievals: 0
    });
    expect(waldieAgentCommonData.modelIds).toEqual([]);
    expect(waldieAgentCommonData.skills).toEqual([]);
    expect(waldieAgentCommonData.tags).toEqual([]);
    expect(waldieAgentCommonData.requirements).toEqual([]);
  });

  it('should import agent data from json', () => {
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(commonDataJson, 'user');
    expect(importedAgent.name).toEqual(commonDataJson.name);
    expect(importedAgent.systemMessage).toBeNull();
    expect(importedAgent.humanInputMode).toEqual(commonDataJson.humanInputMode);
    expect(importedAgent.description).toEqual(commonDataJson.description);
    expect(importedAgent.maxTokens).toBeNull();
    expect(importedAgent.codeExecutionConfig).toBeFalsy();
    expect(importedAgent.agentDefaultAutoReply).toBeNull();
    expect(importedAgent.maxConsecutiveAutoReply).toBeNull();
    expect(importedAgent.termination).toEqual(commonDataJson.termination);
    expect(importedAgent.teachability).toEqual(commonDataJson.teachability);
    expect(importedAgent.modelIds).toEqual(commonDataJson.modelIds);
    expect(importedAgent.skills).toEqual(commonDataJson.skills);
    expect(importedAgent.tags).toEqual(commonDataJson.tags);
    expect(importedAgent.requirements).toEqual(commonDataJson.requirements);
  });
  it('should import agent data from json with system message', () => {
    const commonDataJsonWithSystemMessage = {
      ...commonDataJson,
      systemMessage: 'system message'
    };
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(commonDataJsonWithSystemMessage, 'user');
    expect(importedAgent.systemMessage).toEqual('system message');
  });

  it('should import agent data from json with max tokens', () => {
    const commonDataJsonWithMaxTokens = {
      ...commonDataJson,
      maxTokens: 10
    };
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(commonDataJsonWithMaxTokens, 'user');
    expect(importedAgent.maxTokens).toEqual(10);
  });

  it('should import agent data from json with code execution config object', () => {
    const commonDataJsonWithCodeExecutionConfig = {
      ...commonDataJson,
      codeExecutionConfig: {
        workDir: 'workDir',
        useDocker: false,
        timeout: 10,
        lastNMessages: 'auto',
        functions: ['function1', 'function2']
      }
    };
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(
      commonDataJsonWithCodeExecutionConfig,
      'user'
    );
    expect(importedAgent.codeExecutionConfig).toEqual({
      workDir: 'workDir',
      useDocker: false,
      timeout: 10,
      lastNMessages: 'auto',
      functions: ['function1', 'function2']
    });
  });

  it('should import agent data from json with code execution config false', () => {
    const commonDataJsonWithCodeExecutionConfig = {
      ...commonDataJson,
      codeExecutionConfig: false
    };
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(
      commonDataJsonWithCodeExecutionConfig,
      'user'
    );
    expect(importedAgent.codeExecutionConfig).toBeFalsy();
  });

  it('should import agent data from json with agent default auto reply', () => {
    const commonDataJsonWithAgentDefaultAutoReply = {
      ...commonDataJson,
      agentDefaultAutoReply: 'auto reply'
    };
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(
      commonDataJsonWithAgentDefaultAutoReply,
      'user'
    );
    expect(importedAgent.agentDefaultAutoReply).toEqual('auto reply');
  });

  it('should import agent data from json with max consecutive auto reply', () => {
    const commonDataJsonWithMaxConsecutiveAutoReply = {
      ...commonDataJson,
      maxConsecutiveAutoReply: 10
    };
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(
      commonDataJsonWithMaxConsecutiveAutoReply,
      'user'
    );
    expect(importedAgent.maxConsecutiveAutoReply).toEqual(10);
  });

  it('should import agent data from json with tags', () => {
    const commonDataJsonWithTags = {
      ...commonDataJson,
      tags: ['tag1', 'tag2']
    };
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(commonDataJsonWithTags, 'user');
    expect(importedAgent.tags).toEqual(['tag1', 'tag2']);
  });

  it('should import agent data from json with requirements', () => {
    const commonDataJsonWithRequirements = {
      ...commonDataJson,
      requirements: ['requirement1', 'requirement2']
    };
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(commonDataJsonWithRequirements, 'user');
    expect(importedAgent.requirements).toEqual(['requirement1', 'requirement2']);
  });

  it('should import agent data from json with created at and updated at', () => {
    const commonDataJsonWithDates = {
      ...commonDataJson,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(commonDataJsonWithDates, 'user');
    expect(importedAgent.createdAt).toEqual(commonDataJsonWithDates.createdAt);
    expect(importedAgent.updatedAt).toEqual(commonDataJsonWithDates.updatedAt);
  });

  it('should import agent data from json with model ids', () => {
    const commonDataJsonWithModelIds = {
      ...commonDataJson,
      modelIds: ['modelId1', 'modelId2']
    };
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(commonDataJsonWithModelIds, 'user');
    expect(importedAgent.modelIds).toEqual(['modelId1', 'modelId2']);
  });

  it('should import agent data from json with skills', () => {
    const commonDataJsonWithSkills = {
      ...commonDataJson,
      skills: [
        { id: 'skillId1', executorId: 'executorId1' },
        { id: 'skillId2', executorId: 'executorId2' }
      ]
    };
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(commonDataJsonWithSkills, 'user');
    expect(importedAgent.skills).toEqual([
      { id: 'skillId1', executorId: 'executorId1' },
      { id: 'skillId2', executorId: 'executorId2' }
    ]);
  });
  it('should import agent data from json with label instead of name', () => {
    const commonDataJsonWithLabel = {
      ...commonDataJson,
      label: 'name of the agent'
    } as any;
    delete commonDataJsonWithLabel.name;
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(commonDataJsonWithLabel, 'user');
    expect(importedAgent.name).toEqual('name of the agent');
  });

  it('should import agent data from json with name in args', () => {
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(
      commonDataJson,
      'user',
      'the name of the agent'
    );
    expect(importedAgent.name).toEqual('the name of the agent');
  });
  it('should create an agent with default values', () => {
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(null, 'user', 'the name of the agent');
    expect(importedAgent).toBeInstanceOf(WaldiezSourceAgentCommonData);
    expect(importedAgent.name).toEqual('the name of the agent');
    const importedAgentUnnamed = WaldiezSourceAgentCommonData.fromJSON(null, 'user');
    expect(importedAgentUnnamed).toBeInstanceOf(WaldiezSourceAgentCommonData);
    expect(importedAgentUnnamed.name).toEqual('Agent');
  });
});
