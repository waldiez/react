import { WaldiezNodeAgent, WaldiezNodeAgentData, WaldiezNodeSkill } from "@waldiez/models";

export type WaldiezAgentSkillsProps = {
    id: string;
    data: WaldiezNodeAgentData;
    skills: WaldiezNodeSkill[];
    agents: WaldiezNodeAgent[];
    onDataChange: (partialData: Partial<WaldiezNodeAgentData>, persist?: boolean) => void;
};
