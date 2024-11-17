import { renderFlow } from '../common';
import { flowId } from '../data';
import { act, fireEvent, screen } from '@testing-library/react';

// import userEvent from '@testing-library/user-event';

afterEach(() => {
  vi.resetAllMocks();
});

describe('Sidebar Import flow modal', () => {
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
  it('should not display the preview step if the flow data is not loaded', () => {
    act(() => {
      renderFlow();
    });
    fireEvent.click(screen.getByTestId(`import-flow-${flowId}-sidebar-button`));
    const modalTestId = `import-flow-modal-${flowId}`;
    const modalElement = screen.getByTestId(modalTestId) as HTMLDialogElement;
    expect(modalElement).toBeTruthy();
    const previewStep = screen.queryByTestId(`import-flow-modal-preview-step-${flowId}`);
    expect(previewStep).toBeFalsy();
    const nextButton = screen.getByTestId('wizard-next-btn');
    expect(nextButton).toBeDisabled();
  });
});