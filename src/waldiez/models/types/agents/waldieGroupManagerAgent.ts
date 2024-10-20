// waldie user proxy agent
import { Node, XYPosition } from '@xyflow/react';

import { WaldieAgentCommonData } from '@waldiez/models/types/agents/waldieAgent';
import { IWaldieSourceNode } from '@waldiez/models/types/base';

export type WaldieGroupManagerSpeakerSelectionMethodOption =
  | 'auto'
  | 'manual'
  | 'random'
  | 'round_robin'
  | 'custom';

export type SpeakerTransitionsType = 'allowed' | 'disallowed';
export type SpeakerSelectionMode = 'repeat' | 'transition';
export type WaldieWaldieGroupManagerSpeakers = {
  selectionMethod: WaldieGroupManagerSpeakerSelectionMethodOption;
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

export type WaldieGroupManagerCommonData = WaldieAgentCommonData & {
  maxRound: number | null;
  adminName: string | null;
  speakers: WaldieWaldieGroupManagerSpeakers;
  enableClearHistory?: boolean;
  sendIntroductions?: boolean;
};
export type WaldieNodeGroupManagerData = WaldieGroupManagerCommonData & {
  label: string;
  agentType: 'manager';
};

export type WaldieNodeGroupManager = Node<WaldieNodeGroupManagerData, 'agent'>;

export interface IWaldieSourceGroupManagerData extends WaldieGroupManagerCommonData {
  name: string;
}

export interface IWaldieSourceGroupManager extends IWaldieSourceNode {
  data: IWaldieSourceGroupManagerData;
  asNode: (position?: XYPosition) => WaldieNodeGroupManager;
}
