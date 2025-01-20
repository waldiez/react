export type ModalProps = {
    id?: string;
    dataTestId?: string;
    beforeTitle?: string | React.ReactNode;
    title: string | React.ReactNode;
    isOpen: boolean;
    hasCloseBtn?: boolean;
    hasMaximizeBtn?: boolean;
    onClose?: () => void;
    onSaveAndClose?: () => void;
    children: React.ReactNode;
    className?: string;
    hasUnsavedChanges?: boolean;
    preventCloseIfUnsavedChanges?: boolean;
};
