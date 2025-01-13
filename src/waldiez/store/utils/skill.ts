import { typeOfGet, typeOfSet } from "@waldiez/store/types";
import { reArrangeNodes } from "@waldiez/store/utils/common";

export const reArrangeSkills = (get: typeOfGet, set: typeOfSet) => {
    const nodes = reArrangeNodes(get().nodes, get().flowId, "skill", get().rfInstance);
    set({
        nodes,
        updatedAt: new Date().toISOString(),
    });
    return nodes;
};
