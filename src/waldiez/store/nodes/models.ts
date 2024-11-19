import { Node, ReactFlowInstance } from '@xyflow/react';

import {
  WaldiezAgentNode,
  WaldiezModelNode,
  WaldiezModelNodeData,
  WaldiezSourceModel,
  WaldiezSourceModelData
} from '@waldiez/models';
import { exportModel } from '@waldiez/store/exporting';
import { importModel } from '@waldiez/store/importing';
import { getNewNodePosition, reArrangeNodes, setViewPortTopLeft } from '@waldiez/store/nodes/common';
import { typeOfGet, typeOfSet } from '@waldiez/store/types';
import { getId } from '@waldiez/utils';

export class ModelsStore {
  static getModels: (get: typeOfGet) => WaldiezModelNode[] = get => {
    return get().nodes.filter(node => node.type === 'model') as WaldiezModelNode[];
  };
  static getModelById: (modelId: string, get: typeOfGet) => WaldiezModelNode | null = (modelId, get) => {
    const model = get().nodes.find(node => node.id === modelId && node.type === 'model');
    if (!model) {
      return null;
    }
    return model as WaldiezModelNode;
  };
  static addModel: (get: typeOfGet, set: typeOfSet) => WaldiezModelNode = (get, set) => {
    const existingModels = get().nodes.filter(node => node.type === 'model');
    const modelCount = existingModels.length;
    const flowId = get().flowId;
    const rfInstance = get().rfInstance;
    const position = getNewNodePosition(modelCount, flowId, rfInstance);
    const newNode: WaldiezModelNode = new WaldiezSourceModel(`wm-${getId()}`, new WaldiezSourceModelData(), {
      position
    }).asNode();
    set({
      nodes: [
        ...get().nodes,
        {
          ...newNode,
          type: 'model'
        }
      ],
      updatedAt: new Date().toISOString()
    });
    ModelsStore.reArrangeModels(get, set);
    setViewPortTopLeft(rfInstance);
    const model = get().nodes.find(node => node.id === newNode.id);
    return model as WaldiezModelNode;
  };
  static getClonedModel = (modelId: string, rfInstance: ReactFlowInstance | undefined, get: typeOfGet) => {
    const model = get().nodes.find(node => node.id === modelId);
    if (!model) {
      throw new Error(`Model with id ${modelId} not found`);
    }
    const existingModels = get().nodes.filter(node => node.type === 'model');
    const modelCount = existingModels.length;
    const flowId = get().flowId;
    const position = getNewNodePosition(modelCount, flowId, rfInstance);
    return new WaldiezSourceModel(`wm-${getId()}`, new WaldiezSourceModelData(), {
      position,
      data: model.data
    }).asNode();
  };
  static cloneModel: (modelId: string, get: typeOfGet, set: typeOfSet) => WaldiezModelNode = (
    modelId,
    get,
    set
  ) => {
    const rfInstance = get().rfInstance;
    const newNode = ModelsStore.getClonedModel(modelId, rfInstance, get);
    set({
      nodes: [
        ...get().nodes.map(node => {
          if (node.id === modelId) {
            return { ...node, selected: false };
          }
          return node;
        }),
        {
          ...newNode,
          type: 'model',
          selected: true
        }
      ],
      updatedAt: new Date().toISOString()
    });
    ModelsStore.reArrangeModels(get, set);
    setViewPortTopLeft(rfInstance);
    const modelWithNewPosition = get().nodes.find(node => node.id === newNode.id);
    return modelWithNewPosition as WaldiezModelNode;
  };
  static updateModelData: (
    modelId: string,
    data: WaldiezModelNodeData,
    get: typeOfGet,
    set: typeOfSet
  ) => void = (modelId, data, get, set) => {
    const updatedAt = new Date().toISOString();
    set({
      nodes: [
        ...get().nodes.map(node => {
          if (node.id === modelId) {
            return { ...node, data: { ...data, updatedAt } };
          }
          return node;
        })
      ],
      updatedAt
    });
  };

  static getNodesAfterModelDeletion = (
    modelId: string,
    rfInstance: ReactFlowInstance | undefined,
    get: typeOfGet
  ) => {
    const newModelNodes = get().nodes.filter(node => node.type === 'model' && node.id !== modelId);
    const newModelNodesCount = newModelNodes.length;
    const flowId = get().flowId;
    for (let i = 0; i < newModelNodesCount; i++) {
      const node = newModelNodes[i];
      const position = getNewNodePosition(i, flowId, rfInstance);
      newModelNodes[i] = { ...node, position };
    }
    const allNodes = newModelNodes.concat(get().nodes.filter(node => node.type !== 'model'));
    // check if the model is linked to any agent
    const newNodes = [] as Node[];
    allNodes.forEach(node => {
      if (node.type === 'agent') {
        const agent = node as WaldiezAgentNode;
        const modelIds = agent.data.modelIds;
        const newModelIds = modelIds.filter(id => id !== modelId);
        newNodes.push({
          ...agent,
          data: { ...agent.data, modelIds: newModelIds }
        });
      } else {
        newNodes.push(node);
      }
    });
    return newNodes;
  };
  static deleteModel: (modelId: string, get: typeOfGet, set: typeOfSet) => void = (modelId, get, set) => {
    const rfInstance = get().rfInstance;
    const newNodes = ModelsStore.getNodesAfterModelDeletion(modelId, rfInstance, get);
    set({
      nodes: newNodes,
      updatedAt: new Date().toISOString()
    });
    ModelsStore.reArrangeModels(get, set);
    setViewPortTopLeft(rfInstance);
  };
  static exportModel: (modelId: string, get: typeOfGet) => { [key: string]: unknown } | null = (
    modelId,
    get
  ) => {
    const model = get().nodes.find(node => node.id === modelId && node.type === 'model');
    if (!model) {
      return null;
    }
    return exportModel(model as WaldiezModelNode);
  };
  static importModel: (
    model: { [key: string]: unknown },
    modelId: string,
    position: { x: number; y: number } | undefined
  ) => WaldiezModelNode = (model, modelId, position) => {
    const newModel = importModel(model, modelId);
    if (position) {
      newModel.position = position;
    }
    return newModel;
  };
  static reArrangeModels = (get: typeOfGet, set: typeOfSet) => {
    const nodes = reArrangeNodes(get().nodes, get().flowId, 'model', get().rfInstance);
    set({
      nodes,
      updatedAt: new Date().toISOString()
    });
    return nodes;
  };
}
