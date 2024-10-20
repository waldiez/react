import { Node, NodeProps } from '@xyflow/react';

import { useState } from 'react';

import { exportItem, importItem } from '@waldiez/components/nodes/common';
import { WaldieNodeModelView } from '@waldiez/components/nodes/model/view';
import { WaldieModelNode, WaldieModelNodeData } from '@waldiez/models';
import { useWaldieContext } from '@waldiez/store';
import { LOGOS } from '@waldiez/theme';

export const WaldieNodeModel = ({ id, data }: NodeProps<WaldieModelNode>) => {
  const getModelById = useWaldieContext(selector => selector.getModelById);
  const updateModelData = useWaldieContext(state => state.updateModelData);
  const cloneModel = useWaldieContext(selector => selector.cloneModel);
  const deleteModel = useWaldieContext(selector => selector.deleteModel);
  const importModel = useWaldieContext(selector => selector.importModel);
  const exportModel = useWaldieContext(selector => selector.exportModel);
  const flowId = useWaldieContext(state => state.flowId);
  // const model = getModelById(id);
  const [logo, setLogo] = useState<string>(LOGOS[data.apiType] as string);
  const [isOpen, setIsOpen] = useState(false);
  const [modelData, setModelData] = useState<WaldieModelNodeData>(data);
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
  const onDataChange = (data: Partial<WaldieModelNodeData>) => {
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
      setModelData(storedData as WaldieModelNodeData);
    }
    setIsOpen(false);
  };
  return (
    <WaldieNodeModelView
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
