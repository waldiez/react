import { Node, XYPosition, useReactFlow } from '@xyflow/react';

import { useCallback } from 'react';

import { WaldiezAgentNodeType } from '@waldiez/models';
import { useWaldiezContext } from '@waldiez/store';

export const useDnD = (onNewAgent: () => void) => {
  const { screenToFlowPosition, getIntersectingNodes } = useReactFlow();
  const addAgent = useWaldiezContext(selector => selector.addAgent);
  // const addEdge = useWaldiezContext(selector => selector.addEdge);
  const reselectNode = useWaldiezContext(selector => selector.reselectNode);
  const setAgentGroup = useWaldiezContext(selector => selector.setAgentGroup);
  const getIntersectingManager = (intersectingNodes: Node[]) => {
    let parent: Node | undefined;
    const isIntersectingWithManager = intersectingNodes.some(
      node => node.type === 'agent' && node.data.agentType === 'manager'
    );
    if (isIntersectingWithManager) {
      const managerNode = intersectingNodes.find(
        node => node.type === 'agent' && node.data.agentType === 'manager'
      );
      if (managerNode) {
        parent = managerNode;
      }
    }
    return parent;
  };
  const getDroppedAgentParent = (agentType: WaldiezAgentNodeType, position: XYPosition) => {
    let parent: Node | undefined;
    if (agentType !== 'manager') {
      const { x, y } = position;
      const nodeRect = {
        x,
        y,
        width: 100,
        height: 100
      };
      let intersectingNodes: Node[] = [];
      try {
        intersectingNodes = getIntersectingNodes(nodeRect);
      } catch (_) {
        // testing/no dom: Cannot read properties of undefined (reading 'parentId')
      }
      if (intersectingNodes.length > 0) {
        parent = getIntersectingManager(intersectingNodes);
      }
    }
    return parent;
  };
  const getAgentType = (event: React.DragEvent<HTMLDivElement>) => {
    const nodeTypeData = event.dataTransfer.getData('application/node');
    let agentType: WaldiezAgentNodeType | undefined;
    if (nodeTypeData === 'agent') {
      const agentTypeData = event.dataTransfer.getData('application/agent');
      if (['user', 'assistant', 'manager'].includes(agentTypeData)) {
        agentType = agentTypeData as WaldiezAgentNodeType;
      }
    }
    if (nodeTypeData !== 'agent' || !agentType) {
      agentType = undefined;
    }
    return agentType;
  };
  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);
  const addAgentNode = (event: React.DragEvent<HTMLDivElement>, agentType: WaldiezAgentNodeType) => {
    let position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY
    });
    const parent = getDroppedAgentParent(agentType, position);
    if (parent) {
      position = parent.position;
    }
    const newNode = addAgent(agentType, position, parent?.id);
    if (parent) {
      addParentNodeEdge(parent, newNode);
    }
    return newNode;
  };
  const addParentNodeEdge = (parent: Node, newNode: Node) => {
    // addEdge(parent.id, newNode.id, true);
    setTimeout(() => {
      setAgentGroup(newNode.id, parent.id);
    }, 0);
    setTimeout(() => {
      reselectNode(parent.id);
    }, 100);
  };
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      const agentType = getAgentType(event);
      if (!agentType) {
        return;
      }
      addAgentNode(event, agentType);
      onNewAgent();
    },
    [screenToFlowPosition]
  );
  return { onDragOver, onDrop };
};
