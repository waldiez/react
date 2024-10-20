import { createdAt, description, edgesCount, flowId, name, requirements, tags, updatedAt } from './data';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeAll, describe, it } from 'vitest';

import { ReactFlow, ReactFlowProvider } from '@xyflow/react';

import { FlowModal, SideBar, edgeTypes, nodeTypes } from '@waldiez/components';
import { WaldieProvider } from '@waldiez/store';

const edges: any[] = [];
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

let modalIsVisible = false;

beforeAll(() => {
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

afterEach(() => {
  modalIsVisible = false;
});
const onOpen = () => {
  modalIsVisible = true;
};
const onSubmit = () => {
  modalIsVisible = false;
};
const onCancel = () => {
  modalIsVisible = false;
};
const onEditFlow = () => {
  onOpen();
};
const onNodeTypeSelected = vi.fn();
const onThemeToggle = vi.fn();
const onImportFlow = vi.fn();
const getFlow = vi.fn();

const renderFlowModal = (edgePositions: number[], goOnExtras: boolean = false) => {
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
    <WaldieProvider
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
    >
      <ReactFlowProvider>
        <div id={`rf-root-${flowId}`}>
          <div className="flow-main">
            <SideBar
              flowId={flowId}
              storageId={flowId}
              darkMode={false}
              name={name}
              onNodeTypeSelected={onNodeTypeSelected}
              getFlow={getFlow}
              onEditFlow={onEditFlow}
              onThemeToggle={onThemeToggle}
              onImport={onImportFlow}
              rfInstance={null}
            />
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
            <FlowModal
              flowId={flowId}
              data={{
                name,
                description,
                tags,
                requirements
              }}
              isOpen={modalIsVisible}
              onSubmit={onSubmit}
              onDiscard={onCancel}
            />
          </div>
        </div>
      </ReactFlowProvider>
    </WaldieProvider>
  );
  if (goOnExtras) {
    const extrasTab = screen.getByTestId(`tab-id-rf-${flowId}-edit-flow-modal-extras`);
    fireEvent.click(extrasTab);
  }
};

describe('EditFlowModalExtras', () => {
  // Extras
  // tags
  it('should add a new tag', () => {
    renderFlowModal([-1, 0, 1, 2], true);
    const tagInput = screen.getByTestId('new-list-entry-tag-item');
    fireEvent.change(tagInput, { target: { value: 'new tag' } });
    const addTagButton = screen.getByTestId('add-list-entry-tag-button');
    fireEvent.click(addTagButton);
  });
  it('should delete a tag', () => {
    renderFlowModal([-1, 0, 1, 2], true);
    const deleteTagButton = screen.getByTestId('delete-list-entry-tag-0');
    fireEvent.click(deleteTagButton);
  });
  it('should update a tag', () => {
    renderFlowModal([-1, 0, 1, 2], true);
    const entryInput = screen.getByTestId('list-entry-item-tag-0');
    fireEvent.change(entryInput, { target: { value: 'tag-update' } });
  });
  // requirements
  it('should add a new requirement', () => {
    renderFlowModal([-1, 0, 1, 2], true);
    const requirementInput = screen.getByTestId('new-list-entry-requirement-item');
    fireEvent.change(requirementInput, {
      target: { value: 'new requirement' }
    });
    const addRequirementButton = screen.getByTestId('add-list-entry-requirement-button');
    fireEvent.click(addRequirementButton);
  });
  it('should delete a requirement', () => {
    renderFlowModal([-1, 0, 1, 2], true);
    const deleteRequirementButton = screen.getByTestId('delete-list-entry-requirement-0');
    fireEvent.click(deleteRequirementButton);
  });
  it('should update a requirement', () => {
    renderFlowModal([-1, 0, 1, 2], true);
    const entryInput = screen.getByTestId('list-entry-item-requirement-0');
    fireEvent.change(entryInput, {
      target: { value: 'requirement-update' }
    });
  });
});
