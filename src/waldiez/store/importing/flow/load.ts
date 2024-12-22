import { Edge, Node } from "@xyflow/react";

import { WaldiezNodeType } from "@waldiez/models";
import { FlowStore } from "@waldiez/store/flow";
import { ImportedFlow, ThingsToImport } from "@waldiez/store/importing/types";

export const loadFlow: (
    items: ThingsToImport,
    currentFlow: ImportedFlow,
    newFlow: ImportedFlow,
    typeShown: WaldiezNodeType,
) => ImportedFlow = (items, currentFlow, newFlow, typeShown) => {
    let mergedFlow: ImportedFlow = items.override ? { ...newFlow, nodes: [], edges: [] } : { ...currentFlow };

    if (items.everything) {
        // either override everything or merge everything
        mergedFlow = items.override
            ? newFlow
            : {
                  ...mergedFlow,
                  name: FlowStore.mergeFlowName(
                      currentFlow.name,
                      newFlow.name,
                      currentFlow.nodes,
                      currentFlow.edges,
                  ),
                  description: FlowStore.mergeFlowDescription(
                      currentFlow.description,
                      newFlow.description,
                      currentFlow.nodes,
                      currentFlow.edges,
                  ),
                  tags: FlowStore.mergeTags(currentFlow.tags, newFlow.tags),
                  requirements: FlowStore.mergeRequirements(currentFlow.requirements, newFlow.requirements),
                  nodes: FlowStore.mergeNodes(currentFlow.nodes, newFlow.nodes, typeShown),
                  edges: FlowStore.mergeEdges(currentFlow.nodes, currentFlow.edges, newFlow.edges),
              };
    } else {
        // selectively override or merge
        if (items.name) {
            mergedFlow.name = newFlow.name;
        }
        if (items.description) {
            mergedFlow.description = newFlow.description;
        }
        if (items.tags) {
            mergedFlow.tags = FlowStore.mergeTags(currentFlow.tags, newFlow.tags);
        }
        if (items.requirements) {
            mergedFlow.requirements = FlowStore.mergeRequirements(
                currentFlow.requirements,
                newFlow.requirements,
            );
        }
        const itemNodes: Node[] = [...items.nodes.models, ...items.nodes.skills, ...items.nodes.agents];
        const itemNodeIds: string[] = itemNodes.map(node => node.id);
        const newFlowNodesToUse = newFlow.nodes.filter(node => itemNodeIds.includes(node.id));
        const mergedNodes: Node[] = items.override
            ? newFlowNodesToUse
            : FlowStore.mergeNodes(currentFlow.nodes, newFlowNodesToUse, typeShown);
        mergedFlow.nodes = mergedNodes;
        const mergedEdges: Edge[] = items.override
            ? newFlow.edges
            : FlowStore.mergeEdges(mergedNodes, currentFlow.edges, newFlow.edges);
        mergedFlow.edges = mergedEdges;
    }

    return mergedFlow;
};
