import { useState } from "react";

import { AfterWork } from "@waldiez/components";
import { WaldiezAgentSwarmHandoffsProps } from "@waldiez/containers/nodes/agent/modal/tabs/swarm/types";
import {
    WaldiezNodeAgentSwarm,
    WaldiezSwarmAfterWork,
    WaldiezSwarmHandoff,
    WaldiezSwarmOnCondition,
} from "@waldiez/models";
import { getHandoffConditions, isAfterWork } from "@waldiez/store/utils";

export const WaldiezAgentSwarmHandoffs = (props: WaldiezAgentSwarmHandoffsProps) => {
    const { id, data, agents, agentConnections, onDataChange } = props;
    const onConditions = getHandoffConditions(id, agents, agentConnections, data);
    const [onConditionsState, setOnConditionsState] = useState<WaldiezSwarmOnCondition[]>(onConditions);
    const getAfterWork = () => {
        for (const handoff of data.handoffs) {
            if (isAfterWork(handoff)) {
                return handoff as WaldiezSwarmAfterWork;
            }
        }
        return null;
    };
    const afterWork = getAfterWork();
    const onAfterWorkChange = (value: WaldiezSwarmAfterWork | null) => {
        const handoffs = data.handoffs.filter(handoff => !isAfterWork(handoff));
        if (value) {
            handoffs.push(value);
        }
        onDataChange({ handoffs });
    };
    const otherSwarmAgents = agents.filter(agent => agent.id !== id && agent.data.agentType === "swarm");
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
    const onHandoffIsReplyChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const newOnConditions = [...onConditionsState];
        (newOnConditions[index].target as any).isReply = event.target.checked;
        setOnConditionsState(newOnConditions);
        onConditionsChanged();
    };
    return (
        <div className="agent-panel agent-swarm-handoffs-panel">
            {onConditions.length === 0 ? (
                <div className="agent-no-agents margin-top-10 margin-bottom-10">
                    {otherSwarmAgents.length === 0
                        ? "No other swarm agents found in the workspace"
                        : "No other agents found to hand off to"}
                </div>
            ) : (
                <div>
                    <label>Agent Hands off to:</label>
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
                                    {onCondition.targetType === "nested_chat" && (
                                        // add a checkbox for reply or not
                                        <label className="checkbox-label margin-left-10">
                                            <div className="checkbox-label-view">Reply</div>
                                            <input
                                                type="checkbox"
                                                defaultChecked={(onCondition.target as any).isReply}
                                                onChange={onHandoffIsReplyChange.bind(null, index)}
                                                data-testid={`agent-${id}-agent-handoff-nested-reply`}
                                            />
                                            <div className="checkbox"></div>
                                        </label>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            <AfterWork
                value={afterWork}
                agents={otherSwarmAgents as WaldiezNodeAgentSwarm[]}
                darkMode={false}
                onChange={onAfterWorkChange}
            />
        </div>
    );
};
