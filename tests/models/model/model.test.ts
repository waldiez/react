import { modelJson } from "./data";
import { expectTypeOf } from "vitest";

import { WaldiezSourceModel, WaldiezSourceModelData } from "@waldiez/models";
import { WaldiezModelNode, WaldiezModelNodeData } from "@waldiez/models/types";

describe("WaldiezSourceModel", () => {
    const modelData: WaldiezSourceModelData = {
        name: "test model",
        description: "test description",
        baseUrl: "http://localhost:3000",
        apiType: "other",
        apiKey: null,
        apiVersion: "v1",
        temperature: 0.5,
        topP: null,
        maxTokens: 100,
        defaultHeaders: {},
        price: {
            promptPricePer1k: null,
            completionTokenPricePer1k: 0.06,
        },
        tags: [],
        requirements: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };
    const model = new WaldiezSourceModel("test-id", modelData);
    const modelNode = model.asNode();

    it("should create a new model", () => {
        expect(model).toBeInstanceOf(WaldiezSourceModel);
    });

    it("should have the correct data", () => {
        expect(model.data).toEqual(modelData);
    });

    it("should create a new model node", () => {
        expectTypeOf(modelNode).toEqualTypeOf<WaldiezModelNode>();
    });

    it("should have node data of type WaldiezModelNodeData", () => {
        expectTypeOf(modelNode.data).toEqualTypeOf<WaldiezModelNodeData>();
    });

    it("should have the correct node id", () => {
        expect(modelNode.id).toEqual("test-id");
    });

    it("should have the correct node type", () => {
        expect(modelNode.type).toEqual("model");
    });

    it("should import a model from json", () => {
        const importedModel = WaldiezSourceModel.fromJSON(modelJson);
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

    it("should import a model from json using label instead of name", () => {
        const modelJsonWithLabel = {
            ...modelJson,
            label: "label of test model",
        } as any;
        delete modelJsonWithLabel.name;
        const importedModel = WaldiezSourceModel.fromJSON(modelJsonWithLabel);
        expect(importedModel.data.name).toEqual("label of test model");
    });

    it("should import a model from json without a name", () => {
        const modelJsonWithoutName = {
            ...modelJson,
        } as any;
        delete modelJsonWithoutName.name;
        const importedModel = WaldiezSourceModel.fromJSON(modelJsonWithoutName);
        expect(importedModel.data.name).toEqual("Model");
    });

    it("should create a model from json overriding position", () => {
        const importedModel = WaldiezSourceModel.fromJSON(modelJson);
        const modelNode = importedModel.asNode({
            x: 10,
            y: 10,
        });
        expect(modelNode.position).toEqual({ x: 10, y: 10 });
    });

    it("should create a model with default values", () => {
        const importedModel = WaldiezSourceModel.fromJSON(null);
        expectTypeOf(importedModel.data).toEqualTypeOf<WaldiezSourceModelData>();
    });

    it("should create a model with no data", () => {
        const importedModelData = WaldiezSourceModelData.fromJSON(null, "", "", [], []);
        expect(importedModelData).toBeInstanceOf(WaldiezSourceModelData);
        const importedModel = WaldiezSourceModel.fromJSON({ data: null });
        expectTypeOf(importedModel.data).toEqualTypeOf<WaldiezSourceModelData>();
    });
});
