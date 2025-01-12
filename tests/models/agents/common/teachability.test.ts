import { commonDataJson } from "./data";

import { WaldiezSourceAgentCommonData } from "@waldiez/models/agents/common";

describe("WaldiezSourceAgentCommonDataTeachability", () => {
    it("should import agent data from json with teachability", () => {
        const commonDataJsonWithTeachability = {
            ...commonDataJson,
            teachability: {
                enabled: true,
                verbosity: 1,
                resetDb: true,
                recallThreshold: 10,
                maxMumRetrievals: 5,
            },
        };
        const importedAgent = WaldiezSourceAgentCommonData.fromJSON(commonDataJsonWithTeachability, "user");
        expect(importedAgent.teachability).toEqual({
            enabled: true,
            verbosity: 1,
            resetDb: true,
            recallThreshold: 10,
            maxMumRetrievals: 5,
        });
    });
});
