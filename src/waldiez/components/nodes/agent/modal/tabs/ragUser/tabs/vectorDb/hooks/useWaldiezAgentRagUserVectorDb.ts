import { SingleValue } from '@waldiez/components/inputs';
import { WaldiezNodeData, WaldiezNodeRagUserData } from '@waldiez/models';

export const useWaldiezAgentRagUserVectorDb = (props: {
  data: WaldiezNodeRagUserData;
  onDataChange: (data: WaldiezNodeData) => void;
}) => {
  const { data, onDataChange } = props;
  const setRetrieveConfigConfigData = (partialData: Partial<WaldiezNodeRagUserData['retrieveConfig']>) => {
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
  return {
    onVectorDbChange,
    onModelChange,
    onQdrantUseMemoryChange,
    onQdrantUseLocalStorageChange,
    onQdrantLocalStoragePathChange,
    onChromaUseLocalStorageChange,
    onChromaLocalStoragePathChange,
    onDbConfigConnectionUrlChange
  };
};
