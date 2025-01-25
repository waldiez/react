/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { WaldiezAgentData, WaldiezAgentType, WaldiezNodeAgentType } from "@waldiez/models/Agent/Common";
import { capitalize, getId } from "@waldiez/utils";

/**
 * Waldiez Agent.
 * @param id - The id of the agent
 * @param type - The type of the node in a graph (agent)
 * @param agentType - The type of the agent ("user" | "assistant" | "manager" | "rag_user" | "swarm")
 * @param name - The name of the agent
 * @param description - The description of the agent
 * @param tags - The tags of the agent
 * @param requirements - The requirements of the agent
 * @param createdAt - The creation date of the agent
 * @param updatedAt - The update date of the agent
 * @param data - The data of the agent. See {@link WaldiezAgentData}
 */
export class WaldiezAgent {
    id: string;
    type = "agent";
    agentType: WaldiezNodeAgentType;
    name: string;
    description: string;
    tags: string[];
    requirements: string[];
    createdAt: string;
    updatedAt: string;
    data: WaldiezAgentData;
    rest?: { [key: string]: unknown };

    constructor(props: {
        id: string;
        agentType: WaldiezNodeAgentType;
        name: string;
        description: string;
        tags: string[];
        requirements: string[];
        createdAt: string;
        updatedAt: string;
        data: WaldiezAgentData;
        rest?: { [key: string]: unknown };
    }) {
        this.id = props.id;
        this.agentType = props.agentType;
        this.name = props.name;
        this.description = props.description;
        this.tags = props.tags;
        this.requirements = props.requirements;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.data = props.data;
        this.rest = props.rest;
    }

    static create(agentType: WaldiezAgentType | "swarm_container"): WaldiezAgent {
        const name = capitalize(agentType.replace("_", " "));
        let description = `A new ${name}`;
        if (agentType !== "swarm_container") {
            description += " agent";
        }
        const agent = new WaldiezAgent({
            id: `wa-${getId()}`,
            agentType,
            name,
            description,
            tags: [],
            requirements: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            data: new WaldiezAgentData(),
        });
        updateAgentDataProps(agent, agentType);
        return agent;
    }
}

const updateAgentDataProps = (agent: WaldiezAgent, agentType: WaldiezAgentType | "swarm_container") => {
    if (["user", "rag_user"].includes(agentType)) {
        agent.data.humanInputMode = "ALWAYS";
    }
    if (agentType === "swarm_container") {
        addSwarmContainerProps(agent.data);
    }
    if (agentType === "swarm") {
        addSwarmProps(agent.data);
    }
};

const addSwarmContainerProps = (agentData: WaldiezAgentData) => {
    (agentData as any).initialAgent = null;
    (agentData as any).maxRounds = 20;
    (agentData as any).afterWork = null;
    (agentData as any).contextVariables = {};
};

const addSwarmProps = (agentData: WaldiezAgentData) => {
    (agentData as any).functions = [];
    (agentData as any).updateAgentStateBeforeReply = [];
    (agentData as any).handoffs = [];
    (agentData as any).isInitial = false;
};
