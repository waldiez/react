import { InfoCheckbox, InfoLabel, Select } from '@waldiez/components/inputs';
import { RagUserAgentConfigTabVectorDbViewProps } from '@waldiez/components/nodes/agent/modal/tabs/ragUser/tabs/vectorDb/types';

export const RagUserAgentConfigTabVectorDbView = (props: RagUserAgentConfigTabVectorDbViewProps) => {
  const {
    id,
    data,
    onVectorDbChange,
    onModelChange,
    onQdrantUseMemoryChange,
    onQdrantUseLocalStorageChange,
    onQdrantLocalStoragePathChange,
    onChromaUseLocalStorageChange,
    onChromaLocalStoragePathChange,
    onDbConfigConnectionUrlChange
  } = props;
  const { retrieveConfig } = data;
  return (
    <div className="flex-column">
      <label htmlFor={`rag-vector-db-${id}`}>Vector DB:</label>
      <Select
        options={vectorDbOptions}
        value={{
          label: vectorDbValuesMap[retrieveConfig.vectorDb ?? 'chroma'],
          value: retrieveConfig.vectorDb ?? 'chroma'
        }}
        onChange={onVectorDbChange}
        inputId={`rag-vector-db-${id}`}
      />
      <InfoLabel
        label="Embedding Model:"
        info={() => (
          <div>
            The model for embedding. <br />
            The defaults are: <br />
            Chroma: all-MiniLM-L6-v2; <br />
            Pgvector: all-MiniLM-L6-v2; <br />
            MongoDB: all-MiniLM-L6-v2; <br />
            Qdrant: BAAI/bge-small-en-v1.5.
          </div>
        )}
      />
      <input
        type="text"
        value={retrieveConfig.dbConfig.model ?? modelNameMapping[retrieveConfig.vectorDb]}
        onChange={onModelChange}
        data-testid={`rag-vector-db-model-${id}`}
      />
      {retrieveConfig.vectorDb === 'qdrant' && (
        <>
          <InfoCheckbox
            label="Use Memory Storage "
            info={'Use memory for the vector db. Default is True.'}
            checked={retrieveConfig.dbConfig.useMemory}
            onChange={onQdrantUseMemoryChange}
            dataTestId={`rag-vector-db-use-memory-${id}`}
          />
          {!retrieveConfig.dbConfig.useMemory && (
            <>
              <InfoCheckbox
                label="Use Local Storage "
                info={'Use local storage for the vector db. Default is True if use_memory is False.'}
                checked={retrieveConfig.dbConfig.useLocalStorage}
                onChange={onQdrantUseLocalStorageChange}
                dataTestId={`rag-vector-db-use-local-storage-${id}`}
              />
              {retrieveConfig.dbConfig.useLocalStorage && (
                <>
                  <label>Storage Path:</label>
                  <input
                    type="text"
                    value={retrieveConfig.dbConfig.localStoragePath ?? ''}
                    onChange={onQdrantLocalStoragePathChange}
                    data-testid={`rag-vector-db-local-storage-path-${id}`}
                  />
                </>
              )}
            </>
          )}
          {!retrieveConfig.dbConfig.useMemory && !retrieveConfig.dbConfig.useLocalStorage && (
            <div className="flex-column">
              <label>Connection URL:</label>
              <input
                type="text"
                value={retrieveConfig.dbConfig.connectionUrl ?? ''}
                onChange={onDbConfigConnectionUrlChange}
                data-testid={`rag-vector-db-connection-url-${id}`}
              />
            </div>
          )}
        </>
      )}
      {retrieveConfig.vectorDb === 'chroma' && (
        <>
          <InfoCheckbox
            label="Use Persistent Storage "
            info={'Use persistent storage for the vector db. Default is False.'}
            checked={retrieveConfig.dbConfig.useLocalStorage}
            onChange={onChromaUseLocalStorageChange}
            dataTestId={`rag-vector-db-use-local-storage-${id}`}
          />
          {retrieveConfig.dbConfig.useLocalStorage && (
            <>
              <label>Storage Path:</label>
              <input
                type="text"
                value={retrieveConfig.dbConfig.localStoragePath ?? ''}
                onChange={onChromaLocalStoragePathChange}
                data-testid={`rag-vector-db-local-storage-path-${id}`}
              />
            </>
          )}
        </>
      )}
      {retrieveConfig.vectorDb !== 'qdrant' && (
        <div className="flex-column">
          <InfoLabel
            label="Connection URL:"
            info={
              'The connection URL for the vector db. ' +
              'If using chroma and not provided, a new ' +
              'chroma db server will be spawned. ' +
              'For pgvector and mongodb, this is required.'
            }
          />
          <input
            type="text"
            value={retrieveConfig.dbConfig.connectionUrl ?? ''}
            onChange={onDbConfigConnectionUrlChange}
            data-testid={`rag-vector-db-connection-url-${id}`}
          />
        </div>
      )}
    </div>
  );
};
const vectorDbOptions: {
  label: string;
  value: 'chroma' | 'pgvector' | 'mongodb' | 'qdrant';
}[] = [
  { label: 'Chroma', value: 'chroma' },
  { label: 'Qdrant', value: 'qdrant' },
  { label: 'Pgvector', value: 'pgvector' },
  { label: 'MongoDB', value: 'mongodb' }
];

const vectorDbValuesMap = {
  chroma: 'Chroma',
  pgvector: 'Pgvector',
  mongodb: 'MongoDB',
  qdrant: 'Qdrant'
};
const modelNameMapping = {
  chroma: 'all-MiniLM-L6-v2',
  pgvector: 'all-MiniLM-L6-v2',
  mongodb: 'all-MiniLM-L6-v2',
  qdrant: 'BAAI/bge-small-en-v1.5'
};
