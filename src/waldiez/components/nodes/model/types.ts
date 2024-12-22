import { WaldiezModelNodeData } from "@waldiez/models";

export type * from "@waldiez/components/nodes/model/modal/types";

export type WaldiezNodeModelViewProps = {
    modelId: string;
    data: WaldiezModelNodeData;
    flowId: string;
    logo: string;
    isOpen: boolean;
    isDirty: boolean;
    onOpen: () => void;
    setLogo: (logo: string) => void;
    onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onExport: () => void;
    onClose: () => void;
    onDataChange: (data: Partial<WaldiezModelNodeData>) => void;
    onDelete: () => void;
    onClone: () => void;
    onSave: () => void;
    onCancel: () => void;
};
