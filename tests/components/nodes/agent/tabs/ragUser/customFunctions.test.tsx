import { renderAgent, submitAgentChanges } from '../../common';
import { agentId, flowId } from '../../data';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const goToCustomFunctionsTab = async () => {
  renderAgent('rag_user', {
    openModal: true
  });
  const ragUserTab = screen.getByTestId(`tab-id-wf-${flowId}-agent-ragUser-${agentId}`);
  fireEvent.click(ragUserTab);
  const customFunctionsTab = screen.getByTestId(
    `tab-id-wf-${flowId}-agent-ragUser-${agentId}-customFunctions`
  );
  fireEvent.click(customFunctionsTab);
};

const goToSubTab = (functionName: string) => {
  const subTab = screen.getByTestId(
    `tab-id-wf-${flowId}-agent-ragUser-${agentId}-customFunctions-${functionName}`
  );
  fireEvent.click(subTab);
  const useCustomCheckbox = screen.getByTestId(`rag-use-custom-${functionName}`);
  expect(useCustomCheckbox).toBeInTheDocument();
  fireEvent.click(useCustomCheckbox);
};

describe('Rag User tab Custom Functions', () => {
  it('should render the Rag User tab Custom Functions', async () => {
    await goToCustomFunctionsTab();
    const customFunctionsTab = screen.getByTestId(
      `tab-id-wf-${flowId}-agent-ragUser-${agentId}-customFunctions-embedding`
    );
    expect(customFunctionsTab).toBeInTheDocument();
  });
  it('should change the use custom embedding function', async () => {
    await goToCustomFunctionsTab();
    const useCustomEmbeddingCheckbox = screen.getByTestId('rag-use-custom-embedding') as HTMLInputElement;
    expect(useCustomEmbeddingCheckbox).toBeInTheDocument();
    fireEvent.click(useCustomEmbeddingCheckbox);
    submitAgentChanges();
  });
  it('should change the embedding function content', async () => {
    await goToCustomFunctionsTab();
    goToSubTab('embedding');
    const editor = screen.getByTestId('mocked-monaco-editor');
    expect(editor).toBeInTheDocument();
    fireEvent.change(editor, {
      target: {
        value: 'new-embedding-function'
      }
    });
    submitAgentChanges();
  });
  it('should change the use custom token count function', async () => {
    await goToCustomFunctionsTab();
    const tokenCountSubTab = screen.getByTestId(
      `tab-id-wf-${flowId}-agent-ragUser-${agentId}-customFunctions-tokenCount`
    );
    fireEvent.click(tokenCountSubTab);
    const useCustomTokenCountCheckbox = screen.getByTestId('rag-use-custom-tokenCount') as HTMLInputElement;
    expect(useCustomTokenCountCheckbox).toBeInTheDocument();
    fireEvent.click(useCustomTokenCountCheckbox);
    submitAgentChanges();
  });
  it('should change the token count function content', async () => {
    await goToCustomFunctionsTab();
    goToSubTab('tokenCount');
    const editor = screen.getByTestId('mocked-monaco-editor');
    expect(editor).toBeInTheDocument();
    fireEvent.change(editor, {
      target: {
        value: 'new-token-count-function'
      }
    });
    submitAgentChanges();
  });
  it('should change the use custom text split function', async () => {
    await goToCustomFunctionsTab();
    const textSplitSubTab = screen.getByTestId(
      `tab-id-wf-${flowId}-agent-ragUser-${agentId}-customFunctions-textSplit`
    );
    fireEvent.click(textSplitSubTab);
    const useCustomTextSplitCheckbox = screen.getByTestId('rag-use-custom-textSplit') as HTMLInputElement;
    expect(useCustomTextSplitCheckbox).toBeInTheDocument();
    fireEvent.click(useCustomTextSplitCheckbox);
    submitAgentChanges();
  });
  it('should change the text split function content', async () => {
    await goToCustomFunctionsTab();
    goToSubTab('textSplit');
    const editor = screen.getByTestId('mocked-monaco-editor');
    expect(editor).toBeInTheDocument();
    fireEvent.change(editor, {
      target: {
        value: 'new-text-split-function'
      }
    });
    submitAgentChanges();
  });
});
