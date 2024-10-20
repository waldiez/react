import { MultiValue } from '@waldiez/components/inputs';
import { CodeExecutionAgentConfigTabProps } from '@waldiez/components/nodes/agent/modal/tabs/codeExecution/types';
import { CodeExecutionAgentConfigTabView } from '@waldiez/components/nodes/agent/modal/tabs/codeExecution/view';

export const CodeExecutionAgentConfigTab = (props: CodeExecutionAgentConfigTabProps) => {
  const { id, data, skills, onDataChange } = props;
  const onUseCodeExecutionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({
      codeExecutionConfig: event.target.checked
        ? false
        : {
            ...data.codeExecutionConfig
          }
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
  return (
    <CodeExecutionAgentConfigTabView
      id={id}
      data={data}
      skills={skills}
      onUseCodeExecutionChange={onUseCodeExecutionChange}
      onCodeExecutionWorkDirChange={onCodeExecutionWorkDirChange}
      onCodeExecutionLastNMessagesChange={onCodeExecutionLastNMessagesChange}
      onCodeExecutionTimeoutChange={onCodeExecutionTimeoutChange}
      onCodeExecutionUseDockerChange={onCodeExecutionUseDockerChange}
      onExecutionFunctionsChange={onExecutionFunctionsChange}
    />
  );
};
