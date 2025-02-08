/**
 * SPDX-License-Identifier: Apache-2.0
 * Copyright 2024 - 2025 Waldiez & contributors
 */
import { Dict, StringList } from "@waldiez/components";
import { useSkillNodeModal } from "@waldiez/containers/nodes/skill/modal/hooks";
import { WaldiezNodeSkillModalProps } from "@waldiez/containers/nodes/skill/modal/types";

export const WaldiezSkillAdvancedTab = (props: WaldiezNodeSkillModalProps) => {
    const { data } = props;
    const {
        onUpdateSecrets,
        onDeleteSecret,
        onAddSecret,
        onAddRequirement,
        onDeleteRequirement,
        onRequirementChange,
        onAddTag,
        onDeleteTag,
        onTagChange,
    } = useSkillNodeModal(props);
    const requirementsViewLabelInfo = () => (
        <div>
            Requirements to <span className="bold italic">pip install</span> for this skill
        </div>
    );
    return (
        <>
            <Dict
                viewLabel="Environment Variables:"
                items={data.secrets}
                itemsType="skill-secret"
                onUpdate={onUpdateSecrets}
                onDelete={onDeleteSecret}
                onAdd={onAddSecret}
                areValuesSecret={true}
            />
            <StringList
                viewLabel="Requirements:"
                viewLabelInfo={requirementsViewLabelInfo}
                placeholder="Add a requirement..."
                items={data.requirements}
                itemsType={"skill-requirements"}
                onItemAdded={onAddRequirement}
                onItemDeleted={onDeleteRequirement}
                onItemChange={onRequirementChange}
            />
            <StringList
                viewLabel="Tags:"
                placeholder="Add a tag..."
                items={data.tags}
                itemsType={"skill-tags"}
                onItemAdded={onAddTag}
                onItemDeleted={onDeleteTag}
                onItemChange={onTagChange}
            />
        </>
    );
};
