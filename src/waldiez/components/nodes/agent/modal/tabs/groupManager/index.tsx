import { useState } from 'react';

import { MultiValue, SingleValue } from '@waldiez/components/inputs';
import { GroupManagerNodeTabProps } from '@waldiez/components/nodes/agent/modal/tabs/groupManager/types';
import { GroupManagerNodeTabView } from '@waldiez/components/nodes/agent/modal/tabs/groupManager/view';
import {
  SpeakerTransitionsType,
  WaldiezGroupManagerSpeakerSelectionMethodOption,
  WaldiezNodeGroupManagerData
} from '@waldiez/models';

export const GroupManagerConfigNodeTab = (props: GroupManagerNodeTabProps) => {
  const { flowId, id, data, isDarkMode, onDataChange } = props;
  const [transitionSource, setTransitionSource] = useState<string | null>(null);
  const [transitionTargets, setTransitionTargets] = useState<string[]>([]);
  const onAdminNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ ...data, adminName: event.target.value });
  };
  const onMaxRoundChange = (value: number | null) => {
    onDataChange({ ...data, maxRound: value });
  };
  const onEnableClearHistoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ ...data, enableClearHistory: event.target.checked });
  };
  const onSendIntroductionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ ...data, sendIntroductions: event.target.checked });
  };
  const setSpeakersData = (partialData: Partial<WaldiezNodeGroupManagerData['speakers']>) => {
    onDataChange({
      ...data,
      speakers: { ...data.speakers, ...partialData }
    });
  };
  const onMaxRetriesForSelectingChange = (value: number | null) => {
    setSpeakersData({ maxRetriesForSelecting: value });
    // setData({ ...data, maxRetriesForSelecting: value });
  };
  const onAllowRepeatChange = (options: MultiValue<{ label: string; value: string }>) => {
    if (options) {
      setSpeakersData({
        allowRepeat: options.map(option => option.value)
      });
    }
  };
  const onSpeakerRepetitionModeChange = (option: { label: string; value: boolean | string } | null) => {
    if (option) {
      if (option.value === 'disabled') {
        setSpeakersData({
          selectionMode: 'transition'
        });
      } else {
        const currentValue = data.speakers?.allowRepeat ?? true;
        if (typeof option.value === 'string') {
          const newValue = typeof currentValue === 'boolean' ? [] : currentValue;
          setSpeakersData({
            selectionMode: 'repeat',
            allowRepeat: newValue
          });
        } else {
          setSpeakersData({
            selectionMode: 'repeat',
            allowRepeat: option.value
          });
        }
      }
    }
  };
  const onAddTransition = () => {
    if (transitionSource && transitionTargets.length > 0) {
      setSpeakersData({
        allowedOrDisallowedTransitions: {
          ...data.speakers?.allowedOrDisallowedTransitions,
          [transitionSource]: transitionTargets
        }
      });
      setTransitionSource(null);
      setTransitionTargets([]);
    }
  };
  const onRemoveTransition = (source: string) => {
    setSpeakersData({
      allowedOrDisallowedTransitions: Object.fromEntries(
        Object.entries(data.speakers?.allowedOrDisallowedTransitions ?? {}).filter(([key]) => key !== source)
      )
    });
  };
  const allConnectedNodes = [...props.nodeConnections.source.nodes, ...props.nodeConnections.target.nodes];
  const selectAgentOptions = allConnectedNodes.map(node => ({
    label: node.data.label as string,
    value: node.id
  }));
  const onTransitionsTargetsChange = (options: MultiValue<{ label: string; value: string }>) => {
    setTransitionTargets(options.map(option => option.value));
  };
  const onTransitionsSourceChange = (option: { label: string; value: string } | null) => {
    if (option) {
      setTransitionSource(option.value);
    }
  };
  const onTransitionsTypeChange = (option: SingleValue<{ label: string; value: SpeakerTransitionsType }>) => {
    if (option) {
      setSpeakersData({ transitionsType: option.value });
    }
  };
  const onSelectionCustomMethodChange = (value?: string) => {
    setSpeakersData({
      selectionCustomMethod: value ?? ''
    });
  };
  const onSelectionMethodChange = (
    option: {
      label: string;
      value: WaldiezGroupManagerSpeakerSelectionMethodOption;
    } | null
  ) => {
    if (option) {
      setSpeakersData({ selectionMethod: option.value });
    }
  };
  return (
    <GroupManagerNodeTabView
      flowId={flowId}
      id={id}
      data={data}
      allConnectedNodes={allConnectedNodes}
      transitionSource={transitionSource}
      transitionTargets={transitionTargets}
      isDarkMode={isDarkMode}
      selectAgentOptions={selectAgentOptions}
      onAdminNameChange={onAdminNameChange}
      onMaxRoundChange={onMaxRoundChange}
      onEnableClearHistoryChange={onEnableClearHistoryChange}
      onSendIntroductionsChange={onSendIntroductionsChange}
      onMaxRetriesForSelectingChange={onMaxRetriesForSelectingChange}
      onAllowRepeatChange={onAllowRepeatChange}
      onSpeakerRepetitionModeChange={onSpeakerRepetitionModeChange}
      onAddTransition={onAddTransition}
      onRemoveTransition={onRemoveTransition}
      onTransitionsTypeChange={onTransitionsTypeChange}
      onTransitionsSourceChange={onTransitionsSourceChange}
      onTransitionsTargetsChange={onTransitionsTargetsChange}
      onSelectionMethodChange={onSelectionMethodChange}
      onSelectionCustomMethodChange={onSelectionCustomMethodChange}
    />
  );
};
