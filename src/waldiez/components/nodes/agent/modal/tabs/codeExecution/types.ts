import { MultiValue } from '@waldiez/components/inputs';
import { WaldieAgentNodeData, WaldieSkillNode } from '@waldiez/models';

export type CodeExecutionAgentConfigTabProps = {
  id: string;
  data: WaldieAgentNodeData;
  skills: WaldieSkillNode[];
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
};
export type CodeExecutionAgentConfigTabViewProps = {
  id: string;
  data: WaldieAgentNodeData;
  skills: WaldieSkillNode[];
  onUseCodeExecutionChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCodeExecutionWorkDirChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCodeExecutionLastNMessagesChange: (value: number | null) => void;
  onCodeExecutionTimeoutChange: (value: number | null) => void;
  onCodeExecutionUseDockerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onExecutionFunctionsChange: (
    newValue: MultiValue<{
      label: string;
      value: string;
    } | null>
  ) => void;
};
