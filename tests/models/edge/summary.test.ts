import { summaryLastMsgJson, summaryNoneJson, summaryReflectionJson } from './data';

import { WaldieEdgeSummaryData } from '@waldiez/models/edge/summary';

describe('WaldieEdgeSummaryData', () => {
  it('should create an instance', () => {
    expect(new WaldieEdgeSummaryData()).toBeTruthy();
  });
  it('should create an instance with default values', () => {
    const summaryData = new WaldieEdgeSummaryData();
    expect(summaryData.data.method).toEqual('last_msg');
    expect(summaryData.data.prompt).toEqual('');
    expect(summaryData.data.args).toEqual({});
  });
  it('should create an instance with provided values', () => {
    const summaryData = new WaldieEdgeSummaryData('reflection_with_llm', 'Summarize the chat', {
      optionKey: 'optionValue'
    });
    expect(summaryData.data.method).toEqual('reflection_with_llm');
    expect(summaryData.data.prompt).toEqual('Summarize the chat');
    expect(summaryData.data.args).toEqual({ optionKey: 'optionValue' });
  });
  it('should create an instance from JSON', () => {
    const summaryData = WaldieEdgeSummaryData.fromJSON(summaryNoneJson);
    expect(summaryData.data.method).toEqual('last_msg');
    expect(summaryData.data.prompt).toEqual('');
    expect(summaryData.data.args).toEqual({});
  });
  it('should create an instance from JSON with provided values', () => {
    const summaryData = WaldieEdgeSummaryData.fromJSON(summaryReflectionJson);
    expect(summaryData.data.method).toEqual('reflection_with_llm');
    expect(summaryData.data.prompt).toEqual('Summarize the chat');
    expect(summaryData.data.args).toEqual({ optionKey: 'optionValue' });
  });
  it('should create an instance from JSON with default values', () => {
    const summaryData = WaldieEdgeSummaryData.fromJSON(summaryLastMsgJson);
    expect(summaryData.data.method).toEqual('last_msg');
    expect(summaryData.data.prompt).toEqual('Summarize the chat');
    expect(summaryData.data.args).toEqual({ optionKey: 'optionValue' });
  });
});
