import { useState } from 'react';

import { SingleValue } from '@waldiez/components/inputs';
import { GroupAgentConfigTabProps } from '@waldiez/components/nodes/agent/modal/tabs/group/types';
import { GroupAgentConfigTabView } from '@waldiez/components/nodes/agent/modal/tabs/group/view';
import { WaldiezAgentNode } from '@waldiez/models';

export const GroupAgentConfigTab = (props: GroupAgentConfigTabProps) => {
  const { id, agents, currentGroupManager, setCurrentGroupManager } = props;
  const [selectedGroup, setSelectedGroup] = useState<WaldiezAgentNode | null>(null);
  const onSelectGroupChange = (option: SingleValue<{ label: string; value: WaldiezAgentNode }>) => {
    if (option) {
      setSelectedGroup(option.value);
    }
  };
  const groupManagers = agents.filter(agent => agent.data.agentType === 'manager');
  const groupOptions = groupManagers.map(agent => ({
    label: agent.data.label,
    value: agent
  }));
  const onJoinGroup = () => {
    if (selectedGroup) {
      setCurrentGroupManager(selectedGroup);
    }
  };
  const onLeaveGroup = () => {
    setCurrentGroupManager(null);
  };
  return (
    <GroupAgentConfigTabView
      id={id}
      groupOptions={groupOptions}
      selectedGroup={selectedGroup}
      currentGroup={currentGroupManager}
      onJoinGroup={onJoinGroup}
      onLeaveGroup={onLeaveGroup}
      onSelectGroupChange={onSelectGroupChange}
    />
  );
};
