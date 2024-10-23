import { Background, BackgroundVariant, Controls, Panel, ReactFlow } from '@xyflow/react';

import { FaPlusCircle } from 'react-icons/fa';
import { FaCirclePlay } from 'react-icons/fa6';

import { FlowModal } from '@waldiez/components/flow/modal';
import { edgeTypes, nodeTypes } from '@waldiez/components/flow/reactFlowTypes';
import { WaldiezFlowViewProps } from '@waldiez/components/flow/types';
import { SideBar } from '@waldiez/components/sidebar';
import { UserInputModal } from '@waldiez/components/userInputModal';

export const WaldiezFlowView = (props: WaldiezFlowViewProps) => {
  const {
    flowId,
    storageId,
    darkMode,
    store,
    selectedNodeType,
    isModalOpen,
    inputPrompt,
    includeRunButton,
    onCloseModal,
    onEditFlow,
    onModalSubmit,
    onUserInput,
    onNodeTypeSelected,
    onFlowInit,
    onAddNode,
    onNodesChange,
    onNodeDoubleClick,
    onEdgesChange,
    onViewportChange,
    onImport,
    getFlow,
    onThemeToggle,
    onRun,
    onDrop,
    onDragOver,
    onkeydown
  } = props;
  const colorMode = darkMode ? 'dark' : 'light';
  const rfInstance = store.get().rfInstance;
  return (
    <div className={`flow-wrapper ${colorMode}`} id={`rf-root-${flowId}`} data-testid={`rf-root-${flowId}`}>
      <div className="flow-main">
        <SideBar
          flowId={flowId}
          storageId={storageId}
          darkMode={darkMode}
          name={store.name}
          getFlow={getFlow}
          onImport={onImport}
          onNodeTypeSelected={onNodeTypeSelected}
          onEditFlow={onEditFlow}
          onThemeToggle={onThemeToggle}
          rfInstance={rfInstance}
        />
        <div className="react-flow-wrapper" data-testid={`rf-wrapper-${flowId}`}>
          <ReactFlow
            id={flowId}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onInit={onFlowInit}
            nodes={store.nodes}
            edges={store.edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            // deleteKeyCode={['Backspace', 'Delete']}
            // handled by onkeydown
            deleteKeyCode={[]}
            onKeyDown={onkeydown}
            onNodeDoubleClick={onNodeDoubleClick}
            onEdgeDoubleClick={store.onEdgeDoubleClick}
            // onReconnect={store.onReconnect}
            colorMode={colorMode}
            elevateNodesOnSelect={true}
            elevateEdgesOnSelect={true}
            snapToGrid={true}
            defaultViewport={store.viewport}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onViewportChange={onViewportChange}
            // nodesDraggable={!noDragOrPan}
            // zoomOnScroll={!noDragOrPan}
            // nodesDraggable={!noDragOrPan}
            // panOnDrag={!noDragOrPan}
          >
            <Controls showInteractive={true} />
            {selectedNodeType !== 'agent' && (
              <Panel position="top-left">
                <button
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
            {includeRunButton && (
              <Panel position="top-right">
                <div className="editor-nav-actions">
                  <button
                    className="editor-nav-action"
                    onClick={onRun}
                    title="Run flow"
                    data-testid="run-flow"
                  >
                    <FaCirclePlay />
                  </button>
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
      {isModalOpen && (
        <FlowModal
          flowId={flowId}
          data={{
            name: store.name,
            description: store.description,
            requirements: store.requirements,
            tags: store.tags
          }}
          isOpen={isModalOpen}
          onDiscard={onCloseModal}
          onSubmit={onModalSubmit}
        />
      )}
    </div>
  );
};
