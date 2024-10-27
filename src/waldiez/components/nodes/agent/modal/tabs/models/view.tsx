import { Select } from '@waldiez/components/inputs';
import { ModelsAgentConfigTabViewProps } from '@waldiez/components/nodes/agent/modal/tabs/models/types';

export const ModelsAgentConfigTabView = (props: ModelsAgentConfigTabViewProps) => {
  const { id, data, onModelsChange, models } = props;
  const modelOptions = models.map(model => {
    return {
      label: model.data.label as string,
      value: model.id
    };
  });
  const selectedModels = data.modelIds.map(modelId => {
    const model = models.find(model => model.id === modelId);
    return {
      label: model?.data.label as string,
      value: modelId
    };
  });
  return (
    <div className="agent-panel agent-models-panel" data-testid="agent-models-panel">
      {models.length === 0 ? (
        <div className="select-models-label margin-top-20 margin-bottom-20">
          No models found in the workspace
        </div>
      ) : (
        <>
          <div className="select-models-label">
            Model{data.agentType !== 'rag_user' ? 's' : ''} linked to agent:
          </div>
          <label className="hidden" htmlFor={`select-agent-models-${id}`}>
            Models:
          </label>
          <Select
            options={modelOptions}
            value={selectedModels}
            onChange={onModelsChange}
            isMulti
            inputId={`select-agent-models-${id}`}
          />
        </>
      )}
    </div>
  );
};
