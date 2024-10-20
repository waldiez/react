import { WaldieFlowModalOtherTabViewProps } from '@waldiez/components/flow/modal/tabs/other/types';
import { StringList } from '@waldiez/components/inputs';

export const WaldieFlowModalOtherTabView = (props: WaldieFlowModalOtherTabViewProps) => {
  const {
    tags,
    requirements,
    onAddTag,
    onDeleteTag,
    onTagChange,
    onAddRequirement,
    onDeleteRequirement,
    onRequirementChange
  } = props;
  const viewLabelInfo = () => (
    <div>
      Requirements to <span className="bold italic">pip install</span> before running this flow
    </div>
  );
  return (
    <div className="modal-body agent-panel agent-config-panel">
      <StringList
        items={requirements}
        itemsType="requirement"
        viewLabel="Additional Requirements"
        viewLabelInfo={viewLabelInfo}
        onItemAdded={onAddRequirement}
        onItemDeleted={onDeleteRequirement}
        onItemChange={onRequirementChange}
      />
      <StringList
        items={tags}
        itemsType="tag"
        viewLabel="Tags"
        onItemAdded={onAddTag}
        onItemDeleted={onDeleteTag}
        onItemChange={onTagChange}
      />
    </div>
  );
};
