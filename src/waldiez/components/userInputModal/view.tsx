import { Modal } from '@waldiez/components/modal';
import { UserInputModalViewProps } from '@waldiez/components/userInputModal/types';

export const UserInputModalView = (props: UserInputModalViewProps) => {
  const { flowId, isOpen, onClose, oncancel, onSubmit, inputPrompt } = props;
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
        <button className="modal-action-cancel" onClick={oncancel} data-testid="user-input-modal-cancel">
          Cancel
        </button>
        <button className="modal-action-submit" onClick={onSubmit} data-testid="user-input-modal-submit">
          Submit
        </button>
      </div>
    </Modal>
  );
};
