import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { UserInputModal } from '@waldiez/components/userInputModal';

describe('UserInputModal', () => {
  it('should render successfully', () => {
    const userInputModalProps = {
      flowId: 'flow1',
      isOpen: true,
      onUserInput: vi.fn(),
      inputPrompt: {
        previousMessages: [],
        prompt: 'User Input Prompt'
      }
    };
    const { baseElement } = render(<UserInputModal {...userInputModalProps} />);
    expect(baseElement).toBeTruthy();
  });

  it('should render previous messages', () => {
    const userInputModalProps = {
      flowId: 'flow1',
      isOpen: true,
      onUserInput: vi.fn(),
      inputPrompt: {
        previousMessages: ['Message 1', 'Message 2'],
        prompt: 'User Input Prompt'
      }
    };
    render(<UserInputModal {...userInputModalProps} />);
    expect(screen.getByText('Message 1')).toBeTruthy();
    expect(screen.getByText('Message 2')).toBeTruthy();
  });

  it('should handle close modal', () => {
    const onUserInput = vi.fn();
    const userInputModalProps = {
      flowId: 'flow1',
      isOpen: true,
      onUserInput,
      inputPrompt: {
        previousMessages: [],
        prompt: 'User Input Prompt'
      }
    };
    render(<UserInputModal {...userInputModalProps} />);
    const closeBtn = screen.getByTestId('modal-close-btn');
    fireEvent.click(closeBtn);
    expect(onUserInput).toHaveBeenCalledWith('');
  });

  it('should handle close modal with input', () => {
    const onUserInput = vi.fn();
    const userInputModalProps = {
      flowId: 'flow1',
      isOpen: true,
      onUserInput,
      inputPrompt: {
        previousMessages: [],
        prompt: 'User Input Prompt'
      }
    };
    render(<UserInputModal {...userInputModalProps} />);
    const input = screen.getByTestId('rf-flow1-user-input-modal-input');
    fireEvent.change(input, { target: { value: 'User Input' } });
    const closeBtn = screen.getByTestId('modal-close-btn');
    fireEvent.click(closeBtn);
    expect(onUserInput).toHaveBeenCalledWith('User Input');
  });

  it('should handle escape key', () => {
    const onUserInput = vi.fn();
    const userInputModalProps = {
      flowId: 'flow1',
      isOpen: true,
      onUserInput,
      inputPrompt: {
        previousMessages: [],
        prompt: 'User Input Prompt'
      }
    };
    render(<UserInputModal {...userInputModalProps} />);
    const modalDialog = screen.getByTestId('rf-flow1-user-input-modal');
    fireEvent.keyDown(modalDialog, { key: 'Escape' });
    expect(onUserInput).toHaveBeenCalledWith('');
  });

  it('should handle cancel action', () => {
    const onUserInput = vi.fn();
    const userInputModalProps = {
      flowId: 'flow1',
      isOpen: true,
      onUserInput,
      inputPrompt: {
        previousMessages: [],
        prompt: 'User Input Prompt'
      }
    };
    render(<UserInputModal {...userInputModalProps} />);
    const cancelBtn = screen.getByTestId('user-input-modal-cancel');
    fireEvent.click(cancelBtn);
    expect(onUserInput).toHaveBeenCalledWith('');
  });

  it('should handle submit action', () => {
    const onUserInput = vi.fn();
    const userInputModalProps = {
      flowId: 'flow1',
      isOpen: true,
      onUserInput,
      inputPrompt: {
        previousMessages: [],
        prompt: 'User Input Prompt'
      }
    };
    render(<UserInputModal {...userInputModalProps} />);
    const submitBtn = screen.getByTestId('user-input-modal-submit');
    fireEvent.click(submitBtn);
    expect(onUserInput).toHaveBeenCalledWith('');
  });

  it('should handle submit action with input', () => {
    const onUserInput = vi.fn();
    const userInputModalProps = {
      flowId: 'flow1',
      isOpen: true,
      onUserInput,
      inputPrompt: {
        previousMessages: [],
        prompt: 'User Input Prompt'
      }
    };
    render(<UserInputModal {...userInputModalProps} />);
    const input = screen.getByTestId('rf-flow1-user-input-modal-input');
    fireEvent.change(input, { target: { value: 'User Input' } });
    const submitBtn = screen.getByTestId('user-input-modal-submit');
    fireEvent.click(submitBtn);
    expect(onUserInput).toHaveBeenCalledWith('User Input');
  });
});
