import {
    WaldiezEdge,
    WaldiezNodeAgent,
    WaldiezNodeAgentSwarmData,
    WaldiezSwarmOnCondition,
} from "@waldiez/models";

export const isAfterWork = (item: any) => {
    // recipientType: WaldiezSwarmAfterWorkRecipientType;
    // recipient: string | WaldiezSwarmAfterWorkOption;
    // WaldiezSwarmAfterWorkRecipientType = "agent" | "option" | "callable";
    // WaldiezSwarmAfterWorkOption = "TERMINATE" | "REVERT_TO_USER" | "STAY";
    if (!("recipientType" in item && "recipient" in item)) {
        return false;
    }
    const recipientType = item.recipientType;
    if (!["agent", "option", "callable"].includes(recipientType)) {
        return false;
    }
    if (recipientType === "agent") {
        if (typeof item.recipient !== "string") {
            return false;
        }
    } else if (recipientType === "option") {
        if (!["TERMINATE", "REVERT_TO_USER", "STAY"].includes(item.recipient)) {
            return false;
        }
    }
    return true;
};

export const getHandoffConditions = (
    id: string,
    agents: WaldiezNodeAgent[],
    agentConnections: {
        source: {
            nodes: WaldiezNodeAgent[];
            edges: WaldiezEdge[];
        };
        target: {
            nodes: WaldiezNodeAgent[];
            edges: WaldiezEdge[];
        };
    },
    agentData: WaldiezNodeAgentSwarmData,
) => {
    const basedOnConnections = getDefaultHandoffOnConditions(id, agents, agentConnections);
    const basedOnAgentData = agentData.handoffs.filter(handoff => !isAfterWork(handoff));
    if (basedOnAgentData.length > 0) {
        return mergeHandoffConditions(basedOnConnections, basedOnAgentData as WaldiezSwarmOnCondition[]);
    }
    return basedOnConnections;
};

const getDefaultHandoffOnConditions = (
    id: string,
    agents: WaldiezNodeAgent[],
    agentConnections: {
        source: {
            nodes: WaldiezNodeAgent[];
            edges: WaldiezEdge[];
        };
        target: {
            nodes: WaldiezNodeAgent[];
            edges: WaldiezEdge[];
        };
    },
) => {
    const onConditions: WaldiezSwarmOnCondition[] = [];
    // get the targets of the source agent that are swarm agents
    // these will be the "on condition" agent targets
    // get the targets of the source agent that are not swarm agents
    // these will be the "on condition" nested chat targets
    // give a determined order (to allow re-ordering)
    const swarmAgents = agents.filter(agent => agent.id !== id && agent.data.agentType === "swarm");
    const swarmTargets = agentConnections.target.nodes.filter(node =>
        swarmAgents.some(agent => agent.id === node.id),
    );
    const nonSwarmTargets = agentConnections.target.nodes.filter(node =>
        swarmAgents.every(agent => agent.id !== node.id),
    );
    const nonSwarmTargetsEdges = agentConnections.target.edges.filter(edge =>
        nonSwarmTargets.some(node => node.id === edge.target),
    );
    // create on conditions for swarm agents
    swarmTargets.forEach((target, index) => {
        onConditions.push({
            targetType: "agent",
            // tmp, we manage this when exporting (to avoid needing to also update edges)
            target: { id: target.id, label: target.data.label, isReply: false, order: index },
            condition: "false",
            available: null,
            availableCheckType: "none",
        });
    });
    const newOrderStart = swarmTargets.length;
    nonSwarmTargets.forEach((target, index) => {
        const edge = nonSwarmTargetsEdges.find(edge => edge.target === target.id);
        if (edge) {
            onConditions.push({
                targetType: "nested_chat",
                target: {
                    label: target.data.label,
                    id: edge.id,
                    isReply: false,
                    order: newOrderStart + index,
                },
                condition: "false",
                available: null,
                availableCheckType: "none",
            });
        }
    });
    return onConditions.sort((a, b) => (a.target as any).order - (b.target as any).order);
};

const mergeHandoffConditions = (
    basedOnConnections: WaldiezSwarmOnCondition[],
    basedOnAgentData: WaldiezSwarmOnCondition[],
) => {
    // defaultOnConditions have all the on conditions based on the connections
    // we only want to have the ones based on the connections
    // remove existing on conditions that are not in the connections
    // add new on conditions that are in the connections and not in the existing on conditions
    const onConditions: WaldiezSwarmOnCondition[] = [];
    const existingOnConditions = basedOnConnections.filter(condition =>
        basedOnAgentData.some(
            handoff =>
                handoff.targetType === condition.targetType &&
                (handoff.target as any).id === (condition.target as any).id,
        ),
    );
    const newOnConditions = basedOnConnections.filter(
        condition =>
            !basedOnAgentData.some(
                handoff =>
                    handoff.targetType === condition.targetType &&
                    (handoff.target as any).id === (condition.target as any).id,
            ),
    );
    onConditions.push(...existingOnConditions);
    onConditions.push(...newOnConditions);
    return onConditions.sort((a, b) => (a.target as any).order - (b.target as any).order);
};
