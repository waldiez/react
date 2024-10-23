// waldiez user proxy agent
import { Node, XYPosition } from '@xyflow/react';

import { WaldiezAgentCommonData } from '@waldiez/models/types/agents/agent';
import { IWaldiezSourceNode } from '@waldiez/models/types/base';

export type WaldiezGroupManagerSpeakerSelectionMethodOption =
  | 'auto'
  | 'manual'
  | 'random'
  | 'round_robin'
  | 'custom';

export type SpeakerTransitionsType = 'allowed' | 'disallowed';
export type SpeakerSelectionMode = 'repeat' | 'transition';
export type WaldiezGroupManagerSpeakers = {
  selectionMethod: WaldiezGroupManagerSpeakerSelectionMethodOption;
  selectionCustomMethod: string;
  maxRetriesForSelecting: number | null;
  // `allow_repeat_speaker` and
  // `allowed_or_disallowed_speaker_transitions`
  // are mutually exclusive.
  selectionMode: SpeakerSelectionMode;
  allowRepeat: boolean | string[];
  allowedOrDisallowedTransitions: { [key: string]: string[] };
  transitionsType: SpeakerTransitionsType;
};

export type WaldiezGroupManagerCommonData = WaldiezAgentCommonData & {
  maxRound: number | null;
  adminName: string | null;
  speakers: WaldiezGroupManagerSpeakers;
  enableClearHistory?: boolean;
  sendIntroductions?: boolean;
};
export type WaldiezNodeGroupManagerData = WaldiezGroupManagerCommonData & {
  label: string;
  agentType: 'manager';
};

export type WaldiezNodeGroupManager = Node<WaldiezNodeGroupManagerData, 'agent'>;

export interface IWaldiezSourceGroupManagerData extends WaldiezGroupManagerCommonData {
  name: string;
}

export interface IWaldiezSourceGroupManager extends IWaldiezSourceNode {
  data: IWaldiezSourceGroupManagerData;
  asNode: (position?: XYPosition) => WaldiezNodeGroupManager;
}
