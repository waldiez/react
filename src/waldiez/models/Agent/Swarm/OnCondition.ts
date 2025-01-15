import {
    WaldiezSwarmOnConditionAvailable,
    WaldiezSwarmOnConditionTargetType,
} from "@waldiez/models/Agent/Swarm/types";

export class WaldiezSwarmOnCondition {
    target: string | { [key: string]: any };
    targetType: WaldiezSwarmOnConditionTargetType;
    condition: string;
    available: WaldiezSwarmOnConditionAvailable;

    constructor(props: {
        target: string | { [key: string]: any };
        targetType: WaldiezSwarmOnConditionTargetType;
        condition: string;
        available: WaldiezSwarmOnConditionAvailable;
    }) {
        this.target = props.target;
        this.targetType = props.targetType;
        this.condition = props.condition;
        this.available = props.available;
    }
}
