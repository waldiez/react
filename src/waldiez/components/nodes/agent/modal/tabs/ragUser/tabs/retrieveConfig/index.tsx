import { SingleValue } from '@waldiez/components/inputs';
import { RagUserAgentConfigTabRetrieveConfigProps } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/retrieveConfig/types';
import { RagUserAgentConfigTabRetrieveConfigView } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/retrieveConfig/view';
import { WaldiezNodeRagUserData } from '@waldiez/models';

export const RagUserAgentConfigTabRetrieveConfig = (props: RagUserAgentConfigTabRetrieveConfigProps) => {
  const {
    id,
    data,
    filesToUpload,
    onDataChange,
    onFilesUpload,
    onOpenUploadDialog,
    onFileDrop,
    onFileDragOver,
    setFilesToUpload
  } = props;
  const setRetrieveConfigConfigData = (partialData: Partial<WaldiezNodeRagUserData['retrieveConfig']>) => {
    onDataChange({
      ...data,
      retrieveConfig: {
        ...data.retrieveConfig,
        ...partialData
      }
    });
  };
  const onTaskChange = (option: SingleValue<{ label: string; value: 'code' | 'qa' | 'default' }>) => {
    if (option) {
      setRetrieveConfigConfigData({ task: option.value });
    }
  };
  const onAddDocsPath = (value: string) => {
    setRetrieveConfigConfigData({
      docsPath: [...data.retrieveConfig.docsPath, value]
    });
  };
  const onRemoveDocsPath = (docPath: string) => {
    if (filesToUpload) {
      const newFiles: File[] = [];
      for (let i = 0; i < filesToUpload.length; i++) {
        if (`file:///${filesToUpload[i].name}` !== docPath) {
          newFiles.push(filesToUpload[i]);
        }
      }
      setFilesToUpload(newFiles.length > 0 ? newFiles : []);
    }
    setRetrieveConfigConfigData({
      docsPath: data.retrieveConfig.docsPath.filter(path => path !== docPath)
    });
  };
  const onDocPathChange = (oldItem: string, newItem: string) => {
    setRetrieveConfigConfigData({
      docsPath: data.retrieveConfig.docsPath.map(path => (path === oldItem ? newItem : path))
    });
  };
  const onCollectionNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRetrieveConfigConfigData({ collectionName: event.target.value });
  };
  const onNResultsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = parseInt(event.target.value, 10);
      if (isNaN(value) || value < 1) {
        setRetrieveConfigConfigData({ n_results: null });
      } else {
        setRetrieveConfigConfigData({ n_results: value });
      }
    } catch (_) {
      //
    }
  };
  const onDistanceThresholdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const value = parseFloat(event.target.value);
      if (isNaN(value) || value < 0) {
        setRetrieveConfigConfigData({ distanceThreshold: null });
      } else {
        setRetrieveConfigConfigData({ distanceThreshold: value });
      }
    } catch (_) {
      //
    }
  };
  return (
    <RagUserAgentConfigTabRetrieveConfigView
      id={id}
      data={data}
      onTaskChange={onTaskChange}
      onAddDocsPath={onAddDocsPath}
      onRemoveDocsPath={onRemoveDocsPath}
      onDocPathChange={onDocPathChange}
      onCollectionNameChange={onCollectionNameChange}
      onNResultsChange={onNResultsChange}
      onDistanceThresholdChange={onDistanceThresholdChange}
      onFilesUpload={onFilesUpload}
      onOpenUploadDialog={onOpenUploadDialog}
      onFileDrop={onFileDrop}
      onFileDragOver={onFileDragOver}
    />
  );
};
