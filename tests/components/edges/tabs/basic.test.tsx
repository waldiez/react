import { renderEdge } from '../common';
import { edgeId, edgeProps } from '../data';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import selectEvent from 'react-select-event';

describe('WaldiezEdgeModalTab basic', () => {
  it('changes edge type', async () => {
    renderEdge('chat');
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    // "Message" tab in the modal
    const chatTypeSelect = screen.getByLabelText('Chat Type:');
    expect(chatTypeSelect).toBeInTheDocument();
    selectEvent.openMenu(chatTypeSelect);
    // { label: 'Chat', value: 'chat' },
    // { label: 'Nested Chat', value: 'nested' }
    await selectEvent.select(chatTypeSelect, 'Nested Chat');
    fireEvent.change(chatTypeSelect, {
      label: 'Nested Chat',
      target: { value: 'nested' }
    });
    // no "Message" tab in the modal, "Nested Chat" tab is present
  });
  it('Updates edge label', () => {
    renderEdge('chat');
    const labelInput = screen.getByTestId(`edge-${edgeId}-label-input`) as HTMLInputElement;
    fireEvent.change(labelInput, { target: { value: 'Updated label' } });
    expect(labelInput.value).toBe('Updated label');
  });
  it('discards changes on cancel', () => {
    renderEdge('chat');
    const labelInput = screen.getByTestId(`edge-${edgeId}-label-input`) as HTMLInputElement;
    fireEvent.change(labelInput, { target: { value: 'Updated label' } });
    const cancelButton = screen.getByTestId('modal-cancel-btn');
    fireEvent.click(cancelButton);
    // open again the modal
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    const labelInputAfterCancel = screen.getByTestId(`edge-${edgeId}-label-input`) as HTMLInputElement;
    expect(labelInputAfterCancel.value).toBe('Edge label');
  });
  it('Stores changes on submit', async () => {
    renderEdge('chat');
    const labelInput = screen.getByTestId(`edge-${edgeId}-label-input`) as HTMLInputElement;
    fireEvent.change(labelInput, { target: { value: 'Updated label' } });
    const chatTypeSelect = screen.getByLabelText('Chat Type:');
    selectEvent.openMenu(chatTypeSelect);
    await selectEvent.select(chatTypeSelect, 'Nested Chat');
    fireEvent.change(chatTypeSelect, {
      label: 'Nested Chat',
      target: { value: 'nested' }
    });
    const submitButton = screen.getByTestId('modal-submit-btn');
    fireEvent.click(submitButton);
    // open again the modal
    fireEvent.click(screen.getByTestId(`open-edge-modal-${edgeProps.id}`));
    const labelInputAfterSubmit = screen.getByTestId(`edge-${edgeId}-label-input`) as HTMLInputElement;
    expect(labelInputAfterSubmit.value).toBe('Updated label');
  });
  it('Updates edge description', () => {
    renderEdge('chat');
    const descriptionInput = screen.getByTestId(`edge-${edgeId}-description-input`) as HTMLTextAreaElement;
    fireEvent.change(descriptionInput, {
      target: { value: 'Updated description' }
    });
    expect(descriptionInput.value).toBe('Updated description');
  });
  it('Updates clear history', () => {
    renderEdge('chat');
    const clearHistoryCheckbox = screen.getByTestId(
      `edge-${edgeId}-clear-history-checkbox`
    ) as HTMLInputElement;
    fireEvent.click(clearHistoryCheckbox);
    expect(clearHistoryCheckbox.checked).toBe(true);
  });
  it('Updates max turns', () => {
    renderEdge('chat');
    const maxTurnsInput = screen.getByTestId(`edge-${edgeId}-max-turns-input`) as HTMLInputElement;
    fireEvent.change(maxTurnsInput, { target: { value: '5' } });
    expect(maxTurnsInput.value).toBe('5');
  });
  it('changes the summary method type', async () => {
    renderEdge('chat', {
      summary: {
        method: null,
        prompt: '',
        args: {}
      }
    });
    const summaryMethodSelect = screen.getByLabelText('Summary Method:');
    expect(summaryMethodSelect).toBeInTheDocument();
    selectEvent.openMenu(summaryMethodSelect);
    await selectEvent.select(summaryMethodSelect, 'Last Message');
    fireEvent.change(summaryMethodSelect, {
      target: { label: 'Last Message', value: 'last_msg' }
    });
  });
  it('updates the LLM prompt', () => {
    renderEdge('chat', {
      summary: {
        method: 'reflection_with_llm',
        prompt: '',
        args: { summary_role: 'user' }
      }
    });
    const llmPromptInput = screen.getByTestId(`edge-${edgeId}-llm-prompt-input`) as HTMLTextAreaElement;
    fireEvent.change(llmPromptInput, {
      target: { value: 'Updated LLM prompt' }
    });
    expect(llmPromptInput.value).toBe('Updated LLM prompt');
  });
  it('updates the LLM summary role', async () => {
    renderEdge('chat', {
      summary: {
        method: 'reflection_with_llm',
        prompt: '',
        args: { summary_role: 'user' }
      }
    });
    const llmSummaryRoleSelect = screen.getByLabelText('Summary Role:');
    expect(llmSummaryRoleSelect).toBeInTheDocument();
    selectEvent.openMenu(llmSummaryRoleSelect);
    await selectEvent.select(llmSummaryRoleSelect, 'Assistant');
    fireEvent.change(llmSummaryRoleSelect, {
      target: { label: 'Assistant', value: 'assistant' }
    });
  });
});
describe('WaldiezEdgeModalTabGroup', () => {
  it('updates a group chat label', () => {
    renderEdge('group');
    const labelInput = screen.getByTestId(`edge-${edgeId}-label-input`) as HTMLInputElement;
    fireEvent.change(labelInput, { target: { value: 'Updated label' } });
    expect(labelInput.value).toBe('Updated label');
  });
});
