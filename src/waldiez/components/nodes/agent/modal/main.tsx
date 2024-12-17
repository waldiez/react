import { Modal } from '@waldiez/components/modal';
import { useWaldiezNodeAgentModal } from '@waldiez/components/nodes/agent/modal/hooks';
import { WaldiezNodeAgentModalTabs } from '@waldiez/components/nodes/agent/modal/tabs';
import { getImportExportView } from '@waldiez/components/nodes/common';
import { WaldiezAgentNodeData } from '@waldiez/models';

type WaldiezNodeAgentModalProps = {
  id: string;
  data: WaldiezAgentNodeData;
  isOpen: boolean;
  onClose: () => void;
};

export const WaldiezNodeAgentModal = (props: WaldiezNodeAgentModalProps) => {
  const { id, data, isOpen, onClose } = props;
  const {
    flowId,
    isDirty,
    isDarkMode,
    agentData,
    filesToUpload,
    onDataChange,
    onAgentTypeChange,
    onFilesToUploadChange,
    onImport,
    onExport,
    onSave,
    onCancel
  } = useWaldiezNodeAgentModal(id, isOpen, data, onClose);
  const importExportView = getImportExportView(flowId, id, 'agent', onImport, onExport);
  return (
    <Modal
      title={data.label}
      isOpen={isOpen}
      onClose={onCancel}
      beforeTitle={importExportView}
      dataTestId={`wf-${flowId}-agent-modal-${id}`}
      hasUnsavedChanges={isDirty}
      preventCloseIfUnsavedChanges
    >
      <div className="modal-body">
        <WaldiezNodeAgentModalTabs
          id={id}
          flowId={flowId}
          data={agentData}
          isDarkMode={isDarkMode}
          onDataChange={onDataChange}
          onAgentTypeChange={onAgentTypeChange}
          filesToUpload={filesToUpload}
          onFilesToUploadChange={onFilesToUploadChange}
        />
      </div>
      <div className="modal-actions padding-10">
        <button
          className="modal-action-cancel"
          onClick={onCancel}
          data-testid={`cancel-agent-data-${id}`}
          type="button"
          title="Cancel"
        >
          Cancel
        </button>
        <button
          type="button"
          title={isDirty ? 'Save' : 'No changes to save'}
          className="modal-action-submit"
          onClick={onSave}
          data-testid={`submit-agent-data-${id}`}
          disabled={!isDirty}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};
