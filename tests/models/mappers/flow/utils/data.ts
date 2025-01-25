/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { WaldiezFlow, WaldiezFlowData } from "@waldiez/models";

const createdAt = new Date().toISOString();
const updatedAt = new Date().toISOString();

export const waldiezFlow: WaldiezFlow = {
    id: "wf-1",
    storageId: "wf-1",
    type: "flow",
    name: "Waldiez Flow",
    createdAt,
    updatedAt,
    data: new WaldiezFlowData(),
    tags: ["waldiez"],
    requirements: ["requirement1", "requirement2"],
    description: "Waldiez",
};
