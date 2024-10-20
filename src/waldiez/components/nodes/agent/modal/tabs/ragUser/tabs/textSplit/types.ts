import { SingleValue } from '@waldiez/components/inputs';
import { WaldieAgentNodeData, WaldieNodeRagUserData } from '@waldiez/models';

export type RagUserAgentConfigTabTextSplitProps = {
  id: string;
  data: WaldieNodeRagUserData;
  onDataChange: (partialData: Partial<WaldieAgentNodeData>, persist?: boolean) => void;
};
export type RagUserAgentConfigTabTextSplitViewProps = {
  id: string;
  data: WaldieNodeRagUserData;
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
