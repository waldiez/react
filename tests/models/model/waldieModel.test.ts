import { modelJson } from './data';
import { expectTypeOf } from 'vitest';

import { WaldieSourceModel, WaldieSourceModelData } from '@waldiez/models';
import { WaldieModelNode, WaldieModelNodeData } from '@waldiez/models/types';

describe('WaldieSourceModel', () => {
  const modelData: WaldieSourceModelData = {
    name: 'test model',
    description: 'test description',
    baseUrl: 'http://localhost:3000',
    apiType: 'other',
    apiKey: null,
    apiVersion: 'v1',
    temperature: 0.5,
    topP: null,
    maxTokens: 100,
    defaultHeaders: {},
    price: {
      promptPricePer1k: null,
      completionTokenPricePer1k: 0.06
    },
    tags: [],
    requirements: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  const model = new WaldieSourceModel('test-id', modelData);
  const modelNode = model.asNode();

  it('should create a new model', () => {
    expect(model).toBeInstanceOf(WaldieSourceModel);
  });

  it('should have the correct data', () => {
    expect(model.data).toEqual(modelData);
  });

  it('should create a new model node', () => {
    expectTypeOf(modelNode).toEqualTypeOf<WaldieModelNode>();
  });

  it('should have node data of type WaldieModelNodeData', () => {
    expectTypeOf(modelNode.data).toEqualTypeOf<WaldieModelNodeData>();
  });

  it('should have the correct node id', () => {
    expect(modelNode.id).toEqual('test-id');
  });

  it('should have the correct node type', () => {
    expect(modelNode.type).toEqual('model');
  });

  it('should import a model from json', () => {
    const importedModel = WaldieSourceModel.fromJSON(modelJson);
    const importedModelData = importedModel.data as any;
    const modelJsonData = modelJson.data as any;
    Object.keys(modelJson.data).forEach(key => {
      expect(importedModelData[key]).toEqual(modelJsonData[key]);
    });
    expect(importedModelData.name).toEqual(modelJson.name);
    expect(importedModelData.description).toEqual(modelJson.description);
    expect(importedModelData.tags).toEqual(modelJson.tags);
    expect(importedModelData.requirements).toEqual(modelJson.requirements);
    expect(importedModelData.createdAt).toEqual(modelJson.createdAt);
    expect(importedModelData.updatedAt).toEqual(modelJson.updatedAt);
    const modelNode = importedModel.asNode();
    expect(modelNode.id).toEqual(modelJson.id);
    expect(modelNode.type).toEqual(modelJson.type);
    expect(modelNode.position).toEqual(modelJson.position);
  });

  it('should import a model from json using label instead of name', () => {
    const modelJsonWithLabel = {
      ...modelJson,
      label: 'label of test model'
    } as any;
    delete modelJsonWithLabel.name;
    const importedModel = WaldieSourceModel.fromJSON(modelJsonWithLabel);
    expect(importedModel.data.name).toEqual('label of test model');
  });

  it('should import a model from json without a name', () => {
    const modelJsonWithoutName = {
      ...modelJson
    } as any;
    delete modelJsonWithoutName.name;
    const importedModel = WaldieSourceModel.fromJSON(modelJsonWithoutName);
    expect(importedModel.data.name).toEqual('Model');
  });

  it('should create a model from json overriding position', () => {
    const importedModel = WaldieSourceModel.fromJSON(modelJson);
    const modelNode = importedModel.asNode({
      x: 10,
      y: 10
    });
    expect(modelNode.position).toEqual({ x: 10, y: 10 });
  });

  it('should create a model with default values', () => {
    const importedModel = WaldieSourceModel.fromJSON(null);
    expectTypeOf(importedModel.data).toEqualTypeOf<WaldieSourceModelData>();
  });

  it('should create a model with no data', () => {
    const importedModelData = WaldieSourceModelData.fromJSON(null, '', '', [], []);
    expect(importedModelData).toBeInstanceOf(WaldieSourceModelData);
    const importedModel = WaldieSourceModel.fromJSON({ data: null });
    expectTypeOf(importedModel.data).toEqualTypeOf<WaldieSourceModelData>();
  });
});
