import { WaldiezSwarmOnConditionAvailable } from "@waldiez/models";

export type OnConditionAvailableProps = {
    data: WaldiezSwarmOnConditionAvailable;
    flowId: string;
    darkMode: boolean;
    onDataChange: (value: WaldiezSwarmOnConditionAvailable) => void;
};
