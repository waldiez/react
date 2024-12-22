import { MultiValue, Select, SingleValue } from "@waldiez/components/inputs";
import { WaldiezAgentModelsProps } from "@waldiez/components/nodes/agent/modal/tabs/models/types";

export const WaldiezAgentModels = (props: WaldiezAgentModelsProps) => {
    const { id, data, models, onDataChange } = props;
    const modelOptions = models.map(model => {
        return {
            label: model.data.label as string,
            value: model.id,
        };
    });
    const selectedModels = data.modelIds.map(modelId => {
        const model = models.find(model => model.id === modelId);
        return {
            label: model?.data.label as string,
            value: modelId,
        };
    });
    const onModelsChange = (
        options: MultiValue<{ label: string; value: string }> | SingleValue<{ label: string; value: string }>,
    ) => {
        if (options) {
            const modelIds = (Array.isArray(options) ? options : [options]).map(option => option.value);
            onDataChange({ modelIds });
        } else {
            onDataChange({ modelIds: [] });
        }
    };
    return (
        <div className="agent-panel agent-models-panel margin-bottom-10" data-testid="agent-models-panel">
            {models.length === 0 ? (
                <div className="select-models-label">No models found in the workspace</div>
            ) : (
                <>
                    <label className="select-models-label" htmlFor={`select-agent-models-${id}`}>
                        Model{data.agentType !== "rag_user" ? "s" : ""} to link to agent:
                    </label>
                    <Select
                        options={modelOptions}
                        value={selectedModels}
                        onChange={onModelsChange}
                        isMulti={data.agentType !== "rag_user"}
                        inputId={`select-agent-models-${id}`}
                        isClearable
                    />
                </>
            )}
        </div>
    );
};
