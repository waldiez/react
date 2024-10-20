import { RagUserAgentConfigTabCustomFunctionsProps } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/customFunctions/types';
import { RagUserAgentConfigTabCustomFunctionsView } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/customFunctions/view';
import { WaldieNodeRagUserData } from '@waldiez/models';

export const RagUserAgentConfigTabCustomFunctions = (props: RagUserAgentConfigTabCustomFunctionsProps) => {
  const { id, flowId, data, darkMode, onDataChange } = props;
  const setRetrieveConfigConfigData = (partialData: Partial<WaldieNodeRagUserData['retrieveConfig']>) => {
    onDataChange({
      ...data,
      retrieveConfig: {
        ...data.retrieveConfig,
        ...partialData
      }
    });
  };
  const onUseCustomEmbeddingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({
      useCustomEmbedding: event.target.checked
    });
  };
  const onEmbeddingFunctionChange = (value: string | undefined) => {
    setRetrieveConfigConfigData({
      embeddingFunction: value
    });
  };
  const onUseCustomTokenCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({
      useCustomTokenCount: event.target.checked
    });
  };
  const onCustomTokenCountFunctionChange = (value: string | undefined) => {
    if (value) {
      setRetrieveConfigConfigData({
        customTokenCountFunction: value
      });
    }
  };
  const onUseCustomTextSplitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({
      useCustomTextSplit: event.target.checked
    });
  };
  const onCustomTextSplitFunctionChange = (value: string | undefined) => {
    if (value) {
      setRetrieveConfigConfigData({
        customTextSplitFunction: value
      });
    }
  };
  return (
    <RagUserAgentConfigTabCustomFunctionsView
      id={id}
      flowId={flowId}
      data={data}
      darkMode={darkMode}
      onUseCustomEmbeddingChange={onUseCustomEmbeddingChange}
      onEmbeddingFunctionChange={onEmbeddingFunctionChange}
      onUseCustomTokenCountChange={onUseCustomTokenCountChange}
      onCustomTokenCountFunctionChange={onCustomTokenCountFunctionChange}
      onUseCustomTextSplitChange={onUseCustomTextSplitChange}
      onCustomTextSplitFunctionChange={onCustomTextSplitFunctionChange}
    />
  );
};
