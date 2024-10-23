import { SingleValue } from '@waldiez/components/inputs';
import { WaldiezAgentNodeData, WaldiezNodeRagUserData } from '@waldiez/models';

export type RagUserAgentConfigTabTextSplitProps = {
  id: string;
  data: WaldiezNodeRagUserData;
  onDataChange: (partialData: Partial<WaldiezAgentNodeData>, persist?: boolean) => void;
};
export type RagUserAgentConfigTabTextSplitViewProps = {
  id: string;
  data: WaldiezNodeRagUserData;
  onChunkTokenSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onContextMaxTokensChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChunkModeChange: (
    option: SingleValue<{
      label: string;
      value: 'multi_lines' | 'one_line';
    }>
  ) => void;
  onMustBreakAtEmptyLineChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
