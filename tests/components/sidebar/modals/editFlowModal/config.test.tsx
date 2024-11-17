import { edges, renderFlow } from '../common';
import { flowId } from '../data';
import { act, fireEvent, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

import selectEvent from 'react-select-event';

describe('Sidebar Edit flow modal config tab', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('should update the flow name', () => {
    act(() => {
      renderFlow();
    });
    fireEvent.click(screen.getByTestId(`edit-flow-${flowId}-sidebar-button`));
    const flowNameInput = screen.getByTestId(`edit-flow-${flowId}-name-input`);
    expect(flowNameInput).toBeTruthy();
    fireEvent.change(flowNameInput, { target: { value: 'New Flow Name' } });
    expect(flowNameInput).toHaveValue('New Flow Name');
  });
  it('should update the flow description', () => {
    act(() => {
      renderFlow();
    });
    fireEvent.click(screen.getByTestId(`edit-flow-${flowId}-sidebar-button`));
    const flowDescriptionInput = screen.getByTestId(`edit-flow-${flowId}-description-input`);
    expect(flowDescriptionInput).toBeTruthy();
    fireEvent.change(flowDescriptionInput, { target: { value: 'New Flow Description' } });
    expect(flowDescriptionInput).toHaveValue('New Flow Description');
  });
  it('should handle adding a new edge to the flow', async () => {
    act(() => {
      renderFlow([-2, -1, 0, 1, 2]);
    });
    fireEvent.click(screen.getByTestId(`edit-flow-${flowId}-sidebar-button`));
    const newEdgeSelect = screen.getByLabelText('Add new chat');
    selectEvent.openMenu(newEdgeSelect);
    await selectEvent.select(newEdgeSelect, 'Edge 0');
    fireEvent.change(newEdgeSelect, {
      target: { label: 'Edge 0', value: edges[0] }
    });
    const addEdgeButton = screen.getByTestId('add-edge-to-flow-button');
    fireEvent.click(addEdgeButton);
    // add checks for the new edge (before and after?)
  });
  it('should remove an edge from the flow', () => {
    act(() => {
      renderFlow([-1, 0, 1, 2]);
    });
    fireEvent.click(screen.getByTestId(`edit-flow-${flowId}-sidebar-button`));
    const deleteEdgeButton = screen.getByTestId('remove-edge-button-0');
    fireEvent.click(deleteEdgeButton);
    // add checks for the removed edge
  });
  it('should reorder the edges', () => {
    act(() => {
      renderFlow([-1, 0, 1, 2]);
    });
    fireEvent.click(screen.getByTestId(`edit-flow-${flowId}-sidebar-button`));
    const moveEdgeUpButton = screen.getByTestId('move-edge-up-button-1');
    fireEvent.click(moveEdgeUpButton);
    const moveEdgeDownButton = screen.getByTestId('move-edge-down-button-1');
    fireEvent.click(moveEdgeDownButton);
    // add checks for the reordered edges
  });
});