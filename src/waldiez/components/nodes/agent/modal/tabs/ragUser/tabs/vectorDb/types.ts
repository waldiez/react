import { SingleValue } from '@waldiez/components/inputs';
import { WaldieAgentNodeData, WaldieNodeRagUserData } from '@waldiez/models';

export type RagUserAgentConfigTabVectorDbProps = {
  id: string;
  data: WaldieNodeRagUserData;
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
};
export type RagUserAgentConfigTabVectorDbViewProps = {
  id: string;
  data: WaldieNodeRagUserData;
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
