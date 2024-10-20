import { Edge } from '@xyflow/react';

import { IWaldieMessage } from '@waldiez/models/types/waldieMessage';

/**
 * Waldie Edge Llm Summary Method.
 * @param reflection_with_llm - Use reflection with llm summary method
 * @param last_msg - Use last message summary method
 * @param null - No summary method
 */
export type WaldieEdgeLlmSummaryMethod = 'reflection_with_llm' | 'last_msg' | null;

/**
 * Waldie Edge Data.
 * @param description - The description of the edge
 * @param position - The position of the edge
 * @param order - The order of the edge
 * @param clearHistory - The clear history of the edge
 * @param message - The message of the edge
 * @param nestedChat - The nested chat of the edge
 * @param messageContext - The message context of the edge
 * @param summary - The summary of the edge: method and options
 * @param maxTurns - The max turns of the edge
 * @see IWaldieMessage
 * @see WaldieEdgeLlmSummaryMethod
 */
export type WaldieEdgeDataCommon = {
  description: string;
  position: number;
  order: number;
  clearHistory: boolean;
  message: IWaldieMessage;
  nestedChat: {
    message: IWaldieMessage | null;
    reply: IWaldieMessage | null;
  };
  summary: {
    method: WaldieEdgeLlmSummaryMethod;
    prompt: string;
    args: { [key: string]: any };
  };
  maxTurns: number | null;
};

/**
 * Waldie Edge Data.
 * @param label - The label of the edge
 * @see WaldieEdgeDataCommon
 */
export type WaldieEdgeData = WaldieEdgeDataCommon & {
  label: string;
};

export type WaldieEdgeType = 'chat' | 'group' | 'nested' | 'hidden';

export type WaldieEdge = Edge<WaldieEdgeData, WaldieEdgeType>;

/**
 * Waldie Edge Chat.
 * @param source - The source of the edge
 * @param target - The target of the edge
 * @param name - The name of the edge
 * @see WaldieEdgeDataCommon
 */
export interface IWaldieSourceEdgeData extends WaldieEdgeDataCommon {
  source: string;
  target: string;
  name: string;
}

/**
 * Waldie Edge Chat.
 * @param id - The id of the edge
 * @param data - The data of the edge
 * @param rest - The rest of the edge
 * @param asEdge - The as edge of the edge
 * @see IWaldieSourceEdgeData
 * @see WaldieEdge
 */
export interface IWaldieSourceEdge {
  id: string;
  source: string;
  target: string;
  data: IWaldieSourceEdgeData;
  rest: { [key: string]: unknown };
  asEdge: () => WaldieEdge;
}
