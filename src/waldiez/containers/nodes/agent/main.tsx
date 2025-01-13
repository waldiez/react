import { Handle, NodeResizer, Position } from "@xyflow/react";

import { WaldiezEdgeModal } from "@waldiez/containers/edges/modal";
import { WaldiezNodeAgentBody } from "@waldiez/containers/nodes/agent/body";
import { WaldiezNodeAgentFooter } from "@waldiez/containers/nodes/agent/footer";
import { WaldiezNodeAgentHeader } from "@waldiez/containers/nodes/agent/header";
import { useWaldiezNodeAgent } from "@waldiez/containers/nodes/agent/hooks";
import { WaldiezNodeAgentModal } from "@waldiez/containers/nodes/agent/modal";
import { WaldiezNodeSwarmContainer } from "@waldiez/containers/nodes/agent/swarmContainer";
import { WaldiezNodeAgentProps } from "@waldiez/containers/nodes/agent/types";
import { AGENT_COLORS } from "@waldiez/theme";

export const WaldiezNodeAgentView = (props: WaldiezNodeAgentProps) => {
    const { id, data } = props;
    const agentType = data.agentType;
    const {
        edge,
        flowId,
        isNodeModalOpen,
        isEdgeModalOpen,
        onOpenNodeModal,
        onCloseNodeModal,
        onOpenEdgeModal,
        onCloseEdgeModal,
        onEdgeConnection,
    } = useWaldiezNodeAgent();
    const isModalOpen = isNodeModalOpen || isEdgeModalOpen;
    let className = isModalOpen ? "nodrag nowheel" : "";
    if (!data.parentId) {
        className += `agent-node ${agentType}`;
    }
    if (agentType === "swarm_container") {
        return (
            <WaldiezNodeSwarmContainer
                {...props}
                isNodeModalOpen={isNodeModalOpen}
                onOpenNodeModal={onOpenNodeModal}
                onCloseNodeModal={onCloseNodeModal}
            />
        );
    }
    return (
        <div className={className} data-testid={`agent-node-${id}-view`}>
            {!data.parentId && (
                <div className="agent-content" data-testid={`agent-${id}-content`}>
                    {agentType !== "swarm" && (
                        <NodeResizer
                            color={AGENT_COLORS[agentType]}
                            minWidth={206}
                            minHeight={206}
                            handleStyle={{ color: AGENT_COLORS[agentType] }}
                            handleClassName={agentType}
                        />
                    )}
                    <WaldiezNodeAgentHeader id={id} data={data} onOpenNodeModal={onOpenNodeModal} />
                    <WaldiezNodeAgentBody flowId={flowId} id={id} data={data} isModalOpen={isModalOpen} />
                    <WaldiezNodeAgentFooter id={id} data={data} isModalOpen={isModalOpen} />
                </div>
            )}
            <Handle
                className={data.parentId ? "hidden" : ""}
                type="target"
                isConnectableEnd
                position={agentType === "swarm" ? Position.Top : Position.Left}
                onConnect={onEdgeConnection}
                data-testid={`agent-handle-${id}-${agentType === "swarm" ? "top" : "left"}`}
                id={`agent-handle-${id}-${agentType === "swarm" ? "top" : "left"}`}
            />
            <Handle
                className={data.parentId ? "hidden" : ""}
                type="source"
                isConnectableStart
                position={Position.Right}
                onConnect={onEdgeConnection}
                data-testid={`agent-handle-${id}-right`}
                id={`agent-handle-${id}-source`}
            />
            {agentType === "swarm" && (
                <Handle
                    className={data.parentId ? "hidden" : ""}
                    type="source"
                    isConnectableStart
                    position={Position.Bottom}
                    onConnect={onEdgeConnection}
                    data-testid={`agent-handle-${id}-bottom`}
                    id={`agent-handle-${id}-bottom`}
                />
            )}
            <button
                title="Open Node Modal"
                type="button"
                id={`open-agent-node-modal-${id}`}
                data-testid={`open-agent-node-modal-${id}`}
                className="hidden"
                onClick={onOpenNodeModal}
            />
            <button
                title="Open Edge Modal"
                type="button"
                id={`open-edge-modal-node-${id}`}
                data-testid={`open-edge-modal-node-${id}`}
                className="hidden"
                onClick={onOpenEdgeModal}
                data-edge-id=""
            ></button>
            {edge && isEdgeModalOpen && (
                <WaldiezEdgeModal isOpen={isEdgeModalOpen} edgeId={edge.id} onClose={onCloseEdgeModal} />
            )}
            {isNodeModalOpen && (
                <WaldiezNodeAgentModal
                    id={id}
                    data={data}
                    isOpen={isNodeModalOpen}
                    onClose={onCloseNodeModal}
                />
            )}
        </div>
    );
};
