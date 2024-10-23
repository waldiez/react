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
  // const model = getModelById(id);
  const [logo, setLogo] = useState<string>(LOGOS[data.apiType] as string);
  const [isOpen, setIsOpen] = useState(false);
  const [modelData, setModelData] = useState<WaldiezModelNodeData>(data);
  const onOpenModal = () => {
    setIsOpen(true);
  };
  const onDelete = () => {
    deleteModel(id);
  };
  const onClone = () => {
    cloneModel(id);
  };
  const onCloseModal = () => {
    setIsOpen(false);
  };
  const onImportLoad = (model: Node, jsonData: { [key: string]: unknown }) => {
    const nodeModel = importModel(jsonData, id, model?.position);
    setModelData({ ...nodeModel.data });
  };
  const onImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    importItem(event, getModelById.bind(null, id), onImportLoad);
  };
  const onExport = () => {
    exportItem(data.label, 'model', exportModel.bind(null, id));
  };
  const onDataChange = (data: Partial<WaldiezModelNodeData>) => {
    setModelData({ ...modelData, ...data });
  };
  const onCancel = () => {
    setLogo(LOGOS[data.apiType]);
    setModelData(data);
    setIsOpen(false);
  };
  const onSubmit = () => {
    setLogo(LOGOS[modelData.apiType]);
    updateModelData(id, modelData);
    const storedModel = getModelById(id);
    const storedData = storedModel?.data;
    if (storedData) {
      setModelData(storedData as WaldiezModelNodeData);
    }
    setIsOpen(false);
  };
  return (
    <WaldiezNodeModelView
      modelId={id}
      data={modelData}
      flowId={flowId}
      logo={logo}
      setLogo={setLogo}
      isOpen={isOpen}
      onOpen={onOpenModal}
      onDataChange={onDataChange}
      onClone={onClone}
      onDelete={onDelete}
      onImport={onImport}
      onExport={onExport}
      onClose={onCloseModal}
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  );
};
