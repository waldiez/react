import { Node, XYPosition } from '@xyflow/react';

import { IWaldieSourceNode } from '@waldiez/models/types/base';

export type WaldieModelAPIType =
  | 'openai'
  | 'azure'
  | 'google'
  | 'anthropic'
  | 'mistral'
  | 'groq'
  | 'together'
  | 'nim'
  | 'other';

export type WaldieModelPrice = {
  promptPricePer1k: number | null;
  completionTokenPricePer1k: number | null;
};

export type WaldieModelDataCommon = {
  description: string;
  baseUrl: string | null;
  apiKey: string | null;
  apiType: WaldieModelAPIType;
  apiVersion: string | null;
  temperature: number | null;
  topP: number | null;
  maxTokens: number | null;
  defaultHeaders: { [key: string]: string };
  price: WaldieModelPrice;
  requirements: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type WaldieModelNodeData = WaldieModelDataCommon & {
  label: string;
};

export type WaldieModelNode = Node<WaldieModelNodeData, 'model'>;

export interface IWaldieSourceModelData extends WaldieModelDataCommon {
  name: string;
}

export interface IWaldieSourceModel extends IWaldieSourceNode {
  data: IWaldieSourceModelData;
  asNode: (position?: XYPosition) => WaldieModelNode;
}
