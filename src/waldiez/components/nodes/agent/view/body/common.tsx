import { AiFillCode } from 'react-icons/ai';

import { WaldieAgentNodeData, WaldieSkillNode } from '@waldiez/models';

export const getAgentModelsView = (
  id: string,
  agentModelNames: string[],
  agentModelLogos: string[],
  agentWaldieModelAPITypes: string[]
) => {
  if (agentModelNames.length === 0) {
    return <div className="agent-models-empty">No models</div>;
  }
  return (
    <div className="agent-models-preview">
      {agentModelNames.map((name, index) => (
        <div key={name} className="agent-model-preview" data-testid="agent-model-preview">
          <div className={`agent-model-img ${agentWaldieModelAPITypes[index]}`}>
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
export const getAgentSkillsView = (id: string, data: WaldieAgentNodeData, skills: WaldieSkillNode[]) => {
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
