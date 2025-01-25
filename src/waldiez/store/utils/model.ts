/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { typeOfGet, typeOfSet } from "@waldiez/store/types";
import { reArrangeNodes } from "@waldiez/store/utils/common";

export const reArrangeModels = (get: typeOfGet, set: typeOfSet) => {
    const nodes = reArrangeNodes(get().nodes, get().flowId, "model", get().rfInstance);
    set({
        nodes,
        updatedAt: new Date().toISOString(),
    });
    return nodes;
};
