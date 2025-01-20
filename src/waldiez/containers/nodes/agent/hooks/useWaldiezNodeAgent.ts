import { Connection } from "@xyflow/react";

import { useState } from "react";

import { WaldiezEdge } from "@waldiez/models";
import { useWaldiez } from "@waldiez/store";

export const useWaldiezNodeAgent = () => {
    const getEdgeById = useWaldiez(s => s.getEdgeById);
    const addEdge = useWaldiez(s => s.addEdge);
    const flowId = useWaldiez(s => s.flowId);
    const [isNodeModalOpen, setIsNodeModalOpen] = useState(false);
    const [isEdgeModalOpen, setIsEdgeModalOpen] = useState(false);
    const [edge, setEdge] = useState<WaldiezEdge | null>(null);
    const onOpenNodeModal = () => {
        setIsNodeModalOpen(true);
    };
    const onCloseNodeModal = () => {
        setIsNodeModalOpen(false);
    };
    const onOpenEdgeModal = (event: React.MouseEvent) => {
        if (!isNodeModalOpen && !isEdgeModalOpen) {
            const dataEdgeId = event.currentTarget.getAttribute("data-edge-id");
            if (dataEdgeId) {
                const existingEdge = getEdgeById(dataEdgeId);
                if (existingEdge) {
                    setEdge(existingEdge as WaldiezEdge);
                    setIsEdgeModalOpen(true);
                }
            }
        }
    };
    const onCloseEdgeModal = () => {
        setIsEdgeModalOpen(false);
        setEdge(null);
    };
    const onEdgeConnection = (connection: Connection) => {
        if (!isNodeModalOpen) {
            const newEdge = addEdge(connection, false);
            setEdge(newEdge as WaldiezEdge);
            // setEdgeModalOpen(true);
        }
    };
    return {
        flowId,
        edge,
        isNodeModalOpen,
        isEdgeModalOpen,
        onOpenNodeModal,
        onCloseNodeModal,
        onOpenEdgeModal,
        onCloseEdgeModal,
        onEdgeConnection,
    };
};
