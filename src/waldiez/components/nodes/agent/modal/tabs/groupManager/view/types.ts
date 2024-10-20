import { MultiValue, SingleValue } from '@waldiez/components/inputs';
import {
  SpeakerTransitionsType,
  WaldieAgentNode,
  WaldieGroupManagerSpeakerSelectionMethodOption,
  WaldieNodeGroupManagerData
} from '@waldiez/models';

export type GroupManagerConfigTabViewProps = {
  id: string;
  data: WaldieNodeGroupManagerData;
  onAdminNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxRoundChange: (value: number | null) => void;
  onEnableClearHistoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendIntroductionsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxRetriesForSelectingChange: (value: number | null) => void;
};

export type GroupManagerSpeakersTransitionViewProps = {
  id: string;
  data: WaldieNodeGroupManagerData;
  allConnectedNodes: WaldieAgentNode[];
  transitionSource: string | null;
  transitionTargets: string[];
  selectAgentOptions: { label: string; value: string }[];
  getAgentName: (id: string) => string;
  onAddTransition: () => void;
  onRemoveTransition: (source: string) => void;
  onTransitionsTypeChange: (option: SingleValue<{ label: string; value: SpeakerTransitionsType }>) => void;
  onTransitionsSourceChange: (option: SingleValue<{ label: string; value: string }>) => void;
  onTransitionsTargetsChange: (options: MultiValue<{ label: string; value: string }>) => void;
};
export type GroupManagerSpeakersTabViewProps = {
  id: string;
  data: WaldieNodeGroupManagerData;
  allConnectedNodes: WaldieAgentNode[];
  transitionSource: string | null;
  transitionTargets: string[];
  isDarkMode: boolean;
  onAllowRepeatChange: (options: MultiValue<{ label: string; value: string }>) => void;
  onSpeakerRepetitionModeChange: (
    option: {
      label: string;
      value: boolean | string;
    } | null
  ) => void;
  onAddTransition: () => void;
  onRemoveTransition: (source: string) => void;
  onTransitionsTypeChange: (option: SingleValue<{ label: string; value: SpeakerTransitionsType }>) => void;
  onTransitionsSourceChange: (option: SingleValue<{ label: string; value: string }>) => void;
  onTransitionsTargetsChange: (options: MultiValue<{ label: string; value: string }>) => void;
  onSelectionMethodChange: (
    option: SingleValue<{
      label: string;
      value: WaldieGroupManagerSpeakerSelectionMethodOption;
    }>
  ) => void;
  onSelectionCustomMethodChange: (value?: string) => void;
};
export type GroupManagerNodeTabViewProps = {
  flowId: string;
  id: string;
  data: WaldieNodeGroupManagerData;
  allConnectedNodes: WaldieAgentNode[];
  transitionSource: string | null;
  transitionTargets: string[];
  selectAgentOptions: { label: string; value: string }[];
  isDarkMode: boolean;
  onAdminNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxRoundChange: (value: number | null) => void;
  onEnableClearHistoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSendIntroductionsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxRetriesForSelectingChange: (value: number | null) => void;
  onAllowRepeatChange: (options: MultiValue<{ label: string; value: string }>) => void;
  onSpeakerRepetitionModeChange: (
    option: {
      label: string;
      value: boolean | string;
    } | null
  ) => void;
  onAddTransition: () => void;
  onRemoveTransition: (source: string) => void;
  onTransitionsTypeChange: (option: SingleValue<{ label: string; value: SpeakerTransitionsType }>) => void;
  onTransitionsSourceChange: (option: SingleValue<{ label: string; value: string }>) => void;
  onTransitionsTargetsChange: (options: MultiValue<{ label: string; value: string }>) => void;
  onSelectionMethodChange: (
    option: SingleValue<{
      label: string;
      value: WaldieGroupManagerSpeakerSelectionMethodOption;
    }>
  ) => void;
  onSelectionCustomMethodChange: (value?: string) => void;
};
