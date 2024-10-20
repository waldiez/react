import { NumberInput, Select, TextInput } from '@waldiez/components/inputs';
import { CodeExecutionAgentConfigTabViewProps } from '@waldiez/components/nodes/agent/modal/tabs/codeExecution/types';

export const CodeExecutionAgentConfigTabView = (props: CodeExecutionAgentConfigTabViewProps) => {
  const {
    id,
    data,
    skills,
    onUseCodeExecutionChange,
    onCodeExecutionWorkDirChange,
    onCodeExecutionLastNMessagesChange,
    onCodeExecutionTimeoutChange,
    onCodeExecutionUseDockerChange,
    onExecutionFunctionsChange
  } = props;
  const codeExecutionFunctionOptions: { label: string; value: string }[] = skills.map(skill => ({
    label: (skill.data.label ?? 'Unknown Skill') as string,
    value: skill.id
  }));
  const getSkillName = (skillId: string) => {
    const skill = skills.find(skill => skill.id === skillId);
    return (skill?.data.label ?? 'Unknown Skill') as string;
  };
  const codeExecutionValue: { label: string; value: string }[] =
    data.codeExecutionConfig === false
      ? ([] as { label: string; value: string }[])
      : ((data.codeExecutionConfig?.functions ?? []).map(f => ({
          label: getSkillName(f),
          value: f
        })) ?? ([] as { label: string; value: string }[]));
  return (
    <div className="agent-panel agent-codeExecution-panel">
      <label className="checkbox-label codeExecution-checkbox">
        <div>No Code Execution</div>
        <input
          type="checkbox"
          defaultChecked={data.codeExecutionConfig === false}
          onChange={onUseCodeExecutionChange}
          data-testid={`agent-code-execution-toggle-${id}`}
        />
        <div className="checkbox"></div>
      </label>
      {data.codeExecutionConfig !== false && (
        <div className="agent-node-codeExecution-options">
          <TextInput
            label="Working directory:"
            value={data.codeExecutionConfig?.workDir ?? ''}
            onChange={onCodeExecutionWorkDirChange}
            dataTestId={`agent-code-execution-work-dir-${id}`}
          />
          <NumberInput
            label="Last N messages:"
            value={
              data.codeExecutionConfig?.lastNMessages && data.codeExecutionConfig?.lastNMessages !== 'auto'
                ? data.codeExecutionConfig?.lastNMessages
                : 0
            }
            onChange={onCodeExecutionLastNMessagesChange}
            min={0}
            max={1000}
            step={1}
            setNullOnLower={true}
            forceInt
            onLowerLabel="auto"
            labelInfo="Maximum number of messages to use for code execution. If set to auto(0), all messages will be used."
            dataTestId={`agent-code-execution-last-n-messages-${id}`}
          />
          <NumberInput
            label="Timeout:"
            value={data.codeExecutionConfig?.timeout ?? 0}
            onChange={onCodeExecutionTimeoutChange}
            min={0}
            max={1000}
            step={1}
            onNull={0}
            forceInt
            setNullOnLower={true}
            onLowerLabel="No timeout"
            labelInfo="Maximum time in seconds to wait for code execution. If set to 0, no timeout will be used."
            dataTestId={`agent-code-execution-timeout-${id}`}
          />
          <label className="checkbox-label codeExecution-use-docker-checkbox">
            <div> Use docker</div>
            <input
              type="checkbox"
              checked={data.codeExecutionConfig?.useDocker === true}
              onChange={onCodeExecutionUseDockerChange}
              data-testid={`agent-code-execution-use-docker-${id}`}
            />
            <div className="checkbox"></div>
          </label>
          {!data.codeExecutionConfig?.useDocker && skills.length > 0 && (
            <div className="codeExecution-functions">
              <div className="agent-node-functions">
                <label htmlFor={`agent-code-execution-functions-${id}`}>Functions:</label>
                <div className="margin-top-10">
                  <Select
                    isMulti
                    options={codeExecutionFunctionOptions}
                    value={codeExecutionValue}
                    onChange={onExecutionFunctionsChange}
                    inputId={`agent-code-execution-functions-${id}`}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
