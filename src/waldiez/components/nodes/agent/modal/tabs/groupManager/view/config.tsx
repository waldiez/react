import { NumberInput, TextInput } from '@waldiez/components/inputs';
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
        onChange={onAdminNameChange}
        dataTestId={`manager-admin-name-input-${id}`}
      />
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
        labelInfo={null}
        dataTestId={`manager-max-rounds-input-${id}`}
      />
      <label className="checkbox-label">
        <div>Enable clear history</div>
        <input
          type="checkbox"
          checked={data.enableClearHistory === false}
          onChange={onEnableClearHistoryChange}
          data-testid={`manager-enable-clear-history-checkbox-${id}`}
        />
        <div className="checkbox"></div>
      </label>
      <label className="checkbox-label">
        <div>Send introductions</div>
        <input
          type="checkbox"
          defaultChecked={data.sendIntroductions === true}
          onChange={onSendIntroductionsChange}
          data-testid={`manager-send-introductions-checkbox-${id}`}
        />
        <div className="checkbox"></div>
      </label>
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
        labelInfo="Maximum number of retries to select a speaker."
        dataTestId={`manager-max-retries-for-selecting-input-${id}`}
      />
    </div>
  );
};
