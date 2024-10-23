import { WaldiezAgentNodeData, WaldiezNodeRagUserData } from '@waldiez/models';

export type RagUserAgentConfigTabProps = {
  id: string;
  flowId: string;
  darkMode: boolean;
  uploadEnabled: boolean;
  filesToUpload: File[];
  setFilesToUpload: (files: File[]) => void;
  data: WaldiezNodeRagUserData;
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
};
