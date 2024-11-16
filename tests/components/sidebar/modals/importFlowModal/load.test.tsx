import { flow } from '../../../flow/data';
import { renderFlow } from '../common';
import { flowId } from '../data';
import { act, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

afterEach(() => {
  vi.resetAllMocks();
});

export const loadFlow = async () => {
  fireEvent.click(screen.getByTestId(`import-flow-${flowId}-sidebar-button`));
  const modalTestId = `import-flow-modal-${flowId}`;
  const modalElement = screen.getByTestId(modalTestId) as HTMLDialogElement;
  expect(modalElement).toBeTruthy();
  expect(screen.queryByTestId(`import-flow-modal-preview-step-${flowId}-view`)).not.toBeTruthy();
  const dropZone = screen.getByTestId('drop-zone-area');
  expect(dropZone).toBeTruthy();
  fireEvent.click(dropZone);
  const file = new File([JSON.stringify(flow)], 'test.waldiez');
  const fileInput = screen.getByTestId('drop-zone-file-input');
  expect(fileInput).toBeTruthy();
  await userEvent.upload(fileInput, file);
  const nextButton = screen.getByTestId('wizard-next-btn');
  expect(nextButton).toBeEnabled();
  fireEvent.click(nextButton);
  expect(screen.queryByTestId(`import-flow-modal-preview-step-${flowId}-view`)).toBeTruthy();
};

describe('Sidebar Import flow modal load step', () => {
  it('should open and close the modal', () => {
    act(() => {
      renderFlow();
    });
    fireEvent.click(screen.getByTestId(`import-flow-${flowId}-sidebar-button`));
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    const modalTestId = `import-flow-modal-${flowId}`;
    const modalElement = screen.getByTestId(modalTestId) as HTMLDialogElement;
    expect(modalElement).toBeTruthy();
    const closeButton = modalElement.querySelector('.modal-close-btn');
    expect(closeButton).toBeTruthy();
    fireEvent.click(closeButton as HTMLElement);
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });
  it('should load a flow from a file', async () => {
    act(() => {
      renderFlow();
    });
    await loadFlow();
  });
  it('should clear the loaded flow data', async () => {
    act(() => {
      renderFlow();
    });
    await loadFlow();
    const clearButton = screen.getByTestId('clear-loaded-flow-data');
    expect(clearButton).toBeTruthy();
    fireEvent.click(clearButton);
    expect(screen.queryByTestId(`import-flow-modal-preview-step-${flowId}-view`)).not.toBeTruthy();
  });
});
