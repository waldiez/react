import {
  messageWithCarryOver,
  messageWithCarryOverCamel,
  methodMessageJson,
  noneMessageJson,
  stringMessageJson
} from './data.ts';

import { WaldieMessage } from '@waldiez/models/edge/message';

describe('WaldieMessage', () => {
  const stringMessage = WaldieMessage.fromJSON(stringMessageJson);
  const methodMessage = WaldieMessage.fromJSON(methodMessageJson);
  const noneMessage = WaldieMessage.fromJSON(noneMessageJson);
  const messageWithCarryOverObj = WaldieMessage.fromJSON(messageWithCarryOver);
  const messageWithCarryOverCamelObj = WaldieMessage.fromJSON(messageWithCarryOverCamel);

  it('should create a new string message', () => {
    expect(stringMessage).toBeInstanceOf(WaldieMessage);
  });

  it('should have the correct type', () => {
    expect(stringMessage.type).toEqual('string');
  });

  it('should have the correct content', () => {
    expect(stringMessage.content).toEqual('test content');
  });

  it('should create a new method message', () => {
    expect(methodMessage).toBeInstanceOf(WaldieMessage);
  });

  it('should have the correct type', () => {
    expect(methodMessage.type).toEqual('method');
  });

  it('should have the correct content', () => {
    expect(methodMessage.content).toEqual('def custom_method():\n    return "Hello"');
  });

  it('should create a new none message', () => {
    expect(noneMessage).toBeInstanceOf(WaldieMessage);
  });

  it('should have the correct type', () => {
    expect(noneMessage.type).toEqual('none');
  });

  it('should have the correct content', () => {
    expect(noneMessage.content).toEqual(null);
  });

  it('should create a message with not a json object', () => {
    const message = WaldieMessage.fromJSON(null);
    expect(message.type).toEqual('none');
    expect(message.content).toEqual(null);
  });

  it('should create a message with carryover', () => {
    expect(messageWithCarryOverObj.use_carryover).toEqual(true);
  });

  it('should create a message with carryover camel case', () => {
    expect(messageWithCarryOverCamelObj.use_carryover).toEqual(true);
  });
});
