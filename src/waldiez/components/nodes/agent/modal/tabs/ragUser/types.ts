import { WaldieAgentNodeData, WaldieNodeRagUserData } from '@waldiez/models';

export type RagUserAgentConfigTabProps = {
  id: string;
  flowId: string;
  darkMode: boolean;
  uploadEnabled: boolean;
  filesToUpload: File[];
  setFilesToUpload: (files: File[]) => void;
  data: WaldieNodeRagUserData;
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
};
