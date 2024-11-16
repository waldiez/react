import { onChange, renderFlow } from '../common';
import { description, flowId, name } from '../data';
import { act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  vi.resetAllMocks();
});

describe('Sidebar Edit flow modal', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it('should open and close the modal', () => {
    act(() => {
      renderFlow();
    });
    fireEvent.click(screen.getByTestId(`edit-flow-${flowId}-sidebar-button`));
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    const modalTestId = `edit-flow-modal-${flowId}`;
    const modalElement = screen.getByTestId(modalTestId) as HTMLDialogElement;
    expect(modalElement).toBeTruthy();
    const closeButton = modalElement.querySelector('.modal-close-btn');
    expect(closeButton).toBeTruthy();
    fireEvent.click(closeButton as HTMLElement);
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });

  it('should switch to second tab', () => {
    act(() => {
      renderFlow();
    });
    const extrasPanelTestId = `edit-flow-${flowId}-modal-other-view`;
    expect(screen.queryByTestId(extrasPanelTestId)).toBeNull();
    fireEvent.click(screen.getByTestId(`edit-flow-${flowId}-sidebar-button`));
    const extrasTab = screen.getByTestId(`tab-id-rf-${flowId}-edit-flow-modal-extras`);
    fireEvent.click(extrasTab);
    expect(screen.getByTestId(extrasPanelTestId)).toBeTruthy();
  });
  it('should update flow data on submit', async () => {
    act(() => {
      renderFlow();
    });
    fireEvent.click(screen.getByTestId(`edit-flow-${flowId}-sidebar-button`));
    const modalTestId = `edit-flow-modal-${flowId}`;
    expect(screen.getByTestId(modalTestId)).toBeTruthy();
    // flowName
    const flowNameInput = screen.getByTestId(`edit-flow-${flowId}-name-input`);
    expect(flowNameInput).toBeTruthy();
    fireEvent.change(flowNameInput, { target: { value: 'New Flow Name' } });
    // flowDescription
    const flowDescriptionInput = screen.getByTestId(`edit-flow-${flowId}-description-input`);
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
  it('should discard changes on cancel', () => {
    act(() => {
      renderFlow();
    });
    fireEvent.click(screen.getByTestId(`edit-flow-${flowId}-sidebar-button`));
    const modalTestId = `edit-flow-modal-${flowId}`;
    expect(screen.getByTestId(modalTestId)).toBeTruthy();
    // flowName
    const flowNameInput = screen.getByTestId(`edit-flow-${flowId}-name-input`);
    expect(flowNameInput).toBeTruthy();
    fireEvent.change(flowNameInput, { target: { value: `${name} update` } });
    // flowDescription
    const flowDescriptionInput = screen.getByTestId(`edit-flow-${flowId}-description-input`);
    expect(flowDescriptionInput).toBeTruthy();
    fireEvent.change(flowDescriptionInput, {
      target: { value: `${description} update` }
    });
    // cancel
    const cancelBtn = screen.getByTestId('edit-flow-cancel-button');
    expect(cancelBtn).toBeTruthy();
    fireEvent.click(cancelBtn);
    // open modal again
    fireEvent.click(screen.getByTestId(`edit-flow-${flowId}-sidebar-button`));
    // check if changes were discarded
    const flowNameInputAfter = screen.getByTestId(`edit-flow-${flowId}-name-input`);
    expect(flowNameInputAfter).toHaveValue(name);
    const flowDescriptionInputAfter = screen.getByTestId(`edit-flow-${flowId}-description-input`);
    expect(flowDescriptionInputAfter).toHaveValue(description);
  });
});
