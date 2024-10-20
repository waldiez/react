import { nanoid } from 'nanoid';

import { WaldieModelNode, WaldieSourceModel, WaldieSourceModelData } from '@waldiez/models';
import { getNodeMeta } from '@waldiez/store/importing/common';

export const importModel: (data: any, modelId?: string) => WaldieModelNode = (data, modelId) => {
  let id = 'wm-' + nanoid();
  if (modelId && typeof modelId === 'string') {
    id = modelId;
  }
  if (!data || typeof data !== 'object') {
    const emptyModelData = new WaldieSourceModelData();
    return new WaldieSourceModel(id, emptyModelData).asNode();
  }
  const { name, description, tags, requirements, createdAt, updatedAt } = getNodeMeta(data, 'model');
  let modelData = data;
  if ('data' in data && typeof data.data === 'object') {
    modelData = data.data;
  }
  const importedModelData = WaldieSourceModelData.fromJSON(
    modelData,
    name,
    description,
    tags,
    requirements,
    createdAt,
    updatedAt
  );
  delete data.data;
  return {
    id,
    ...data,
    type: 'model',
    data: { ...importedModelData, label: name }
  };
};
