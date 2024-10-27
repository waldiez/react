import { Select } from '@waldiez/components/inputs';
import { SkillsAgentConfigTabViewProps } from '@waldiez/components/nodes/agent/modal/tabs/skills/types';

export const SkillsAgentConfigTabView = (props: SkillsAgentConfigTabViewProps) => {
  const {
    id,
    skills,
    linkedSkills,
    skillOptions,
    agentOptions,
    selectedSkill,
    selectedExecutor,
    getAgentName,
    getSkillName,
    onSelectedSkillChange,
    onSelectedExecutorChange,
    onAddSkill,
    onRemoveSkill
  } = props;
  return (
    <div className="agent-panel agent-skills-panel">
      {skills.length === 0 ? (
        <div className="agent-no-skills margin-top-20 margin-bottom-20">No skills found in the workspace</div>
      ) : (
        <>
          <div className="agent-panel-add-skill">
            <label htmlFor={`select-agent-skill-${id}`}>Skill:</label>
            <Select
              options={skillOptions}
              onChange={onSelectedSkillChange}
              value={selectedSkill}
              inputId={`select-agent-skill-${id}`}
            />
            <label htmlFor={`select-agent-skill-executor-${id}`}>Executor:</label>
            <Select
              options={agentOptions}
              onChange={onSelectedExecutorChange}
              value={selectedExecutor}
              inputId={`select-agent-skill-executor-${id}`}
            />
            <button
              disabled={!selectedSkill || !selectedExecutor}
              onClick={onAddSkill}
              data-testid={`add-agent-skill-${id}`}
            >
              Add
            </button>
          </div>
          <div className="agent-panel-current-skills">
            <div className="agent-panel-current-skills-heading">Current skills:</div>
            {linkedSkills.map((skill, index) => {
              return (
                <div key={index} className="agent-panel-current-skill">
                  <div className="agent-panel-current-skill-entry">
                    <div className="skill-item">
                      Skill:{' '}
                      <div className="skill-name" data-testid={`skill-name-${id}-${index}`}>
                        {getSkillName(skill)}
                      </div>
                    </div>
                    <div className="agent-item">
                      Executor:{' '}
                      <div className="agent-name" data-testid={`agent-name-${id}-${index}`}>
                        {getAgentName(skill)}
                      </div>
                    </div>
                    <button
                      onClick={onRemoveSkill.bind(null, index)}
                      data-testid={`remove-agent-skill-${id}-${index}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};
