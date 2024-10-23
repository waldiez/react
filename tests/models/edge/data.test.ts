import { edgeDataJson } from './data.ts';

import { WaldiezSourceEdgeData } from '@waldiez/models/edge';

describe('WaldiezEdgeData', () => {
  it('should create an instance with no args', () => {
    expect(new WaldiezSourceEdgeData()).toBeTruthy();
  });
  it('should create an instance from JSON', () => {
    const edgeData = WaldiezSourceEdgeData.fromJSON(edgeDataJson);
    Object.keys(edgeDataJson).forEach(key => {
      expect((edgeData as any)[key]).toEqual((edgeDataJson as any)[key]);
    });
  });
  it('should create an instance from JSON with position in arg', () => {
    const edgeDataJsonWithPositionInArg = {
      ...edgeDataJson
    } as any;
    delete edgeDataJsonWithPositionInArg.position;
    const edgeData = WaldiezSourceEdgeData.fromJSON(edgeDataJsonWithPositionInArg, 2);
    expect(edgeData.position).toEqual(2);
  });
});
