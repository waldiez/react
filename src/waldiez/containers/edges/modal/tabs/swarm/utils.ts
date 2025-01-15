import { WaldiezNodeAgent, WaldiezNodeAgentSwarmData, WaldiezSwarmOnCondition } from "@waldiez/models";

export const getSourceAgentOnCondition = (sourceAgent: WaldiezNodeAgent, targetAgent: WaldiezNodeAgent) => {
    let onCondition = new WaldiezSwarmOnCondition({
        targetType: "agent",
        target: targetAgent.id,
        condition: `Transfer to ${targetAgent.data.label}`,
        available: {
            type: "none",
            value: null,
        },
    });
    if (sourceAgent.data.agentType !== "swarm" || targetAgent.data.agentType !== "swarm") {
        return onCondition;
    }
    const agentData = sourceAgent.data as WaldiezNodeAgentSwarmData;
    // handoffs: WaldiezSwarmHandoff[];
    // WaldiezSwarmHandoff = WaldiezSwarmAfterWork | WaldiezSwarmOnCondition;
    // there should be one (and only one) WaldiezSwarmOnCondition
    // if not (not added when the edge was created?), let's use a default
    // if more than one, let's use the first one
    for (const handoff of agentData.handoffs) {
        if (handoff instanceof WaldiezSwarmOnCondition) {
            // check if the target is the same as the targetAgent
            if (handoff.target === targetAgent.id) {
                onCondition = handoff as WaldiezSwarmOnCondition;
                break;
            }
            break;
        }
    }
    return onCondition;
};
