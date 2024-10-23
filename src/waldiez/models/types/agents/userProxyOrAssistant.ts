import { Node, XYPosition } from '@xyflow/react';

import { WaldiezAgentCommonData, WaldiezAgentNestedChat } from '@waldiez/models/types/agents/agent';
import { IWaldiezSourceNode } from '@waldiez/models/types/base';

// for react flow
export type WaldiezNodeUserProxyData = WaldiezAgentCommonData & {
  label: string;
  nestedChats: WaldiezAgentNestedChat[];
};

export type WaldiezNodeAssistantData = WaldiezAgentCommonData & {
  label: string;
  nestedChats: WaldiezAgentNestedChat[];
};

export type WaldiezNodeUserProxyOrAssistantData = WaldiezNodeUserProxyData | WaldiezNodeAssistantData;

export type WaldiezNodeAssistant = Node<WaldiezNodeAssistantData, 'agent'>;

export type WaldiezNodeUserProxy = Node<WaldiezNodeUserProxyData, 'agent'>;

export type WaldiezNodeUserProxyOrAssistant = WaldiezNodeUserProxy | WaldiezNodeAssistant;

// outside of react flow
export interface IWaldiezSourceUserProxyOrAssistantData extends WaldiezAgentCommonData {
  name: string;
  nestedChats: WaldiezAgentNestedChat[];
  agentType: 'user' | 'assistant';
}

export interface IWaldiezSourceAssistant extends IWaldiezSourceNode {
  data: IWaldiezSourceUserProxyOrAssistantData;
  agentType: 'user' | 'assistant';
  asNode: (position?: XYPosition) => WaldiezNodeUserProxyOrAssistant;
}

export interface IWaldiezSourceUserProxy extends IWaldiezSourceNode {
  data: IWaldiezSourceUserProxyOrAssistantData;
  agentType: 'user' | 'assistant';
  asNode: (position?: XYPosition) => WaldiezNodeUserProxyOrAssistant;
}

export interface IWaldiezSourceUserProxyData extends IWaldiezSourceUserProxyOrAssistantData {
  agentType: 'user' | 'assistant';
}
export interface IWaldiezSourceAssistantData extends IWaldiezSourceUserProxyOrAssistantData {
  name: string;
  agentType: 'user' | 'assistant';
}
export interface IWaldiezSourceUserProxyOrAssistant extends IWaldiezSourceUserProxy, IWaldiezSourceAssistant {
  agentType: 'user' | 'assistant';
  asNode: (position?: XYPosition) => WaldiezNodeUserProxyOrAssistant;
}
