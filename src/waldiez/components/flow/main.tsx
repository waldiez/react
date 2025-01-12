import { Background, BackgroundVariant, Controls, Panel, ReactFlow } from "@xyflow/react";

import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaPython } from "react-icons/fa6";
import { FaCirclePlay } from "react-icons/fa6";
import { SiJupyter } from "react-icons/si";

import { useDnD, useFlowEvents, useKeys, useRun, useTheme } from "@waldiez/components/flow/hooks";
import { UserInputModal } from "@waldiez/components/flow/modals";
import { edgeTypes, nodeTypes } from "@waldiez/components/flow/rfTypes";
import { WaldiezFlowProps } from "@waldiez/components/flow/types";
import { SideBar } from "@waldiez/components/sidebar";
import { WaldiezNodeType } from "@waldiez/models";
import { useWaldiezContext } from "@waldiez/store";
import { selector } from "@waldiez/store/selector";
import { isDarkMode, setDarkMode } from "@waldiez/theme";

export const WaldiezFlow = (props: WaldiezFlowProps) => {
    const { flowId, storageId, onRun: runner, inputPrompt, onUserInput, onConvert, onSave } = props;
    const store = useWaldiezContext(selector);
    const showNodes = useWaldiezContext(selector => selector.showNodes);
    const onFlowChanged = useWaldiezContext(selector => selector.onFlowChanged);
    const includeRunButton = typeof runner === "function";
    const includeConvertIcons = typeof onConvert === "function";
    const { isDark, onThemeToggle } = useTheme(flowId, storageId);
    const { onKeyDown } = useKeys(flowId, onSave);
    const [selectedNodeType, setSelectedNodeType] = useState<WaldiezNodeType>("agent");
    const {
        onAddNode,
        onFlowInit,
        onNodesChange,
        onEdgesChange,
        onNodeDoubleClick,
        onEdgeDoubleClick,
        onViewportChange,
    } = useFlowEvents(flowId, selectedNodeType);
    const { onRun } = useRun(flowId, runner);
    const onNewAgent = () => {
        if (selectedNodeType !== "agent") {
            setSelectedNodeType("agent");
        }
        showNodes("agent");
        onFlowChanged();
    };
    const { onDragOver, onDrop } = useDnD(onNewAgent);
    const onTypeShownChange = (nodeType: WaldiezNodeType) => {
        setSelectedNodeType(nodeType);
        showNodes(nodeType);
    };
    useEffect(() => {
        showNodes("agent");
        setDarkMode(flowId, storageId, isDarkMode(flowId, storageId), true);
    }, []);
    const convertToPy = () => {
        const flow = onFlowChanged();
        onConvert?.(JSON.stringify(flow), "py");
    };
    const convertToIpynb = () => {
        const flow = onFlowChanged();
        onConvert?.(JSON.stringify(flow), "ipynb");
    };
    const colorMode = isDark ? "dark" : "light";
    const rfInstance = store.get().rfInstance;
    const nodes = store.get().nodes;
    const edges = store.get().edges;
    const viewport = store.get().viewport;
    return (
        <div
            className={`flow-wrapper ${colorMode}`}
            id={`rf-root-${flowId}`}
            data-testid={`rf-root-${flowId}`}
        >
            <div className="flow-main">
                <SideBar
                    darkMode={isDark}
                    typeShown={selectedNodeType}
                    onTypeShownChange={onTypeShownChange}
                    onThemeToggle={onThemeToggle}
                    rfInstance={rfInstance}
                />
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
                        // deleteKeyCode handled by 'onkeydown'
                        // deleteKeyCode={['Backspace', 'Delete']}
                        deleteKeyCode={[]}
                        onKeyDown={onKeyDown}
                        onNodeDoubleClick={onNodeDoubleClick}
                        onEdgeDoubleClick={onEdgeDoubleClick}
                        onReconnect={store.onReconnect}
                        colorMode={colorMode}
                        elevateNodesOnSelect={true}
                        elevateEdgesOnSelect={true}
                        snapToGrid={true}
                        defaultViewport={viewport}
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onViewportChange={onViewportChange}
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
