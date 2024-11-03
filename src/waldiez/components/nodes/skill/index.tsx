import { Node, NodeProps } from '@xyflow/react';

import { useState } from 'react';

import { exportItem, importItem } from '@waldiez/components/nodes/common';
import { WaldiezNodeSkillView } from '@waldiez/components/nodes/skill/view';
import { WaldiezSkillNode, WaldiezSkillNodeData } from '@waldiez/models';
import { useWaldiezContext } from '@waldiez/store';
import { isDarkMode } from '@waldiez/theme';

export const WaldiezNodeSkill = ({ id, data }: NodeProps<WaldiezSkillNode>) => {
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
  const onClose = () => {
    setModalOpen(false);
    setIsDirty(false);
  };
  const onOpen = () => {
    setModalOpen(true);
    setIsDirty(false);
  };
  const onClone = () => {
    if (!isModalOpen) {
      cloneSkill(id);
    }
  };
  const onDelete = () => {
    deleteSkill(id);
    setIsDirty(false);
  };
  const onCancel = () => {
    setSkillData(data);
    setModalOpen(false);
    setIsDirty(false);
  };
  const onSave = () => {
    updateSkillData(id, skillData);
    const storedSkill = getSkillById(id);
    const storedData = storedSkill?.data;
    if (storedData) {
      setSkillData(storedData as WaldiezSkillNodeData);
    }
    // setModalOpen(false);
    // setHasModalOpen(false);
    setIsDirty(false);
  };
  const onChange = (partialData: Partial<WaldiezSkillNodeData>) => {
    setSkillData({ ...skillData, ...partialData });
    setIsDirty(JSON.stringify({ ...skillData, ...partialData }) !== JSON.stringify(data));
  };
  const onExport = () => {
    exportItem(data.label, 'skill', exportSkill.bind(null, id));
  };
  const onImportLoad = (skill: Node, jsonData: { [key: string]: unknown }) => {
    const newSkill = importSkill(jsonData, id, skill?.position);
    setSkillData({ ...newSkill.data });
    setIsDirty(JSON.stringify(newSkill.data) !== JSON.stringify(data));
  };
  const onImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    importItem(event, getSkillById.bind(null, id), onImportLoad);
  };
  const isDark = isDarkMode(flowId, storageId);
  return (
    <WaldiezNodeSkillView
      skillId={id}
      flowId={flowId}
      data={skillData}
      isModalOpen={isModalOpen}
      darkMode={isDark}
      isDirty={isDirty}
      onOpen={onOpen}
      onClose={onClose}
      onCancel={onCancel}
      onSave={onSave}
      onDelete={onDelete}
      onClone={onClone}
      onDataChange={onChange}
      onImport={onImport}
      onExport={onExport}
    />
  );
};
