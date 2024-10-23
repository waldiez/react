import { commonDataJson } from './data';

import { WaldiezSourceAgentCommonData } from '@waldiez/models/agents/common';

describe('WaldiezSourceAgentCommonDataTermination', () => {
  it('should import agent data from json with termination criterion', () => {
    const commonDataJsonWithTerminationCriterion = {
      ...commonDataJson,
      termination: {
        type: 'keyword',
        keywords: ['keyword1', 'keyword2'],
        criterion: 'ending',
        methodContent: null
      }
    };
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(
      commonDataJsonWithTerminationCriterion,
      'user'
    );
    expect(importedAgent.termination).toEqual({
      type: 'keyword',
      keywords: ['keyword1', 'keyword2'],
      criterion: 'ending',
      methodContent: null
    });
  });

  it('should import agent data from json with termination method content', () => {
    const commonDataJsonWithTerminationMethodContent = {
      ...commonDataJson,
      termination: {
        type: 'method',
        keywords: [],
        criterion: 'found',
        methodContent: 'def method():\n    return "messageText"'
      }
    };
    const importedAgent = WaldiezSourceAgentCommonData.fromJSON(
      commonDataJsonWithTerminationMethodContent,
      'user'
    );
    expect(importedAgent.termination).toEqual({
      type: 'method',
      keywords: [],
      criterion: 'found',
      methodContent: 'def method():\n    return "messageText"'
    });
  });
});
