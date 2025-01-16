import {
    WaldiezEdge,
    WaldiezNodeAgent,
    WaldiezNodeAgentSwarm,
    WaldiezNodeAgentSwarmData,
    WaldiezSwarmAfterWork,
    WaldiezSwarmHandoff,
    WaldiezSwarmOnCondition,
    WaldiezSwarmOnConditionAvailableCheckType,
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
        if (!["TERMINATE", "REVERT_TO_USER", "STAY", "SWARM_MANAGER"].includes(item.recipient)) {
            return false;
        }
    }
    return true;
};

export const getSwarmAgentHandoffs = (
    node: WaldiezNodeAgentSwarm,
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
    agentNodes: WaldiezNodeAgent[],
    swarmAgentNodes: WaldiezNodeAgent[],
    updatedEdges: WaldiezEdge[],
) => {
    const agentHandoffs: WaldiezSwarmHandoff[] = getNestedChatOnConditionHandoffs(
        agentConnections,
        node.data,
    );
    let gotAfterWork = false;
    const swarmTargets = agentConnections.target.nodes.filter(node =>
        swarmAgentNodes.some(agent => agent.id === node.id),
    );
    const swarmTargetEdges = agentConnections.target.edges.filter(
        edge => edge.type === "swarm" && swarmTargets.some(target => target.id === edge.target),
    );
    swarmTargetEdges.forEach(edge => {
        const updatedEdge = updatedEdges.find(updatedEdge => updatedEdge.id === edge.id);
        if (!updatedEdge) {
            return;
        }
        const { afterWork, onCondition } = getSwarmAgentHandoff(updatedEdge, agentNodes);
        if (afterWork) {
            gotAfterWork = true;
            agentHandoffs.push(afterWork);
        }
        if (onCondition) {
            agentHandoffs.push(onCondition);
        }
    });
    if (!gotAfterWork) {
        const afterWork = node.data.handoffs.find(handoff => isAfterWork(handoff));
        if (afterWork) {
            agentHandoffs.push(afterWork);
        }
    }
    return agentHandoffs;
};

export const getNestedChatOnConditionHandoffs = (
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
    // only the ones that connect/handoff to non-swarm agents
    const onConditions: WaldiezSwarmOnCondition[] = [];

    const nonSwarmTargets = agentConnections.target.nodes.filter(node => node.data.agentType !== "swarm");
    nonSwarmTargets.forEach(target => {
        const edge = agentConnections.target.edges.find(edge => edge.target === target.id);
        if (edge) {
            let handoff: WaldiezSwarmOnCondition | undefined;
            try {
                handoff = agentData.handoffs.find(
                    handoff =>
                        !isAfterWork(handoff) &&
                        ((handoff as WaldiezSwarmOnCondition).target as any).id === edge.id,
                ) as WaldiezSwarmOnCondition;
            } catch (_) {
                handoff = undefined;
            }
            if (handoff) {
                onConditions.push(handoff);
            } else {
                onConditions.push({
                    targetType: "nested_chat",
                    target: {
                        label: target.data.label,
                        id: edge.id,
                        isReply: false,
                        order: onConditions.length,
                    },
                    condition: edge.data?.description || `transfer_to_${target.data.label}`,
                    available: {
                        type: edge.data?.available.type || "none",
                        value: edge.data?.available.value || null,
                    },
                });
            }
        }
    });
    return onConditions.sort((a, b) => (a.target as any).order - (b.target as any).order);
};

const getSwarmAgentHandoff: (
    edge: WaldiezEdge,
    agentNodes: WaldiezNodeAgent[],
) => { afterWork: WaldiezSwarmAfterWork | null; onCondition: WaldiezSwarmOnCondition | null } = (
    edge,
    agentNodes,
) => {
    const targetNode = agentNodes.find(node => node.id === edge.target);
    if (!targetNode || !edge.data) {
        return {
            afterWork: null,
            onCondition: null,
        };
    }
    const afterWork = edge.data.afterWork;
    if (afterWork) {
        return {
            afterWork,
            onCondition: null,
        };
    }
    const onCondition = getOnConditionFromEdge(edge, targetNode);
    return {
        afterWork: null,
        onCondition: {
            targetType: "agent",
            target: targetNode.id,
            condition: onCondition.condition,
            available: {
                type: onCondition.availableCheckType,
                value: onCondition.available,
            },
        },
    };
};

const getOnConditionFromEdge = (edge: WaldiezEdge, targetNode: WaldiezNodeAgent) => {
    let condition = `transfer_to_${targetNode.data.label}`;
    if (
        edge.data?.description &&
        edge.data.description !== "" &&
        edge.data.description.toLowerCase() !== "new connection"
    ) {
        condition = edge.data.description;
    }
    const availableCheckType: WaldiezSwarmOnConditionAvailableCheckType = "none";
    const available = edge.data?.available.type === "none" ? null : edge.data?.available.value;
    if (!available) {
        return { condition, available: null, availableCheckType };
    }
    return { condition, available, availableCheckType };
};
