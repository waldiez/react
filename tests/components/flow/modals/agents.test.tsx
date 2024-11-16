import { edgesCount } from '../data';
import { renderFlow } from './common';
import { act, fireEvent, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';

describe('WaldiezFlow Agent modals', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });
  it("should open node agent's modal on double click", () => {
    act(() => {
      renderFlow();
    });
    const firstNode = screen.getByTestId('rf__node-agent-0');
    fireEvent.doubleClick(firstNode);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    fireEvent.click(screen.getByTestId('submit-agent-data-agent-0'));
    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });
  it("should open node edit group manager agent's modal on double click", () => {
    act(() => {
      renderFlow();
    });
    const firstNode = screen.getByTestId(`rf__node-agent-${edgesCount}`);
    fireEvent.doubleClick(firstNode);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });
  it("should open node edit rag user agent's modal on double click", () => {
    act(() => {
      renderFlow();
    });
    const firstNode = screen.getByTestId('rf__node-agent-1');
    fireEvent.doubleClick(firstNode);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });
  it('should not open edit modal when double click is on a textarea', () => {
    act(() => {
      renderFlow();
    });
    const firstNodeTextArea = screen.getByTestId('agent-description-agent-0');
    fireEvent.doubleClick(firstNodeTextArea);
    expect(HTMLDialogElement.prototype.showModal).not.toHaveBeenCalled();
  });
  it("should open a group member's modal", () => {
    act(() => {
      renderFlow();
    });
    const editButton = screen.getByTitle('Edit member');
    fireEvent.click(editButton as HTMLElement);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });
});
