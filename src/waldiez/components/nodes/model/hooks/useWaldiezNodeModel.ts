import { Node } from "@xyflow/react";

import { useState } from "react";

import { WaldiezModelNodeData } from "@waldiez/models";
import { useWaldiezContext } from "@waldiez/store";
import { LOGOS } from "@waldiez/theme";
import { exportItem, importItem } from "@waldiez/utils";

export const useWaldiezNodeModel = (id: string, data: WaldiezModelNodeData) => {
    const getModelById = useWaldiezContext(selector => selector.getModelById);
    const updateModelData = useWaldiezContext(state => state.updateModelData);
    const cloneModel = useWaldiezContext(selector => selector.cloneModel);
    const deleteModel = useWaldiezContext(selector => selector.deleteModel);
    const importModel = useWaldiezContext(selector => selector.importModel);
    const exportModel = useWaldiezContext(selector => selector.exportModel);
    const onFlowChanged = useWaldiezContext(selector => selector.onFlowChanged);
    const flowId = useWaldiezContext(state => state.flowId);
    const [logo, setLogo] = useState<string>(LOGOS[data.apiType] as string);
    const [isOpen, setIsOpen] = useState(false);
    const [modelData, setModelData] = useState<WaldiezModelNodeData>(data);
    const [isDirty, setIsDirty] = useState(false);
    const onOpen = () => {
        setIsOpen(true);
        setIsDirty(false);
    };
    const onDelete = () => {
        deleteModel(id);
        setIsDirty(false);
        onFlowChanged();
    };
    const onClone = () => {
        cloneModel(id);
        setIsDirty(false);
        onFlowChanged();
    };
    const onImportLoad = (model: Node, jsonData: { [key: string]: unknown }) => {
        const nodeModel = importModel(jsonData, id, model?.position);
        setModelData({ ...nodeModel.data });
        setIsDirty(JSON.stringify(nodeModel.data) !== JSON.stringify(data));
    };
    const onImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        importItem(event, getModelById.bind(null, id), onImportLoad);
    };
    const onExport = () => {
        exportItem(data.label, "model", exportModel.bind(null, id));
    };
    const onDataChange = (partialData: Partial<WaldiezModelNodeData>) => {
        setModelData({ ...modelData, ...partialData });
        setIsDirty(JSON.stringify({ ...modelData, ...partialData }) !== JSON.stringify(data));
    };
    const onCancel = () => {
        setLogo(LOGOS[data.apiType]);
        setModelData(data);
        setIsDirty(false);
        setIsOpen(false);
    };
    const onSave = () => {
        setLogo(LOGOS[modelData.apiType]);
        updateModelData(id, modelData);
        const storedModel = getModelById(id);
        const storedData = storedModel?.data;
        if (storedData) {
            setModelData(storedData as WaldiezModelNodeData);
        }
        setIsDirty(false);
        onFlowChanged();
        // keep the modal open on save
        // onCloseModal(false);
    };
    return {
        flowId,
        isOpen,
        isDirty,
        logo,
        modelData,
        setLogo,
        onOpen,
        onImport,
        onExport,
        onDataChange,
        onDelete,
        onClone,
        onSave,
        onCancel,
    };
};
