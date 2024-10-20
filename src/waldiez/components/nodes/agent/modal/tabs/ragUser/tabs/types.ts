import { WaldieAgentNodeData, WaldieNodeRagUserData } from '@waldiez/models';

export type RagUserAgentConfigTabViewProps = {
  flowId: string;
  id: string;
  darkMode: boolean;
  data: WaldieNodeRagUserData;
  filesToUpload: File[];
  onDataChange: (data: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
  setFilesToUpload: (files: File[]) => void;
  onFilesUpload?: (files: File[]) => void;
  onFileDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onFileDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onOpenUploadDialog: () => void;
};
