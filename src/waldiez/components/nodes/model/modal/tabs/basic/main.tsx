import { FaEye, FaEyeSlash } from 'react-icons/fa';

import { InfoLabel, Select } from '@waldiez/components/inputs';
import { useModelModalBasicTab } from '@waldiez/components/nodes/model/modal/tabs/basic/hooks';
import { WaldiezNodeModelModalBasicTabProps } from '@waldiez/components/nodes/model/modal/tabs/basic/types';

export const WaldiezNodeModelModalBasicTab = (props: WaldiezNodeModelModalBasicTabProps) => {
  const { id, data } = props;
  const { label, description, apiType, apiKey, baseUrl } = data;
  const {
    apiTypeLabel,
    apiKeyInfo,
    apiKeyEnv,
    urlIsEditable,
    apiKeyVisible,
    apiTypeOptions,
    readOnlyBaseUrl,
    onApiKeyVisibleChange,
    onLabelChange,
    onDescriptionChange,
    onApiTypeChange,
    onApiKeyChange,
    onBaseUrlChange
  } = useModelModalBasicTab(props);
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
      <div className="flex full-width">
        <input
          className="flex-1 margin-right-10"
          type={apiKeyVisible ? 'text' : 'password'}
          defaultValue={apiKey ?? ''}
          placeholder={apiKeyEnv}
          onChange={onApiKeyChange}
          data-testid="model-api-key-input"
        />
        <button
          className="visibilityWrapperBtn"
          onClick={onApiKeyVisibleChange}
          title="Toggle visibility"
          data-testid={`visibility-apiKey-model-${id}`}
        >
          {apiKeyVisible ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
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
