import { commonDataJson } from './data';

import { WaldieSourceAgentCommonData } from '@waldiez/models/agents/common';

describe('WaldieSourceAgentCommonDataTermination', () => {
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
    const importedAgent = WaldieSourceAgentCommonData.fromJSON(
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
    const importedAgent = WaldieSourceAgentCommonData.fromJSON(
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
