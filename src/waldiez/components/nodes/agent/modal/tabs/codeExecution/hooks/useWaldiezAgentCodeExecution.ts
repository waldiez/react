import { MultiValue } from '@waldiez/components/inputs';
import { WaldiezAgentNodeData, WaldiezSkillNode } from '@waldiez/models';

export const useWaldiezAgentCodeExecution = (props: {
  data: WaldiezAgentNodeData;
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
  skills: WaldiezSkillNode[];
}) => {
  const { data, onDataChange, skills } = props;
  const onUseCodeExecutionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({
      codeExecutionConfig: event.target.checked
        ? {
            ...data.codeExecutionConfig
          }
        : false
    });
  };
  const onCodeExecutionWorkDirChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({
      codeExecutionConfig: {
        ...data.codeExecutionConfig,
        workDir: event.target.value
      }
    });
  };
  const onCodeExecutionLastNMessagesChange = (value: number | 'auto' | null) => {
    onDataChange({
      codeExecutionConfig: {
        ...data.codeExecutionConfig,
        lastNMessages: value ?? 0
      }
    });
  };
  const onCodeExecutionTimeoutChange = (value: number | null) => {
    onDataChange({
      codeExecutionConfig: {
        ...data.codeExecutionConfig,
        timeout: value ?? 0
      }
    });
  };
  const onCodeExecutionUseDockerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({
      codeExecutionConfig: {
        ...data.codeExecutionConfig,
        useDocker: event.target.checked
      }
    });
  };
  const onExecutionFunctionsChange = (
    newValue: MultiValue<{
      label: string;
      value: string;
    } | null>
  ) => {
    if (newValue) {
      const isArray = Array.isArray(newValue);
      const selectedFunctions = isArray ? newValue : [newValue];
      const selectedFunctionIds = selectedFunctions.map(f => f.value as string);
      onDataChange({
        codeExecutionConfig: {
          ...data.codeExecutionConfig,
          functions: selectedFunctionIds
        }
      });
    }
  };
  const getSkillName = (skillId: string) => {
    const skill = skills.find(skill => skill.id === skillId);
    return (skill?.data.label ?? 'Unknown Skill') as string;
  };
  const codeExecutionFunctionOptions: { label: string; value: string }[] = skills.map(skill => ({
    label: (skill.data.label ?? 'Unknown Skill') as string,
    value: skill.id
  }));
  const codeExecutionValue: { label: string; value: string }[] =
    data.codeExecutionConfig === false
      ? ([] as { label: string; value: string }[])
      : ((data.codeExecutionConfig?.functions ?? []).map(func => ({
          label: getSkillName(func),
          value: func
        })) ?? ([] as { label: string; value: string }[]));
  return {
    codeExecutionValue,
    codeExecutionFunctionOptions,
    getSkillName,
    onUseCodeExecutionChange,
    onCodeExecutionWorkDirChange,
    onCodeExecutionLastNMessagesChange,
    onCodeExecutionTimeoutChange,
    onCodeExecutionUseDockerChange,
    onExecutionFunctionsChange
  };
};
