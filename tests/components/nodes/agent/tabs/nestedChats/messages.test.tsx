import { renderAgent, submitAgentChanges } from '../../common';
import { agentId, flowId } from '../../data';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import selectEvent from 'react-select-event';

const goToNestedChatsTab = (isReply: boolean, skipMessages: boolean = false) => {
  renderAgent('user', {
    openModal: true,
    includeNestedChats: true,
    dataOverrides: {
      nestedChats: [
        {
          triggeredBy: ['test-agent0'],
          messages: skipMessages ? [] : [{ id: 'test-edge-1', isReply }]
        }
      ]
    }
  });
  // Click on the Nested Chats tab
  const nestedChatsTab = screen.getByTestId(`tab-id-wf-${flowId}-agent-nestedChats-${agentId}`);
  expect(nestedChatsTab).toBeInTheDocument();
  fireEvent.click(nestedChatsTab);
};

describe('Nested Chats tab messages', () => {
  it('should warn if no messages are included', async () => {
    goToNestedChatsTab(false, true);
    expect(screen.getByText('No messages to include')).toBeInTheDocument();
  });
  it('should display the current messages', async () => {
    goToNestedChatsTab(false);
    expect(screen.getByTestId(`nested-chat-message-${agentId}-0`)).toBeInTheDocument();
  });
  it('should add a new message', async () => {
    goToNestedChatsTab(true);
    const selectRecipient = screen.getByLabelText('Recipient');
    expect(selectRecipient).toBeInTheDocument();
    selectEvent.openMenu(selectRecipient);
    await selectEvent.select(selectRecipient, `${agentId} to agent-4`);
    const addMessageButton = screen.getByTestId(`new-nested-chat-add-recipient-${agentId}`);
    expect(addMessageButton).toBeInTheDocument();
    fireEvent.click(addMessageButton);
    fireEvent.change(selectRecipient, {
      target: {
        label: `${agentId} to agent-4`,
        value: 'agent-4'
      }
    });
    expect(screen.getByTestId('remove-nested-chat-recipient-1')).toBeInTheDocument();
    submitAgentChanges();
  });
  it('should add a new message with agent reply', async () => {
    goToNestedChatsTab(false);
    const selectRecipient = screen.getByLabelText('Recipient');
    expect(selectRecipient).toBeInTheDocument();
    selectEvent.openMenu(selectRecipient);
    await selectEvent.select(selectRecipient, `${agentId} to agent-4`);
    const agentReplyCheckbox = screen.getByTestId(`new-nested-chat-recipient-is-agent-reply-${agentId}`);
    expect(agentReplyCheckbox).toBeInTheDocument();
    fireEvent.click(agentReplyCheckbox);
    fireEvent.change(selectRecipient, {
      target: {
        label: `${agentId} to agent-4`,
        value: 'agent-4'
      }
    });
    const addMessageButton = screen.getByTestId(`new-nested-chat-add-recipient-${agentId}`);
    expect(addMessageButton).toBeInTheDocument();
    fireEvent.click(addMessageButton);
    expect(screen.getByTestId('remove-nested-chat-recipient-1')).toBeInTheDocument();
    submitAgentChanges();
  });
  it('should remove a message', async () => {
    goToNestedChatsTab(false);
    const removeMessageButton = screen.getByTestId('remove-nested-chat-recipient-0');
    expect(removeMessageButton).toBeInTheDocument();
    fireEvent.click(removeMessageButton);
    submitAgentChanges();
  });
  it('should reorder messages', async () => {
    goToNestedChatsTab(false);
    const selectRecipient = screen.getByLabelText('Recipient');
    expect(selectRecipient).toBeInTheDocument();
    selectEvent.openMenu(selectRecipient);
    await selectEvent.select(selectRecipient, `${agentId} to agent-4`);
    const addMessageButton = screen.getByTestId(`new-nested-chat-add-recipient-${agentId}`);
    expect(addMessageButton).toBeInTheDocument();
    fireEvent.click(addMessageButton);
    fireEvent.change(selectRecipient, {
      target: {
        label: `${agentId} to agent-4`,
        value: 'agent-4'
      }
    });
    const upButton = screen.getByTestId('nested-chat-reorder-up-1');
    expect(upButton).toBeInTheDocument();
    fireEvent.click(upButton);
    const downButton = screen.getByTestId('nested-chat-reorder-down-0');
    expect(downButton).toBeInTheDocument();
    fireEvent.click(downButton);
    submitAgentChanges();
  });
});
