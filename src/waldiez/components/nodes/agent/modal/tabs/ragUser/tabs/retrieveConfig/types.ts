import { SingleValue } from '@waldiez/components/inputs';
import { WaldieAgentNodeData, WaldieNodeRagUserData } from '@waldiez/models';

export type RagUserAgentConfigTabRetrieveConfigProps = {
  id: string;
  data: WaldieNodeRagUserData;
  filesToUpload: File[];
  setFilesToUpload: (files: File[]) => void;
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
  onFilesUpload?: (files: File[]) => void;
  onFileDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onFileDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onOpenUploadDialog: () => void;
};
export type RagUserAgentConfigTabRetrieveConfigViewProps = {
  id: string;
  data: WaldieNodeRagUserData;
  onFilesUpload?: (files: File[]) => void;
  onTaskChange: (option: SingleValue<{ label: string; value: 'code' | 'qa' | 'default' }>) => void;
  onFileDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onFileDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onOpenUploadDialog: () => void;
  onAddDocsPath: (path: string) => void;
  onRemoveDocsPath: (item: string) => void;
  onDocPathChange: (oldItem: string, newItem: string) => void;
  onCollectionNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onNResultsChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDistanceThresholdChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
