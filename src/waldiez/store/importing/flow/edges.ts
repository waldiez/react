import { Edge } from "@xyflow/react";

import { WaldiezSourceEdgeData } from "@waldiez/models";

export const getFlowEdges = (data: { [key: string]: unknown }) => {
    const edges: Edge[] = [];
    if ("edges" in data && Array.isArray(data.edges)) {
        data.edges.forEach((element: any) => {
            if (
                "id" in element &&
                "type" in element &&
                "source" in element &&
                "target" in element &&
                typeof element.id === "string" &&
                typeof element.type === "string" &&
                typeof element.source === "string" &&
                typeof element.target === "string" &&
                ["chat", "nested", "group", "hidden"].includes(element.type)
            ) {
                const edge = element as Edge;
                const edgeData = WaldiezSourceEdgeData.fromJSON({
                    ...edge.data,
                    sender: data.source,
                    recipient: data.target,
                });
                edge.animated = element.type === "nested";
                edge.data = { ...edgeData };
                edges.push(edge);
            }
        });
    }
    return edges;
};
