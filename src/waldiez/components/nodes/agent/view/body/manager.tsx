import { FaMinusCircle } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';

import { getAgentModelsView, getAgentSkillsView } from '@waldiez/components/nodes/agent/view/body/common';
import { WaldieNodeAgentManagerBodyViewProps } from '@waldiez/components/nodes/agent/view/body/types';

export const WaldieNodeAgentManagerBodyView = (props: WaldieNodeAgentManagerBodyViewProps) => {
  const {
    id,
    data,
    skills,
    groupMembers,
    onOpenMemberModal,
    onRemoveMember,
    agentModelNames,
    agentWaldieModelAPITypes,
    agentModelLogos
  } = props;
  const agentModelsView = getAgentModelsView(id, agentModelNames, agentModelLogos, agentWaldieModelAPITypes);
  const agentSkillsView = getAgentSkillsView(id, data, skills);
  return (
    <div className="agent-content nodrag nopan" data-testid={`agent-${id}-content`}>
      <div className="agent-body">
        <div className="agent-models">{agentModelsView}</div>
        <div className="agent-skills">{agentSkillsView}</div>
        <div className="group-members">
          {groupMembers.length === 0 && <div className="group-member-entry">No group members</div>}
          {groupMembers.map(member => (
            <div key={member.id} className="group-member-entry" data-testid={`group-member-${member.id}`}>
              <div className="group-member-name">{member.data.label}</div>
              <FaGear role="button" onClick={onOpenMemberModal.bind(null, member)} title="Edit member" />
              <FaMinusCircle
                role="button"
                onClick={onRemoveMember.bind(null, member)}
                data-testid={`group-member-${member.id}-remove`}
                title="Remove member"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
