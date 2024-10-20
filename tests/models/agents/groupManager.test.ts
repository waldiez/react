import { createdAt, groupManagerJson, updatedAt } from './data';
import { expectTypeOf } from 'vitest';

import { WaldieSourceGroupManager } from '@waldiez/models/agents/manager';
import { WaldieSourceGroupManagerData } from '@waldiez/models/agents/manager/data';
import {
  WaldieNodeGroupManager,
  WaldieNodeGroupManagerData
} from '@waldiez/models/types/agents/waldieGroupManagerAgent';

describe('WaldieSourceGroupManager', () => {
  const waldieSourceGroupManagerData: WaldieSourceGroupManagerData = {
    name: 'Group Manager',
    agentType: 'manager',
    systemMessage: null,
    humanInputMode: 'ALWAYS',
    description: 'A group manager agent',
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
    maxRound: 0,
    adminName: 'Admin',
    enableClearHistory: false,
    sendIntroductions: false,
    speakers: {
      selectionMethod: 'auto',
      selectionCustomMethod: '',
      selectionMode: 'transition',
      transitionsType: 'allowed',
      allowRepeat: true,
      maxRetriesForSelecting: 2,
      allowedOrDisallowedTransitions: {
        agent1: ['agent2', 'agent3'],
        agent2: ['agent1', 'agent3'],
        agent3: ['agent1', 'agent2']
      }
    },
    modelIds: [],
    skills: [],
    tags: [],
    requirements: [],
    createdAt,
    updatedAt
  };

  const manager = new WaldieSourceGroupManager('manager-id', waldieSourceGroupManagerData);

  const managerNode = manager.asNode();

  it('should create a new Group Manager', () => {
    expectTypeOf(manager).toEqualTypeOf<WaldieSourceGroupManager>();
  });

  it('should have the correct agentType', () => {
    expect(manager.data.agentType).toBe('manager');
  });

  it('should create a new manager node', () => {
    expectTypeOf(managerNode).toEqualTypeOf<WaldieNodeGroupManager>();
  });

  it('should have node data of type WaldieNodeGroupManagerData', () => {
    expectTypeOf(managerNode.data).toEqualTypeOf<WaldieNodeGroupManagerData>();
  });

  it('should have the correct node id', () => {
    expect(managerNode.id).toBe('manager-id');
  });

  it('should import a manager from json', () => {
    const managerFromJSON = WaldieSourceGroupManager.fromJSON(groupManagerJson);
    expect(managerFromJSON.data).toEqual(groupManagerJson);
  });

  it('should create new manager data', () => {
    const managerData = new WaldieSourceGroupManagerData();
    expect(managerData).toBeInstanceOf(WaldieSourceGroupManagerData);
  });

  it('should import manager data from json', () => {
    const managerData = WaldieSourceGroupManagerData.fromJSON(groupManagerJson);
    expect(managerData).toEqual(waldieSourceGroupManagerData);
  });

  it('should create a manager with default values', () => {
    const importedAgent = WaldieSourceGroupManager.fromJSON(null);
    expect(importedAgent).toBeInstanceOf(WaldieSourceGroupManager);
  });

  it('should import manager data with default values', () => {
    const managerData = WaldieSourceGroupManagerData.fromJSON(null);
    expect(managerData).toBeInstanceOf(WaldieSourceGroupManagerData);
  });

  it('should import manager data with label instead of name', () => {
    const managerJson = {
      ...groupManagerJson,
      label: 'label of Group Manager'
    } as any;
    delete managerJson.name;
    const managerDataFromJSON = WaldieSourceGroupManagerData.fromJSON(managerJson);
    expect(managerDataFromJSON.name).toBe('label of Group Manager');
  });

  it('should import manager data with name in args', () => {
    const jsonWithoutName = {
      ...groupManagerJson
    } as any;
    delete jsonWithoutName.name;
    const managerDataWithName = WaldieSourceGroupManagerData.fromJSON(jsonWithoutName, 'Manager Name');
    expect(managerDataWithName.name).toBe('Manager Name');
  });

  it('should import manager data without a name', () => {
    const jsonWithoutName = {
      ...groupManagerJson
    } as any;
    delete jsonWithoutName.name;
    const managerDataWithoutName = WaldieSourceGroupManagerData.fromJSON(jsonWithoutName);
    expect(managerDataWithoutName.name).toBe('Manager');
  });

  it('should create a manager with id in json', () => {
    const jsonWithId = {
      ...groupManagerJson,
      id: 'manager-id'
    };
    const managerFromJSON = WaldieSourceGroupManager.fromJSON(jsonWithId);
    expect(managerFromJSON.id).toBe('manager-id');
  });

  it('should create a manager node with position in args', () => {
    const managerNodeWithPosition = manager.asNode({ x: 120, y: 200 });
    expect(managerNodeWithPosition.position).toEqual({ x: 120, y: 200 });
  });

  it('should create a manager node with position in json', () => {
    const managerNodeWithPosition = new WaldieSourceGroupManager('manager-id', waldieSourceGroupManagerData, {
      position: { x: 15, y: 25 }
    }).asNode();
    expect(managerNodeWithPosition.position).toEqual({ x: 15, y: 25 });
  });
});
