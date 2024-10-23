import { Node, XYPosition } from '@xyflow/react';

import { IWaldiezSourceNode } from '@waldiez/models/types/base';

export type WaldiezModelAPIType =
  | 'openai'
  | 'azure'
  | 'google'
  | 'anthropic'
  | 'mistral'
  | 'groq'
  | 'together'
  | 'nim'
  | 'other';

export type WaldiezModelPrice = {
  promptPricePer1k: number | null;
  completionTokenPricePer1k: number | null;
};

export type WaldiezModelDataCommon = {
  description: string;
  baseUrl: string | null;
  apiKey: string | null;
  apiType: WaldiezModelAPIType;
  apiVersion: string | null;
  temperature: number | null;
  topP: number | null;
  maxTokens: number | null;
  defaultHeaders: { [key: string]: string };
  price: WaldiezModelPrice;
  requirements: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type WaldiezModelNodeData = WaldiezModelDataCommon & {
  label: string;
};

export type WaldiezModelNode = Node<WaldiezModelNodeData, 'model'>;

export interface IWaldiezSourceModelData extends WaldiezModelDataCommon {
  name: string;
}

export interface IWaldiezSourceModel extends IWaldiezSourceNode {
  data: IWaldiezSourceModelData;
  asNode: (position?: XYPosition) => WaldiezModelNode;
}
