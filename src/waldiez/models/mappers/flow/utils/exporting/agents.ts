import { Node } from "@xyflow/react";

import {
    WaldiezNodeAgent,
    WaldiezNodeAgentAssistant,
    WaldiezNodeAgentGroupManager,
    WaldiezNodeAgentRagUser,
    WaldiezNodeAgentUserProxy,
} from "@waldiez/models";

export const getAgentNodes = (nodes: Node[]) => {
    const agentNodes = nodes.filter(node => node.type === "agent") as WaldiezNodeAgent[];
    const userAgentNodes = agentNodes.filter(
        node =>
            "data" in node &&
            typeof node.data === "object" &&
            node.data &&
            "agentType" in node.data &&
            node.data.agentType === "user",
    ) as WaldiezNodeAgentUserProxy[];
    const assistantAgentNodes = agentNodes.filter(
        node =>
            "data" in node &&
            typeof node.data === "object" &&
            node.data &&
            "agentType" in node.data &&
            node.data.agentType === "assistant",
    ) as WaldiezNodeAgentAssistant[];
    const managerNodes = agentNodes.filter(
        node =>
            "data" in node &&
            typeof node.data === "object" &&
            node.data &&
            "agentType" in node.data &&
            node.data.agentType === "manager",
    ) as WaldiezNodeAgentGroupManager[];
    const ragUserNodes = agentNodes.filter(
        node =>
            "data" in node &&
            typeof node.data === "object" &&
            node.data &&
            "agentType" in node.data &&
            node.data.agentType === "rag_user",
    ) as WaldiezNodeAgentRagUser[];
    return {
        agentNodes,
        userAgentNodes,
        assistantAgentNodes,
        managerNodes,
        ragUserNodes,
    };
};
