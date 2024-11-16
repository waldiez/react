import { useState } from 'react';

import {
  ImportFlowModalProps,
  ImportFlowState
} from '@waldiez/components/sidebar/modals/importFlowModal/types';
import { useWaldiezContext } from '@waldiez/store';

export const useImportFlowModal = (props: ImportFlowModalProps) => {
  const { onClose: handleClose, typeShown } = props;
  const [importFlowState, setImportFlowState] = useState<ImportFlowState>(initialState);
  const importFlow = useWaldiezContext(selector => selector.importFlow);
  const onFlowChanged = useWaldiezContext(selector => selector.onFlowChanged);
  const onSubmit = () => {
    const { loadedFlowData, selectedProps } = importFlowState;
    if (loadedFlowData) {
      importFlow(selectedProps, loadedFlowData, typeShown);
      // onTypeShownChange('agent');
      onFlowChanged();
    }
  };
  const onBack = (step: number) => {
    if (step === 0) {
      handleClose();
    }
  };
  const onForward = (step: number) => {
    if (step === 1) {
      onSubmit();
      handleClose();
    }
  };
  const onClose = () => {
    setImportFlowState(initialState);
    handleClose();
  };
  const onImportFlowStateChange = (newState: Partial<ImportFlowState>) => {
    setImportFlowState({
      ...importFlowState,
      ...newState
    });
  };
  return {
    state: importFlowState,
    initialState,
    onStateChange: onImportFlowStateChange,
    onClose,
    onBack,
    onForward
  };
};
const initialState: ImportFlowState = {
  searchTerm: '',
  remoteUrl: '',
  // to add: search results
  // once we their type
  loadedFlowData: null,
  selectedProps: {
    everything: true,
    override: false,
    name: false,
    description: false,
    tags: false,
    requirements: false,
    nodes: {
      models: [],
      skills: [],
      agents: []
    },
    edges: []
  }
};
