import { InfoCheckbox, NumberInput, TextInput } from '@waldiez/components/inputs';
import { GroupManagerConfigTabViewProps } from '@waldiez/components/nodes/agent/modal/tabs/groupManager/view/types';

export const GroupManagerConfigTabView = (props: GroupManagerConfigTabViewProps) => {
  const {
    id,
    data,
    onAdminNameChange,
    onMaxRoundChange,
    onEnableClearHistoryChange,
    onSendIntroductionsChange,
    onMaxRetriesForSelectingChange
  } = props;
  return (
    <div className="flex-column">
      <TextInput
        label="Admin Name:"
        value={data.adminName ?? ''}
        labelInfo={
          "The name of the admin agent if there is one. Default is 'Admin'. A 'KeyBoardInterrupt' will make the admin agent take over."
        }
        onChange={onAdminNameChange}
        dataTestId={`manager-admin-name-input-${id}`}
      />
      <div className="margin-bottom-10">
        <NumberInput
          label="Max Rounds:"
          value={data.maxRound ?? 0}
          onChange={onMaxRoundChange}
          min={0}
          max={1000}
          step={1}
          onNull={0}
          setNullOnLower={true}
          onLowerLabel="Unset"
          labelInfo={'The maximum number of conversation rounds in the group.'}
          dataTestId={`manager-max-rounds-input-${id}`}
        />
      </div>
      <InfoCheckbox
        label="Enable clear history"
        checked={data.enableClearHistory === false}
        info="Enable the possibility to clear history of messages for agents manually by providing 'clear history' phrase in user prompt."
        onChange={onEnableClearHistoryChange}
        dataTestId={`manager-enable-clear-history-checkbox-${id}`}
      />
      <InfoCheckbox
        label="Send introductions"
        checked={data.sendIntroductions === true}
        info="Send a round of introductions at the start of the group chat, so agents know who they can speak to (default: False)"
        onChange={onSendIntroductionsChange}
        dataTestId={`manager-send-introductions-checkbox-${id}`}
      />
      <div className="margin-bottom-10">
        <NumberInput
          label="Max Retries for Selecting Speaker:"
          value={data.speakers?.maxRetriesForSelecting ?? 0}
          onChange={onMaxRetriesForSelectingChange}
          min={0}
          max={100}
          step={1}
          onNull={0}
          setNullOnLower={true}
          onLowerLabel="Unset"
          labelInfo="The maximum number of times the speaker selection re-query process will run. If, during speaker selection, multiple agent names or no agent names are returned by the LLM as the next agent, it will be queried again up to the maximum number of times until a single agent is returned or it exhausts the maximum attempts. Applies only to 'auto' speaker selection method."
          dataTestId={`manager-max-retries-for-selecting-input-${id}`}
        />
      </div>
    </div>
  );
};
