import { SingleValue } from '@waldiez/components/inputs';
import { RagUserAgentConfigTabTextSplitProps } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/textSplit/types';
import { RagUserAgentConfigTabTextSplitView } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/textSplit/view';
import { WaldiezNodeRagUserData } from '@waldiez/models';

export const RagUserAgentConfigTabTextSplit = (props: RagUserAgentConfigTabTextSplitProps) => {
  const { id, data, onDataChange } = props;
  const setRetrieveConfigConfigData = (partialData: Partial<WaldiezNodeRagUserData['retrieveConfig']>) => {
    onDataChange({
      ...data,
      retrieveConfig: {
        ...data.retrieveConfig,
        ...partialData
      }
    });
  };
  const onChunkTokenSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = parseInt(event.target.value, 10);
      if (isNaN(value) || value < 1) {
        return;
      }
      setRetrieveConfigConfigData({ chunkTokenSize: value });
    } catch (_) {
      return;
    }
  };
  const onContextMaxTokensChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = parseInt(event.target.value, 10);
      if (isNaN(value) || value < 1) {
        return;
      }
      setRetrieveConfigConfigData({ contextMaxTokens: value });
    } catch (_) {
      return;
    }
  };
  const onChunkModeChange = (
    option: SingleValue<{
      label: string;
      value: 'multi_lines' | 'one_line';
    }>
  ) => {
    if (option) {
      setRetrieveConfigConfigData({ chunkMode: option.value });
    }
  };
  const onMustBreakAtEmptyLineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({
      mustBreakAtEmptyLine: event.target.checked
    });
  };
  return (
    <RagUserAgentConfigTabTextSplitView
      id={id}
      data={data}
      onChunkTokenSizeChange={onChunkTokenSizeChange}
      onContextMaxTokensChange={onContextMaxTokensChange}
      onChunkModeChange={onChunkModeChange}
      onMustBreakAtEmptyLineChange={onMustBreakAtEmptyLineChange}
    />
  );
};
