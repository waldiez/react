import { renderEdge } from './common';
import { edgeProps, flowId } from './data';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const edgeLabelTestId = 'edge-label-we-1';

describe('WaldieEdgeHidden', () => {
  it('should render', () => {
    renderEdge('hidden', { order: 0 });
  });
  it('should be hidden', () => {
    renderEdge('hidden', { order: 2 });
    expect(screen.queryByTestId(edgeLabelTestId)).toBeNull();
  });
});

describe('WaldieEdgeChat', () => {
  it('should render', () => {
    renderEdge('chat', { order: 'invalid' });
  });
  it('should not be hidden', () => {
    renderEdge('chat', { order: -1 });
    expect(screen.queryByTestId(edgeLabelTestId)).not.toBeNull();
  });
  it('should display the edge label', () => {
    renderEdge('chat', { order: 0 });
    expect(screen.getByTestId(`edge-${edgeProps.id}-label`)).not.toBeNull();
  });
  it('should call delete edge', () => {
    renderEdge('chat', { order: 1 });
    fireEvent.click(screen.getByTestId(`delete-edge-${edgeProps.id}`));
  });
  it('should open the edge modal', () => {
    renderEdge('chat', { order: 2 });
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    // expect(screen.getByTestId('modal-close-btn')).not.toBeNull();
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });
  it('should change the tab in the modal', () => {
    renderEdge('chat', { order: 3 });
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    const tab = screen.getByTestId(`tab-id-we-${flowId}-edge-message-${edgeProps.id}`);
    fireEvent.click(tab);
  });
});

describe('WaldieEdgeNested', () => {
  it('should render', () => {
    renderEdge('nested', { order: 'invalid' });
  });
  it('should not be hidden', () => {
    renderEdge('nested', { order: -1 });
    expect(screen.queryByTestId(edgeLabelTestId)).not.toBeNull();
  });
  it('should display the edge label', () => {
    renderEdge('nested', { order: 0 });
    expect(screen.getByTestId(`edge-${edgeProps.id}-label`)).not.toBeNull();
  });
  it('should call delete edge', () => {
    renderEdge('nested', { order: 1 });
    fireEvent.click(screen.getByTestId(`delete-edge-${edgeProps.id}`));
  });
  it('should open the edge modal', () => {
    renderEdge('nested', { order: 2 });
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    // expect(screen.getByTestId('modal-close-btn')).not.toBeNull();
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });
  it('should change the tab in the modal', () => {
    renderEdge('nested', { order: 3 });
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    const tab = screen.getByTestId(`tab-id-we-${flowId}-edge-nested-${edgeProps.id}`);
    fireEvent.click(tab);
  });
  it('should change the nested sub-tab in the modal', () => {
    renderEdge('nested', { order: 4 });
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    const tab = screen.getByTestId(`tab-id-we-${flowId}-edge-nested-${edgeProps.id}`);
    fireEvent.click(tab);
    const subTab = screen.getByTestId(`tab-id-we-${flowId}-edge-nested-chat-${edgeProps.id}-reply`);
    fireEvent.click(subTab);
  });
});

describe('WaldieEdgeGroup', () => {
  it('should render', () => {
    renderEdge('group', { order: 'invalid' });
  });
  it('should not be hidden', () => {
    renderEdge('group', { order: 1 });
    expect(screen.queryByTestId(edgeLabelTestId)).not.toBeNull();
  });
  it('should display the edge label', () => {
    renderEdge('group', { order: 0 });
    expect(screen.getByTestId(`edge-${edgeProps.id}-label`)).not.toBeNull();
  });
  it('should call delete edge', () => {
    renderEdge('group', { order: 1 });
    fireEvent.click(screen.getByTestId(`delete-edge-${edgeProps.id}`));
  });
  it('should open the edge modal', () => {
    renderEdge('group', { order: 2 });
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    expect(screen.getByTestId('modal-close-btn')).not.toBeNull();
  });
});
