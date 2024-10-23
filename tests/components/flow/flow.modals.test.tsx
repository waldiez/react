import { agentNodes, createdAt, edges, edgesCount, flowId, nodes, updatedAt, userInput } from './data';
import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { ReactFlowProvider } from '@xyflow/react';

import { WaldiezFlow } from '@waldiez/components/flow';
import { WaldiezProvider } from '@waldiez/store';
import * as theme from '@waldiez/theme';

const onRun = vi.fn();
const onChange = vi.fn();
const onUserInput = vi.fn();

const renderComponent = (
  includeUserInput: boolean = false,
  singleAgent: boolean = false,
  noAgents: boolean = false
) => {
  const nodesToUse = noAgents ? [] : singleAgent ? [agentNodes[0]] : nodes;
  const edgesToUse = singleAgent ? [] : edges;
  render(
    <ReactFlowProvider>
      <WaldiezProvider
        flowId={flowId}
        storageId={flowId}
        name="Test Flow"
        description="Test Description"
        requirements={['Test Requirement']}
        tags={['Test Tag']}
        nodes={nodesToUse}
        edges={edgesToUse}
        viewport={{ zoom: 1, x: 50, y: 50 }}
        createdAt={createdAt}
        updatedAt={updatedAt}
      >
        <WaldiezFlow
          flowId={flowId}
          storageId={flowId}
          onChange={onChange}
          onRun={onRun}
          onUserInput={onUserInput}
          inputPrompt={includeUserInput ? userInput : null}
        />
      </WaldiezProvider>
    </ReactFlowProvider>
  );
};

let isDarkMode = false;
vi.spyOn(theme, 'isDarkMode');
vi.spyOn(theme, 'setDarkMode');
vi.mock('@waldiez/theme', async importOriginal => {
  const actual = await importOriginal();
  return {
    ...(actual as any),
    isDarkMode: (_flowId: string, _storageId: string) => {
      return isDarkMode;
    },
    setDarkMode: vi.fn()
  };
});

beforeEach(() => {
  isDarkMode = !isDarkMode;
});

afterEach(() => {
  vi.resetAllMocks();
});

describe('WaldiezFlow Modals', () => {
  it('should open the flow modal', () => {
    renderComponent();
    expect(screen.queryByTestId('edit-flow-modal')).toBeNull();
    fireEvent.click(screen.getByTestId('edit-flow'));
    expect(screen.getByTestId('edit-flow-modal')).toBeTruthy();
  });
  it('should open the user input modal', () => {
    renderComponent(true);
    expect(screen.getByTestId(`rf-${flowId}-user-input-modal`)).toBeTruthy();
  });
  it("should open node agent's modal on double click", async () => {
    act(() => {
      renderComponent();
    });
    const firstNode = screen.getByTestId('rf__node-agent-0');
    fireEvent.doubleClick(firstNode);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('submit-agent-data-agent-0'));
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });
  it("should open node edit group manager agent's modal on double click", async () => {
    act(() => {
      renderComponent();
    });
    const firstNode = screen.getByTestId(`rf__node-agent-${edgesCount}`);
    fireEvent.doubleClick(firstNode);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });
  it("should open node edit rag user agent's modal on double click", async () => {
    act(() => {
      renderComponent();
    });
    const firstNode = screen.getByTestId('rf__node-agent-1');
    fireEvent.doubleClick(firstNode);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });
  it('should not open edit modal when double click is on a textarea', async () => {
    act(() => {
      renderComponent();
    });
    const firstNodeTextArea = screen.getByTestId('agent-system-message-agent-0');
    fireEvent.doubleClick(firstNodeTextArea);
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
  });
  it('should open and close the flow modal', async () => {
    act(() => {
      renderComponent();
    });
    fireEvent.click(screen.getByTestId('edit-flow'));
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    const modalTestId = 'edit-flow-modal';
    expect(screen.getByTestId(modalTestId)).toBeTruthy();
    fireEvent.click(screen.getByTestId('modal-close-btn'));
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });
  it("should open a group member's modal", async () => {
    act(() => {
      renderComponent();
    });
    const editButton = screen.getByTitle('Edit member');
    await userEvent.click(editButton as HTMLElement);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });
  it('should remove a group member', async () => {
    act(() => {
      renderComponent();
    });
    const groupMemberId = `group-member-agent-${edgesCount + 1}`;
    expect(screen.getByTestId(groupMemberId)).toBeTruthy();
    const removeButton = screen.queryByTitle('Remove member'); // svg title
    expect(removeButton).toBeTruthy();
    await userEvent.click(removeButton as HTMLElement);
  });
  it('should update flow data on submit', async () => {
    act(() => {
      renderComponent();
    });
    fireEvent.click(screen.getByTestId('edit-flow'));
    const modalTestId = 'edit-flow-modal';
    expect(screen.getByTestId(modalTestId)).toBeTruthy();
    // flowName
    const flowNameInput = screen.getByTestId('edit-flow-name-input');
    expect(flowNameInput).toBeTruthy();
    fireEvent.change(flowNameInput, { target: { value: 'New Flow Name' } });
    // flowDescription
    const flowDescriptionInput = screen.getByTestId('edit-flow-description-input');
    expect(flowDescriptionInput).toBeTruthy();
    fireEvent.change(flowDescriptionInput, {
      target: { value: 'New Flow Description' }
    });
    // submit
    const submitBtn = screen.getByTestId('edit-flow-submit-button');
    expect(submitBtn).toBeTruthy();
    await userEvent.click(submitBtn);
    expect(onChange).toHaveBeenCalled();
  });
});
