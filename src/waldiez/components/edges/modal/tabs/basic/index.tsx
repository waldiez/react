import { WaldieEdgeBasicTabProps } from '@waldiez/components/edges/modal/tabs/basic/types';
import { WaldieEdgeBasicTabView } from '@waldiez/components/edges/modal/tabs/basic/view';
import { SingleValue } from '@waldiez/components/inputs';
import { WaldieEdgeLlmSummaryMethod } from '@waldiez/models';

export const WaldieEdgeBasicTab = (props: WaldieEdgeBasicTabProps) => {
  const { edgeId, edgeType, data, onTypeChange, onDataChange } = props;
  const onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ label: e.target.value });
  };
  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange({ description: e.target.value });
  };
  const onClearHistoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ clearHistory: e.target.checked });
  };
  const onMaxTurnsChange = (value: number | null) => {
    onDataChange({ maxTurns: value });
  };
  const onSummaryMethodChange = (
    option: SingleValue<{
      label: string;
      value: WaldieEdgeLlmSummaryMethod;
    }>
  ) => {
    if (option) {
      onDataChange({
        summary: {
          method: option.value,
          prompt: data.summary.prompt,
          args: data.summary.args
        }
      });
    }
  };
  const onLlmPromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentArgs = data.summary.args;
    onDataChange({
      summary: {
        method: data.summary.method,
        prompt: e.target.value,
        args: {
          ...currentArgs
        }
      }
    });
  };
  const onLlmSummaryRoleChange = (
    option: SingleValue<{
      label: string;
      value: string;
    }>
  ) => {
    if (option) {
      const currentArgs = data.summary.args;
      onDataChange({
        summary: {
          method: data.summary.method,
          prompt: data.summary.prompt,
          args: {
            ...currentArgs,
            summary_role: option.value
          }
        }
      });
    }
  };
  return (
    <WaldieEdgeBasicTabView
      data={data}
      edgeId={edgeId}
      edgeType={edgeType}
      onEdgeTypeChange={onTypeChange}
      onLabelChange={onLabelChange}
      onDescriptionChange={onDescriptionChange}
      onClearHistoryChange={onClearHistoryChange}
      onMaxTurnsChange={onMaxTurnsChange}
      onSummaryMethodChange={onSummaryMethodChange}
      onLlmPromptChange={onLlmPromptChange}
      onLlmSummaryRoleChange={onLlmSummaryRoleChange}
    />
  );
};
