import { Select } from '@waldiez/components/inputs';
import { GroupAgentConfigTabViewProps } from '@waldiez/components/nodes/agent/modal/tabs/group/types';

export const GroupAgentConfigTabView = (props: GroupAgentConfigTabViewProps) => {
  const { id, groupOptions, currentGroup, selectedGroup, onSelectGroupChange, onJoinGroup, onLeaveGroup } =
    props;
  return (
    <div className="agent-panel agent-group-panel">
      {!currentGroup ? (
        <div className="agent-panel-select-group">
          <label className="hidden" htmlFor={`agent-select-group-${id}`}>
            Group
          </label>
          <Select
            options={groupOptions}
            value={
              selectedGroup
                ? {
                    label: selectedGroup.data.label,
                    value: selectedGroup
                  }
                : null
            }
            onChange={onSelectGroupChange}
            inputId={`agent-select-group-${id}`}
          />
          <button
            className="agent-panel-select-group-action"
            onClick={onJoinGroup}
            disabled={selectedGroup === null}
            data-testid={`join-group-button-agent-${id}`}
          >
            Join group
          </button>
        </div>
      ) : (
        <div className="agent-panel-current-group">
          <div className="agent-panel-group-label" data-testid={`group-label-agent-${id}`}>
            {currentGroup.data.label}
          </div>
          <div className="agent-panel-group-actions">
            <button
              className="agent-panel-group-action"
              onClick={onLeaveGroup}
              data-testid={`leave-group-button-agent-${id}`}
            >
              Leave group
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
