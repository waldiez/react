import { InfoLabel, Select, StringList } from '@waldiez/components/inputs';
import { RagUserAgentConfigTabRetrieveConfigViewProps } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/retrieveConfig/types';

export const RagUserAgentConfigTabRetrieveConfigView = (
  props: RagUserAgentConfigTabRetrieveConfigViewProps
) => {
  const {
    id,
    data,
    onTaskChange,
    onAddDocsPath,
    onRemoveDocsPath,
    onDocPathChange,
    onCollectionNameChange,
    onNResultsChange,
    onDistanceThresholdChange,
    onFilesUpload,
    onOpenUploadDialog,
    onFileDrop,
    onFileDragOver
  } = props;
  const { retrieveConfig } = data;
  return (
    <>
      <div className="flex-column">
        <InfoLabel
          label="Task:"
          info={
            'The task of the retrieve chat. ' +
            'Possible values are "code", "qa" and "default". ' +
            'The system prompt will be different for different tasks. ' +
            'The default value is `default`, which supports both code and qa, ' +
            'and provides source information in the end of the response.'
          }
        />
        <label className="hidden" htmlFor={`rag-retrieve-task-${id}`}>
          Task
        </label>
        <Select
          options={taskOptions}
          value={{
            label: taskValuesMap[retrieveConfig.task],
            value: data.retrieveConfig.task
          }}
          onChange={onTaskChange}
          inputId={`rag-retrieve-task-${id}`}
        />
      </div>
      <div className="flex-column">
        {onFilesUpload && (
          <div
            className="drop_zone clickable"
            onDrop={onFileDrop}
            onDragOver={onFileDragOver}
            onClick={onOpenUploadDialog}
          >
            Drop files here or click to upload
          </div>
        )}
        <StringList
          viewLabel={'Docs Paths:'}
          viewLabelInfo={
            'The paths of the documents for the retrieve chat. ' +
            'It can be a list of directories, files and urls. ' +
            'Default is None, which works only if the collection is already created.'
          }
          items={retrieveConfig.docsPath}
          itemsType="rag-doc"
          onItemAdded={onAddDocsPath}
          onItemDeleted={onRemoveDocsPath}
          onItemChange={onDocPathChange}
        />
      </div>
      <div className="flex-column">
        <InfoLabel
          label="Collection Name:"
          info={'The name of the collection. If not provided, a default name `autogen-docs` will be used.'}
        />
        <input
          type="text"
          value={retrieveConfig.collectionName ?? ''}
          onChange={onCollectionNameChange}
          data-testid={`rag-retrieve-collection-name-${id}`}
        />
      </div>
      <div className="flex-column">
        <InfoLabel
          label="Number or results:"
          info={
            'The number of results to return. Default is None, ' +
            'which means the system will return all the results.' +
            'Will be ignored if < 1.'
          }
        />
        <input
          type="number"
          value={retrieveConfig.n_results ?? ''}
          onChange={onNResultsChange}
          data-testid={`rag-retrieve-n-results-${id}`}
        />
      </div>
      <div className="flex-column">
        <InfoLabel
          label="Distance Threshold:"
          info={
            'The threshold for the distance score, only distance smaller than it will be returned. ' +
            'Will be ignored if < 0. Default is -1.'
          }
        />
        <input
          type="number"
          value={retrieveConfig.distanceThreshold ?? -1}
          onChange={onDistanceThresholdChange}
          data-testid={`rag-retrieve-distance-threshold-${id}`}
        />
      </div>
    </>
  );
};

const taskOptions: { label: string; value: 'code' | 'qa' | 'default' }[] = [
  { label: 'Code', value: 'code' },
  { label: 'QA', value: 'qa' },
  { label: 'Default', value: 'default' }
];

const taskValuesMap = {
  code: 'Code',
  qa: 'QA',
  default: 'Default'
};
