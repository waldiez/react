import { useUserInputModal } from '@waldiez/components/flow/modals/userInputModal/hooks';
import { UserInputModalProps } from '@waldiez/components/flow/modals/userInputModal/types';
import { Modal } from '@waldiez/components/modal';

export const UserInputModal = (props: UserInputModalProps) => {
  const { flowId, isOpen, inputPrompt } = props;
  const { onClose, onCancel, onSubmit } = useUserInputModal(props);
  return (
    <Modal
      title="User Input"
      isOpen={isOpen}
      onClose={onClose}
      className="user-input-modal"
      hasMaximizeBtn={false}
      dataTestId={`rf-${flowId}-user-input-modal`}
    >
      <div className="modal-body">
        {inputPrompt.previousMessages.length > 0 && (
          <div className="console">
            <div className="console-messages" id={`rf-${flowId}-user-input-modal-console`}>
              {inputPrompt.previousMessages.map((message, index) => (
                <div className="console-message" key={index}>
                  {message}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="input-prompt">{inputPrompt.prompt}</div>
        <input
          type="text"
          id={`rf-${flowId}-user-input-modal-input`}
          data-testid={`rf-${flowId}-user-input-modal-input`}
        />
      </div>
      <div className="modal-actions">
        <button
          className="modal-action-cancel"
          onClick={onCancel}
          data-testid={`rf-${flowId}-user-input-modal-cancel`}
        >
          Cancel
        </button>
        <button
          className="modal-action-submit"
          onClick={onSubmit}
          data-testid={`rf-${flowId}-user-input-modal-submit`}
        >
          Submit
        </button>
      </div>
    </Modal>
  );
};
