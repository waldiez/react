import { Dict, Editor, InfoLabel } from '@waldiez/components/inputs';
import { Modal } from '@waldiez/components/modal';
import { getImportExportView } from '@waldiez/components/nodes/common';
import { WaldiezSkillNodeModalViewProps } from '@waldiez/components/nodes/skill/modal/types';

export const WaldiezSkillNodeModalView = (props: WaldiezSkillNodeModalViewProps) => {
  const {
    skillId,
    flowId,
    data,
    isModalOpen,
    darkMode,
    onClose,
    onCancel,
    onSubmit,
    onSkillLabelChange,
    onSkillDescriptionChange,
    onSkillContentChange,
    onAddSecret,
    onUpdateSecrets,
    onDeleteSecret,
    onImport,
    onExport
  } = props;
  const importExportView = getImportExportView(flowId, skillId, 'skill', onImport, onExport);
  return (
    <Modal beforeTitle={importExportView} title={data.label} isOpen={isModalOpen} onClose={onClose}>
      <div className="modal-body">
        <InfoLabel label="Name:" info="Make sure a function with the same name is defined in the code." />
        <input
          type="text"
          value={data.label}
          data-testid={`skill-label-input-${skillId}`}
          onChange={onSkillLabelChange}
        />
        <label>Description:</label>
        <textarea
          rows={2}
          value={data.description}
          data-testid={`skill-description-input-${skillId}`}
          onChange={onSkillDescriptionChange}
        />
        <label>Content:</label>
        <Editor value={data.content} onChange={onSkillContentChange} darkMode={darkMode} />
        <Dict
          viewLabel="Environment Variables:"
          items={data.secrets}
          itemsType="skill-secret"
          onUpdate={onUpdateSecrets}
          onDelete={onDeleteSecret}
          onAdd={onAddSecret}
          areValuesSecret={true}
        />
      </div>
      <div className="modal-actions">
        <button
          className="modal-action-cancel"
          onClick={onCancel}
          data-testid={`modal-cancel-btn-${skillId}`}
        >
          Cancel
        </button>
        <button
          className="modal-action-submit"
          onClick={onSubmit}
          data-testid={`modal-submit-btn-${skillId}`}
        >
          Save
        </button>
      </div>
    </Modal>
  );
};
