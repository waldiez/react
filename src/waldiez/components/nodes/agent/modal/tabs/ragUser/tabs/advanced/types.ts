import { WaldiezAgentNodeData, WaldiezNodeRagUserData } from '@waldiez/models';

export type RagUserAgentConfigTabAdvancedProps = {
  id: string;
  data: WaldiezNodeRagUserData;
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
};
export type RagUserAgentConfigTabAdvancedViewProps = {
  id: string;
  data: WaldiezNodeRagUserData;
  onCustomizedPromptChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCustomizedAnswerPrefixChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpdateContextChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onGetOrCreateChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNewDocsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onOverwriteChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRecursiveChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
