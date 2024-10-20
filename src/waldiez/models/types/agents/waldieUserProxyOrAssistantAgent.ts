import { Node, XYPosition } from '@xyflow/react';

import { WaldieAgentCommonData, WaldieAgentNestedChat } from '@waldiez/models/types/agents/waldieAgent';
import { IWaldieSourceNode } from '@waldiez/models/types/base';

// for react flow
export type WaldieNodeUserProxyData = WaldieAgentCommonData & {
  label: string;
  nestedChats: WaldieAgentNestedChat[];
};

export type WaldieNodeAssistantData = WaldieAgentCommonData & {
  label: string;
  nestedChats: WaldieAgentNestedChat[];
};

export type WaldieNodeUserProxyOrAssistantData = WaldieNodeUserProxyData | WaldieNodeAssistantData;

export type WaldieNodeAssistant = Node<WaldieNodeAssistantData, 'agent'>;

export type WaldieNodeUserProxy = Node<WaldieNodeUserProxyData, 'agent'>;

export type WaldieNodeUserProxyOrAssistant = WaldieNodeUserProxy | WaldieNodeAssistant;

// outside of react flow
export interface IWaldieSourceUserProxyOrAssistantData extends WaldieAgentCommonData {
  name: string;
  nestedChats: WaldieAgentNestedChat[];
  agentType: 'user' | 'assistant';
}

export interface IWaldieSourceAssistant extends IWaldieSourceNode {
  data: IWaldieSourceUserProxyOrAssistantData;
  agentType: 'user' | 'assistant';
  asNode: (position?: XYPosition) => WaldieNodeUserProxyOrAssistant;
}

export interface IWaldieSourceUserProxy extends IWaldieSourceNode {
  data: IWaldieSourceUserProxyOrAssistantData;
  agentType: 'user' | 'assistant';
  asNode: (position?: XYPosition) => WaldieNodeUserProxyOrAssistant;
}

export interface IWaldieSourceUserProxyData extends IWaldieSourceUserProxyOrAssistantData {
  agentType: 'user' | 'assistant';
}
export interface IWaldieSourceAssistantData extends IWaldieSourceUserProxyOrAssistantData {
  name: string;
  agentType: 'user' | 'assistant';
}
export interface IWaldieSourceUserProxyOrAssistant extends IWaldieSourceUserProxy, IWaldieSourceAssistant {
  agentType: 'user' | 'assistant';
  asNode: (position?: XYPosition) => WaldieNodeUserProxyOrAssistant;
}
