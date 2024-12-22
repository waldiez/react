import { Edge, Node } from "@xyflow/react";

import {
    WaldiezAgentNodeType,
    WaldiezSourceAssistantData,
    WaldiezSourceGroupManagerData,
    WaldiezSourceModelData,
    WaldiezSourceRagUserData,
    WaldiezSourceSkillData,
    WaldiezSourceUserProxyData,
} from "@waldiez/models";
import { getNodeMeta } from "@waldiez/store/importing/common";
import { getAgentNestedChats } from "@waldiez/store/importing/flow/nested";

export const getFlowNodes = (data: { [key: string]: unknown }) => {
    const nodes: Node[] = [];
    if ("nodes" in data && Array.isArray(data.nodes)) {
        data.nodes.forEach((element: any) => {
            if (
                "id" in element &&
                "type" in element &&
                typeof element.id === "string" &&
                typeof element.type === "string" &&
                ["agent", "model", "skill"].includes(element.type)
            ) {
                const node = element as Node;
                node.data = {};
                // backwards compat (if parentId was in `Node` and not in `Node.data`)
                if (
                    element.type === "agent" &&
                    "parentId" in element &&
                    typeof element.parentId === "string"
                ) {
                    node.data.parentId = element.parentId;
                }
                nodes.push(node);
            }
        });
    }
    return nodes;
};

export const getFlowAgents = (nodes: Node[], edges: Edge[], data: { [key: string]: unknown }) => {
    if ("agents" in data && typeof data.agents === "object") {
        const agents = data.agents as {
            [key: string]: unknown;
        };
        getFlowExportedNodes(nodes, edges, agents, "agent", "user");
        getFlowExportedNodes(nodes, edges, agents, "agent", "assistant");
        getFlowExportedNodes(nodes, edges, agents, "agent", "manager");
        getFlowExportedNodes(nodes, edges, agents, "agent", "rag_user");
    }
};

export const getNodeData = (
    elementNode: any,
    nodeType: "agent" | "model" | "skill",
    name: string,
    description: string,
    tags: string[],
    requirements: string[],
    createdAt: string,
    updatedAt: string,
    agentType?: WaldiezAgentNodeType,
) => {
    let elementData: any;
    switch (nodeType) {
        case "model":
            elementData = WaldiezSourceModelData.fromJSON(
                elementNode.data,
                name,
                description,
                tags,
                requirements,
                createdAt,
                updatedAt,
            );
            break;
        case "skill":
            elementData = WaldiezSourceSkillData.fromJSON(
                elementNode.data,
                name,
                description,
                tags,
                requirements,
                createdAt,
                updatedAt,
            );
            break;
        case "agent":
            elementData = getAgentNodeData(name, elementNode, agentType);
            break;
    }
    return elementData;
};

export const getFlowExportedNodes = (
    flowNodes: Node[],
    flowEdges: Edge[],
    nodeData: { [key: string]: unknown },
    nodeType: "agent" | "model" | "skill",
    agentType?: WaldiezAgentNodeType,
) => {
    const nodeTypes = nodeType !== "agent" ? `${nodeType}s` : `${agentType}s`;
    if (nodeTypes in nodeData && Array.isArray(nodeData[nodeTypes])) {
        nodeData[nodeTypes].forEach((element: any) => {
            updateFlowExportedNode(element, flowNodes, flowEdges, nodeType, agentType);
        });
    }
};

const updateFlowExportedNode = (
    element: any,
    flowNodes: Node[],
    flowEdges: Edge[],
    nodeType: "agent" | "model" | "skill",
    agentType?: WaldiezAgentNodeType,
) => {
    if (
        "id" in element &&
        "data" in element &&
        typeof element.id === "string" &&
        typeof element.data === "object" &&
        element.data
    ) {
        const nodeData = getNodeDataToImport(element, flowEdges, flowNodes, nodeType, agentType);
        if (nodeType === "agent") {
            nodeData.agentType = agentType;
        }
        const name = nodeData.name as string;
        delete nodeData.name;
        const node = flowNodes.find(n => n.id === element.id);
        if (node) {
            node.data = { ...nodeData, label: name };
            if (nodeType === "agent") {
                const parentId = getImportedNodeParentId(element, node, flowNodes);
                node.data.parentId = parentId;
            }
            node.type = nodeType;
        }
    }
};

const getNodeDataToImport = (
    element: any,
    flowEdges: Edge[],
    flowNodes: Node[],
    nodeType: "agent" | "model" | "skill",
    agentType?: WaldiezAgentNodeType,
) => {
    const { id, name, description, tags, requirements, createdAt, updatedAt } = getNodeMeta(
        element,
        nodeType,
        agentType,
    );
    if ("parentId" in element && typeof element.parentId === "string") {
        element.data.parentId = element.parentId;
    }
    const elementNodeData = {
        data: {
            ...element.data,
            description,
            tags,
            requirements,
            createdAt,
            updatedAt,
        },
        name,
        label: name,
    } as { [key: string]: unknown };
    if (nodeType === "agent") {
        elementNodeData.agentType = agentType;
    }
    if (nodeType === "agent" && agentType !== "manager" && id) {
        (elementNodeData.data as any).nestedChats = getAgentNestedChats(
            id,
            elementNodeData,
            flowEdges,
            flowNodes,
        );
    }
    const elementData = getNodeData(
        elementNodeData,
        nodeType,
        name,
        description,
        tags,
        requirements,
        createdAt,
        updatedAt,
        agentType,
    );
    const nodeData = {
        ...elementData,
        name,
        description,
        tags,
        requirements,
        createdAt,
        updatedAt,
    } as { [key: string]: unknown };
    return nodeData;
};

const getImportedNodeParentId = (element: any, node: Node, flowNodes: Node[]) => {
    let parentId: string | null = null;
    // search in: element.parentId, element.data.parentId, node.parentId, node.data.parentId
    ["parentId", "data.parentId"].forEach(key => {
        if (key in element && typeof element[key] === "string") {
            parentId = element[key];
        } else {
            if (typeof node.parentId === "string") {
                parentId = node.parentId;
                node.parentId = undefined;
            } else if ("parentId" in node.data && typeof node.data.parentId === "string") {
                parentId = node.data.parentId;
            }
        }
    });
    if (node.expandParent) {
        node.expandParent = undefined;
    }
    if (node.extent === "parent") {
        node.extent = undefined;
    }
    if (parentId) {
        const parent = flowNodes.find(n => n.id === parentId) as any;
        if (!parent) {
            return null;
        }
        return parent.id;
    }
    return null;
};

const getAgentNodeData = (name: string, elementNodeData: any, agentType?: WaldiezAgentNodeType) => {
    let elementData: any;
    if ("parentId" in elementNodeData && typeof elementNodeData.parentId === "string") {
        elementNodeData.data.parentId = elementNodeData.parentId;
    }
    switch (agentType) {
        case "user":
            elementData = WaldiezSourceUserProxyData.fromJSON(elementNodeData.data, agentType, name);
            break;
        case "assistant":
            elementData = WaldiezSourceAssistantData.fromJSON(elementNodeData.data, agentType, name);
            break;
        case "manager":
            elementData = WaldiezSourceGroupManagerData.fromJSON(elementNodeData.data, name);
            break;
        case "rag_user":
            elementData = WaldiezSourceRagUserData.fromJSON(elementNodeData.data, name);
            break;
    }
    return elementData;
};
