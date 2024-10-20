import { SingleValue } from '@waldiez/components/inputs';
import { WaldieModelAPIType, WaldieModelNodeData } from '@waldiez/models';

export type WaldieNodeModelModalBasicTabProps = {
  data: WaldieModelNodeData;
  onLogoChange: (newLogo: string) => void;
  onDataChange: (data: Partial<WaldieModelNodeData>) => void;
};

export type WaldieNodeModelModalBasicTabViewProps = {
  data: WaldieModelNodeData;
  onLabelChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onApiTypeChange: (newValue: SingleValue<{ label: string; value: WaldieModelAPIType }>) => void;
  onApiKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBaseUrlChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
