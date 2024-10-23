import { onChange, renderFlow } from './common';
import { edgesCount } from './data';
import { act, fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

describe('WaldiezFlow Nodes and Edges', () => {
  it('should add a model node', () => {
    renderFlow();
    expect(screen.queryByTestId('model-0')).toBeNull();
    fireEvent.click(screen.getByTestId('show-models'));
    fireEvent.click(screen.getByTestId('add-model-node'));
  });
  it('should add a skill node', () => {
    renderFlow();
    expect(screen.queryByTestId('skill-0')).toBeNull();
    fireEvent.click(screen.getByTestId('show-skills'));
    fireEvent.click(screen.getByTestId('add-skill-node'));
  });
  it('should detach an agent node from its parent', async () => {
    act(() => {
      renderFlow();
    });
    vi.advanceTimersByTime(500);
    const groupMemberId = `group-member-agent-${edgesCount + 1}`;
    expect(screen.getByTestId(groupMemberId)).toBeTruthy();
    const removeButton = screen.queryByTitle('Remove member'); // svg title
    expect(removeButton).toBeTruthy();
    // await userEvent.click(removeButton as HTMLElement);
    fireEvent.click(removeButton as HTMLElement);
    vi.advanceTimersByTime(500);
    expect(screen.queryByTestId(groupMemberId)).toBeNull();
  });
  it('should open edge edit modal on double click', async () => {
    act(() => {
      renderFlow();
    });
    const firstEdge = screen.getByTestId('rf__edge-edge-0');
    fireEvent.doubleClick(firstEdge);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });
  it('should call on edgesChange when edge is un-selected', async () => {
    act(() => {
      renderFlow();
    });
    fireEvent.click(screen.getByTestId('rf__edge-edge-0'));
    fireEvent.click(screen.getByTestId('rf__edge-edge-1'));
    expect(onChange).toHaveBeenCalled();
  });
  it("should display the agent's linked models", async () => {
    act(() => {
      renderFlow({
        withLinkedModels: true
      });
    });
    const linkedModelNameView = screen.getByTestId('agent-agent-0-linked-model-0');
    expect(linkedModelNameView.textContent).toBe('Model Node 0');
  });
  it("should display the agents' linked skills", async () => {
    act(() => {
      renderFlow({
        withLinkedSkills: true
      });
    });
    const linkedSkillNameView = screen.getByTestId('agent-agent-0-linked-skill-0');
    expect(linkedSkillNameView.textContent).toBe('Skill Node 0');
  });
  it("should display the agents' linked models and skills", async () => {
    act(() => {
      renderFlow({
        withLinkedModels: true,
        withLinkedSkills: true
      });
    });
    const linkedModelNameView = screen.getByTestId('agent-agent-0-linked-model-0');
    expect(linkedModelNameView.textContent).toBe('Model Node 0');
    const linkedSkillNameView = screen.getByTestId('agent-agent-0-linked-skill-0');
    expect(linkedSkillNameView.textContent).toBe('Skill Node 0');
  });
  it("should update an agent's system message", async () => {
    act(() => {
      renderFlow();
    });
    const systemMessage = screen.getByTestId('agent-system-message-agent-0');
    fireEvent.change(systemMessage, {
      target: {
        value: 'Updated System Message'
      }
    });
    const systemMessageUpdated = screen.getByTestId('agent-system-message-agent-0') as HTMLTextAreaElement;
    expect(systemMessageUpdated.value).toBe('Updated System Message');
  });
  it('should connect two agents with an edge', async () => {
    act(() => {
      renderFlow();
    });
    const sourceHandle = screen.getByTestId('agent-node-agent-0-source');
    const targetHandle = screen.getByTestId('agent-node-agent-3-target');
    expect(sourceHandle).toBeTruthy();
    expect(targetHandle).toBeTruthy();
    fireEvent.click(sourceHandle);
    fireEvent.click(targetHandle);
    vi.advanceTimersByTime(500);
  });
});
describe('WaldiezFlow Delete Nodes', () => {
  it('should delete an agent node', async () => {
    act(() => {
      renderFlow();
    });
    const agentFooter = screen.getByTestId('agent-footer-agent-0');
    expect(agentFooter).toBeTruthy();
    const deleteDiv = agentFooter.querySelector('.delete-agent');
    expect(deleteDiv).toBeTruthy();
    fireEvent.click(deleteDiv as HTMLElement);
    expect(onChange).toHaveBeenCalled();
  });
  it('should delete a group manager node', async () => {
    act(() => {
      renderFlow();
    });
    const groupManagerFooter = screen.getByTestId(`agent-footer-agent-${edgesCount}`);
    expect(groupManagerFooter).toBeTruthy();
    const deleteDiv = groupManagerFooter.querySelector('.delete-agent');
    expect(deleteDiv).toBeTruthy();
    fireEvent.click(deleteDiv as HTMLElement);
    expect(onChange).toHaveBeenCalled();
  });
  it('should delete a model node', async () => {
    act(() => {
      renderFlow();
    });
    fireEvent.click(screen.getByTestId('show-models'));
    fireEvent.click(screen.getByTestId('add-model-node'));
    const modelFooter = screen.getByTestId('model-footer-model-0');
    expect(modelFooter).toBeTruthy();
    const deleteDiv = screen.getByTestId('delete-node-model-0');
    expect(deleteDiv).toBeTruthy();
    fireEvent.click(deleteDiv as HTMLElement);
    expect(onChange).toHaveBeenCalled();
  });
  it('should delete a skill node', async () => {
    act(() => {
      renderFlow();
    });
    fireEvent.click(screen.getByTestId('show-skills'));
    fireEvent.click(screen.getByTestId('add-skill-node'));
    const skillFooter = screen.getByTestId('skill-footer-skill-0');
    expect(skillFooter).toBeTruthy();
    const deleteDiv = screen.getByTestId('delete-node-skill-0');
    expect(deleteDiv).toBeTruthy();
    fireEvent.click(deleteDiv as HTMLElement);
    expect(onChange).toHaveBeenCalled();
  });
});
describe('WaldiezFlow Clone Nodes', () => {
  it('should clone a model node', async () => {
    act(() => {
      renderFlow();
    });
    fireEvent.click(screen.getByTestId('show-models'));
    fireEvent.click(screen.getByTestId('add-model-node'));
    const modelFooter = screen.getByTestId('model-footer-model-0');
    expect(modelFooter).toBeTruthy();
    const cloneDiv = screen.getByTestId('delete-node-model-0');
    expect(cloneDiv).toBeTruthy();
    fireEvent.click(cloneDiv as HTMLElement);
    expect(onChange).toHaveBeenCalled();
  });
  it('should clone a skill node', async () => {
    act(() => {
      renderFlow();
    });
    fireEvent.click(screen.getByTestId('show-skills'));
    fireEvent.click(screen.getByTestId('add-skill-node'));
    const skillFooter = screen.getByTestId('skill-footer-skill-0');
    expect(skillFooter).toBeTruthy();
    const cloneDiv = screen.getByTestId('delete-node-skill-0');
    expect(cloneDiv).toBeTruthy();
    fireEvent.click(cloneDiv as HTMLElement);
    expect(onChange).toHaveBeenCalled();
  });
  it('should clone an agent node', async () => {
    act(() => {
      renderFlow();
    });
    const agentFooter = screen.getByTestId('agent-footer-agent-0');
    expect(agentFooter).toBeTruthy();
    const cloneDiv = agentFooter.querySelector('.clone-agent');
    expect(cloneDiv).toBeTruthy();
    fireEvent.click(cloneDiv as HTMLElement);
    vi.advanceTimersByTime(50);
    expect(onChange).toHaveBeenCalled();
  });
});
