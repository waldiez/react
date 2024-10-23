import { Edge } from '@xyflow/react';

import { IWaldiezMessage } from '@waldiez/models/types/waldiezMessage';

/**
 * Waldiez Edge Llm Summary Method.
 * @param reflection_with_llm - Use reflection with llm summary method
 * @param last_msg - Use last message summary method
 * @param null - No summary method
 */
export type WaldiezEdgeLlmSummaryMethod = 'reflection_with_llm' | 'last_msg' | null;

/**
 * Waldiez Edge Data.
 * @param description - The description of the edge
 * @param position - The position of the edge
 * @param order - The order of the edge
 * @param clearHistory - The clear history of the edge
 * @param message - The message of the edge
 * @param nestedChat - The nested chat of the edge
 * @param messageContext - The message context of the edge
 * @param summary - The summary of the edge: method and options
 * @param maxTurns - The max turns of the edge
 * @see IWaldiezMessage
 * @see WaldiezEdgeLlmSummaryMethod
 */
export type WaldiezEdgeDataCommon = {
  description: string;
  position: number;
  order: number;
  clearHistory: boolean;
  message: IWaldiezMessage;
  nestedChat: {
    message: IWaldiezMessage | null;
    reply: IWaldiezMessage | null;
  };
  summary: {
    method: WaldiezEdgeLlmSummaryMethod;
    prompt: string;
    args: { [key: string]: any };
  };
  maxTurns: number | null;
};

/**
 * Waldiez Edge Data.
 * @param label - The label of the edge
 * @see WaldiezEdgeDataCommon
 */
export type WaldiezEdgeData = WaldiezEdgeDataCommon & {
  label: string;
};

export type WaldiezEdgeType = 'chat' | 'group' | 'nested' | 'hidden';

export type WaldiezEdge = Edge<WaldiezEdgeData, WaldiezEdgeType>;

/**
 * Waldiez Edge Chat.
 * @param source - The source of the edge
 * @param target - The target of the edge
 * @param name - The name of the edge
 * @see WaldiezEdgeDataCommon
 */
export interface IWaldiezSourceEdgeData extends WaldiezEdgeDataCommon {
  source: string;
  target: string;
  name: string;
}

/**
 * Waldiez Edge Chat.
 * @param id - The id of the edge
 * @param data - The data of the edge
 * @param rest - The rest of the edge
 * @param asEdge - The as edge of the edge
 * @see IWaldiezSourceEdgeData
 * @see WaldiezEdge
 */
export interface IWaldiezSourceEdge {
  id: string;
  source: string;
  target: string;
  data: IWaldiezSourceEdgeData;
  rest: { [key: string]: unknown };
  asEdge: () => WaldiezEdge;
}
