import { SingleValue } from '@waldiez/components/inputs';
import { BasicAgentConfigTabProps } from '@waldiez/components/nodes/agent/modal/tabs/basic/types';
import { BasicAgentConfigTabView } from '@waldiez/components/nodes/agent/modal/tabs/basic/view';
import { WaldiezAgentHumanInputMode } from '@waldiez/models';

export const BasicAgentConfigTab = (props: BasicAgentConfigTabProps) => {
  const { id, data, onDataChange, onAgentTypeChange } = props;
  const onRagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAgentType = event.target.checked ? 'rag_user' : 'user';
    onAgentTypeChange(newAgentType);
  };
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ label: event.target.value });
  };
  const onDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange({ description: event.target.value });
  };
  const onSystemMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDataChange({ systemMessage: event.target.value });
  };
  const onHumanInputModeChange = (
    option: SingleValue<{ label: string; value: WaldiezAgentHumanInputMode }>
  ) => {
    if (option) {
      onDataChange({ humanInputMode: option.value });
    }
  };
  const onMaxTokensChange = (value: number | null) => {
    onDataChange({ maxTokens: value });
  };
  const onMaxConsecutiveAutoReplyChange = (value: number | null) => {
    onDataChange({ maxConsecutiveAutoReply: value });
  };
  const onAgentDefaultAutoReplyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDataChange({ agentDefaultAutoReply: event.target.value });
  };
  return (
    <BasicAgentConfigTabView
      id={id}
      data={data}
      onRagChange={onRagChange}
      onNameChange={onNameChange}
      onDescriptionChange={onDescriptionChange}
      onSystemMessageChange={onSystemMessageChange}
      onHumanInputModeChange={onHumanInputModeChange}
      onMaxTokensChange={onMaxTokensChange}
      onMaxConsecutiveAutoReplyChange={onMaxConsecutiveAutoReplyChange}
      onAgentDefaultAutoReplyChange={onAgentDefaultAutoReplyChange}
    />
  );
};
