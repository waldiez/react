import { WaldieModelNode } from '@waldiez/models';

export const exportModel = (model: WaldieModelNode, replaceSecrets: boolean = true) => {
  const defaultHeaders = { ...model.data.defaultHeaders };
  if (replaceSecrets) {
    for (const key in defaultHeaders) {
      if (typeof defaultHeaders[key] === 'string') {
        defaultHeaders[key] = 'REPLACE_ME';
      }
    }
  }
  const apiKey = model.data.apiKey ? (replaceSecrets ? 'REPLACE_ME' : model.data.apiKey) : null;
  return {
    id: model.id,
    type: 'model',
    name: model.data.label,
    description: model.data.description,
    tags: model.data.tags,
    requirements: model.data.requirements,
    createdAt: model.data.createdAt,
    updatedAt: model.data.updatedAt,
    data: {
      apiKey,
      apiType: model.data.apiType,
      baseUrl: model.data.baseUrl,
      temperature: model.data.temperature,
      topP: model.data.topP,
      maxTokens: model.data.maxTokens,
      defaultHeaders,
      price: model.data.price
    }
  };
};
