import { apiTypeOptions, createdAt, flowId, modelData, modelId, storedModels, updatedAt } from './data';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import selectEvent from 'react-select-event';

import { WaldiezNodeModel } from '@waldiez/components';
import { WaldiezModelAPIType } from '@waldiez/models';
import { WaldiezProvider } from '@waldiez/store';

const renderModel = (
  apiType: WaldiezModelAPIType = 'other',
  apiKey: string | null = modelData.apiKey,
  baseUrl: string | null = modelData.baseUrl
) => {
  render(
    <WaldiezProvider
      flowId={flowId}
      storageId="test-storage"
      name="flow name"
      description="flow description"
      requirements={[]}
      tags={[]}
      nodes={storedModels}
      edges={[]}
      createdAt={createdAt}
      updatedAt={updatedAt}
    >
      <WaldiezNodeModel
        id={modelId}
        data={{
          ...modelData,
          label: modelData.name,
          apiType,
          apiKey,
          baseUrl
        }}
        type="model"
        dragging={false}
        zIndex={1}
        isConnectable={true}
        positionAbsoluteX={0}
        positionAbsoluteY={0}
      />
    </WaldiezProvider>
  );
};

describe('WaldiezNodeModel Modal Base Tab', () => {
  it('should render basic tab', () => {
    renderModel();
    const openModalButton = screen.getByTestId(`open-node-modal-${modelId}`);
    fireEvent.click(openModalButton);
    const basicTab = screen.getByTestId(`panel-model-config-basic-${modelId}`);
    expect(basicTab).toBeInTheDocument();
  });
  it('should render basic tab inputs', () => {
    renderModel();
    const openModalButton = screen.getByTestId(`open-node-modal-${modelId}`);
    fireEvent.click(openModalButton);
    const labelInput = screen.getByDisplayValue(modelData.name);
    expect(labelInput).toBeInTheDocument();
    const descriptionInput = screen.getByTestId('model-description-textarea');
    expect(descriptionInput).toBeInTheDocument();
    const apiKeyInput = screen.getByTestId('model-api-key-input');
    expect(apiKeyInput).toBeInTheDocument();
    const baseUrlInput = screen.getByTestId('model-base-url-input');
    expect(baseUrlInput).toBeInTheDocument();
  });
  it('should update label input', () => {
    renderModel();
    const openModalButton = screen.getByTestId(`open-node-modal-${modelId}`);
    fireEvent.click(openModalButton);
    const labelInput = screen.getByDisplayValue(modelData.name);
    fireEvent.change(labelInput, { target: { value: 'new label' } });
    expect(labelInput).toHaveValue('new label');
  });
  it('should update description input', () => {
    renderModel();
    const openModalButton = screen.getByTestId(`open-node-modal-${modelId}`);
    fireEvent.click(openModalButton);
    const descriptionInput = screen.getByTestId('model-description-textarea');
    fireEvent.change(descriptionInput, {
      target: { value: 'new description' }
    });
    expect(descriptionInput).toHaveValue('new description');
  });
  it('should update api key input', () => {
    renderModel();
    const openModalButton = screen.getByTestId(`open-node-modal-${modelId}`);
    fireEvent.click(openModalButton);
    const apiKeyInput = screen.getByTestId('model-api-key-input');
    fireEvent.change(apiKeyInput, { target: { value: 'new api key' } });
    expect(apiKeyInput).toHaveValue('new api key');
  });
  it('should update base url input', () => {
    renderModel();
    const openModalButton = screen.getByTestId(`open-node-modal-${modelId}`);
    fireEvent.click(openModalButton);
    const baseUrlInput = screen.getByTestId('model-base-url-input');
    fireEvent.change(baseUrlInput, {
      target: { value: 'http://localhost:3001' }
    });
    expect(baseUrlInput).toHaveValue('http://localhost:3001');
  });
  it('should render read only base url input', () => {
    renderModel('openai');
    const openModalButton = screen.getByTestId(`open-node-modal-${modelId}`);
    fireEvent.click(openModalButton);
    const baseUrlInput = screen.getByTestId('model-base-url-input-read-only');
    expect(baseUrlInput).toBeInTheDocument();
  });
  it('should not update read only base url input', () => {
    renderModel('openai');
    const openModalButton = screen.getByTestId(`open-node-modal-${modelId}`);
    fireEvent.click(openModalButton);
    const baseUrlInput = screen.getByTestId('model-base-url-input-read-only');
    expect(baseUrlInput).toHaveValue('https://api.openai.com/v1');
  });
  it('should update api type select', async () => {
    renderModel();
    const openModalButton = screen.getByTestId(`open-node-modal-${modelId}`);
    fireEvent.click(openModalButton);
    const apiTypeSelect = screen.getByLabelText('Model Type:');
    expect(apiTypeSelect).toBeInTheDocument();
    selectEvent.openMenu(apiTypeSelect);
    await selectEvent.select(apiTypeSelect, 'OpenAI');
    fireEvent.change(apiTypeSelect, {
      target: { label: 'OpenAI', value: 'openai' }
    });
    expect(apiTypeSelect).toHaveValue('openai');
  });
  it('should update readonly base url input on api type change', async () => {
    renderModel();
    const openModalButton = screen.getByTestId(`open-node-modal-${modelId}`);
    fireEvent.click(openModalButton);
    const baseUrlInput = screen.getByTestId('model-base-url-input');
    expect(baseUrlInput).toBeInTheDocument();
    expect(baseUrlInput).toHaveValue('http://localhost:3000');
    const apiTypeSelect = screen.getByLabelText('Model Type:');
    expect(apiTypeSelect).toBeInTheDocument();
    selectEvent.openMenu(apiTypeSelect);
    await selectEvent.select(apiTypeSelect, 'OpenAI');
    fireEvent.change(apiTypeSelect, {
      target: { label: 'OpenAI', value: 'openai' }
    });
    const baseUrlInputReadOnly = screen.getByTestId('model-base-url-input-read-only');
    expect(baseUrlInputReadOnly).toHaveValue('https://api.openai.com/v1');
  });
  it('should discard changes on cancel', () => {
    renderModel();
    const openModalButton = screen.getByTestId(`open-node-modal-${modelId}`);
    fireEvent.click(openModalButton);
    const labelInput = screen.getByDisplayValue(modelData.name);
    fireEvent.change(labelInput, { target: { value: 'new label' } });
    expect(labelInput).toHaveValue('new label');
    const cancelButton = screen.getByTestId(`modal-cancel-btn-${modelId}`);
    fireEvent.click(cancelButton);
    // re open modal
    fireEvent.click(openModalButton);
    const labelInputAfterCancel = screen.getByDisplayValue(modelData.name);
    expect(labelInputAfterCancel).toHaveValue(modelData.name);
  });
  it('should submit changes on submit', () => {
    renderModel();
    const openModalButton = screen.getByTestId(`open-node-modal-${modelId}`);
    fireEvent.click(openModalButton);
    const labelInput = screen.getByDisplayValue(modelData.name);
    fireEvent.change(labelInput, { target: { value: 'new label' } });
    expect(labelInput).toHaveValue('new label');
    const cancelButton = screen.getByTestId(`modal-submit-btn-${modelId}`);
    fireEvent.click(cancelButton);
    // re open modal
    fireEvent.click(openModalButton);
    const labelInputAfterSubmit = screen.getByDisplayValue('new label');
    expect(labelInputAfterSubmit).toHaveValue('new label');
  });
  it('should display expected api type labels', async () => {
    renderModel();
    const openModalButton = screen.getByTestId(`open-node-modal-${modelId}`);
    fireEvent.click(openModalButton);
    const apiTypeSelect = screen.getByLabelText('Model Type:');
    expect(apiTypeSelect).toBeInTheDocument();
    for (const apiType of [
      'openai',
      'azure',
      'google',
      'anthropic',
      'mistral',
      'groq',
      'together',
      'nim',
      'other'
    ]) {
      selectEvent.openMenu(apiTypeSelect);
      const apiTypeLabel = apiTypeOptions.find(option => option.value === apiType)?.label;
      expect(apiTypeLabel).toBeDefined();
      await selectEvent.select(apiTypeSelect, apiTypeLabel!);
      const selectedOption = screen.getByText(apiTypeLabel!);
      expect(selectedOption).toBeInTheDocument();
    }
  });
  it('should render default values if null', () => {
    // handle branches:
    // defaultValue={apiKey ?? ''}
    // value={baseUrl ?? ''}
    renderModel('other', null, null);
    const openModalButton = screen.getByTestId(`open-node-modal-${modelId}`);
    fireEvent.click(openModalButton);
    const apiKeyInput = screen.getByTestId('model-api-key-input');
    expect(apiKeyInput).toHaveValue('');
    const baseUrlInput = screen.getByTestId('model-base-url-input');
    expect(baseUrlInput).toHaveValue('');
  });
});
