export type ModalProps = {
  id?: string;
  dataTestId?: string;
  beforeTitle?: string | React.ReactNode;
  title: string | React.ReactNode;
  isOpen: boolean;
  hasCloseBtn?: boolean;
  hasMaximizeBtn?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
};
export type ModalViewProps = {
  id: string | undefined;
  dataTestId?: string;
  title: string | React.ReactNode;
  className?: string;
  children: React.ReactNode;
  beforeTitle?: string | React.ReactNode;
  hasMaximizeBtn?: boolean;
  hasCloseBtn?: boolean;
  isFullScreen: boolean;
  modalRef: React.RefObject<HTMLDialogElement>;
  onKeyDown: (event: React.KeyboardEvent) => void;
  onClose: () => void;
  onToggleFullScreen: () => void;
};
