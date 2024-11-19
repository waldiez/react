import { createdAt, edgeData, edgeId, edgeProps, flowId, nodes, updatedAt } from './data';
import { act, fireEvent, render, screen } from '@testing-library/react';

import { ReactFlow, ReactFlowProvider, applyEdgeChanges } from '@xyflow/react';

import { edgeTypes, nodeTypes } from '@waldiez/components';
import { WaldiezEdgeType } from '@waldiez/models';
import { WaldiezProvider } from '@waldiez/store';

export const renderEdge = (
  edgeType: WaldiezEdgeType,
  dataOverrides: { [key: string]: any } = {},
  openModal: boolean = true
) => {
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

  act(() => {
    render(
      <ReactFlowProvider>
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
          <div id={`rf-root-${flowId}`}>
            <ReactFlow
              id={flowId}
              nodesDraggable={false}
              nodes={nodes}
              edges={edges}
              edgeTypes={edgeTypes}
              nodeTypes={nodeTypes}
              onEdgesChange={changes => applyEdgeChanges(changes, edges)}
            />
          </div>
        </WaldiezProvider>
      </ReactFlowProvider>
    );
  });
  if (openModal && edgeType !== 'hidden') {
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    // `edge-modal-${edgeId}`
    const dialog = screen.getByTestId(`edge-modal-${edgeId}`);
    expect(dialog).not.toBeNull();
    const closeBtn = dialog.querySelector('.modal-close-btn');
    expect(closeBtn).not.toBeNull();
  }
};
