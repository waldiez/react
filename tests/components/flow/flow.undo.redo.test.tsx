import { renderFlow} from './common';
import { act, fireEvent, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import userEvent, { UserEvent } from '@testing-library/user-event'

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
    const clonedAgentView = screen.queryByText('Node 0 (copy)');
    expect(clonedAgentView).toBeTruthy();
    await user.keyboard('{Control>}z{/Control}');
    vi.advanceTimersByTime(50);
    const clonedAgentViewAfterUndo = screen.queryByText('Node 0 (copy)');
    expect(clonedAgentViewAfterUndo).toBeNull();
};

describe('Flow Undo Redo', () => {
  const user = userEvent.setup();
  it('should undo an action', async () => {
    await undoAction(user);
  });
  it('should redo an action using ctrl+y', async () => {
    await undoAction(user);
    await user.keyboard('{Control>}y{/Control}');
    vi.advanceTimersByTime(50);
    const clonedAgentViewAfterRedo = screen.queryByText('Node 0 (copy)');
    expect(clonedAgentViewAfterRedo).toBeTruthy();
  });
});
