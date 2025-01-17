import { WaldiezNodeAgentSwarm, WaldiezSwarmAfterWork } from "@waldiez/types";

export type AfterWorkProps = {
    value: WaldiezSwarmAfterWork | null;
    agents: WaldiezNodeAgentSwarm[];
    darkMode: boolean;
    onChange: (value: WaldiezSwarmAfterWork | null) => void;
};
