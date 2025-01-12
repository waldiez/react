import { WaldiezAgentTeachability } from "@waldiez/models/types/agents";

export class TeachabilityData {
    data: WaldiezAgentTeachability;
    constructor(
        enabled: boolean = false,
        verbosity: 0 | 1 | 2 | 3 = 0,
        resetDb: boolean = false,
        recallThreshold: number = 0,
        maxMumRetrievals: number = 0,
    ) {
        this.data = {
            enabled,
            verbosity,
            resetDb,
            recallThreshold,
            maxMumRetrievals,
        };
    }
    static fromJSON = (data: Record<string, unknown>): TeachabilityData => {
        const enabled = TeachabilityData.getEnabled(data);
        const verbosity = TeachabilityData.getVerbosity(data);
        const resetDb = TeachabilityData.getResetDb(data);
        const recallThreshold = TeachabilityData.getRecallThreshold(data);
        const maxMumRetrievals = TeachabilityData.getMaxMumRetrievals(data);
        return new TeachabilityData(enabled, verbosity, resetDb, recallThreshold, maxMumRetrievals);
    };
    private static getEnabled = (data: Record<string, unknown>): boolean => {
        let enabled = false;
        if ("enabled" in data && typeof data.enabled === "boolean") {
            enabled = data.enabled;
        }
        return enabled;
    };
    private static getVerbosity = (data: Record<string, unknown>): 0 | 1 | 2 | 3 => {
        let verbosity = 0 as 0 | 1 | 2 | 3;
        if (
            "verbosity" in data &&
            typeof data.verbosity === "number" &&
            [0, 1, 2, 3].includes(data.verbosity)
        ) {
            verbosity = data.verbosity as 0 | 1 | 2 | 3;
        }
        return verbosity;
    };
    private static getResetDb = (data: Record<string, unknown>): boolean => {
        let resetDb = false;
        if ("resetDb" in data && typeof data.resetDb === "boolean") {
            resetDb = data.resetDb;
        }
        return resetDb;
    };
    private static getRecallThreshold = (data: Record<string, unknown>): number => {
        let recallThreshold = 0;
        if ("recallThreshold" in data && typeof data.recallThreshold === "number") {
            recallThreshold = data.recallThreshold;
        }
        return recallThreshold;
    };
    private static getMaxMumRetrievals = (data: Record<string, unknown>): number => {
        let maxMumRetrievals = 0;
        if ("maxMumRetrievals" in data && typeof data.maxMumRetrievals === "number") {
            maxMumRetrievals = data.maxMumRetrievals;
        }
        return maxMumRetrievals;
    };
}
