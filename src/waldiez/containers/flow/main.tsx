import { Background, BackgroundVariant, Controls, Panel, ReactFlow } from "@xyflow/react";

import { useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaFileExport, FaFileImport, FaMoon, FaPython, FaSun } from "react-icons/fa6";
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
import { ImportFlowModal, UserInputModal } from "@waldiez/containers/flow/modals";
import { WaldiezNodeAgentView, WaldiezNodeModelView, WaldiezNodeSkillView } from "@waldiez/containers/nodes";
import { SideBar } from "@waldiez/containers/sidebar";
import { useWaldiez } from "@waldiez/store";
import { useWaldiezTheme } from "@waldiez/theme";

type WaldiezFlowViewProps = {
    flowId: string;
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
    const { flowId, inputPrompt } = props;
    const nodes = useWaldiez(s => s.nodes);
    const edges = useWaldiez(s => s.edges);
    const viewport = useWaldiez(s => s.viewport);
    const showNodes = useWaldiez(s => s.showNodes);
    const onUserInput = useWaldiez(s => s.onUserInput);
    const runner = useWaldiez(s => s.onRun);
    const onConvert = useWaldiez(s => s.onConvert);
    const onReconnect = useWaldiez(s => s.onReconnect);
    const onSave = useWaldiez(s => s.onSave);
    const { onKeyDown } = useKeys(flowId, onSave);
    const {
        selectedNodeType,
        isImportModalOpen,
        convertToPy,
        convertToIpynb,
        onExport,
        onRun,
        onAddNode,
        onNewAgent,
        onFlowInit,
        onNodesChange,
        onEdgesChange,
        onNodeDoubleClick,
        onEdgeDoubleClick,
        onViewportChange,
        onTypeShownChange,
        onOpenImportModal,
        onCloseImportModal,
    } = useFlowEvents(flowId);
    const { onDragOver, onDrop } = useDnD(onNewAgent);
    const includeRunButton = typeof runner === "function";
    const includeConvertIcons = typeof onConvert === "function";
    const { isDark, toggleTheme } = useWaldiezTheme();
    const colorMode = isDark ? "dark" : "light";
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
                                    </>
                                )}
                                <button
                                    type="button"
                                    className="editor-nav-action"
                                    onClick={onOpenImportModal}
                                    title="Import flow"
                                    data-testid={`import-flow-${flowId}-button`}
                                >
                                    <FaFileImport />
                                </button>
                                <button
                                    type="button"
                                    className="editor-nav-action"
                                    onClick={onExport}
                                    title="Export flow"
                                    data-testid={`export-flow-${flowId}-button`}
                                >
                                    <FaFileExport />
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

/*


               
<div className="sidebar-footer">
                <ul>
                    <li
                        className="clickable"
                        onClick={onOpenImportModal}
                        title="Import flow"
                        data-testid={`import-flow-${flowId}-sidebar-button`}
                    >
                        <FaFileImport />
                        {!isCollapsed && <span>Import Waldiez</span>}
                    </li>
                    <li
                        className="clickable"
                        onClick={onExport}
                        title="Export flow"
                        data-testid={`export-flow-${flowId}-sidebar-button`}
                    >
                        <FaFileExport />
                        {!isCollapsed && <span>Export Waldiez</span>}
                    </li>
                </ul>
            </div>
*/
