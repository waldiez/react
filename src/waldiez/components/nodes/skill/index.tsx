import { Node, NodeProps } from '@xyflow/react';

import { useState } from 'react';

import { exportItem, importItem } from '@waldiez/components/nodes/common';
import { WaldieNodeSkillView } from '@waldiez/components/nodes/skill/view';
import { WaldieSkillNode, WaldieSkillNodeData } from '@waldiez/models';
import { useWaldieContext } from '@waldiez/store';
import { isDarkMode } from '@waldiez/theme';

export const WaldieNodeSkill = ({ id, data }: NodeProps<WaldieSkillNode>) => {
  const flowId = useWaldieContext(state => state.flowId);
  let storageId = useWaldieContext(state => state.storageId);
  if (!storageId) {
    storageId = flowId;
  }
  const [isModalOpen, setModalOpen] = useState(false);
  // tmp state to save on submit, discard on cancel
  const [skillData, setSkillData] = useState<WaldieSkillNodeData>(data);
  const updateSkillData = useWaldieContext(state => state.updateSkillData);
  const cloneSkill = useWaldieContext(selector => selector.cloneSkill);
  const deleteSkill = useWaldieContext(selector => selector.deleteSkill);
  const getSkillById = useWaldieContext(selector => selector.getSkillById);
  const importSkill = useWaldieContext(selector => selector.importSkill);
  const exportSkill = useWaldieContext(selector => selector.exportSkill);
  const onClose = () => {
    setModalOpen(false);
  };
  const onOpen = () => {
    setModalOpen(true);
  };
  const onClone = () => {
    if (!isModalOpen) {
      cloneSkill(id);
    }
  };
  const onDelete = () => {
    deleteSkill(id);
  };
  const onCancel = () => {
    setSkillData(data);
    setModalOpen(false);
  };
  const onSubmit = () => {
    updateSkillData(id, skillData);
    const storedSkill = getSkillById(id);
    const storedData = storedSkill?.data;
    if (storedData) {
      setSkillData(storedData as WaldieSkillNodeData);
    }
    setModalOpen(false);
  };
  const onChange = (data: Partial<WaldieSkillNodeData>) => {
    setSkillData({ ...skillData, ...data });
  };
  const onExport = () => {
    exportItem(data.label, 'skill', exportSkill.bind(null, id));
  };
  const onImportLoad = (skill: Node, jsonData: { [key: string]: unknown }) => {
    const newSkill = importSkill(jsonData, id, skill?.position);
    setSkillData({ ...newSkill.data });
  };
  const onImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    importItem(event, getSkillById.bind(null, id), onImportLoad);
  };
  const isDark = isDarkMode(flowId, storageId);
  return (
    <WaldieNodeSkillView
      skillId={id}
      flowId={flowId}
      data={skillData}
      isModalOpen={isModalOpen}
      darkMode={isDark}
      onOpen={onOpen}
      onClose={onClose}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onDelete={onDelete}
      onClone={onClone}
      onDataChange={onChange}
      onImport={onImport}
      onExport={onExport}
    />
  );
};
