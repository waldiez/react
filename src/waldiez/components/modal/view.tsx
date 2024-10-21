import { FaCircleXmark, FaCompress, FaExpand } from 'react-icons/fa6';

import { ModalViewProps } from '@waldiez/components/modal/types';

export const ModalView = (props: ModalViewProps) => {
  const {
    id,
    dataTestId,
    title,
    className,
    children,
    beforeTitle,
    hasMaximizeBtn,
    hasCloseBtn,
    isFullScreen,
    modalRef,
    onKeyDown,
    onClose,
    onToggleFullScreen
  } = props;
  return (
    <dialog
      ref={modalRef}
      id={id}
      data-testid={dataTestId ?? 'modal-dialog'}
      onKeyDown={onKeyDown}
      className={`modal ${isFullScreen ? 'fullscreen' : ''} ${className ?? ''}`}
    >
      <div className="modal-content">
        <div className="modal-header">
          <div>{beforeTitle ?? ''}</div>
          <h3 className="modal-title">{title}</h3>
          <div className="modal-header-actions">
            {hasMaximizeBtn && (
              <div
                className="modal-fullscreen-btn clickable"
                role="button"
                title={isFullScreen ? 'Minimize' : 'Maximize'}
                onClick={onToggleFullScreen}
              >
                {isFullScreen ? <FaCompress /> : <FaExpand />}
              </div>
            )}
            {hasCloseBtn && (
              <div
                className="modal-close-btn clickable"
                role="button"
                title="Close"
                data-testid="modal-close-btn"
                onClick={onClose}
              >
                <FaCircleXmark />
              </div>
            )}
          </div>
        </div>
        {children}
      </div>
    </dialog>
  );
};
