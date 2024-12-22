import {
    messageWithCarryOver,
    messageWithCarryOverCamel,
    methodMessageJson,
    noneMessageJson,
    stringMessageJson,
} from "./data.ts";

import { WaldiezMessage } from "@waldiez/models/edge/message";

describe("WaldiezMessage", () => {
    const stringMessage = WaldiezMessage.fromJSON(stringMessageJson);
    const methodMessage = WaldiezMessage.fromJSON(methodMessageJson);
    const noneMessage = WaldiezMessage.fromJSON(noneMessageJson);
    const messageWithCarryOverObj = WaldiezMessage.fromJSON(messageWithCarryOver);
    const messageWithCarryOverCamelObj = WaldiezMessage.fromJSON(messageWithCarryOverCamel);

    it("should create a new string message", () => {
        expect(stringMessage).toBeInstanceOf(WaldiezMessage);
    });

    it("should have the correct type", () => {
        expect(stringMessage.type).toEqual("string");
    });

    it("should have the correct content", () => {
        expect(stringMessage.content).toEqual("test content");
    });

    it("should create a new method message", () => {
        expect(methodMessage).toBeInstanceOf(WaldiezMessage);
    });

    it("should have the correct type", () => {
        expect(methodMessage.type).toEqual("method");
    });

    it("should have the correct content", () => {
        expect(methodMessage.content).toEqual('def custom_method():\n    return "Hello"');
    });

    it("should create a new none message", () => {
        expect(noneMessage).toBeInstanceOf(WaldiezMessage);
    });

    it("should have the correct type", () => {
        expect(noneMessage.type).toEqual("none");
    });

    it("should have the correct content", () => {
        expect(noneMessage.content).toEqual(null);
    });

    it("should create a message with not a json object", () => {
        const message = WaldiezMessage.fromJSON(null);
        expect(message.type).toEqual("none");
        expect(message.content).toEqual(null);
    });

    it("should create a message with carryover", () => {
        expect(messageWithCarryOverObj.use_carryover).toEqual(true);
    });

    it("should create a message with carryover camel case", () => {
        expect(messageWithCarryOverCamelObj.use_carryover).toEqual(true);
    });
});
