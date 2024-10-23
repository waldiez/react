import { RagUserAgentConfigTabAdvancedProps } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/advanced/types';
import { RagUserAgentConfigTabAdvancedView } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/advanced/view';
import { WaldiezNodeRagUserData } from '@waldiez/models';

export const RagUserAgentConfigTabAdvanced = (props: RagUserAgentConfigTabAdvancedProps) => {
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
  const onCustomizedPromptChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRetrieveConfigConfigData({
      customizedPrompt: event.target.value
    });
  };
  const onCustomizedAnswerPrefixChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({
      customizedAnswerPrefix: event.target.value
    });
  };
  const onUpdateContextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({
      updateContext: event.target.checked
    });
  };
  const onGetOrCreateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({
      getOrCreate: event.target.checked
    });
  };
  const onNewDocsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({
      newDocs: event.target.checked
    });
  };
  const onOverwriteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({
      overwrite: event.target.checked
    });
  };
  const onRecursiveChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({
      recursive: event.target.checked
    });
  };
  return (
    <RagUserAgentConfigTabAdvancedView
      id={id}
      data={data}
      onCustomizedPromptChange={onCustomizedPromptChange}
      onCustomizedAnswerPrefixChange={onCustomizedAnswerPrefixChange}
      onUpdateContextChange={onUpdateContextChange}
      onGetOrCreateChange={onGetOrCreateChange}
      onNewDocsChange={onNewDocsChange}
      onOverwriteChange={onOverwriteChange}
      onRecursiveChange={onRecursiveChange}
    />
  );
};
