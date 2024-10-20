import { WaldieAgentNodeData, WaldieNodeRagUserData } from '@waldiez/models';

export type RagUserAgentConfigTabAdvancedProps = {
  id: string;
  data: WaldieNodeRagUserData;
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
};
export type RagUserAgentConfigTabAdvancedViewProps = {
  id: string;
  data: WaldieNodeRagUserData;
  onCustomizedPromptChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCustomizedAnswerPrefixChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateContextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGetOrCreateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNewDocsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onOverwriteChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRecursiveChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
