import { Dict, NumberInput, StringList } from '@waldiez/components/inputs';
import { WaldiezNodeModelModalAdvancedTabViewProps } from '@waldiez/components/nodes/model/modal/tabs/advanced/types';

export const WaldiezNodeModelModalAdvancedTabView = (props: WaldiezNodeModelModalAdvancedTabViewProps) => {
  const {
    data,
    onTemperatureChange,
    onTopPChange,
    onMaxTokensChange,
    onUpdateHeaders,
    onDeleteHeader,
    onAddHeader,
    onAddTag,
    onUpdateTag,
    onDeleteTag
  } = props;
  const { temperature, topP, maxTokens, defaultHeaders, tags } = data;
  return (
    <div className="flex-column">
      <NumberInput
        label={'Temperature:'}
        value={temperature !== null ? temperature : -0.001}
        onChange={onTemperatureChange}
        min={-0.001}
        max={1}
        step={0.001}
        setNullOnLower={true}
        onLowerLabel="Unset"
        dataTestId="model-modal-temperature"
      />
      <NumberInput
        label={'Top P:'}
        labelInfo={
          'Top P value for sampling (it is recommended to use either temperature or top P, not both)'
        }
        value={topP !== null ? topP : -0.001}
        onChange={onTopPChange}
        min={-0.001}
        max={1}
        step={0.001}
        setNullOnLower={true}
        onLowerLabel="Unset"
        dataTestId="model-modal-top-p"
      />
      <NumberInput
        label="Max Tokens:"
        value={maxTokens !== null ? maxTokens : 0}
        onChange={onMaxTokensChange}
        min={0}
        max={50000}
        step={1}
        forceInt
        setNullOnLower
        onLowerLabel="No limit"
        dataTestId="model-modal-max-tokens"
      />
      <Dict
        viewLabel="Default Headers:"
        viewLabelInfo="Optional headers to be included in every request"
        items={defaultHeaders}
        itemsType="model-header"
        onUpdate={onUpdateHeaders}
        onDelete={onDeleteHeader}
        onAdd={onAddHeader}
      />
      <StringList
        viewLabel="Tags:"
        items={tags}
        itemsType="tag"
        onItemAdded={onAddTag}
        onItemChange={onUpdateTag}
        onItemDeleted={onDeleteTag}
      />
    </div>
  );
};
