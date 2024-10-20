import { Handle, Position } from '@xyflow/react';

import { WaldieEdgeModal } from '@waldiez/components/edges/modal';
import { WaldieNodeAgentModal } from '@waldiez/components/nodes/agent/modal';
import { WaldieNodeAgentBodyView } from '@waldiez/components/nodes/agent/view/body';
import { WaldieNodeAgentFooterView } from '@waldiez/components/nodes/agent/view/footer';
import { WaldieNodeAgentHeaderView } from '@waldiez/components/nodes/agent/view/header';
import { WaldieNodeAgentViewProps } from '@waldiez/components/nodes/agent/view/types';

export const WaldieNodeAgentView = (props: WaldieNodeAgentViewProps) => {
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
          <WaldieNodeAgentHeaderView id={id} data={data} onOpenNodeModal={onOpenNodeModal} />
          <WaldieNodeAgentBodyView
            id={id}
            data={data}
            isEdgeModalOpen={isEdgeModalOpen}
            isNodeModalOpen={isNodeModalOpen}
            onDataChange={onDataChange}
          />
          <WaldieNodeAgentFooterView id={id} data={data} onDelete={onDelete} onClone={onClone} />
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
        <WaldieNodeAgentModal
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
        <WaldieEdgeModal
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
