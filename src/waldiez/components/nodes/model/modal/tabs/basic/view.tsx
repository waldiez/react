import { InfoLabel, Select } from '@waldiez/components/inputs';
import { apiKeyEnvs, apiTypeOptions, baseUrlsMapping } from '@waldiez/components/nodes/model/common';
import { WaldiezNodeModelModalBasicTabViewProps } from '@waldiez/components/nodes/model/modal/tabs/basic/types';
import { WaldiezModelAPIType } from '@waldiez/models';

export const WaldiezNodeModelModalBasicTabView = (props: WaldiezNodeModelModalBasicTabViewProps) => {
  const { data, onLabelChange, onDescriptionChange, onApiTypeChange, onApiKeyChange, onBaseUrlChange } =
    props;
  const { label, description, apiType, apiKey, baseUrl } = data;
  const apiKeyEnv = apiKeyEnvs[apiType];
  const apiKeyInfo = `API key to use if ${apiKeyEnv} environment variable is not set`;
  const apiTypeLabel = getApiTypeLabel(apiType);
  const readOnlyBaseUrl = getBaseUrl(apiType);
  const urlIsEditable = isBaseUrlEditable(apiType);
  return (
    <div className="flex-column">
      <div className="info margin-bottom-10">
        Make sure that the model's name is a valid name (based on the provider).
      </div>
      <label>Name:</label>
      <input type="text" value={label} onChange={onLabelChange} />
      <label>Description:</label>
      <textarea
        rows={2}
        value={description}
        onChange={onDescriptionChange}
        data-testid="model-description-textarea"
      />
      <InfoLabel
        label="Model Type:"
        info="API type to use for the model. Use 'other' for custom openai compatible models"
      />
      <label className="hidden" htmlFor="model-api-type-select">
        Model Type:
      </label>
      <Select
        options={apiTypeOptions}
        value={{
          label: apiTypeLabel,
          value: apiType
        }}
        onChange={onApiTypeChange}
        inputId="model-api-type-select"
      />
      <InfoLabel label="API Key:" info={apiKeyInfo} />
      <input
        type="text"
        defaultValue={apiKey ?? ''}
        placeholder={apiKeyEnv}
        onChange={onApiKeyChange}
        data-testid="model-api-key-input"
      />
      <InfoLabel label="Base URL:" info="Model's base URL (including version)" />
      {urlIsEditable ? (
        <input
          type="text"
          value={baseUrl ?? ''}
          onChange={onBaseUrlChange}
          data-testid="model-base-url-input"
        />
      ) : (
        <input
          type="text"
          readOnly
          disabled
          value={readOnlyBaseUrl}
          data-testid="model-base-url-input-read-only"
        />
      )}
    </div>
  );
};

const getApiTypeLabel = (text: WaldiezModelAPIType) => {
  if (text === 'anthropic') {
    return 'Claude';
  }
  if (text === 'google') {
    return 'Gemini';
  }
  if (text === 'openai') {
    return 'OpenAI';
  }
  if (text === 'nim') {
    return 'NIM';
  }
  return text[0].toUpperCase() + text.slice(1);
};

const getBaseUrl = (apiType: WaldiezModelAPIType) => {
  return baseUrlsMapping[apiType];
};

const isBaseUrlEditable = (apiType: WaldiezModelAPIType) => {
  return ['other', 'nim', 'azure'].includes(apiType);
};
