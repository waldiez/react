import { SingleValue } from '@waldiez/components/inputs';
import { WaldiezAgentHumanInputMode, WaldiezAgentNodeData, WaldiezAgentNodeType } from '@waldiez/models';

export type BasicAgentConfigTabProps = {
  id: string;
  data: WaldiezAgentNodeData;
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
  onAgentTypeChange: (agentType: WaldiezAgentNodeType) => void;
};
export type BasicAgentConfigTabViewProps = {
  id: string;
  data: WaldiezAgentNodeData;
  onRagChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSystemMessageChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onHumanInputModeChange: (option: SingleValue<{ label: string; value: WaldiezAgentHumanInputMode }>) => void;
  onMaxTokensChange: (value: number | null) => void;
  onMaxConsecutiveAutoReplyChange: (value: number | null) => void;
  onAgentDefaultAutoReplyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
