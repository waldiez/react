import { Editor, InfoLabel, Select } from '@waldiez/components/inputs';
import { GroupManagerSpeakersTransitionView } from '@waldiez/components/nodes/agent/modal/tabs/groupManager/view/speakersTransition';
import { GroupManagerSpeakersTabViewProps } from '@waldiez/components/nodes/agent/modal/tabs/groupManager/view/types';
import { WaldiezGroupManagerSpeakerSelectionMethodOption } from '@waldiez/types';

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
      <InfoLabel
        label="Speaker Selection Method:"
        info={() => (
          <>
            The method for selecting the next speaker. Default is "auto". Could be any of the following:
            <ul>
              <li>
                <strong>"Auto"</strong>: the next speaker is selected automatically by LLM.
              </li>
              <li>
                <strong>"Manual"</strong>: the next speaker is selected manually by user input.
              </li>
              <li>
                <strong>"Random"</strong>: the next speaker is selected randomly.
              </li>
              <li>
                <strong>"Round Robin"</strong>: the next speaker is selected in a round robin fashion, i.e.,
                iterating in the same order as provided in agents.
              </li>
              <li>
                <strong>"Custom Method"</strong>: A customized speaker selection function (Callable): the
                function will be called to select the next speaker. The function should take the last speaker
                and the group chat as input and return one of the following:
                <ul>
                  <li>an Agent class, it must be one of the agents in the group chat.</li>
                  <li>
                    a string from ['auto', 'manual', 'random', 'round_robin'] to select a default method to
                    use.
                  </li>
                  <li>None, which would terminate the conversation gracefully.</li>
                </ul>
              </li>
            </ul>
          </>
        )}
      />
      <label className="hidden" htmlFor={`manager-speaker-selection-method-${id}`}>
        Speaker Selection Method:
      </label>
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
  value: WaldiezGroupManagerSpeakerSelectionMethodOption;
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
