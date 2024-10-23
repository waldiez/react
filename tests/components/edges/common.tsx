import { createdAt, edgeData, edgeId, edgeProps, flowId, nodes, updatedAt } from './data';
import { fireEvent, render, screen } from '@testing-library/react';

import { Edge, EdgeChange, ReactFlow, ReactFlowProvider, applyEdgeChanges } from '@xyflow/react';

import { edgeTypes, nodeTypes } from '@waldiez/components';
import { WaldiezEdgeType } from '@waldiez/models';
import { WaldiezProvider } from '@waldiez/store';

export const renderEdge = (edgeType: WaldiezEdgeType, dataOverrides: { [key: string]: any } = {}) => {
  const edges = [
    {
      id: edgeId,
      source: edgeProps.source,
      target: edgeProps.target,
      hidden: edgeType === 'hidden',
      animated: edgeType === 'nested',
      type: edgeType,
      data: { ...edgeData, ...dataOverrides }
    },
    {
      id: 'edge-2',
      source: edgeProps.target,
      target: edgeProps.source,
      type: 'group',
      animated: false,
      hidden: false,
      data: {}
    }
  ];
  const onEdgesChange = (changes: EdgeChange<Edge>[]) => {
    applyEdgeChanges(changes, edges);
  };
  render(
    <WaldiezProvider
      flowId={flowId}
      storageId="test-storage"
      name="flow name"
      description="flow description"
      requirements={[]}
      tags={[]}
      nodes={nodes}
      edges={edges}
      createdAt={createdAt}
      updatedAt={updatedAt}
    >
      <ReactFlowProvider>
        <div id={`rf-root-${flowId}`}>
          <ReactFlow
            id={flowId}
            nodesDraggable={false}
            nodes={nodes}
            edges={edges}
            edgeTypes={edgeTypes}
            nodeTypes={nodeTypes}
            onEdgesChange={onEdgesChange}
          />
        </div>
      </ReactFlowProvider>
    </WaldiezProvider>
  );
  if (edgeType !== 'hidden') {
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    expect(screen.getByTestId('modal-close-btn')).not.toBeNull();
  }
};
