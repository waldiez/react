import { Edge, EdgeChange, Node, NodeChange, ReactFlowInstance, Viewport } from "@xyflow/react";

import { WaldiezEdge, WaldiezNodeType } from "@waldiez/models";
import { useWaldiez } from "@waldiez/store";
import { getFlowRoot, showSnackbar } from "@waldiez/utils";

export const useFlowEvents = (flowId: string, selectedNodeType: WaldiezNodeType) => {
    const addModel = useWaldiez(s => s.addModel);
    const addSkill = useWaldiez(s => s.addSkill);
    const runner = useWaldiez(s => s.onRun);
    const onConvert = useWaldiez(s => s.onConvert);
    const setRfInstance = useWaldiez(s => s.setRfInstance);
    const handleNodesChange = useWaldiez(s => s.onNodesChange);
    const handleEdgesChange = useWaldiez(s => s.onEdgesChange);
    const handleEdgeDoubleClick = useWaldiez(s => s.onEdgeDoubleClick);
    const handleNodeDoubleClick = useWaldiez(s => s.onNodeDoubleClick);
    const handleViewportChange = useWaldiez(s => s.onViewportChange);
    const onFlowChanged = useWaldiez(s => s.onFlowChanged);
    const getAgents = useWaldiez(s => s.getAgents);
    const getFlowEdges = useWaldiez(s => s.getFlowEdges);
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
        handleEdgeDoubleClick(event, edge as WaldiezEdge);
    };
    const onNodeDoubleClick = (event: React.MouseEvent, node: Node) => {
        const target = event.target;
        if (target instanceof Element && target.tagName === "TEXTAREA") {
            return;
        }
        handleNodeDoubleClick(event, node);
    };
    const onViewportChange = (viewport: Viewport) => {
        handleViewportChange(viewport, selectedNodeType);
        // onFlowChanged();
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
    const convertToPy = () => {
        const flow = onFlowChanged();
        onConvert?.(JSON.stringify(flow), "py");
    };
    const convertToIpynb = () => {
        const flow = onFlowChanged();
        onConvert?.(JSON.stringify(flow), "ipynb");
    };
    const canRun = () => {
        const agentsCount = getAgents().length;
        if (agentsCount < 2) {
            const msg = agentsCount === 0 ? "No agents" : "Only one agent";
            showSnackbar(flowId, `${msg} found in the flow`, "error", undefined, 3000);
            return false;
        }
        const { used } = getFlowEdges();
        return used.length > 0;
    };
    const onRun = () => {
        if (typeof runner === "function") {
            if (runner) {
                if (canRun()) {
                    const flow = onFlowChanged();
                    if (flow) {
                        runner(JSON.stringify(flow));
                    }
                } else {
                    const openEditFlowButtonId = `edit-flow-${flowId}-sidebar-button`;
                    const openEditFlowButton = document.getElementById(openEditFlowButtonId);
                    if (openEditFlowButton) {
                        openEditFlowButton.click();
                    }
                }
            }
        }
    };
    return {
        convertToPy,
        convertToIpynb,
        onRun,
        onAddNode,
        onFlowInit,
        onNodesChange,
        onEdgesChange,
        onNodeDoubleClick,
        onEdgeDoubleClick,
        onViewportChange,
    };
};
