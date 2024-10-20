import { WaldieAgentNodeData, WaldieNodeRagUserData } from '@waldiez/models';

export type RagUserAgentConfigTabCustomFunctionsProps = {
  id: string;
  flowId: string;
  darkMode: boolean;
  data: WaldieNodeRagUserData;
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
};
export type RagUserAgentConfigTabCustomFunctionsViewProps = {
  id: string;
  flowId: string;
  darkMode: boolean;
  data: WaldieNodeRagUserData;
  onUseCustomEmbeddingChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEmbeddingFunctionChange: (value: string | undefined) => void;
  onUseCustomTokenCountChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCustomTokenCountFunctionChange: (value: string | undefined) => void;
  onUseCustomTextSplitChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onCustomTextSplitFunctionChange: (value: string | undefined) => void;
};
