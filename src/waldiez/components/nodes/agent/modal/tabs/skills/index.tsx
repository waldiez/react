import { useEffect, useState } from 'react';

import { SkillsAgentConfigTabProps } from '@waldiez/components/nodes/agent/modal/tabs/skills/types';
import { SkillsAgentConfigTabView } from '@waldiez/components/nodes/agent/modal/tabs/skills/view';
import { WaldieAgentLinkedSkill, WaldieAgentNode, WaldieSkillNode } from '@waldiez/models';

export const SkillsAgentConfigTab = (props: SkillsAgentConfigTabProps) => {
  const { id, data, skills, agents, onDataChange } = props;
  const [selectedSkill, setSelectedSkill] = useState<{
    label: string;
    value: WaldieSkillNode;
  } | null>(null);
  const [selectedExecutor, setSelectedExecutor] = useState<{
    label: string;
    value: WaldieAgentNode;
  } | null>(null);
  const currentSkills = data.skills;
  useEffect(() => {
    // if a skill was removed, but previously linked to the agent, remove it
    const currentSkillIds = skills.map(skill => skill.id);
    const newSkills = currentSkills.filter(skill => currentSkillIds.includes(skill.id));
    if (newSkills.length !== currentSkills.length) {
      onDataChange({ skills: newSkills }, true);
    }
  }, [data.skills]);
  const skillOptions: { label: string; value: WaldieSkillNode }[] = skills.map(skill => {
    return {
      label: (skill.data.label as string) ?? 'Unknown skill',
      value: skill
    };
  });
  const agentOptions: { label: string; value: WaldieAgentNode }[] = agents.map(agent => {
    return {
      label: (agent.data.label as string) ?? 'Unknown Agent',
      value: agent
    };
  });
  const getSkillName = (linkedSkill: WaldieAgentLinkedSkill) => {
    const skillFound = skills.find(skill => skill.id === linkedSkill.id);
    if (!skillFound) {
      return 'Unknown skill';
    }
    return skillFound.data.label as string;
  };
  const getAgentName = (linkedSkill: WaldieAgentLinkedSkill) => {
    const agentFound = agents.find(agent => agent.id === linkedSkill.executorId);
    if (!agentFound) {
      return 'Unknown Agent';
    }
    return agentFound.data.label as string;
  };
  const onAddSkill = () => {
    if (!selectedSkill || !selectedExecutor) {
      return;
    }
    const linkedSkill = selectedSkill.value;
    const linkedSkillExecutor = selectedExecutor.value;
    const skillAlready = currentSkills.find(
      entry => entry.executorId === linkedSkillExecutor.id && entry.id === linkedSkill.id
    );
    const newSkill = {
      id: linkedSkill.id,
      executorId: linkedSkillExecutor.id
    };
    if (!skillAlready) {
      const newSkills = [...currentSkills, newSkill];
      onDataChange({ skills: newSkills });
      setSelectedSkill(null);
      setSelectedExecutor(null);
    }
  };
  const onRemoveSkill = (index: number) => {
    const newSkills = currentSkills.filter((_, i) => i !== index);
    onDataChange({ skills: newSkills });
  };
  return (
    <SkillsAgentConfigTabView
      id={id}
      skills={skills}
      linkedSkills={data.skills}
      skillOptions={skillOptions}
      agentOptions={agentOptions}
      selectedSkill={selectedSkill}
      selectedExecutor={selectedExecutor}
      onSelectedSkillChange={setSelectedSkill}
      onSelectedExecutorChange={setSelectedExecutor}
      getAgentName={getAgentName}
      getSkillName={getSkillName}
      onAddSkill={onAddSkill}
      onRemoveSkill={onRemoveSkill}
    />
  );
};
