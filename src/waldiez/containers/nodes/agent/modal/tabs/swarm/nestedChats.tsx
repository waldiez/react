import { useState } from "react";

import { TextInput } from "@waldiez/components";
import { WaldiezAgentSwarmNestedChatsProps } from "@waldiez/containers/nodes/agent/modal/tabs/swarm/types";
import { WaldiezSwarmAfterWork, WaldiezSwarmHandoff, WaldiezSwarmOnCondition } from "@waldiez/models";
import { getNestedChatOnConditionHandoffs, isAfterWork } from "@waldiez/store/utils";

export const WaldiezAgentSwarmNestedChats = (props: WaldiezAgentSwarmNestedChatsProps) => {
    const { data, agentConnections, onDataChange } = props;
    const onConditions = getNestedChatOnConditionHandoffs(agentConnections, data);
    const [onConditionsState, setOnConditionsState] = useState<WaldiezSwarmOnCondition[]>(onConditions);
    const conditionsCount = onConditions.length;
    const onConditionsChanged = () => {
        const handoffs: WaldiezSwarmHandoff[] = [...onConditionsState];
        const afterWorkHandoff = data.handoffs.find(handoff => isAfterWork(handoff));
        if (afterWorkHandoff) {
            handoffs.push(afterWorkHandoff as WaldiezSwarmAfterWork);
        }
        onDataChange({ handoffs });
    };
    const onMoveHandoffUp = (index: number) => {
        const newOnConditions = [...onConditionsState];
        const temp = newOnConditions[index];
        newOnConditions[index] = newOnConditions[index - 1];
        newOnConditions[index - 1] = temp;
        (newOnConditions[index] as any).order = index;
        (newOnConditions[index - 1] as any).order = index - 1;
        setOnConditionsState(newOnConditions);
        onConditionsChanged();
    };
    const onMoveHandoffDown = (index: number) => {
        const newOnConditions = [...onConditionsState];
        const temp = newOnConditions[index];
        newOnConditions[index] = newOnConditions[index + 1];
        newOnConditions[index + 1] = temp;
        (newOnConditions[index] as any).order = index;
        (newOnConditions[index + 1] as any).order = index + 1;
        setOnConditionsState(newOnConditions);
        onConditionsChanged();
    };
    const onConditionStringChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newOnConditions = [...onConditionsState];
        newOnConditions.forEach(onCondition => {
            onCondition.condition = event.target.value;
        });
        setOnConditionsState(newOnConditions);
        onConditionsChanged();
    };
    return (
        <div className="agent-panel agent-swarm-handoffs-panel">
            {onConditions.length === 0 ? (
                <div className="agent-no-agents margin-top-10 margin-bottom-10">
                    No nested chat handoffs found for this agent.
                </div>
            ) : (
                <div>
                    <div className="flex-column margin-bottom-10">
                        <TextInput
                            label={"Condition:"}
                            placeholder="Enter condition"
                            value={onConditionsState[0].condition}
                            onChange={onConditionStringChange}
                        />
                    </div>
                    <div className="flex-column margin-bottom-10">
                        <label>Chat queue:</label>
                        <div className="agent-handoff-recipients flex-column">
                            {onConditionsState.map((onCondition, index) => (
                                <div key={index} className="agent-handoff-recipient">
                                    <div
                                        style={
                                            conditionsCount === 1
                                                ? { marginLeft: -20 }
                                                : conditionsCount === 2
                                                  ? { width: 30 }
                                                  : conditionsCount > 2
                                                    ? { width: 50 }
                                                    : {}
                                        }
                                        className="flex margin-right-10"
                                    >
                                        {index > 0 && conditionsCount > 1 && (
                                            <button
                                                type="button"
                                                title="Move up"
                                                className="flow-order-item-action"
                                                data-testid={`move-handoff-up-button-${index}`}
                                                onClick={onMoveHandoffUp.bind(null, index)}
                                            >
                                                &#x2191;
                                            </button>
                                        )}
                                        {index < conditionsCount - 1 && (
                                            <button
                                                title="Move down"
                                                type="button"
                                                className="flow-order-item-action"
                                                data-testid={`move-handoff-down-button-${index}`}
                                                onClick={onMoveHandoffDown.bind(null, index)}
                                            >
                                                &#x2193;
                                            </button>
                                        )}
                                    </div>
                                    <div className="agent-handoff-recipient-name">
                                        {(onCondition.target as any).label}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
