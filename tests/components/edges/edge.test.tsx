import { renderEdge } from './common';
import { edgeProps, flowId } from './data';
import { fireEvent, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

const edgeLabelTestId = 'edge-label-we-1';

describe('WaldiezEdgeHidden', () => {
  it('should render', () => {
    renderEdge('hidden', { order: 0 });
  });
  it('should be hidden', () => {
    renderEdge('hidden', { order: 2 });
    expect(screen.queryByTestId(edgeLabelTestId)).toBeNull();
  });
});

describe('WaldiezEdgeChat', () => {
  afterEach(() => {
    (HTMLDialogElement.prototype.showModal as any).mockClear();
  });
  it('should render', () => {
    renderEdge('chat', { order: 'invalid' }, false);
  });
  it('should not be hidden', () => {
    renderEdge('chat', { order: -1 }, false);
    expect(screen.queryByTestId(edgeLabelTestId)).not.toBeNull();
  });
  it('should display the edge description', () => {
    renderEdge('chat', { order: 0 }, false);
    const descriptionTextArea = screen.getByTestId(`edge-${edgeProps.id}-description`);
    expect(descriptionTextArea).toHaveValue(edgeProps.data.description);
  });
  it('should call delete edge', () => {
    renderEdge('chat', { order: 1 }, false);
    fireEvent.click(screen.getByTestId(`delete-edge-${edgeProps.id}`));
  });
  it('should open the edge modal', () => {
    renderEdge('chat', { order: 2 }, false);
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });
  it('should change the tab in the modal', () => {
    renderEdge('chat', { order: 3 }, false);
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    const tab = screen.getByTestId(`tab-id-we-${flowId}-edge-message-${edgeProps.id}`);
    fireEvent.click(tab);
  });
});

describe('WaldiezEdgeNested', () => {
  afterEach(() => {
    (HTMLDialogElement.prototype.showModal as any).mockClear();
  });
  it('should render', () => {
    renderEdge('nested', { order: 'invalid' }, false);
  });
  it('should not be hidden', () => {
    renderEdge('nested', { order: -1 }, false);
    expect(screen.queryByTestId(edgeLabelTestId)).not.toBeNull();
  });
  it('should display the edge description', () => {
    renderEdge('nested', { order: 0 }, false);
    expect(screen.getByTestId(`edge-${edgeProps.id}-description`)).toHaveValue(edgeProps.data.description);
  });
  it('should call delete edge', () => {
    renderEdge('nested', { order: 1 }, false);
    fireEvent.click(screen.getByTestId(`delete-edge-${edgeProps.id}`));
  });
  it('should open the edge modal', () => {
    renderEdge('nested', { order: 2 }, false);
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });
  it('should change the tab in the modal', () => {
    renderEdge('nested', { order: 3 }, false);
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    const tab = screen.getByTestId(`tab-id-we-${flowId}-edge-nested-${edgeProps.id}`);
    fireEvent.click(tab);
  });
  it('should change the nested sub-tab in the modal', () => {
    renderEdge('nested', { order: 4 }, false);
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    const tab = screen.getByTestId(`tab-id-we-${flowId}-edge-nested-${edgeProps.id}`);
    fireEvent.click(tab);
    const subTab = screen.getByTestId(`tab-id-we-${flowId}-edge-nested-chat-${edgeProps.id}-reply`);
    fireEvent.click(subTab);
  });
});

describe('WaldiezEdgeGroup', () => {
  afterEach(() => {
    (HTMLDialogElement.prototype.showModal as any).mockClear();
  });
  it('should render', () => {
    renderEdge('group', { order: 'invalid' }, false);
  });
  it('should not be hidden', () => {
    renderEdge('group', { order: 1 }, false);
    expect(screen.queryByTestId(edgeLabelTestId)).not.toBeNull();
  });
  it('should display the edge description', () => {
    renderEdge('group', { order: 0 }, false);
    expect(screen.getByTestId(`edge-${edgeProps.id}-description`)).toHaveValue(edgeProps.data.description);
  });
  it('should call delete edge', () => {
    renderEdge('group', { order: 1 }, false);
    fireEvent.click(screen.getByTestId(`delete-edge-${edgeProps.id}`));
  });
  it('should open the edge modal', () => {
    renderEdge('group', { order: 2 }, false);
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    const dialog = screen.getByTestId(`edge-modal-${edgeProps.id}`);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    expect(dialog).not.toBeNull();
    const closeBtn = dialog.querySelector('.modal-close-btn');
    expect(closeBtn).not.toBeNull();
  });
});
