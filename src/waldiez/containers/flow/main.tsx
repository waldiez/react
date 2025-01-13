import { Background, BackgroundVariant, Controls, Panel, ReactFlow } from "@xyflow/react";

import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaPython } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import { SiJupyter } from "react-icons/si";

import {
    WaldiezEdgeChat,
    WaldiezEdgeGroup,
    WaldiezEdgeHidden,
    WaldiezEdgeNested,
    WaldiezEdgeSwarm,
} from "@waldiez/containers/edges";
import { useDnD, useFlowEvents, useKeys } from "@waldiez/containers/flow/hooks";
import { UserInputModal } from "@waldiez/containers/flow/modals";
import { WaldiezNodeAgentView, WaldiezNodeModelView, WaldiezNodeSkillView } from "@waldiez/containers/nodes";
import { SideBar } from "@waldiez/containers/sidebar";
import { useWaldiez } from "@waldiez/store";
import { useWaldiezTheme } from "@waldiez/theme";
import { WaldiezNodeType } from "@waldiez/types";

type WaldiezFlowViewProps = {
    inputPrompt?: { previousMessages: string[]; prompt: string } | null;
};

const edgeTypes = {
    chat: WaldiezEdgeChat,
    group: WaldiezEdgeGroup,
    hidden: WaldiezEdgeHidden,
    nested: WaldiezEdgeNested,
    swarm: WaldiezEdgeSwarm,
};

const nodeTypes = {
    agent: WaldiezNodeAgentView,
    model: WaldiezNodeModelView,
    skill: WaldiezNodeSkillView,
};

export const WaldiezFlowView = (props: WaldiezFlowViewProps) => {
    const { inputPrompt } = props;
    const [selectedNodeType, setSelectedNodeType] = useState<WaldiezNodeType>("agent");
    const flowId = useWaldiez(s => s.flowId);
    const nodes = useWaldiez(s => s.nodes);
    const edges = useWaldiez(s => s.edges);
    const viewport = useWaldiez(s => s.viewport);
    const onUserInput = useWaldiez(s => s.onUserInput);
    const showNodes = useWaldiez(s => s.showNodes);
    const runner = useWaldiez(s => s.onRun);
    const onConvert = useWaldiez(s => s.onConvert);
    const onFlowChanged = useWaldiez(s => s.onFlowChanged);
    const onReconnect = useWaldiez(s => s.onReconnect);
    const onSave = useWaldiez(s => s.onSave);
    const { onKeyDown } = useKeys(flowId, onSave);
    const {
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
    } = useFlowEvents(flowId, selectedNodeType);
    useEffect(() => {
        showNodes("agent");
        // setSelectedNodeType("agent");
    }, []);
    const onNewAgent = () => {
        setSelectedNodeType("agent");
        showNodes("agent");
        onFlowChanged();
    };
    const { onDragOver, onDrop } = useDnD(onNewAgent);
    const includeRunButton = typeof runner === "function";
    const includeConvertIcons = typeof onConvert === "function";
    const { isDark } = useWaldiezTheme();
    const colorMode = isDark ? "dark" : "light";
    const onTypeShownChange = (nodeType: WaldiezNodeType) => {
        setSelectedNodeType(nodeType);
        showNodes(nodeType);
    };
    return (
        <div
            className={`flow-wrapper ${colorMode}`}
            id={`rf-root-${flowId}`}
            data-testid={`rf-root-${flowId}`}
        >
            <div className="flow-main">
                <SideBar typeShown={selectedNodeType} onTypeShownChange={onTypeShownChange} />
                <div className="react-flow-wrapper" data-testid={`rf-wrapper-${flowId}`}>
                    <ReactFlow
                        id={flowId}
                        nodeTypes={nodeTypes}
                        edgeTypes={edgeTypes}
                        onInit={onFlowInit}
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        deleteKeyCode={[]}
                        onKeyDown={onKeyDown}
                        onNodeDoubleClick={onNodeDoubleClick}
                        onEdgeDoubleClick={onEdgeDoubleClick}
                        onReconnect={onReconnect}
                        colorMode={colorMode}
                        elevateNodesOnSelect={true}
                        elevateEdgesOnSelect={true}
                        snapToGrid={true}
                        defaultViewport={viewport}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onViewportChange={onViewportChange}
                        connectOnClick
                        zoomOnDoubleClick={false}
                        // nodesDraggable
                        // zoomOnScroll
                        // panOnDrag
                        // debug
                    >
                        <Controls showInteractive={true} />
                        {selectedNodeType !== "agent" && (
                            <Panel position="top-left">
                                <button
                                    type="button"
                                    className="editor-nav-action add-node currentColor"
                                    onClick={onAddNode}
                                    title={`Add ${selectedNodeType}`}
                                    data-testid={`add-${selectedNodeType}-node`}
                                >
                                    <FaPlusCircle />
                                    Add {selectedNodeType}
                                </button>
                            </Panel>
                        )}
                        {(includeRunButton || includeConvertIcons) && (
                            <Panel position="top-right">
                                <div className="editor-nav-actions">
                                    {includeConvertIcons && (
                                        <button
                                            type="button"
                                            className="editor-nav-action to-python"
                                            onClick={convertToPy}
                                            title="Convert to Python"
                                            data-testid={`convert-${flowId}-to-py`}
                                        >
                                            <FaPython />
                                        </button>
                                    )}
                                    {includeConvertIcons && (
                                        <button
                                            type="button"
                                            className="editor-nav-action to-jupyter"
                                            onClick={convertToIpynb}
                                            title="Convert to Jupyter Notebook"
                                            data-testid={`convert-${flowId}-to-ipynb`}
                                        >
                                            <SiJupyter />
                                        </button>
                                    )}
                                    {includeRunButton && (
                                        <button
                                            type="button"
                                            className="editor-nav-action"
                                            onClick={onRun}
                                            title="Run flow"
                                            data-testid={`run-${flowId}`}
                                        >
                                            <FaCirclePlay />
                                        </button>
                                    )}
                                </div>
                            </Panel>
                        )}
                        <Controls />
                        <div className="hidden" data-testid={`drop-area-${flowId}`} />
                        <Background variant={BackgroundVariant.Dots} />
                    </ReactFlow>
                </div>
            </div>
            {onUserInput && inputPrompt && (
                <UserInputModal
                    flowId={flowId}
                    isOpen={inputPrompt !== null}
                    onUserInput={onUserInput}
                    inputPrompt={inputPrompt}
                />
            )}
        </div>
    );
};
