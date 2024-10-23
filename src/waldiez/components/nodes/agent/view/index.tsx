import { Handle, Position } from '@xyflow/react';

import { WaldiezEdgeModal } from '@waldiez/components/edges/modal';
import { WaldiezNodeAgentModal } from '@waldiez/components/nodes/agent/modal';
import { WaldiezNodeAgentBodyView } from '@waldiez/components/nodes/agent/view/body';
import { WaldiezNodeAgentFooterView } from '@waldiez/components/nodes/agent/view/footer';
import { WaldiezNodeAgentHeaderView } from '@waldiez/components/nodes/agent/view/header';
import { WaldiezNodeAgentViewProps } from '@waldiez/components/nodes/agent/view/types';

export const WaldiezNodeAgentView = (props: WaldiezNodeAgentViewProps) => {
  const {
    id,
    flowId,
    data,
    parentId,
    edge,
    isNodeModalOpen,
    isEdgeModalOpen,
    isDarkMode,
    models,
    skills,
    agents,
    currentGroupManager,
    agentConnections,
    uploadsEnabled,
    onDataChange,
    setCurrentGroupManager,
    onOpenNodeModal,
    onOpenEdgeModal,
    onCloseEdgeModal,
    onEdgeConnection,
    onAgentTypeChange,
    onCloseNodeModal,
    onCancel,
    onSubmit,
    onClone,
    onDelete
  } = props;
  const isModalOpen = isNodeModalOpen || isEdgeModalOpen;
  const agentType = data.agentType;
  let className = isModalOpen ? 'nodrag nowheel' : '';
  if (!parentId) {
    className += `agent-node ${agentType}`;
  }
  return (
    <div className={className} data-testid={`agent-node-${id}-view`}>
      {!parentId && (
        <>
          <WaldiezNodeAgentHeaderView id={id} data={data} onOpenNodeModal={onOpenNodeModal} />
          <WaldiezNodeAgentBodyView
            id={id}
            data={data}
            isEdgeModalOpen={isEdgeModalOpen}
            isNodeModalOpen={isNodeModalOpen}
            onDataChange={onDataChange}
          />
          <WaldiezNodeAgentFooterView id={id} data={data} onDelete={onDelete} onClone={onClone} />
          {!parentId && (
            <Handle
              type="target"
              position={Position.Left}
              onConnect={onEdgeConnection}
              data-testid={`agent-node-${id}-target`}
            />
          )}
          <Handle
            type="source"
            position={Position.Right}
            onConnect={onEdgeConnection}
            data-testid={`agent-node-${id}-source`}
          />
        </>
      )}
      <button
        id={`open-node-modal-${id}`}
        data-testid={`open-node-modal-${id}`}
        className="hidden"
        onClick={onOpenNodeModal}
      />
      <button
        id={`open-edge-modal-node-${id}`}
        data-testid={`open-edge-modal-node-${id}`}
        className="hidden"
        onClick={onOpenEdgeModal}
        data-edge-id=""
      ></button>
      {isNodeModalOpen && (
        <WaldiezNodeAgentModal
          flowId={flowId}
          id={id}
          data={data}
          models={models}
          skills={skills}
          agents={agents}
          agentConnections={agentConnections}
          isNodeModalOpen={isNodeModalOpen}
          isDarkMode={isDarkMode}
          currentGroupManager={currentGroupManager}
          canUploadFiles={uploadsEnabled}
          onDataChange={onDataChange}
          setCurrentGroupManager={setCurrentGroupManager}
          onAgentTypeChange={onAgentTypeChange}
          onCloseNodeModal={onCloseNodeModal}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      )}

      {edge && isEdgeModalOpen && (
        <WaldiezEdgeModal
          flowId={flowId}
          darkMode={isDarkMode}
          isOpen={isEdgeModalOpen}
          edgeId={edge.id}
          onClose={onCloseEdgeModal}
        />
      )}
    </div>
  );
};
