import { renderAgent, submitAgentChanges } from '../../common';
import { agentId, flowId } from '../../data';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import selectEvent from 'react-select-event';

const goToNestedChatsTab = (isReply: boolean) => {
  renderAgent('user', {
    openModal: true,
    includeNestedChats: true,
    dataOverrides: {
      nestedChats: [
        {
          triggeredBy: [{ id: 'test-edge0', isReply }],
          messages: [{ id: 'test-edge-1', isReply: true }]
        }
      ]
    }
  });
  // Click on the Nested Chats tab
  const nestedChatsTab = screen.getByTestId(`tab-id-wf-${flowId}-agent-nestedChats-${agentId}`);
  expect(nestedChatsTab).toBeInTheDocument();
  fireEvent.click(nestedChatsTab);
};

describe('Nested Chats tab triggers', () => {
  it('should add a new trigger', async () => {
    goToNestedChatsTab(false);
    const selectTrigger = screen.getByLabelText('Trigger');
    expect(selectTrigger).toBeInTheDocument();
    selectEvent.openMenu(selectTrigger);
    await selectEvent.select(selectTrigger, `${agentId} to agent-2`);
    fireEvent.change(selectTrigger, {
      target: {
        label: `${agentId} to agent-2`,
        value: 'test-edge2'
      }
    });
    const addTriggerButton = screen.getByTestId(`new-nested-chat-add-button-${agentId}`);
    expect(addTriggerButton).toBeInTheDocument();
    fireEvent.click(addTriggerButton);
    expect(screen.getByTestId('remove-nested-chat-trigger-1')).toBeInTheDocument();
    submitAgentChanges();
  });
  it('should add a new trigger with agent reply', async () => {
    goToNestedChatsTab(true);
    const selectTrigger = screen.getByLabelText('Trigger');
    expect(selectTrigger).toBeInTheDocument();
    selectEvent.openMenu(selectTrigger);
    await selectEvent.select(selectTrigger, `${agentId} to agent-2`);
    const agentReplyCheckbox = screen.getByTestId(`new-nested-chat-trigger-is-agent-reply-${agentId}`);
    expect(agentReplyCheckbox).toBeInTheDocument();
    fireEvent.click(agentReplyCheckbox);
    fireEvent.change(selectTrigger, {
      target: {
        label: `${agentId} to agent-2`,
        value: 'test-edge2'
      }
    });
    const addTriggerButton = screen.getByTestId(`new-nested-chat-add-button-${agentId}`);
    expect(addTriggerButton).toBeInTheDocument();
    fireEvent.click(addTriggerButton);
    expect(screen.getByTestId('remove-nested-chat-trigger-1')).toBeInTheDocument();
    submitAgentChanges();
  });
  it('should remove a trigger', async () => {
    goToNestedChatsTab(false);
    const removeTriggerButton = screen.getByTestId('remove-nested-chat-trigger-0');
    expect(removeTriggerButton).toBeInTheDocument();
    fireEvent.click(removeTriggerButton);
    submitAgentChanges();
  });
});
