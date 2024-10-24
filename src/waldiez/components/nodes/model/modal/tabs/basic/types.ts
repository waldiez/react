import { SingleValue } from '@waldiez/components/inputs';
import { WaldiezModelAPIType, WaldiezModelNodeData } from '@waldiez/models';

export type WaldiezNodeModelModalBasicTabProps = {
  id: string;
  data: WaldiezModelNodeData;
  onLogoChange: (newLogo: string) => void;
  onDataChange: (data: Partial<WaldiezModelNodeData>) => void;
};

export type WaldiezNodeModelModalBasicTabViewProps = {
  id: string;
  data: WaldiezModelNodeData;
  apiKeyVisible: boolean;
  toggleApiKeyVisible: () => void;
  onLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onApiTypeChange: (newValue: SingleValue<{ label: string; value: WaldiezModelAPIType }>) => void;
  onApiKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBaseUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
