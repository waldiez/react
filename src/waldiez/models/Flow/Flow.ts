/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { nanoid } from "nanoid";

import { WaldiezFlowData } from "@waldiez/models/Flow/FlowData";

/**
 * Waldiez Flow
 * @param type - The type (flow)
 * @param id - The ID
 * @param name - The name of the flow
 * @param description - The description of the flow
 * @param tags - The tags
 * @param requirements - The requirements
 * @param data - The data
 * @param storageId - The storage ID
 * @param createdAt - The created at date
 * @param updatedAt - The updated at date
 * @param rest - Any additional properties
 * @see {@link WaldiezFlowData}
 */
export class WaldiezFlow {
    type = "flow";
    id: string;
    name: string;
    description: string;
    tags: string[];
    requirements: string[];
    data: WaldiezFlowData;
    storageId: string;
    createdAt: string;
    updatedAt: string;
    rest?: { [key: string]: unknown } = {};

    constructor(props: {
        id: string;
        name: string;
        description: string;
        tags: string[];
        requirements: string[];
        data: WaldiezFlowData;
        storageId: string;
        createdAt: string;
        updatedAt: string;
        rest?: { [key: string]: unknown };
    }) {
        this.id = props.id;
        this.name = props.name;
        this.description = props.description;
        this.tags = props.tags;
        this.requirements = props.requirements;
        this.data = props.data;
        this.storageId = props.storageId;
        this.createdAt = props.createdAt;
        this.updatedAt = props.updatedAt;
        this.rest = props.rest || {};
    }
}
const getFlowId = () => {
    return `wf-${new Date().getTime()}${nanoid()}}`;
};

const aFlowId = getFlowId();

export const emptyFlow: WaldiezFlow = {
    type: "flow",
    id: aFlowId,
    storageId: aFlowId,
    name: "Waldiez Flow",
    description: "A waldiez flow",
    tags: [],
    requirements: [],
    data: {
        agents: {
            users: [],
            assistants: [],
            managers: [],
            rag_users: [],
            swarm_agents: [],
            reasoning_agents: [],
        },
        models: [],
        skills: [],
        chats: [],
        isAsync: false,
        cacheSeed: 41,
        nodes: [],
        edges: [],
        viewport: { zoom: 1, x: 0, y: 0 },
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    rest: {},
};
