import { commonDataJson } from './data';

import { WaldieSourceAgentCommonData } from '@waldiez/models/agents/common';

describe('WaldieSourceAgentCommonDataTeachability', () => {
  it('should import agent data from json with teachability', () => {
    const commonDataJsonWithTeachability = {
      ...commonDataJson,
      teachability: {
        enabled: true,
        verbosity: 1,
        resetDb: true,
        recallThreshold: 10,
        maxMumRetrievals: 5
      }
    };
    const importedAgent = WaldieSourceAgentCommonData.fromJSON(commonDataJsonWithTeachability, 'user');
    expect(importedAgent.teachability).toEqual({
      enabled: true,
      verbosity: 1,
      resetDb: true,
      recallThreshold: 10,
      maxMumRetrievals: 5
    });
  });
});
