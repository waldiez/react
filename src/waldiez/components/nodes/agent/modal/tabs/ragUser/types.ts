import { WaldiezAgentNodeData, WaldiezNodeRagUserData } from '@waldiez/models';

export type WaldiezAgentRagUserProps = {
  id: string;
  flowId: string;
  data: WaldiezNodeRagUserData;
  isDarkMode: boolean;
  uploadsEnabled: boolean;
  filesToUpload: File[];
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>) => void;
  onFilesToUploadChange: (files: File[]) => void;
};
