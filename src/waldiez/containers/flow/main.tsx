import { Background, BackgroundVariant, Controls, Panel, ReactFlow, Viewport } from "@xyflow/react";

import { useEffect, useState } from "react";
import { CiExport, CiImport } from "react-icons/ci";
import { FaPlusCircle } from "react-icons/fa";
import { FaCirclePlay, FaMoon, FaPython, FaSun } from "react-icons/fa6";
import { SiJupyter } from "react-icons/si";

import { useDnD, useFlowEvents, useKeys } from "@waldiez/containers/flow/hooks";
import { ImportFlowModal, UserInputModal } from "@waldiez/containers/flow/modals";
import { edgeTypes, nodeTypes } from "@waldiez/containers/rfTypes";
import { SideBar } from "@waldiez/containers/sidebar";
import { useWaldiez } from "@waldiez/store";
import { useWaldiezTheme } from "@waldiez/theme";
import { WaldiezNodeType } from "@waldiez/types";

type WaldiezFlowViewProps = {
    flowId: string;
    onUserInput?: ((input: string) => void) | null;
    inputPrompt?: { previousMessages: string[]; prompt: string } | null;
};

export const WaldiezFlowView = (props: WaldiezFlowViewProps) => {
    const { flowId, inputPrompt, onUserInput } = props;
    const [selectedNodeType, setSelectedNodeType] = useState<WaldiezNodeType>("agent");
    const [isImportModalOpen, setIsImportModalOpen] = useState<boolean>(false);
    const nodes = useWaldiez(s => s.nodes);
    const edges = useWaldiez(s => s.edges);
    const viewport = useWaldiez(s => s.viewport);
    const addModel = useWaldiez(s => s.addModel);
    const addSkill = useWaldiez(s => s.addSkill);
    const handleViewportChange = useWaldiez(s => s.onViewportChange);
    const onFlowChanged = useWaldiez(s => s.onFlowChanged);
    const showNodes = useWaldiez(s => s.showNodes);
    const runner = useWaldiez(s => s.onRun);
    const onConvert = useWaldiez(s => s.onConvert);
    const onReconnect = useWaldiez(s => s.onReconnect);
    const onSave = useWaldiez(s => s.onSave);
    const { onKeyDown } = useKeys(flowId, onSave);
    const {
        convertToPy,
        convertToIpynb,
        onExport,
        onRun,
        onFlowInit,
        onNodesChange,
        onEdgesChange,
        onNodeDoubleClick,
        onEdgeDoubleClick,
    } = useFlowEvents(flowId);
    const includeRunButton = typeof runner === "function";
    const includeConvertIcons = typeof onConvert === "function";
    const { isDark, toggleTheme } = useWaldiezTheme();
    const colorMode = isDark ? "dark" : "light";

    const onOpenImportModal = () => {
        setIsImportModalOpen(true);
    };
    const onCloseImportModal = () => {
        setIsImportModalOpen(false);
    };
    const onTypeShownChange = (nodeType: WaldiezNodeType) => {
        if (nodeType !== selectedNodeType) {
            showNodes(nodeType);
            setSelectedNodeType(nodeType);
        }
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
    const onNewAgent = () => {
        setSelectedNodeType("agent");
        showNodes("agent");
        onFlowChanged();
    };
    const { onDragOver, onDrop } = useDnD(onNewAgent);
    const onViewportChange = (viewport: Viewport) => {
        handleViewportChange(viewport, selectedNodeType);
        // onFlowChanged();
    };
    useEffect(() => {
        showNodes("agent");
        // setSelectedNodeType("agent");
    }, []);
    return (
        <div
            className={`flow-wrapper ${colorMode}`}
            id={`rf-root-${flowId}`}
            data-testid={`rf-root-${flowId}`}
        >
            <div className="flow-main">
                <SideBar onSelectNodeType={onTypeShownChange} />
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
                        noWheelClassName="no-wheel"
                        // noPanClassName="no-pan"
                        // noDragClassName="no-drag"
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
                        <Panel position="top-right">
                            <div className="editor-nav-actions">
                                {(includeRunButton || includeConvertIcons) && (
                                    <>
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
                                    </>
                                )}
                                <button
                                    type="button"
                                    className="editor-nav-action"
                                    onClick={onOpenImportModal}
                                    title="Import flow"
                                    data-testid={`import-flow-${flowId}-button`}
                                >
                                    <CiImport style={{ strokeWidth: 2 }} />
                                </button>
                                <button
                                    type="button"
                                    className="editor-nav-action"
                                    onClick={onExport}
                                    title="Export flow"
                                    data-testid={`export-flow-${flowId}-button`}
                                >
                                    <CiExport style={{ strokeWidth: 2 }} />
                                </button>
                                <button
                                    type="button"
                                    className="editor-nav-action"
                                    onClick={toggleTheme}
                                    title="Run flow"
                                    data-testid={`toggle-theme-${flowId}`}
                                >
                                    {isDark ? <FaSun /> : <FaMoon />}
                                </button>
                            </div>
                        </Panel>
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
            {isImportModalOpen && (
                <ImportFlowModal
                    flowId={flowId}
                    isOpen={isImportModalOpen}
                    onClose={onCloseImportModal}
                    typeShown={selectedNodeType}
                    onTypeShownChange={onTypeShownChange}
                />
            )}
        </div>
    );
};
