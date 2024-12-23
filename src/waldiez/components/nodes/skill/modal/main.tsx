import { Dict, Editor, InfoLabel } from "@waldiez/components/inputs";
import { Modal } from "@waldiez/components/modal";
import { getImportExportView } from "@waldiez/components/nodes/common";
import { useSkillNodeModal } from "@waldiez/components/nodes/skill/modal/hooks";
import { WaldiezSkillNodeModalProps } from "@waldiez/components/nodes/skill/modal/types";

export const WaldiezSkillNodeModal = (props: WaldiezSkillNodeModalProps) => {
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
                <InfoLabel
                    label="Name:"
                    info="Make sure a function with the same name is defined in the code."
                />
                <input
                    title="Name"
                    type="text"
                    value={data.label}
                    data-testid={`skill-label-input-${skillId}`}
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
