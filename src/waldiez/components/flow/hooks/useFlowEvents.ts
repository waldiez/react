import { Edge, EdgeChange, Node, NodeChange, ReactFlowInstance, Viewport } from "@xyflow/react";

import { WaldiezNodeType } from "@waldiez/models";
import { useWaldiezContext } from "@waldiez/store";
import { getFlowRoot } from "@waldiez/utils";

export const useFlowEvents = (flowId: string, selectedNodeType: WaldiezNodeType) => {
    const setRfInstance = useWaldiezContext(selector => selector.setRfInstance);
    const onFlowChanged = useWaldiezContext(selector => selector.onFlowChanged);
    const handleNodesChange = useWaldiezContext(selector => selector.onNodesChange);
    const handleEdgesChange = useWaldiezContext(selector => selector.onEdgesChange);
    const handleViewportChange = useWaldiezContext(selector => selector.onViewportChange);
    const handleNodeDoubleClick = useWaldiezContext(selector => selector.onNodeDoubleClick);
    const handleEdgeDoubleClick = useWaldiezContext(selector => selector.onEdgeDoubleClick);
    const addModel = useWaldiezContext(selector => selector.addModel);
    const addSkill = useWaldiezContext(selector => selector.addSkill);
    const onFlowInit = (instance: ReactFlowInstance) => {
        setRfInstance(instance);
        const rootDiv = getFlowRoot(flowId);
        if (rootDiv) {
            const viewport = instance.getViewport();
            instance.fitView({
                minZoom: viewport.zoom,
                maxZoom: viewport.zoom,
                includeHiddenNodes: false,
                padding: 10,
                duration: 100,
            });
        }
    };
    const onNodesChange = (changes: NodeChange<Node>[]) => {
        handleNodesChange(changes);
        // onFlowChanged();
    };
    const onEdgesChange = (changes: EdgeChange<Edge>[]) => {
        handleEdgesChange(changes);
        onFlowChanged();
    };
    const onEdgeDoubleClick = (event: React.MouseEvent, edge: Edge) => {
        const target = event.target;
        if (target instanceof Element && target.tagName === "TEXTAREA") {
            return;
        }
        handleEdgeDoubleClick(event, edge);
    };
    const onNodeDoubleClick = (event: React.MouseEvent, node: Node) => {
        const target = event.target;
        if (target instanceof Element && target.tagName === "TEXTAREA") {
            return;
        }
        handleNodeDoubleClick(event, node);
    };
    const onAddNode = () => {
        if (selectedNodeType === "model") {
            addModel();
            onFlowChanged();
        } else if (selectedNodeType === "skill") {
            addSkill();
            onFlowChanged();
        }
    };
    const onViewportChange = (viewport: Viewport) => {
        handleViewportChange(viewport, selectedNodeType);
        // onFlowChanged();
    };
    return {
        onAddNode,
        onFlowInit,
        onNodesChange,
        onEdgesChange,
        onNodeDoubleClick,
        onEdgeDoubleClick,
        onViewportChange,
    };
};
