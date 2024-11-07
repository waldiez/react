import { Node, NodeProps } from '@xyflow/react';

import { useState } from 'react';

import { exportItem, importItem } from '@waldiez/components/nodes/common';
import { WaldiezNodeModelView } from '@waldiez/components/nodes/model/view';
import { WaldiezModelNode, WaldiezModelNodeData } from '@waldiez/models';
import { useWaldiezContext } from '@waldiez/store';
import { LOGOS } from '@waldiez/theme';

export const WaldiezNodeModel = ({ id, data }: NodeProps<WaldiezModelNode>) => {
  const getModelById = useWaldiezContext(selector => selector.getModelById);
  const updateModelData = useWaldiezContext(state => state.updateModelData);
  const cloneModel = useWaldiezContext(selector => selector.cloneModel);
  const deleteModel = useWaldiezContext(selector => selector.deleteModel);
  const importModel = useWaldiezContext(selector => selector.importModel);
  const exportModel = useWaldiezContext(selector => selector.exportModel);
  const flowId = useWaldiezContext(state => state.flowId);
  const [logo, setLogo] = useState<string>(LOGOS[data.apiType] as string);
  const [isOpen, setIsOpen] = useState(false);
  const [modelData, setModelData] = useState<WaldiezModelNodeData>(data);
  const [isDirty, setIsDirty] = useState(false);
  const onOpenModal = () => {
    setIsOpen(true);
    setIsDirty(false);
  };
  const onDelete = () => {
    deleteModel(id);
    setIsDirty(false);
  };
  const onClone = () => {
    cloneModel(id);
    setIsDirty(false);
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
    exportItem(data.label, 'model', exportModel.bind(null, id));
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
    // onCloseModal(false);
  };
  return (
    <WaldiezNodeModelView
      modelId={id}
      data={modelData}
      flowId={flowId}
      logo={logo}
      isOpen={isOpen}
      isDirty={isDirty}
      setLogo={setLogo}
      onOpen={onOpenModal}
      onDataChange={onDataChange}
      onClone={onClone}
      onDelete={onDelete}
      onImport={onImport}
      onExport={onExport}
      onClose={onCancel}
      onCancel={onCancel}
      onSave={onSave}
    />
  );
};
