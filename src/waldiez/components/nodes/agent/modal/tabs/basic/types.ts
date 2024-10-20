import { SingleValue } from '@waldiez/components/inputs';
import { WaldieAgentHumanInputMode, WaldieAgentNodeData, WaldieAgentNodeType } from '@waldiez/models';

export type BasicAgentConfigTabProps = {
  id: string;
  data: WaldieAgentNodeData;
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
  onAgentTypeChange: (agentType: WaldieAgentNodeType) => void;
};
export type BasicAgentConfigTabViewProps = {
  id: string;
  data: WaldieAgentNodeData;
  onRagChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSystemMessageChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onHumanInputModeChange: (option: SingleValue<{ label: string; value: WaldieAgentHumanInputMode }>) => void;
  onMaxTokensChange: (value: number | null) => void;
  onMaxConsecutiveAutoReplyChange: (value: number | null) => void;
  onAgentDefaultAutoReplyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
