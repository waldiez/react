import { WaldiezNodeModel, WaldiezNodeModelData } from "@waldiez/models";

export interface IWaldiezModelStore {
    getModels: () => WaldiezNodeModel[];
    getModelById: (id: string) => WaldiezNodeModel | null;
    addModel: () => WaldiezNodeModel;
    cloneModel: (id: string) => WaldiezNodeModel | null;
    updateModelData: (id: string, data: Partial<WaldiezNodeModelData>) => void;
    deleteModel: (id: string) => void;
    importModel: (
        model: { [key: string]: unknown },
        modelId: string,
        position: { x: number; y: number } | undefined,
    ) => WaldiezNodeModel;
    exportModel: (modelId: string, hideSecrets: boolean) => { [key: string]: unknown };
}
