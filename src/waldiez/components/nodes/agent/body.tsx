import { AiFillCode } from 'react-icons/ai';
import { FaMinusCircle } from 'react-icons/fa';
import { FaGear } from 'react-icons/fa6';

import { useWaldiezNodeAgentBody } from '@waldiez/components/nodes/agent/hooks';
import { WaldiezAgentNodeData, WaldiezModelNode, WaldiezSkillNode } from '@waldiez/models';
import { useWaldiezContext } from '@waldiez/store';
import { LOGOS } from '@waldiez/theme';

type WaldiezNodeAgentBodyProps = {
  flowId: string;
  id: string;
  data: WaldiezAgentNodeData;
  isModalOpen: boolean;
};

export const WaldiezNodeAgentBody = (props: WaldiezNodeAgentBodyProps) => {
  const { id, flowId, data } = props;
  const agentType = data.agentType;
  const agentModelsView = getAgentModelsView(id, data);
  const agentSkillsView = getAgentSkillsView(id, data);
  const { groupMembers, onDescriptionChange, onRemoveGroupMember, onOpenMemberModal } =
    useWaldiezNodeAgentBody(props);
  return (
    <div className="agent-body">
      <div className="agent-models">{agentModelsView}</div>
      <div className="agent-skills">{agentSkillsView}</div>
      {agentType === 'manager' ? (
        <div className="group-members">
          {groupMembers.length === 0 && <div className="group-member-entry">No group members</div>}
          {groupMembers.map(member => (
            <div key={member.id} className="group-member-entry" data-testid={`group-member-${member.id}`}>
              <div className="group-member-name">{member.data.label}</div>
              <FaGear
                role="button"
                className="clickable"
                onClick={onOpenMemberModal.bind(null, member)}
                title="Edit member"
              />
              <FaMinusCircle
                role="button"
                className="clickable"
                onClick={onRemoveGroupMember.bind(null, member)}
                data-testid={`group-member-${member.id}-remove`}
                title="Remove member"
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-column flex-1 agent-description-view">
          <label>Description:</label>
          <textarea
            className="nodrag nopan"
            rows={2}
            defaultValue={data.description}
            onChange={onDescriptionChange}
            id={`flow-${flowId}-agent-description-${id}`}
            data-testid={`agent-description-${id}`}
          />
        </div>
      )}
    </div>
  );
};
const getAgentModelsView = (id: string, data: WaldiezAgentNodeData) => {
  const getModels = useWaldiezContext(s => s.getModels);
  const models = getModels() as WaldiezModelNode[];
  const agentModelNames = data.modelIds
    .map(modelId => models.find(model => model.id === modelId)?.data.label ?? '')
    .filter(entry => entry !== '');
  const agentWaldiezModelAPITypes = data.modelIds
    .map(modelId => models.find(model => model.id === modelId)?.data.apiType ?? '')
    .filter(entry => entry !== '');
  const agentModelLogos = agentWaldiezModelAPITypes
    .map(apiType => LOGOS[apiType] ?? '')
    .filter(entry => entry !== '');
  if (agentModelNames.length === 0) {
    return <div className="agent-models-empty">No models</div>;
  }
  return (
    <div className="agent-models-preview">
      {agentModelNames.map((name, index) => (
        <div key={name} className="agent-model-preview" data-testid="agent-model-preview">
          <div className={`agent-model-img ${agentWaldiezModelAPITypes[index]}`}>
            <img src={agentModelLogos[index]} />
          </div>
          <div className="agent-model-name" data-testid={`agent-${id}-linked-model-${index}`}>
            {name}
          </div>
        </div>
      ))}
    </div>
  );
};

const getAgentSkillsView = (id: string, data: WaldiezAgentNodeData) => {
  const getSkills = useWaldiezContext(s => s.getSkills);
  const skills = getSkills() as WaldiezSkillNode[];
  const skillsCount = data.skills.length;
  if (skillsCount === 0) {
    return <div className="agent-skills-empty">No skills</div>;
  }
  return (
    <div className="agent-skills-preview">
      {data.skills.map((linkedSkill, index) => {
        const skill = skills.find(skill => skill.id === linkedSkill.id);
        if (!skill) {
          return null;
        }
        return (
          <div key={skill.id} className="agent-skill-preview" data-testid="agent-skill-preview">
            <div className={'agent-skill-img'}>
              <AiFillCode />
            </div>
            <div className="agent-skill-name" data-testid={`agent-${id}-linked-skill-${index}`}>
              {skill.data.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};
