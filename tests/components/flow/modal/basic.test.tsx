import { createdAt, description, edgesCount, flowId, name, requirements, tags, updatedAt } from './data';
import { fireEvent, render, screen } from '@testing-library/react';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { ReactFlow, ReactFlowProvider } from '@xyflow/react';

import selectEvent from 'react-select-event';

import { FlowModal, SideBar, edgeTypes, nodeTypes } from '@waldiez/components';
import { WaldiezProvider } from '@waldiez/store';

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

afterAll(() => {
  vi.resetAllMocks();
});

beforeEach(() => {
  modalIsVisible = false;
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
    </WaldiezProvider>
  );
  if (goOnExtras) {
    const extrasTab = screen.getByTestId(`tab-id-rf-${flowId}-edit-flow-modal-extras`);
    fireEvent.click(extrasTab);
  }
};

describe('EditFlowModalBasic', () => {
  it('should render EditFlowModal', () => {
    renderFlowModal([-1, -1, -1, -1]);
    expect(screen.getByTestId('edit-flow')).toBeInTheDocument();
  });
  it('should open modal', () => {
    renderFlowModal([0, 1, 2, 3]);
    expect(modalIsVisible).toBe(false);
    const editFlowBtn = screen.getByTestId('edit-flow');
    fireEvent.click(editFlowBtn);
    expect(modalIsVisible).toBe(true);
  });
  it('should close modal', () => {
    renderFlowModal([0, 1, 2, 3]);
    const editFlowBtn = screen.getByTestId('edit-flow');
    fireEvent.click(editFlowBtn);
    expect(modalIsVisible).toBe(true);
    const closeButton = screen.getByTestId('modal-close-btn');
    fireEvent.click(closeButton);
    expect(modalIsVisible).toBe(false);
  });
  it('should switch to second tab', () => {
    renderFlowModal([0, 1, 2, 3]);
    const extrasTab = screen.getByTestId(`tab-id-rf-${flowId}-edit-flow-modal-extras`);
    fireEvent.click(extrasTab);
  });
  it('should handle edges', () => {
    // order <0 : not in main flow
    renderFlowModal([-1, 0, 1, 2]);
  });
  it('should handle adding a new edge to the flow', async () => {
    renderFlowModal([-1, 0, 1, 1, 2]);
    const newEdgeSelect = screen.getByLabelText('Add new chat');
    selectEvent.openMenu(newEdgeSelect);
    await selectEvent.select(newEdgeSelect, 'Edge 0');
    fireEvent.change(newEdgeSelect, {
      target: { label: 'Edge 0', value: edges[0] }
    });
    const addEdgeButton = screen.getByTestId('add-edge-to-flow-button');
    fireEvent.click(addEdgeButton);
  });
  it('should update the flow name', () => {
    renderFlowModal([-1, 0, 1, 2]);
    const nameInput = screen.getByTestId('edit-flow-name-input');
    fireEvent.change(nameInput, { target: { value: 'new name' } });
  });
  it('should update the flow description', () => {
    renderFlowModal([-1, 0, 1, 2]);
    const descriptionInput = screen.getByTestId('edit-flow-description-input');
    fireEvent.change(descriptionInput, {
      target: { value: 'new description' }
    });
  });
  it('should discard changes on cancel', () => {
    renderFlowModal([-1, 0, 1, 2]);
    const nameInput = screen.getByTestId('edit-flow-name-input');
    fireEvent.change(nameInput, { target: { value: 'new name' } });
    const cancelButton = screen.getByTestId('edit-flow-cancel-button');
    fireEvent.click(cancelButton);
    expect(modalIsVisible).toBe(false);
    const editFlowBtn = screen.getByTestId('edit-flow');
    fireEvent.click(editFlowBtn);
    expect(screen.getByTestId('edit-flow-name-input')).toHaveValue(name);
  });
  it('should submit changes on save', () => {
    renderFlowModal([-1, 0, 1, 2]);
    const nameInput = screen.getByTestId('edit-flow-name-input');
    fireEvent.change(nameInput, { target: { value: 'new name' } });
    const saveButton = screen.getByTestId('edit-flow-submit-button');
    fireEvent.click(saveButton);
    expect(modalIsVisible).toBe(false);
    const editFlowBtn = screen.getByTestId('edit-flow');
    fireEvent.click(editFlowBtn);
    expect(screen.getByTestId('edit-flow-name-input')).toHaveValue('new name');
  });
  it('should remove an edge from the flow', () => {
    renderFlowModal([-1, 0, 1, 2]);
    const deleteEdgeButton = screen.getByTestId('remove-edge-button-0');
    fireEvent.click(deleteEdgeButton);
  });
  it('should reorder the edges', () => {
    renderFlowModal([-1, 0, 1, 2]);
    const moveEdgeUpButton = screen.getByTestId('move-edge-up-button-1');
    fireEvent.click(moveEdgeUpButton);
    const moveEdgeDownButton = screen.getByTestId('move-edge-down-button-1');
    fireEvent.click(moveEdgeDownButton);
  });
});
