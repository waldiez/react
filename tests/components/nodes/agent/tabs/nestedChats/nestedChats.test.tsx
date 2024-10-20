import { renderAgent } from '../../common';
import { agentId, flowId } from '../../data';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('Nested Chats tab main', () => {
  it('should not render the Nested Chats tab if the agent has no connections', async () => {
    renderAgent('user');
    expect(screen.queryByTestId(`tab-id-wf-${flowId}-agent-nestedChats-${agentId}`)).toBeNull();
  });
  it('should render the Nested Chats tab if the agent has connections', async () => {
    renderAgent('user', {
      openModal: true,
      includeNestedChats: true,
      dataOverrides: {
        nestedChats: [
          {
            triggeredBy: [{ id: 'test-edge0', isReply: false }],
            messages: [{ id: 'test-edge-1', isReply: true }]
          }
        ]
      }
    });
    // Click on the Nested Chats tab
    const nestedChatsTab = screen.getByTestId(`tab-id-wf-${flowId}-agent-nestedChats-${agentId}`);
    expect(nestedChatsTab).toBeInTheDocument();
    fireEvent.click(nestedChatsTab);
  });
});
