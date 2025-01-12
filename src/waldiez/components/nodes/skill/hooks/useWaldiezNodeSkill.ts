import { Node } from "@xyflow/react";

import { useState } from "react";

import { WaldiezSkillNodeData } from "@waldiez/models";
import { useWaldiezContext } from "@waldiez/store";
import { isDarkMode } from "@waldiez/theme";
import { exportItem, importItem, renderDate } from "@waldiez/utils";

export const useWaldiezNodeSkill = (id: string, data: WaldiezSkillNodeData) => {
    const flowId = useWaldiezContext(state => state.flowId);
    let storageId = useWaldiezContext(state => state.storageId);
    if (!storageId) {
        storageId = flowId;
    }
    const [isModalOpen, setModalOpen] = useState(false);
    // tmp state to save on submit, discard on cancel
    const [skillData, setSkillData] = useState<WaldiezSkillNodeData>(data);
    const [isDirty, setIsDirty] = useState(false);
    const updateSkillData = useWaldiezContext(state => state.updateSkillData);
    const cloneSkill = useWaldiezContext(selector => selector.cloneSkill);
    const deleteSkill = useWaldiezContext(selector => selector.deleteSkill);
    const getSkillById = useWaldiezContext(selector => selector.getSkillById);
    const importSkill = useWaldiezContext(selector => selector.importSkill);
    const exportSkill = useWaldiezContext(selector => selector.exportSkill);
    const onFlowChanged = useWaldiezContext(selector => selector.onFlowChanged);
    const isDark = isDarkMode(flowId, storageId);
    const updatedAt = renderDate(data.updatedAt);
    const onOpen = () => {
        setModalOpen(true);
        setIsDirty(false);
    };
    const onClone = () => {
        if (!isModalOpen) {
            cloneSkill(id);
            onFlowChanged();
        }
    };
    const onDelete = () => {
        deleteSkill(id);
        setIsDirty(false);
        onFlowChanged();
    };
    const onCancel = () => {
        setSkillData(data);
        setModalOpen(false);
        setIsDirty(false);
    };
    const onChange = (partialData: Partial<WaldiezSkillNodeData>) => {
        setSkillData({ ...skillData, ...partialData });
        const _dirty = JSON.stringify({ ...skillData, ...partialData }) !== JSON.stringify(data);
        setIsDirty(_dirty);
    };
    const onExport = () => {
        exportItem(data.label, "skill", exportSkill.bind(null, id));
    };
    const onImportLoad = (skill: Node, jsonData: { [key: string]: unknown }) => {
        const newSkill = importSkill(jsonData, id, skill?.position);
        setSkillData({ ...newSkill.data });
        const _dirty = JSON.stringify(newSkill.data) !== JSON.stringify(data);
        setIsDirty(_dirty);
    };
    const onImport = (event: React.ChangeEvent<HTMLInputElement>) => {
        importItem(event, getSkillById.bind(null, id), onImportLoad);
    };
    const onSave = () => {
        updateSkillData(id, skillData);
        const storedSkill = getSkillById(id);
        const storedData = storedSkill?.data;
        if (storedData) {
            setSkillData(storedData as WaldiezSkillNodeData);
        }
        setIsDirty(false);
        onFlowChanged();
        // setModalOpen(false);
        // keep modal open after save
    };
    return {
        flowId,
        isModalOpen,
        isDirty,
        skillData,
        isDark,
        updatedAt,
        onOpen,
        onClone,
        onDelete,
        onCancel,
        onSave,
        onChange,
        onExport,
        onImport,
    };
};
