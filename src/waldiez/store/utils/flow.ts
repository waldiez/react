import { Edge, Node } from "@xyflow/react";

import { ImportedFlow, ThingsToImport, WaldiezNodeType } from "@waldiez/types";

export const mergeTags: (currentTags: string[], newTags: string[]) => string[] = (currentTags, newTags) => {
    return Array.from(new Set([...currentTags, ...newTags]));
};
export const mergeRequirements: (currentRequirements: string[], newRequirements: string[]) => string[] = (
    currentRequirements,
    newRequirements,
) => {
    return Array.from(new Set([...currentRequirements, ...newRequirements]));
};
export const mergeEdges: (currentNodes: Node[], currentEdges: Edge[], newEdges: Edge[]) => Edge[] = (
    currentNodes,
    currentEdges,
    newEdges,
) => {
    const isEmpty = currentNodes.length === 0 && currentEdges.length === 0;
    if (isEmpty) {
        return newEdges.map(edge => {
            const animated = edge.type === "nested";
            const hidden = edge.type === "hidden";
            return { ...edge, animated, hidden };
        });
    }
    const unorderedEdges = newEdges.map(edge => {
        return { ...edge, data: { ...edge.data, order: -1 } } as Edge;
    });
    const nonDuplicateEdges = unorderedEdges.filter(
        edge => !currentEdges.find(currentEdge => currentEdge.id === edge.id),
    );
    return [...currentEdges, ...nonDuplicateEdges].map(edge => {
        const animated = edge.type === "nested";
        const hidden = edge.type === "hidden";
        return { ...edge, animated, hidden };
    });
};
export const mergeNodes: (currentNodes: Node[], newNodes: Node[], typeShown: WaldiezNodeType) => Node[] = (
    currentNodes,
    newNodes,
    typeShown,
) => {
    const nonDuplicateNodes = newNodes.filter(
        node => !currentNodes.find(currentNode => currentNode.id === node.id),
    );
    return [...currentNodes, ...nonDuplicateNodes].map(node => {
        if (node.type === typeShown) {
            return { ...node, hidden: false };
        }
        return { ...node, hidden: true };
    });
};
export const mergeFlowName = (
    currentName: string,
    newName: string,
    currentNodes: Node[],
    currentEdges: Edge[],
) => {
    if (currentNodes.length === 0 && currentEdges.length === 0) {
        return newName;
    }
    return currentName;
};
export const mergeFlowDescription = (
    currentDescription: string,
    newDescription: string,
    currentNodes: Node[],
    currentEdges: Edge[],
) => {
    if (currentNodes.length === 0 && currentEdges.length === 0) {
        return newDescription;
    }
    return currentDescription;
};
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
                  name: mergeFlowName(currentFlow.name, newFlow.name, currentFlow.nodes, currentFlow.edges),
                  description: mergeFlowDescription(
                      currentFlow.description,
                      newFlow.description,
                      currentFlow.nodes,
                      currentFlow.edges,
                  ),
                  tags: mergeTags(currentFlow.tags, newFlow.tags),
                  requirements: mergeRequirements(currentFlow.requirements, newFlow.requirements),
                  isAsync: newFlow.isAsync ?? currentFlow.isAsync,
                  nodes: mergeNodes(currentFlow.nodes, newFlow.nodes, typeShown),
                  edges: mergeEdges(currentFlow.nodes, currentFlow.edges, newFlow.edges),
              };
    } else {
        selectivelyOverrideOrMergeFlow(items, currentFlow, newFlow, typeShown, mergedFlow);
    }

    return mergedFlow;
};

const selectivelyOverrideOrMergeFlow = (
    items: ThingsToImport,
    currentFlow: ImportedFlow,
    newFlow: ImportedFlow,
    typeShown: WaldiezNodeType,
    mergedFlow: ImportedFlow,
) => {
    if (items.name) {
        mergedFlow.name = newFlow.name;
    }
    if (items.description) {
        mergedFlow.description = newFlow.description;
    }
    if (items.tags) {
        mergedFlow.tags = mergeTags(currentFlow.tags, newFlow.tags);
    }
    if (items.requirements) {
        mergedFlow.requirements = mergeRequirements(currentFlow.requirements, newFlow.requirements);
    }
    if (items.isAsync) {
        mergedFlow.isAsync = newFlow.isAsync ?? currentFlow.isAsync;
    }
    const itemNodes: Node[] = [...items.nodes.models, ...items.nodes.skills, ...items.nodes.agents];
    const itemNodeIds: string[] = itemNodes.map(node => node.id);
    const newFlowNodesToUse = newFlow.nodes.filter(node => itemNodeIds.includes(node.id));
    const mergedNodes: Node[] = items.override
        ? newFlowNodesToUse
        : mergeNodes(currentFlow.nodes, newFlowNodesToUse, typeShown);
    mergedFlow.nodes = mergedNodes;
    const mergedEdges: Edge[] = items.override
        ? newFlow.edges
        : mergeEdges(mergedNodes, currentFlow.edges, newFlow.edges);
    mergedFlow.edges = mergedEdges;
};
