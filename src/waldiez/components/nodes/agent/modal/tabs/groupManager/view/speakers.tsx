import { Editor, Select } from '@waldiez/components/inputs';
import { GroupManagerSpeakersTransitionView } from '@waldiez/components/nodes/agent/modal/tabs/groupManager/view/speakersTransition';
import { GroupManagerSpeakersTabViewProps } from '@waldiez/components/nodes/agent/modal/tabs/groupManager/view/types';
import { WaldieGroupManagerSpeakerSelectionMethodOption } from '@waldiez/types';

export const GroupManagerSpeakersTabView = (props: GroupManagerSpeakersTabViewProps) => {
  const {
    id,
    data,
    allConnectedNodes,
    transitionSource,
    transitionTargets,
    isDarkMode,
    onAddTransition,
    onRemoveTransition,
    onAllowRepeatChange,
    onSpeakerRepetitionModeChange,
    onTransitionsTypeChange,
    onTransitionsSourceChange,
    onTransitionsTargetsChange,
    onSelectionMethodChange,
    onSelectionCustomMethodChange
  } = props;

  const getAgentName = (id: string) => {
    return allConnectedNodes.find(node => node.id === id)?.data.label as string;
  };
  const getSpeakerRepetitionModeValue = () => {
    if (data.speakers?.selectionMode === 'transition') {
      return {
        label: 'Disabled (Use transitions)',
        value: 'disabled'
      };
    }
    if (data.speakers?.allowRepeat === false) {
      return {
        label: 'Not allowed',
        value: false
      };
    }
    if (data.speakers?.allowRepeat === true) {
      return {
        label: 'Allowed',
        value: true
      };
    }
    return {
      label: 'Custom',
      value: 'custom'
    };
  };
  const speakerRepetitionModelValue = getSpeakerRepetitionModeValue();
  const selectAgentOptions = allConnectedNodes.map(node => ({
    label: node.data.label as string,
    value: node.id
  }));
  const defaultSpeakerSelectionMethodContent =
    data.speakers?.selectionCustomMethod && data.speakers?.selectionCustomMethod.length > 1
      ? data.speakers.selectionCustomMethod
      : DEFAULT_CUSTOM_SPEAKER_SELECTION_CONTENT;
  return (
    <div className="flex-column" data-testid={`manager-speakers-tab-${id}`}>
      <label className="speaker-repetition-mode-label" htmlFor={`manager-speaker-repetition-mode-${id}`}>
        Speaker repetition mode:
      </label>
      <Select
        options={[
          { label: 'Allowed', value: true },
          { label: 'Not allowed', value: false },
          { label: 'Custom', value: 'custom' },
          {
            label: 'Disabled (Use transitions)',
            value: 'disabled'
          }
        ]}
        value={speakerRepetitionModelValue}
        onChange={onSpeakerRepetitionModeChange}
        inputId={`manager-speaker-repetition-mode-${id}`}
      />
      {data.speakers?.selectionMode === 'repeat' && typeof data.speakers?.allowRepeat !== 'boolean' && (
        <div className="padding-10">
          <label htmlFor={`manager-allowed-speakers-${id}`}>Allowed Speakers:</label>
          <div className="margin-bottom-10" />
          <Select
            name="Allowed Speakers"
            isMulti
            value={((data.speakers?.allowRepeat ?? []) as string[]).map(agent => ({
              label: getAgentName(agent),
              value: agent
            }))}
            options={selectAgentOptions}
            onChange={onAllowRepeatChange}
            inputId={`manager-allowed-speakers-${id}`}
          />
        </div>
      )}
      {data.speakers?.selectionMode === 'transition' && (
        <GroupManagerSpeakersTransitionView
          id={id}
          data={data}
          transitionSource={transitionSource}
          transitionTargets={transitionTargets}
          allConnectedNodes={allConnectedNodes}
          selectAgentOptions={selectAgentOptions}
          getAgentName={getAgentName}
          onAddTransition={onAddTransition}
          onRemoveTransition={onRemoveTransition}
          onTransitionsTypeChange={onTransitionsTypeChange}
          onTransitionsSourceChange={onTransitionsSourceChange}
          onTransitionsTargetsChange={onTransitionsTargetsChange}
        />
      )}
      <label htmlFor={`manager-speaker-selection-method-${id}`}>Speaker Selection Method:</label>
      <Select
        options={speakerSelectionOptions}
        value={{
          label:
            speakerSelectionOptions.find(option => option.value === data.speakers?.selectionMethod)?.label ??
            'Auto',
          value: data.speakers?.selectionMethod ?? 'auto'
        }}
        onChange={onSelectionMethodChange}
        inputId={`manager-speaker-selection-method-${id}`}
      />
      {data.speakers?.selectionMethod === 'custom' && (
        <div className="margin-top-10">
          <Editor
            value={defaultSpeakerSelectionMethodContent}
            darkMode={isDarkMode}
            onChange={onSelectionCustomMethodChange}
          />
        </div>
      )}
    </div>
  );
};

const speakerSelectionOptions: {
  label: string;
  value: WaldieGroupManagerSpeakerSelectionMethodOption;
}[] = [
  { label: 'Auto', value: 'auto' },
  { label: 'Manual', value: 'manual' },
  { label: 'Random', value: 'random' },
  { label: 'Round Robin', value: 'round_robin' },
  { label: 'Custom method', value: 'custom' }
];
export const DEFAULT_CUSTOM_SPEAKER_SELECTION_CONTENT = `"""Custom speaker selection function."""
# provide the function to select the next speaker in the group chat
# complete the \`custom_speaker_selection\` below. Do not change the name or the arguments of the function.
# only complete the function body and the docstring and return the next speaker.
# example:
# def custom_speaker_selection(last_speaker, groupchat):
#    # type: (Agent, GroupChat) -> Agent | str | None
#    return groupchat.agents[0]
#
def custom_speaker_selection(last_speaker, groupchat):
    """Complete the custom speaker selection function"""
    ...
`;
