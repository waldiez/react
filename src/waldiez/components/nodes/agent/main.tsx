import { Handle, NodeResizer, Position } from '@xyflow/react';

import { WaldiezEdgeModal } from '@waldiez/components/edges/modal';
import { WaldiezNodeAgentBody } from '@waldiez/components/nodes/agent/body';
import { WaldiezNodeAgentFooter } from '@waldiez/components/nodes/agent/footer';
import { WaldiezNodeAgentHeader } from '@waldiez/components/nodes/agent/header';
import { useWaldiezNodeAgent } from '@waldiez/components/nodes/agent/hooks';
import { WaldiezNodeAgentModal } from '@waldiez/components/nodes/agent/modal';
import { WaldiezNodeAgentProps } from '@waldiez/components/nodes/agent/types';
import { AGENT_COLORS } from '@waldiez/theme';

export const WaldiezNodeAgent = (props: WaldiezNodeAgentProps) => {
  const { id, data } = props;
  const {
    edge,
    isNodeModalOpen,
    isEdgeModalOpen,
    onOpenNodeModal,
    onCloseNodeModal,
    onOpenEdgeModal,
    onCloseEdgeModal,
    onEdgeConnection
  } = useWaldiezNodeAgent();
  const isModalOpen = isNodeModalOpen || isEdgeModalOpen;
  const agentType = data.agentType;
  let className = isModalOpen ? 'nodrag nowheel' : '';
  if (!data.parentId) {
    className += `agent-node ${agentType}`;
  }
  return (
    <div className={className} data-testid={`agent-node-${id}-view`}>
      {!data.parentId && (
        <div className="agent-content" data-testid={`agent-${id}-content`}>
          <NodeResizer
            color={AGENT_COLORS[agentType]}
            minWidth={206}
            minHeight={206}
            handleStyle={{ color: AGENT_COLORS[agentType] }}
            handleClassName={agentType}
          />
          <WaldiezNodeAgentHeader id={id} data={data} onOpenNodeModal={onOpenNodeModal} />
          <WaldiezNodeAgentBody id={id} data={data} isModalOpen={isModalOpen} />
          <WaldiezNodeAgentFooter id={id} data={data} isModalOpen={isModalOpen} />
          <Handle
            type="target"
            position={Position.Left}
            onConnect={onEdgeConnection}
            data-testid={`agent-node-${id}-target`}
          />
          <Handle
            type="source"
            position={Position.Right}
            onConnect={onEdgeConnection}
            data-testid={`agent-node-${id}-source`}
          />
        </div>
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
      {edge && isEdgeModalOpen && (
        <WaldiezEdgeModal isOpen={isEdgeModalOpen} edgeId={edge.id} onClose={onCloseEdgeModal} />
      )}
      <WaldiezNodeAgentModal id={id} data={data} isOpen={isNodeModalOpen} onClose={onCloseNodeModal} />
    </div>
  );
};
