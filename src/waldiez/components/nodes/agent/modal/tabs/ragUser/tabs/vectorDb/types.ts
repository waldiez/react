import { SingleValue } from '@waldiez/components/inputs';
import { WaldiezAgentNodeData, WaldiezNodeRagUserData } from '@waldiez/models';

export type RagUserAgentConfigTabVectorDbProps = {
  id: string;
  data: WaldiezNodeRagUserData;
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
};
export type RagUserAgentConfigTabVectorDbViewProps = {
  id: string;
  data: WaldiezNodeRagUserData;
  onVectorDbChange: (
    option: SingleValue<{
      label: string;
      value: 'chroma' | 'pgvector' | 'mongodb' | 'qdrant';
    }>
  ) => void;
  onModelChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onQdrantUseMemoryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onQdrantUseLocalStorageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onQdrantLocalStoragePathChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChromaUseLocalStorageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChromaLocalStoragePathChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDbConfigConnectionUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
