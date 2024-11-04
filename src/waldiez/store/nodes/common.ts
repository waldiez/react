import { Node, ReactFlowInstance } from '@xyflow/react';

const calculateNewNodePosition = (
  rfInstance: ReactFlowInstance | undefined,
  flowWrapper: HTMLElement,
  currentNodesCount: number,
  entriesDistance: number
) => {
  const zoom = rfInstance?.getZoom() ?? 1;
  const flowWrapperRect = flowWrapper.getBoundingClientRect();
  // take into account the zoom level
  // to calculate the number of nodes per row
  const canvasWidth = flowWrapperRect.width / zoom;
  const maxNodesPerRow = Math.floor(canvasWidth / (entriesDistance * 1.1)) - 1;
  const x = (currentNodesCount % maxNodesPerRow) * entriesDistance;
  const y = Math.floor(currentNodesCount / maxNodesPerRow) * entriesDistance;
  return { x, y };
};

export const getNewNodePosition = (
  currentNodesCount: number,
  flowId: string,
  rfInstance?: ReactFlowInstance,
  entriesDistance: number = 240
) => {
  const flowRoot = document.getElementById(`rf-root-${flowId}`);
  if (!flowRoot) {
    return { x: 0, y: 0 };
  }
  // flowRoot includes the sidebar
  // flowWrapper is the actual flow area
  const flowWrapper = flowRoot.querySelector('.react-flow-wrapper');
  if (!flowWrapper) {
    return { x: 0, y: 0 };
  }
  return calculateNewNodePosition(rfInstance, flowWrapper as HTMLElement, currentNodesCount, entriesDistance);
};

export const setViewPortTopLeft = (rfInstance?: ReactFlowInstance) => {
  if (rfInstance) {
    const zoom = rfInstance.getZoom();
    rfInstance.setViewport({
      zoom,
      x: 20,
      y: 40
    });
  }
};

export const reArrangeNodes = (
  nodes: Node[],
  flowId: string,
  nodeType: 'model' | 'skill',
  rfInstance?: ReactFlowInstance
) => {
  let nodesAdded = 0;
  const newNodes: Node[] = [];
  nodes.forEach(node => {
    if (node.type === nodeType) {
      const position = getNewNodePosition(nodesAdded, flowId, rfInstance);
      newNodes.push({ ...node, position });
      nodesAdded++;
    } else {
      newNodes.push(node);
    }
  });
  return newNodes;
};
