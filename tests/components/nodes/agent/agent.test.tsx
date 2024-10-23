import { renderAgent, submitAgentChanges } from './common';
import { agentId, flowId, getAgentData } from './data';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

describe('WaldiezAgentNode', () => {
  it('should render', () => {
    renderAgent('user');
  });
  it("should open a user's modal", () => {
    renderAgent('user');
    const editButton = screen.getByTestId(`open-node-modal-${agentId}`);
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });
  it("should open an assistant's modal", () => {
    renderAgent('assistant');
    const editButton = screen.getByTestId(`open-node-modal-${agentId}`);
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });
  it("should open a manager's modal", () => {
    renderAgent('manager');
    const editButton = screen.getByTestId(`open-node-modal-${agentId}`);
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });
  it("should open a rag user's modal", () => {
    renderAgent('rag_user');
    const editButton = screen.getByTestId(`open-node-modal-${agentId}`);
    expect(editButton).toBeInTheDocument();
    fireEvent.click(editButton);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });
  it('should import a user agent', async () => {
    renderAgent('assistant', { openModal: true });
    const labelView = screen.getByTestId(`agent-header-label-${agentId}`);
    expect(labelView).toHaveTextContent('Assistant');
    const agentData = getAgentData('user');
    const importInput = screen.getByTestId(`file-upload-agent-${flowId}-${agentId}`);
    const importData = {
      id: agentId,
      type: 'agent',
      agentType: 'user',
      name: 'User',
      data: { ...(agentData as any) }
    };
    await userEvent.upload(importInput, [new File([JSON.stringify(importData)], 'test.waldieAgent')]);
    vi.advanceTimersByTime(100);
    expect(labelView).toHaveTextContent('User');
    submitAgentChanges();
  });
  it('should import an assistant agent', async () => {
    renderAgent('user', { openModal: true });
    const labelView = screen.getByTestId(`agent-header-label-${agentId}`);
    expect(labelView).toHaveTextContent('User');
    const agentData = getAgentData('assistant');
    const importInput = screen.getByTestId(`file-upload-agent-${flowId}-${agentId}`);
    const importData = {
      id: agentId,
      type: 'agent',
      agentType: 'assistant',
      name: 'Assistant',
      data: { ...(agentData as any) }
    };
    await userEvent.upload(importInput, [new File([JSON.stringify(importData)], 'test.waldieAgent')]);
    expect(labelView).toHaveTextContent('Assistant');
    submitAgentChanges();
  });
  it('should import a manager agent', async () => {
    renderAgent('assistant', { openModal: true });
    const labelView = screen.getByTestId(`agent-header-label-${agentId}`);
    expect(labelView).toHaveTextContent('Assistant');
    const agentData = getAgentData('manager');
    const importInput = screen.getByTestId(`file-upload-agent-${flowId}-${agentId}`);
    const importData = {
      id: agentId,
      type: 'agent',
      agentType: 'manager',
      name: 'Manager',
      data: { ...(agentData as any) }
    };
    await userEvent.upload(importInput, [new File([JSON.stringify(importData)], 'test.waldieAgent')]);
    expect(labelView).toHaveTextContent('Manager');
    submitAgentChanges();
  });

  it('should import a rag user agent', async () => {
    renderAgent('user', { openModal: true });
    const labelView = screen.getByTestId(`agent-header-label-${agentId}`);
    expect(labelView).toHaveTextContent('User');
    const agentData = getAgentData('rag_user');
    const importInput = screen.getByTestId(`file-upload-agent-${flowId}-${agentId}`);
    const importData = {
      id: agentId,
      type: 'agent',
      agentType: 'rag_user',
      name: 'Rag User',
      data: { ...(agentData as any) }
    };
    await userEvent.upload(importInput, [new File([JSON.stringify(importData)], 'test.waldieAgent')]);
    expect(labelView).toHaveTextContent('RAG User');
    submitAgentChanges();
  });
  it('should export a user agent', () => {
    renderAgent('user', {
      openModal: true,
      dataOverrides: {
        nestedChats: [
          {
            triggeredBy: [{ id: 'test', isReply: false }],
            messages: [{ id: 'test', isReply: true }]
          }
        ]
      }
    });
    const exportButton = screen.getByTestId(`export-agent-${flowId}-${agentId}`);
    fireEvent.click(exportButton);
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalled();
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });
  it('should export a rag user agent', () => {
    renderAgent('rag_user', {
      openModal: true,
      dataOverrides: {
        nestedChats: [
          {
            triggeredBy: [{ id: 'test', isReply: false }],
            messages: [{ id: 'test', isReply: true }]
          }
        ]
      }
    });
    const exportButton = screen.getByTestId(`export-agent-${flowId}-${agentId}`);
    fireEvent.click(exportButton);
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalled();
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });
  it('should export an assistant agent', () => {
    renderAgent('assistant', {
      openModal: true,
      dataOverrides: {
        codeExecutionConfig: {
          workDir: undefined,
          useDocker: false,
          timeout: 10,
          lastNMessages: 'auto',
          functions: ['skill1', 'skill2']
        }
      }
    });
    const exportButton = screen.getByTestId(`export-agent-${flowId}-${agentId}`);
    fireEvent.click(exportButton);
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalled();
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });
  it('should export a manager agent', () => {
    renderAgent('manager', {
      openModal: true,
      dataOverrides: {
        codeExecutionConfig: {
          workDir: undefined,
          useDocker: false,
          timeout: 10,
          lastNMessages: 'auto',
          functions: []
        }
      }
    });
    const exportButton = screen.getByTestId(`export-agent-${flowId}-${agentId}`);
    fireEvent.click(exportButton);
    expect(window.URL.createObjectURL).toHaveBeenCalled();
    expect(window.URL.revokeObjectURL).toHaveBeenCalled();
    expect(HTMLAnchorElement.prototype.click).toHaveBeenCalled();
  });
});
