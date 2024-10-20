import { SingleValue } from '@waldiez/components/inputs';
import { RagUserAgentConfigTabVectorDbProps } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/vectorDb/types';
import { RagUserAgentConfigTabVectorDbView } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/vectorDb/view';
import { WaldieNodeRagUserData } from '@waldiez/models';

export const RagUserAgentConfigTabVectorDb = (props: RagUserAgentConfigTabVectorDbProps) => {
  const { id, data, onDataChange } = props;
  const setRetrieveConfigConfigData = (partialData: Partial<WaldieNodeRagUserData['retrieveConfig']>) => {
    onDataChange({
      ...data,
      retrieveConfig: {
        ...data.retrieveConfig,
        ...partialData
      }
    });
  };
  const onVectorDbChange = (
    option: SingleValue<{
      label: string;
      value: 'chroma' | 'pgvector' | 'mongodb' | 'qdrant';
    }>
  ) => {
    if (option) {
      setRetrieveConfigConfigData({ vectorDb: option.value });
    }
  };
  const onModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({ model: event.target.value });
  };
  const onQdrantUseMemoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({
      dbConfig: {
        ...data.retrieveConfig.dbConfig,
        useMemory: event.target.checked,
        useLocalStorage: false
      }
    });
  };
  const onQdrantUseLocalStorageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({
      dbConfig: {
        ...data.retrieveConfig.dbConfig,
        useMemory: false,
        useLocalStorage: event.target.checked
      }
    });
  };
  const onQdrantLocalStoragePathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({
      dbConfig: {
        ...data.retrieveConfig.dbConfig,
        localStoragePath: event.target.value
      }
    });
  };
  const onChromaUseLocalStorageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({
      dbConfig: {
        ...data.retrieveConfig.dbConfig,
        useLocalStorage: event.target.checked
      }
    });
  };
  const onChromaLocalStoragePathChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({
      dbConfig: {
        ...data.retrieveConfig.dbConfig,
        localStoragePath: event.target.value
      }
    });
  };
  const onDbConfigConnectionUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({
      dbConfig: {
        ...data.retrieveConfig.dbConfig,
        connectionUrl: event.target.value
      }
    });
  };
  return (
    <RagUserAgentConfigTabVectorDbView
      id={id}
      data={data}
      onVectorDbChange={onVectorDbChange}
      onModelChange={onModelChange}
      onQdrantUseMemoryChange={onQdrantUseMemoryChange}
      onQdrantUseLocalStorageChange={onQdrantUseLocalStorageChange}
      onQdrantLocalStoragePathChange={onQdrantLocalStoragePathChange}
      onChromaUseLocalStorageChange={onChromaUseLocalStorageChange}
      onChromaLocalStoragePathChange={onChromaLocalStoragePathChange}
      onDbConfigConnectionUrlChange={onDbConfigConnectionUrlChange}
    />
  );
};
