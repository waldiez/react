import { Select } from '@waldiez/components/inputs';
import { GroupManagerSpeakersTransitionViewProps } from '@waldiez/components/nodes/agent/modal/tabs/groupManager/view/types';

export const GroupManagerSpeakersTransitionView = (props: GroupManagerSpeakersTransitionViewProps) => {
  const {
    id,
    data,
    allConnectedNodes,
    transitionSource,
    transitionTargets,
    selectAgentOptions,
    onAddTransition,
    onRemoveTransition,
    onTransitionsTypeChange,
    onTransitionsSourceChange,
    onTransitionsTargetsChange,
    getAgentName
  } = props;
  return (
    <div className="padding-10">
      <label>Speakers Transitions:</label>
      <div>
        <div className="margin-10 full-width flex-align-center">
          <label
            className="margin-right-10 margin-bottom-10"
            htmlFor={`manager-speakers-transition-from-${id}`}
          >
            From:
          </label>
          <Select
            name="From"
            options={selectAgentOptions}
            value={
              transitionSource
                ? {
                    label: getAgentName(transitionSource as string),
                    value: transitionSource
                  }
                : null
            }
            onChange={onTransitionsSourceChange}
            inputId={`manager-speakers-transition-from-${id}`}
          />
          <label
            className="margin-left-10 margin-right-10 margin-bottom-10"
            htmlFor={`manager-speakers-transition-to-${id}`}
          >
            To:
          </label>
          <Select
            name="To"
            isMulti
            value={transitionTargets.map(target => ({
              label: getAgentName(target),
              value: target
            }))}
            options={allConnectedNodes.map(node => ({
              label: node.data.label,
              value: node.id
            }))}
            onChange={onTransitionsTargetsChange}
            inputId={`manager-speakers-transition-to-${id}`}
          />
          <button
            className="manager-speakers-add-transition margin-left-10 margin-bottom-10"
            disabled={!transitionSource || transitionTargets.length === 0}
            onClick={onAddTransition}
            data-testid={`manager-speakers-add-transition-${id}`}
          >
            Add
          </button>
        </div>
        {Object.entries(data.speakers?.allowedOrDisallowedTransitions ?? {}).map(
          ([source, targets], index) => (
            <div key={source} className="flex-align-center manager-transitions-wrapper">
              <div>
                From: <span className="bold">{getAgentName(source)}</span>
              </div>
              <div className="margin-left-10 flex-align-center">
                To:
                <div className="manager-speakers-transitions-to">
                  {targets.map(target => getAgentName(target)).join(', ')}
                </div>
              </div>
              <button
                className="margin-left-10"
                onClick={onRemoveTransition.bind(null, source)}
                data-testid={`manager-speakers-remove-transition-${id}-${index}`}
              >
                Remove
              </button>
            </div>
          )
        )}
      </div>
      <label htmlFor={`manager-speakers-transitions-type-${id}`}>Transitions mode:</label>
      <div className="margin-bottom-10" />
      <Select
        options={[
          { label: 'Allowed', value: 'allowed' },
          {
            label: 'Disallowed',
            value: 'disallowed'
          }
        ]}
        value={{
          label: data.speakers?.transitionsType === 'allowed' ? 'Allowed' : 'Disallowed',
          value: data.speakers?.transitionsType
        }}
        onChange={onTransitionsTypeChange}
        inputId={`manager-speakers-transitions-type-${id}`}
      />
    </div>
  );
};
