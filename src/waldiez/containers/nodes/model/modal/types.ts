import { WaldiezNodeModelData } from "@waldiez/models";

export type WaldiezNodeModelModalProps = {
    modelId: string;
    data: WaldiezNodeModelData;
    isOpen: boolean;
    isDirty: boolean;
    importExportView: React.ReactNode;
    onLogoChange: (newLogo: string) => void;
    onClose: () => void;
    onDataChange: (data: Partial<WaldiezNodeModelData>) => void;
    onSave: () => void;
    onCancel: () => void;
};
