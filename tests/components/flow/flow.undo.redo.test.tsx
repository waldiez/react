import { renderFlow } from './common';
import { act, fireEvent, screen } from '@testing-library/react';
import userEvent, { UserEvent } from '@testing-library/user-event';
import { describe, it } from 'vitest';

const undoAction = async (user: UserEvent) => {
  act(() => {
    renderFlow();
  });
  fireEvent.click(screen.getByTestId('show-agents'));
  const agentFooter = screen.getByTestId('agent-footer-agent-0');
  expect(agentFooter).toBeTruthy();
  const cloneDiv = agentFooter.querySelector('.clone-agent');
  expect(cloneDiv).toBeTruthy();
  fireEvent.click(cloneDiv as HTMLElement);
  vi.advanceTimersByTime(50);
  const clonedAgentView = screen.queryAllByText('Node 0 (copy)');
  expect(clonedAgentView.length).toBeGreaterThanOrEqual(1);
  await user.keyboard('{Control>}z{/Control}');
  vi.advanceTimersByTime(50);
  const clonedAgentViewAfterUndo = screen.queryAllByText('Node 0 (copy)');
  expect(clonedAgentViewAfterUndo).toHaveLength(0);
};

describe('Flow Undo Redo', () => {
  const user = userEvent.setup();
  it('should undo an action', async () => {
    await undoAction(user);
  });
  it('should redo an action', async () => {
    await undoAction(user);
    await user.keyboard('{Control>}y{/Control}');
    vi.advanceTimersByTime(50);
    const clonedAgentViewAfterRedo = screen.queryAllByText('Node 0 (copy)');
    expect(clonedAgentViewAfterRedo.length).toBeGreaterThanOrEqual(1);
  });
});
