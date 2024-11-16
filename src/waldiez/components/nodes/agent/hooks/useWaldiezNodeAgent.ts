import { Connection } from '@xyflow/react';

import { useState } from 'react';

import { WaldiezEdge } from '@waldiez/models';
import { useWaldiezContext } from '@waldiez/store';

export const useWaldiezNodeAgent = () => {
  const getEdgeById = useWaldiezContext(s => s.getEdgeById);
  const addEdge = useWaldiezContext(s => s.addEdge);
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
      const dataEdgeId = event.currentTarget.getAttribute('data-edge-id');
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
      const newEdge = addEdge(connection.source, connection.target, false);
      setEdge(newEdge as WaldiezEdge);
      // setEdgeModalOpen(true);
    }
  };
  return {
    edge,
    isNodeModalOpen,
    isEdgeModalOpen,
    onOpenNodeModal,
    onCloseNodeModal,
    onOpenEdgeModal,
    onCloseEdgeModal,
    onEdgeConnection
  };
};
