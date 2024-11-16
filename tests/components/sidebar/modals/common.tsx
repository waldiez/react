import { createdAt, description, edgesCount, flowId, name, requirements, tags, updatedAt } from './data';
import { render } from '@testing-library/react';

import { ReactFlow, ReactFlowProvider } from '@xyflow/react';

import { SideBar, edgeTypes, nodeTypes } from '@waldiez/components';
import { WaldiezProvider } from '@waldiez/store';

export const onChange = vi.fn();

export const edges: any[] = [];
for (let i = 0; i < edgesCount; i++) {
  edges.push({
    id: `edge-${i}`,
    source: `node-${i}`,
    target: `node-${i + 1}`,
    type: 'chat',
    sourceX: 100 * i,
    sourceY: 100 * i,
    targetX: 200 * i,
    targetY: 200 * i,
    data: {
      label: `Edge ${i}`,
      position: i,
      order: i
    }
  });
}

const nodes = edges.map((edge, index) => {
  return {
    id: index % 2 === 0 ? edge.source : edge.target,
    type: 'agent',
    position: {
      x: edge.sourceX,
      y: edge.sourceY
    },
    data: {
      label: `Node ${index}`,
      agentType: index % 2 === 0 ? 'user' : 'assistant',
      nestedChats: [],
      skills: [],
      modelIds: []
    }
  };
});

export const renderFlow = (edgePositions: number[] = [0, 1, 2, 3]) => {
  const storeEdges = edges.map((edge, index) => {
    return {
      ...edge,
      data: {
        ...edge.data,
        position: edgePositions[index],
        order: edgePositions[index]
      }
    };
  });
  render(
    <WaldiezProvider
      flowId={flowId}
      storageId={flowId}
      name={name}
      description={description}
      tags={tags}
      requirements={requirements}
      nodes={nodes}
      edges={storeEdges}
      createdAt={createdAt}
      updatedAt={updatedAt}
      onChange={onChange}
    >
      <ReactFlowProvider>
        <div id={`rf-root-${flowId}`}>
          <div className="flow-main">
            <SideBar darkMode={false} typeShown="agent" onTypeShownChange={vi.fn()} onThemeToggle={vi.fn()} />
            <div className="react-flow-wrapper">
              <ReactFlow
                id={flowId}
                nodesDraggable={false}
                nodes={nodes}
                edges={storeEdges}
                edgeTypes={edgeTypes}
                nodeTypes={nodeTypes}
              />
            </div>
          </div>
        </div>
      </ReactFlowProvider>
    </WaldiezProvider>
  );
};
