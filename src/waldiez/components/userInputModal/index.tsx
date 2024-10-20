import { useEffect } from 'react';

import { UserInputModalProps } from '@waldiez/components/userInputModal/types';
import { UserInputModalView } from '@waldiez/components/userInputModal/view';

export const UserInputModal = (props: UserInputModalProps) => {
  const { flowId, isOpen, onUserInput, inputPrompt } = props;
  useEffect(() => {
    if (isOpen && inputPrompt.previousMessages.length > 0) {
      const messagesRoot = document.getElementById(`rf-${flowId}-user-input-modal-console`);
      if (messagesRoot) {
        const console = messagesRoot.querySelectorAll('.console-message');
        if (console && console.length > 0) {
          const lastMessage = console[console.length - 1];
          if (lastMessage) {
            lastMessage.scrollIntoView();
          }
        }
      }
    }
    onOpenModalChange();
  }, [isOpen]);
  const handleKeyDown = (event: KeyboardEvent) => {
    if (isOpen) {
      if (event.key === 'Escape') {
        handleCancelAction();
      }
      if (event.key === 'Enter') {
        handleSubmitAction();
      }
    }
  };
  const onOpenModalChange = () => {
    const input = document.getElementById(`rf-${flowId}-user-input-modal-input`);
    if (isOpen) {
      if (input) {
        input.focus();
        (input as HTMLInputElement).addEventListener('keydown', handleKeyDown);
      }
    } else {
      if (input) {
        (input as HTMLInputElement).removeEventListener('keydown', handleKeyDown);
      }
    }
  };
  const handleCloseModal = () => {
    const userInput = (document.getElementById(`rf-${flowId}-user-input-modal-input`) as HTMLInputElement)
      ?.value;
    if (userInput) {
      onUserInput(userInput);
    } else {
      onUserInput('');
    }
  };

  const handleCancelAction = () => {
    onUserInput('');
  };

  const handleSubmitAction = () => {
    const userInput = (document.getElementById(`rf-${flowId}-user-input-modal-input`) as HTMLInputElement)
      ?.value;
    if (userInput) {
      onUserInput(userInput);
    } else {
      onUserInput('');
    }
  };

  return (
    <UserInputModalView
      flowId={flowId}
      isOpen={isOpen}
      onClose={handleCloseModal}
      oncancel={handleCancelAction}
      onSubmit={handleSubmitAction}
      inputPrompt={inputPrompt}
    />
  );
};
