import React, { useEffect, useRef, useState } from 'react';

import { ModalProps } from '@waldiez/components/modal/types';
import { ModalView } from '@waldiez/components/modal/view';

export const Modal: React.FC<ModalProps> = ({
  id,
  dataTestId,
  beforeTitle,
  title,
  isOpen,
  hasCloseBtn = true,
  hasMaximizeBtn = true,
  onClose,
  children,
  className
}) => {
  const [isModalOpen, setModalOpen] = useState(isOpen);
  const [isFullScreen, setFullScreen] = useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleCloseModal = () => {
    if (onClose) {
      onClose();
    }
    setModalOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleCloseModal();
    }
  };

  const handleToggleFullScreen = () => {
    setFullScreen(!isFullScreen);
  };

  useEffect(() => {
    setModalOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    const modalElement = modalRef.current;
    if (modalElement) {
      if (isModalOpen) {
        modalElement.showModal();
      } else {
        modalElement.close();
      }
    }
  }, [isModalOpen]);

  return (
    <ModalView
      id={id}
      dataTestId={dataTestId}
      title={title}
      className={className}
      children={children}
      beforeTitle={beforeTitle}
      hasMaximizeBtn={hasMaximizeBtn}
      hasCloseBtn={hasCloseBtn}
      isFullScreen={isFullScreen}
      modalRef={modalRef}
      onKeyDown={handleKeyDown}
      onClose={handleCloseModal}
      onToggleFullScreen={handleToggleFullScreen}
    />
  );
};

// export default Modal;
