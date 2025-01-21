import { Dict, Editor, Modal } from "@waldiez/components";
import { getImportExportView } from "@waldiez/containers/nodes/common";
import { useSkillNodeModal } from "@waldiez/containers/nodes/skill/modal/hooks";
import { WaldiezNodeSkillModalProps } from "@waldiez/containers/nodes/skill/modal/types";

export const WaldiezNodeSkillModal = (props: WaldiezNodeSkillModalProps) => {
    const {
        skillId,
        flowId,
        data,
        isModalOpen,
        isDirty,
        darkMode,
        onClose,
        onCancel,
        onSave,
        onImport,
        onExport,
    } = props;
    const {
        onUpdateSecrets,
        onDeleteSecret,
        onAddSecret,
        onSkillContentChange,
        onSkillLabelChange,
        onSkillDescriptionChange,
    } = useSkillNodeModal(props);
    const importExportView = getImportExportView(flowId, skillId, "skill", onImport, onExport);
    return (
        <Modal
            beforeTitle={importExportView}
            title={data.label}
            isOpen={isModalOpen}
            onClose={onClose}
            hasUnsavedChanges={isDirty}
            preventCloseIfUnsavedChanges
        >
            <div className="modal-body">
                <div className="info">
                    Enter the skill details below. If the skill name is called{" "}
                    <span className="bold italic">waldiez_shared</span> it will be placed before any other
                    skill in the flow (for example additional imports to be used or variables that should be
                    available to the entire flow). Otherwise, generate a function with the{" "}
                    <span className="bold italic">name of the skill</span>. This function's contents will be
                    included in the final flow.
                </div>
                <label htmlFor={`skill-label-input-${skillId}`}>Name:</label>
                <input
                    title="Name"
                    type="text"
                    value={data.label}
                    data-testid={`skill-label-input-${skillId}`}
                    id={`skill-label-input-${skillId}`}
                    onChange={onSkillLabelChange}
                />
                <label>Description:</label>
                <textarea
                    title="Description"
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
            <div className="modal-actions margin-top-10">
                <button
                    type="button"
                    title="Cancel"
                    className="modal-action-cancel"
                    onClick={onCancel}
                    data-testid={`modal-cancel-btn-${skillId}`}
                >
                    Cancel
                </button>
                <button
                    title="Save"
                    type="button"
                    className="modal-action-submit"
                    onClick={onSave}
                    data-testid={`modal-submit-btn-${skillId}`}
                    disabled={!isDirty}
                >
                    Save
                </button>
            </div>
        </Modal>
    );
};
