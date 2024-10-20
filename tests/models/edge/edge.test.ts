import { edgeJson, waldieEdgeData, waldieEdgeSource } from './data.ts';
import { expectTypeOf } from 'vitest';

import { WaldieSourceEdge, WaldieSourceEdgeData } from '@waldiez/models/edge';
import { WaldieEdge, WaldieEdgeData } from '@waldiez/models/types/waldieEdge';

describe('WaldieEdge', () => {
  const waldieEdge = waldieEdgeSource.asEdge();
  it('should create a new edge', () => {
    expect(waldieEdgeSource).toBeInstanceOf(WaldieSourceEdge);
  });
  it('should have the correct data', () => {
    expect(waldieEdgeSource.data).toEqual(waldieEdgeData);
  });
  it('should create a new rf Edge', () => {
    expectTypeOf(waldieEdge).toEqualTypeOf<WaldieEdge>();
  });
  it('should have edge data of type WaldieEdgeData', () => {
    expect(waldieEdge.data).toBeDefined();
    expectTypeOf(waldieEdge.data!).toEqualTypeOf<WaldieEdgeData>();
  });
  it('should have the correct edge id', () => {
    expect(waldieEdge.id).toEqual('edgeId');
  });
  it('should have the correct edge type', () => {
    expect(waldieEdge.type).toEqual('chat');
  });
  it('should have the correct edge source', () => {
    expect(waldieEdge.source).toEqual('sourceId');
  });
  it('should have the correct edge target', () => {
    expect(waldieEdge.target).toEqual('targetId');
  });
  it('should import an edge from json', () => {
    const importedEdge = WaldieSourceEdge.fromJSON(edgeJson);
    const importedEdgeData = importedEdge.data as any;
    const edgeJsonData = edgeJson.data as any;
    Object.keys(edgeJson.data).forEach(key => {
      expect(importedEdgeData[key]).toEqual(edgeJsonData[key]);
    });
    expect(importedEdgeData.name).toEqual(edgeJson.data.name);
    expect(importedEdgeData.description).toEqual(edgeJson.data.description);
    expect(importedEdgeData.maxTurns).toEqual(edgeJson.data.maxTurns);
    expect(importedEdgeData.summary.method).toEqual(edgeJson.data.summary.method);
    const edge = importedEdge.asEdge();
    expect(edge.id).toEqual(edgeJson.id);
    expect(edge.source).toEqual(edgeJson.source);
    expect(edge.target).toEqual(edgeJson.target);
    expect(edge.type).toEqual('chat');
  });
  it('should create an edge with label in data instead of name', () => {
    const waldieEdgeDataWithLabel = {
      ...waldieEdgeData,
      label: 'label of test edge'
    } as any;
    delete waldieEdgeDataWithLabel.name;
    const waldieEdgeSourceWithLabel = new WaldieSourceEdge({
      id: 'edgeId',
      source: 'sourceId',
      target: 'targetId',
      data: waldieEdgeDataWithLabel,
      rest: {
        animated: false,
        type: 'chat'
      }
    });
    expect(waldieEdgeSourceWithLabel.data.name).toEqual('label of test edge');
  });
  it('should import an edge from json using label instead of name', () => {
    const edgeJsonWithLabel = {
      ...edgeJson,
      data: {
        ...edgeJson.data,
        label: 'label of test edge'
      }
    } as any;
    delete edgeJsonWithLabel.data.name;
    const importedEdge = WaldieSourceEdge.fromJSON(edgeJsonWithLabel);
    expect(importedEdge.data.name).toEqual('label of test edge');
  });
  it('should create an edge with default values', () => {
    const importedEdge = WaldieSourceEdge.fromJSON(null);
    expectTypeOf(importedEdge.data).toEqualTypeOf<WaldieSourceEdgeData>();
  });
  it('should create an edge with no data', () => {
    const importedEdgeData = WaldieSourceEdgeData.fromJSON(null);
    expect(importedEdgeData).toBeInstanceOf(WaldieSourceEdgeData);
    const importedEdge = WaldieSourceEdge.fromJSON({ data: null });
    expectTypeOf(importedEdge.data!).toEqualTypeOf<WaldieSourceEdgeData>();
  });
  it('should create an edge without nested chat message and reply', () => {
    const edgeWithoutNestedChat = {
      ...edgeJson,
      data: {
        ...edgeJson.data,
        nestedChat: {
          message: null,
          reply: null,
          context: {}
        }
      }
    } as any;
    const importedEdge = WaldieSourceEdge.fromJSON(edgeWithoutNestedChat);
    expect(importedEdge.data.nestedChat.message).toBeNull();
    expect(importedEdge.data.nestedChat.reply).toBeNull();
  });
  it('should create an edge without summary method options', () => {
    const edgeWithoutLLM = {
      ...edgeJson,
      data: {
        ...edgeJson.data,
        summary: {
          method: 'reflection_with_llm'
        }
      }
    } as any;
    const importedEdge = WaldieSourceEdge.fromJSON(edgeWithoutLLM);
    expect(importedEdge.data.summary?.prompt).toEqual('');
    expect(importedEdge.data.summary?.args).toEqual({});
  });
  it('should create an edge without summary options prompt', () => {
    const edgeWithoutPrompt = {
      ...edgeJson,
      data: {
        ...edgeJson.data,
        summary: {
          method: 'reflection_with_llm',
          prompt: '',
          args: {}
        }
      }
    } as any;
    const importedEdge = WaldieSourceEdge.fromJSON(edgeWithoutPrompt);
    expect(importedEdge.data.summary?.prompt).toEqual('');
  });
  it('should create an edge without summary options args', () => {
    const edgeWithoutArgs = {
      ...edgeJson,
      data: {
        ...edgeJson.data,
        summary: {
          method: 'reflection_with_llm',
          prompt: '',
          args: {}
        }
      }
    } as any;
    const importedEdge = WaldieSourceEdge.fromJSON(edgeWithoutArgs);
    expect(importedEdge.data.summary?.args).toEqual({});
  });
  it('should create an edge with default position', () => {
    const edgeWithoutPosition = {
      ...edgeJson,
      data: {
        ...edgeJson.data,
        position: null
      }
    } as any;
    const importedEdge = WaldieSourceEdge.fromJSON(edgeWithoutPosition);
    expect(importedEdge.data.position).toEqual(0);
  });
  it('should create an edge with position in args', () => {
    const edgeWithPositionInArgs = {
      ...edgeJson,
      data: {
        ...edgeJson.data
      }
    } as any;
    const importedEdge = WaldieSourceEdge.fromJSON(edgeWithPositionInArgs, 2);
    expect(importedEdge.data.position).toEqual(1);
  });
  it('should create an edge with negative position', () => {
    const edgeWithNegativePosition = {
      ...edgeJson,
      data: {
        ...edgeJson.data,
        position: -1
      }
    } as any;
    const importedEdge = WaldieSourceEdge.fromJSON(edgeWithNegativePosition);
    expect(importedEdge.data.position).toEqual(0);
  });
  it('should create an edge with default order', () => {
    const edgeWithoutOrder = {
      ...edgeJson,
      data: {
        ...edgeJson.data,
        order: null
      }
    } as any;
    const importedEdge = WaldieSourceEdge.fromJSON(edgeWithoutOrder);
    expect(importedEdge.data.order).toEqual(-1);
  });
  it('should create an edge with negative order', () => {
    const edgeWithNegativeOrder = {
      ...edgeJson,
      data: {
        ...edgeJson.data,
        order: -1
      }
    } as any;
    const importedEdge = WaldieSourceEdge.fromJSON(edgeWithNegativeOrder);
    expect(importedEdge.data.order).toEqual(-1);
  });
  it('should create an edge from json using source in data', () => {
    const edgeJsonWithSourceInData = {
      ...edgeJson,
      data: {
        ...edgeJson.data,
        source: 'id of the source'
      }
    } as any;
    delete edgeJsonWithSourceInData.source;
    const importedEdge = WaldieSourceEdge.fromJSON(edgeJsonWithSourceInData);
    expect(importedEdge.data.source).toEqual('id of the source');
  });
  it('should create an edge from json using target in data', () => {
    const edgeJsonWithTargetInData = {
      ...edgeJson,
      data: {
        ...edgeJson.data,
        target: 'id of the target'
      }
    } as any;
    delete edgeJsonWithTargetInData.target;
    const importedEdge = WaldieSourceEdge.fromJSON(edgeJsonWithTargetInData);
    expect(importedEdge.data.target).toEqual('id of the target');
  });
});
