import { MultiValue } from '@waldiez/components/inputs';
import { WaldiezAgentNodeData, WaldiezSkillNode } from '@waldiez/models';

export type CodeExecutionAgentConfigTabProps = {
  id: string;
  data: WaldiezAgentNodeData;
  skills: WaldiezSkillNode[];
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
};
export type CodeExecutionAgentConfigTabViewProps = {
  id: string;
  data: WaldiezAgentNodeData;
  skills: WaldiezSkillNode[];
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
