import { summaryLastMsgJson, summaryNoneJson, summaryReflectionJson } from './data';

import { WaldiezEdgeSummaryData } from '@waldiez/models/edge/summary';

describe('WaldiezEdgeSummaryData', () => {
  it('should create an instance', () => {
    expect(new WaldiezEdgeSummaryData()).toBeTruthy();
  });
  it('should create an instance with default values', () => {
    const summaryData = new WaldiezEdgeSummaryData();
    expect(summaryData.data.method).toEqual('last_msg');
    expect(summaryData.data.prompt).toEqual('');
    expect(summaryData.data.args).toEqual({});
  });
  it('should create an instance with provided values', () => {
    const summaryData = new WaldiezEdgeSummaryData('reflection_with_llm', 'Summarize the chat', {
      optionKey: 'optionValue'
    });
    expect(summaryData.data.method).toEqual('reflection_with_llm');
    expect(summaryData.data.prompt).toEqual('Summarize the chat');
    expect(summaryData.data.args).toEqual({ optionKey: 'optionValue' });
  });
  it('should create an instance from JSON', () => {
    const summaryData = WaldiezEdgeSummaryData.fromJSON(summaryNoneJson);
    expect(summaryData.data.method).toEqual('last_msg');
    expect(summaryData.data.prompt).toEqual('');
    expect(summaryData.data.args).toEqual({});
  });
  it('should create an instance from JSON with provided values', () => {
    const summaryData = WaldiezEdgeSummaryData.fromJSON(summaryReflectionJson);
    expect(summaryData.data.method).toEqual('reflection_with_llm');
    expect(summaryData.data.prompt).toEqual('Summarize the chat');
    expect(summaryData.data.args).toEqual({ optionKey: 'optionValue' });
  });
  it('should create an instance from JSON with default values', () => {
    const summaryData = WaldiezEdgeSummaryData.fromJSON(summaryLastMsgJson);
    expect(summaryData.data.method).toEqual('last_msg');
    expect(summaryData.data.prompt).toEqual('Summarize the chat');
    expect(summaryData.data.args).toEqual({ optionKey: 'optionValue' });
  });
});
