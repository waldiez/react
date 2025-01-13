import { Node } from "@xyflow/react";

import { WaldiezAgent, WaldiezAgentSwarmContainerData, WaldiezFlow } from "@waldiez/models";
import { agentMapper } from "@waldiez/models/mappers/agent";
import { getRestFromJSON } from "@waldiez/models/mappers/common";

export const getSwarmContainer = (flow: WaldiezFlow, nodes: Node[]) => {
    const agentData = new WaldiezAgentSwarmContainerData();
    const rest: any = { position: { x: 50, y: 50 } };
    // check if there is a swarm_container in the nodes
    // (to also get props like "width", "height", "selected", "isSelected", ...)
    const existingSwarmContainer = nodes.find(
        node =>
            node.type === "agent" &&
            "data" in node &&
            typeof node.data === "object" &&
            node.data &&
            "agentType" in node.data &&
            node.data.agentType === "swarm_container",
    );
    if (existingSwarmContainer) {
        const containerRest = getRestFromJSON(existingSwarmContainer, [
            "id",
            "parentId",
            "type",
            "name",
            "description",
            "tags",
            "requirements",
            "createdAt",
            "updatedAt",
            "data",
        ]);
        Object.keys(containerRest).forEach(key => {
            rest[key] = containerRest[key];
        });
    }
    const agent = new WaldiezAgent({
        id: `swarm-container-${flow.id}`,
        name: "Swarm Container",
        description: "Swarm Container",
        tags: [],
        requirements: [],
        createdAt: flow.createdAt,
        updatedAt: flow.updatedAt,
        agentType: "swarm_container",
        data: agentData,
        rest,
    });
    const swarmNode = agentMapper.asNode(agent);
    return swarmNode;
};
